import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt


from .models import Article, Author, User

def index(request):
    
    # Authenticated users view their inbox
    if request.user.is_authenticated:
        return render(request, "newspaperapp/inbox.html",{
            
        })

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


@csrf_exempt
@login_required
def compose(request):
    
    # Composing a new email must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    data = json.loads(request.body)

    # Get contents of tweet
    authorfirst = data.get("authorfirst", "")
    authorlast = data.get("authorlast", "")
    title = data.get("title", "")
    body = data.get("body", "")
    
    allauth = Author.objects.all()
    afn = []
    aln = []

    for i in allauth:
        afn.append(i.first_name)
        aln.append(i.last_name)
    
    if authorfirst in afn:
        if authorlast in aln:

            article = Article(
            authorfirst=authorfirst,
            authorlast=authorlast,
            title=title,
            body=body,
            )

            article.save()
            return JsonResponse({"message": "Article saved successfully."}, status=201)
    else: 
         message = "Can't Create the Article! No Author with this Name"
         return render(request, "newspaperapp/inbox.html",{
            "message": message
        })

 
@csrf_exempt
@login_required
def newauthor(request):
    
    # Composing a new email must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    data = json.loads(request.body)

    # Get contents of tweet
    first_name = data.get("first_name", "")
    last_name = data.get("last_name", "")

    author = Author(
    first_name=first_name,
    last_name=last_name,
    )
    author.save()
    return JsonResponse({"message": "Author saved successfully."}, status=201)



@login_required
def articles(request, option):

    # Get Emails
    if option == "allarticles":
        articles = Article.objects.all()

    else:
        return JsonResponse({"error": "Invalid option."}, status=400)

    # Return articles
    articles = reversed(articles)
    return JsonResponse([article.serialize() for article in articles], safe=False)

@login_required
def authors(request, option):

    # Get Authors
    if option == "allauthors":
        authors = Author.objects.all()

    else:
        return JsonResponse({"error": "Invalid option."}, status=400)

    # Return authors
    return JsonResponse([author.serialize() for author in authors], safe=False)

@csrf_exempt
@login_required
def article(request, article_id):

    # Query for requested email
    try:
        article = Article.objects.get(pk=article_id)
    except Article.DoesNotExist:
        return JsonResponse({"error": "Article not found."}, status=404)

    # Return email contents
    if request.method == "GET":
        return JsonResponse(article.serialize())


    # Email must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)




def login_view(request):

    if request.method == "POST":

        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "newspaperapp/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "newspaperapp/login.html",{
            
        })


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    
    if request.method == "POST":
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "newspaperapp/register.html", {
                "message": "Passwords must match.",
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "newspaperapp/register.html", {
                "message": "Email address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "newspaperapp/register.html",{
            
        })


@csrf_exempt
def edit(request, article_id):

    article = Article.objects.get(id=article_id)

    if request.method == "PUT":
        data = json.loads(request.body)
        if data.get("body") is not None:
            article.body = data["body"]
        article.save()
        return HttpResponse(status=204)