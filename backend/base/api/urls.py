from django.urls import path
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes),
    path('flashcards/', views.FlashcardListCreate.as_view(), name='flashcard-list-create'),
    path('flashcards/<int:pk>/', views.FlashcardRetrieveUpdateDestroy.as_view(),
         name='flashcard-retrieve-update-destroy'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
