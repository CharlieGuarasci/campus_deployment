from rest_framework import generics, filters
from .models import Listing
from .serializers import ListingSerializer

# ✅ Get all listings & Create a new listing
class ListingListCreateView(generics.ListCreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author', 'course_code']  
    ordering_fields = ['price', 'condition']  

# ✅ Retrieve, Update, and Delete a listing
class ListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer