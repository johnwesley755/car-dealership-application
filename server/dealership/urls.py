from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('dealer/<str:dealer_id>/', views.dealer_detail, name='dealer_detail'),
    path('dealer/<str:dealer_id>/review/', views.add_review, name='add_review'),
    path('login/', auth_views.LoginView.as_view(template_name='dealership/login.html'), name='login'),
    path('logout/', views.custom_logout, name='logout'),
    path('logout-success/', views.logout_success, name='logout_success'),
    path('signup/', views.signup, name='signup'),
    path('analyze/', views.sentiment_analysis_api, name='analyze_sentiment'),
]