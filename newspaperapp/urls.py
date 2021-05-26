from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("articles", views.compose, name="compose"),
    path("authors", views.newauthor, name="newauthor"),
    path("article/<int:article_id>", views.article, name="article"),
    path("articles/<str:option>", views.articles, name="articles"),
    path("authors/<str:option>", views.authors, name="authors"),
    path("edit/<int:article_id>", views.edit, name="edit"), 

]
