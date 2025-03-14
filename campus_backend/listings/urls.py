from django.urls import path
from .views import (
    ListingListCreateView, ListingDetailView,
    BookListingListCreateView, BookListingDetailView,
    SubletListingListCreateView, SubletListingDetailView,
    RoommatesListCreateView, RoommatesDetailView,
    RideShareListCreateView, RideShareDetailView,
    EventsAndOtherListCreateView, EventsAndOtherDetailView
)

urlpatterns = [
    path('', ListingListCreateView.as_view(), name='listings'),
    path('<int:pk>/', ListingDetailView.as_view(), name='listing-detail'),
    
    path('books/', BookListingListCreateView.as_view(), name='book-listings'),
    path('books/<int:pk>/', BookListingDetailView.as_view(), name='book-listing-detail'),

    path('sublets/', SubletListingListCreateView.as_view(), name='sublet-listings'),
    path('sublets/<int:pk>/', SubletListingDetailView.as_view(), name='sublet-listing-detail'),

    path('roommates/', RoommatesListCreateView.as_view(), name='roommates-listings'),
    path('roommates/<int:pk>/', RoommatesDetailView.as_view(), name='roommates-listing-detail'),

    path('rideshare/', RideShareListCreateView.as_view(), name='rideshare-listings'),
    path('rideshare/<int:pk>/', RideShareDetailView.as_view(), name='rideshare-listing-detail'),

    path('events/', EventsAndOtherListCreateView.as_view(), name='events-listings'),
    path('events/<int:pk>/', EventsAndOtherDetailView.as_view(), name='events-listing-detail'),
]