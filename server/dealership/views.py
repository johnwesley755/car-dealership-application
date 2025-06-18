import json
import requests
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.conf import settings
from textblob import TextBlob
from django.contrib.auth import logout
from django.shortcuts import redirect
# API URL from Django settings
API_URL = settings.EXPRESS_API_URL

# Helper class to wrap dealer JSON into an object-like structure
class Dealer:
    def __init__(self, data):
        self.id = data.get('id') or data.get('_id') or data.get('dealerId')
        self.name = data.get('name')
        self.city = data.get('city')
        self.state = data.get('state')
        self.raw = data  # in case you want to access full dict
def custom_logout(request):
    logout(request)
    return redirect('logout_success')
def home(request):
    try:
        response = requests.get(f"{API_URL}/dealers")
        dealers_data = response.json()
        
        # Normalize dealer ID
        dealers = [Dealer(data) for data in dealers_data]
    except requests.RequestException:
        dealers = []
    
    return render(request, 'dealership/home.html', {'dealers': dealers})

def about(request):
    return render(request, 'dealership/about.html')

def contact(request):
    return render(request, 'dealership/contact.html')

def dealer_detail(request, dealer_id):
    try:
        dealer_response = requests.get(f"{API_URL}/dealer/{dealer_id}")
        dealer_data = dealer_response.json()
        dealer = Dealer(dealer_data)

        reviews_response = requests.get(f"{API_URL}/dealer/{dealer_id}/reviews")
        reviews = reviews_response.json()
    except requests.RequestException:
        dealer = None
        reviews = []

    return render(request, 'dealership/dealer_detail.html', {
        'dealer': dealer,
        'reviews': reviews,
        'dealer_id': dealer_id
    })

@login_required
def add_review(request, dealer_id):
    dealer = None
    try:
        dealer_response = requests.get(f"{API_URL}/dealer/{dealer_id}")
        if dealer_response.status_code == 200:
            dealer_data = dealer_response.json()
            dealer = Dealer(dealer_data)
    except requests.RequestException:
        pass

    if request.method == 'POST':
        review_text = request.POST.get('review_text')
        rating = request.POST.get('rating')

        sentiment_response = analyze_sentiment(review_text)
        sentiment = sentiment_response.get('sentiment')

        review_data = {
            'dealerId': dealer_id,
            'reviewer': request.user.username,
            'rating': rating,
            'comment': review_text,
            'sentiment': sentiment
        }

        try:
            response = requests.post(
                f"{API_URL}/dealer/{dealer_id}/reviews",
                json=review_data,
                headers={'Content-Type': 'application/json'}
            )

            if response.status_code == 201:
                return redirect('dealer_detail', dealer_id=dealer_id)
        except requests.RequestException:
            pass

    return render(request, 'dealership/add_review.html', {'dealer': dealer})

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'dealership/signup.html', {'form': form})

def logout_success(request):
    return render(request, 'dealership/logout.html')

def analyze_sentiment(text):
    """Analyze sentiment using TextBlob."""
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity

    if polarity > 0.1:
        sentiment = 'positive'
    elif polarity < -0.1:
        sentiment = 'negative'
    else:
        sentiment = 'neutral'

    return {
        'text': text,
        'sentiment': sentiment,
        'polarity': polarity
    }

def sentiment_analysis_api(request):
    """API endpoint for sentiment analysis."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            text = data.get('text', '')
            result = analyze_sentiment(text)
            return JsonResponse(result)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
