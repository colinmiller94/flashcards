from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView

from . import serializers
import base.models as models
from base.models import Note


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = serializers.NoteSerializer(notes, many=True)
    return Response(serializer.data)


class FlashcardListCreate(generics.ListCreateAPIView):
    print('aaaaah')
    serializer_class = serializers.FlashcardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(user)
        return models.Flashcard.objects.filter(user=user)


class FlashcardRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.FlashcardSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(self.request)
        user = self.request.user
        return models.Flashcard.objects.filter(user=user)
