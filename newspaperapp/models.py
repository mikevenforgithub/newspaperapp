from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
     pass

class Author(models.Model):
     first_name = models.CharField(max_length=255)
     last_name = models.CharField(max_length=255)
     
     def __str__(self):
        return f"{self.first_name} {self.last_name}"

     def serialize(self):
        return {
            "id": self.id,
            "firstname": self.first_name,
            "lastname": self.last_name,
        }



class Article(models.Model):
    
    authorfirst = models.CharField(max_length=255, null=True)
    authorlast = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True)


    def serialize(self):
        return {

            "id": self.id,
            "authorfirst" : self.authorfirst,
            "authorlast" : self.authorlast,
            "title": self.title,
            "body": self.body,
            
        }



