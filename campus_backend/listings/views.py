from rest_framework import generics, filters
from .models import Listing
from rest_framework import status
from rest_framework.views import APIView
from .serializers import ListingSerializer
from rest_framework.response import Response
from rest_framework import generics, filters
from .models import Listing, BookListing, SubletListing, Roommates, RideShare, EventsAndOther
from .serializers import (
    ListingSerializer, BookListingSerializer, SubletListingSerializer, 
    RoommatesSerializer, RideShareSerializer, EventsAndOtherSerializer
)

# ✅ Get all listings & Create a new listing
class ListingListCreateView(generics.ListCreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']  
    ordering_fields = ['price', 'created_at']

# ✅ Retrieve, Update, and Delete a listing
class ListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

# ✅ Book Listings
class BookListingListCreateView(generics.ListCreateAPIView):
    queryset = BookListing.objects.all()
    serializer_class = BookListingSerializer

class BookListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookListing.objects.all()
    serializer_class = BookListingSerializer

# ✅ Sublet Listings
class SubletListingListCreateView(generics.ListCreateAPIView):
    queryset = SubletListing.objects.all()
    serializer_class = SubletListingSerializer

class SubletListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubletListing.objects.all()
    serializer_class = SubletListingSerializer

# ✅ Roommates Listings
class RoommatesListCreateView(generics.ListCreateAPIView):
    queryset = Roommates.objects.all()
    serializer_class = RoommatesSerializer

class RoommatesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Roommates.objects.all()
    serializer_class = RoommatesSerializer

# ✅ Rideshare Listings
class RideShareListCreateView(generics.ListCreateAPIView):
    queryset = RideShare.objects.all()
    serializer_class = RideShareSerializer

class RideShareDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RideShare.objects.all()
    serializer_class = RideShareSerializer

class EventsAndOtherListCreateView(APIView):
    def post(self, request, *args, **kwargs):
        print("\n🔹 Received Data:", request.data)  # ✅ Log raw request data

        serializer = EventsAndOtherSerializer(data=request.data)
        if serializer.is_valid():
            print("✅ Data is valid, saving to database...\n")  # ✅ Log successful validation
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("❌ Validation Errors:", serializer.errors, "\n")  # ✅ Log validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventsAndOtherDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EventsAndOther.objects.all()
    serializer_class = EventsAndOtherSerializer
