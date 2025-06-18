from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User


class DealershipViewTests(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )

    def test_home_view(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'dealership/home.html')

    def test_about_view(self):
        response = self.client.get(reverse('about'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'dealership/about.html')

    def test_contact_view(self):
        response = self.client.get(reverse('contact'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'dealership/contact.html')

    def test_login_view(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'dealership/login.html')

    def test_login_functionality(self):
        response = self.client.post(reverse('login'), {
            'username': 'testuser',
            'password': 'testpassword'
        })
        self.assertRedirects(response, reverse('home'))

    def test_logout_view(self):
        # Login first
        self.client.login(username='testuser', password='testpassword')
        response = self.client.get(reverse('logout'))
        self.assertRedirects(response, reverse('logout_success'))

    def test_signup_view(self):
        response = self.client.get(reverse('signup'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'dealership/signup.html')

    def test_signup_functionality(self):
        response = self.client.post(reverse('signup'), {
            'username': 'newuser',
            'password1': 'complex_password123',
            'password2': 'complex_password123'
        })
        self.assertRedirects(response, reverse('home'))
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_protected_view_redirect(self):
        # Try to access a protected view without login
        response = self.client.get(reverse('add_review', args=['some-dealer-id']))
        self.assertRedirects(
            response, 
            f"{reverse('login')}?next={reverse('add_review', args=['some-dealer-id'])}"
        )