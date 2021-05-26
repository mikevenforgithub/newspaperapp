from django.test import TestCase, Client
from django.test import SimpleTestCase
from django.urls import reverse, resolve 
import json
from .models import *
from .views import *
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import RequestFactory
from django.contrib import auth




class TestUrls(SimpleTestCase):

    def test_home_url_is_resolved(self):
        url = reverse('index')
        self.assertEquals(resolve(url).func, index)

    def test_login_url_is_resolved(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func, login_view)
    
    def test_register_url_is_resolved(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, register)

    def test_logout_url_is_resolved(self):
        url = reverse('logout')
        self.assertEquals(resolve(url).func, logout_view)

    def test_articles_url_is_resolved(self):
        url = reverse('articles', args=['anid'])
        self.assertEquals(resolve(url).func, articles)   
    
    def test_authors_url_is_resolved(self):
        url = reverse('authors', args=['anid'])
        self.assertEquals(resolve(url).func, authors)


    
