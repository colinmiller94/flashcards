from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ModelSerializer
import base.models as models


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['user_id'] = user.id

        return token


class NoteSerializer(ModelSerializer):
    class Meta:
        model = models.Note
        fields = '__all__'


class FlashcardSerializer(ModelSerializer):
    class Meta:
        model = models.Flashcard
        fields = '__all__'
