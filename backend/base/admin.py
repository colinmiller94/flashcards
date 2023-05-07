from django.contrib import admin

# Register your models here.
import base.models as models
admin.site.register(models.Note)
admin.site.register(models.Flashcard)