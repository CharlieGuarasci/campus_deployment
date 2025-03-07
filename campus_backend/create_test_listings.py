import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_backend.settings')
django.setup()

from listings.models import Listing
from django.contrib.auth.models import User

def create_test_listings():
    # Get or create a test user
    user, created = User.objects.get_or_create(
        username='testuser',
        email='test@example.com'
    )
    if created:
        user.set_password('testpass123')
        user.save()

    # Create test listings
    test_listings = [
        {
            'title': 'Introduction to Computer Science',
            'author': 'John Smith',
            'edition': '3rd Edition',
            'condition': 'Good',
            'price': 45.99,
            'course_code': 'CISC 121',
            'description': 'Perfect for first-year CS students. Minimal highlighting and notes.',
            'seller': user
        },
        {
            'title': 'Calculus: Early Transcendentals',
            'author': 'James Stewart',
            'edition': '9th Edition',
            'condition': 'Fair',
            'price': 65.00,
            'course_code': 'MATH 121',
            'description': 'Some wear on the cover, but all pages intact. Contains practice problem solutions.',
            'seller': user
        }
    ]

    for listing_data in test_listings:
        listing = Listing.objects.create(**listing_data)
        print(f'Created listing: {listing.title}')

if __name__ == '__main__':
    create_test_listings()
    print('Test listings created successfully!') 