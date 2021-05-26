document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#Articles').addEventListener('click', () => load_articles('allarticles'));
  document.querySelector('#Authors').addEventListener('click', () => load_authors('allauthors'));
  document.querySelector('#Compose').addEventListener('click', compose_article);
  document.querySelector('#NewAuthor').addEventListener('click', compose_author);

  // By default, load the inbox
  load_articles('allarticles');
});

function compose_article() {

  // Show compose view and hide other views
  document.querySelector('#authors-view').style.display = 'none';
  document.querySelector('#articles-view').style.display = 'none';
  document.querySelector('#newauthor-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  

  // Clear out composition fields
  document.querySelector('#compose-firstname').value = '';
  document.querySelector('#compose-lastname').value = '';
  document.querySelector('#compose-title').value = '';
  document.querySelector('#compose-body').value = '';
}

function compose_author() {

  // Show compose view and hide other views
  document.querySelector('#authors-view').style.display = 'none';
  document.querySelector('#articles-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#newauthor-view').style.display = 'block';
  

  // Clear out composition fields
  document.querySelector('#compose-firstname').value = '';
  document.querySelector('#compose-lastname').value = '';
}


//  SENDING EMAILS

 
function save_article() {
    
    var authorfirst = document.querySelector('#compose-firstname').value;
    var authorlast = document.querySelector('#compose-lastname').value;
    var title = document.querySelector('#compose-title').value;
    var body = document.querySelector('#compose-body').value;

    //FETCHING TAKEN FROM COURSE SPECIFICS
    fetch('/articles', {
      method: 'POST',
      body: JSON.stringify({
          authorfirst: (authorfirst),
          authorlast: (authorlast),
          title: (title),
          body: (body),
      })
    })
      .then(response => response.json())
      .then(result => {
          // Print result
          console.log(result);
        });
load_articles('allarticles');
}

function save_author() {

  var first_name = document.querySelector('#compose-firstnameauth').value;
  var last_name = document.querySelector('#compose-lastnameauth').value;

  //FETCHING TAKEN FROM COURSE SPECIFICS
  fetch('/authors', {
    method: 'POST',
    body: JSON.stringify({
      first_name: (first_name),
      last_name: (last_name),
    })
  })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
      });
load_authors('allauthors');
}

    
// VIEWING EMAILS

function load_articles(option) {

  // SHOWING ONLY WHAT WE WANT TO SEE
  var articles_view = document.querySelector('#articles-view');
  var authors_view = document.querySelector('#authors-view');
  var compose_view = document.querySelector('#compose-view');
  var newauthor_view = document.querySelector('#newauthor-view');

  articles_view.style.display = "none";
  authors_view.style.display = "none";
  compose_view.style.display = "none";
  newauthor_view.style.display = "none";
  
  articles_view.style.display = "block";
  authors_view.style.display = "none";
  compose_view.style.display = "none";
  newauthor_view.style.display = "none";

  articles_view.innerHTML = '';
  articles_view.innerHTML = "All Articles";

  //GET REQUEST
  fetch(`/articles/${option}`)
    .then(response => response.json())
    .then(articles => {

      if (articles.length == 0) {
        articles_view.innerHTML = '<p style = "font-size: large; font-weight: bold;">No Articles Found</p>';
      }
      else {
        for (article in articles) {

          //SETTING VIEW PARAMETERS
          var articlebox = document.createElement("div");
          var title = document.createElement('h1');
          var authfirst = document.createElement('h3');
          var authlast = document.createElement('h3');
          var sub = document.createElement('p');
          var id = document.createElement('p');
          var edit = document.createElement('button')
          
          id.innerHTML = articles[article]['id'];
          id.style.display = 'none';

          articlebox.setAttribute('id',`#postbodycontainer${articles[article]['id']}`)
          
          edit.innerHTML = "Edit"
          edit.classList.add('button');
          edit.setAttribute('id',`editbutton${articles[article]['id']}`)
          edit.setAttribute('onclick',`edit_article(${articles[article]['id']})`)
          
          title.innerHTML = articles[article]['title'];
          
          var by = document.createElement("h4");
          by.innerHTML = "By:"

          authfirst.innerHTML = articles[article]['authorfirst'];
          authlast.innerHTML = articles[article]['authorlast'];

          sub.innerHTML = articles[article]['body'];
          sub.setAttribute('id', `bodyofarticle${articles[article]['id']}`)
          

          articlebox.style.borderStyle = 'solid';
          articlebox.style.borderColor = 'black';
          articlebox.style.borderWidth = '2px';
          articlebox.style.marginBottom = '10px';
          articlebox.style.padding = '10px';
          articlebox.classList.add('container');
          articlebox.classList.add('article');

          //STYLE
          title.style.display = 'inline-block';
          title.style.margin = '5px';
          authfirst.style.display = 'inline-block';
          authfirst.style.margin = '5px';
          authlast.style.display = 'inline-block';
          authlast.style.margin = '5px';
          sub.style.display = 'inline-block';
          sub.style.margin = '10px';
          

          //INSERTING
          articles_view.appendChild(articlebox);
          articlebox.appendChild(title);
          articlebox.appendChild(by);
          articlebox.appendChild(authfirst);
          articlebox.appendChild(authlast);
          articlebox.appendChild(sub);
          articlebox.appendChild(id);
          articlebox.appendChild(edit);

  
        }
      }
    }
    );
}



function load_authors(option) {

  // SHOWING ONLY WHAT WE WANT TO SEE
  var articles_view = document.querySelector('#articles-view');
  var authors_view = document.querySelector('#authors-view');
  var compose_view = document.querySelector('#compose-view');
  var newauthor_view = document.querySelector('#newauthor-view');
  

  articles_view.style.display = "none";
  authors_view.style.display = "none";
  compose_view.style.display = "none";
  newauthor_view.style.display = "none";
  
  articles_view.style.display = "none";
  authors_view.style.display = "block";
  compose_view.style.display = "none";
  newauthor_view.style.display = "none";

  authors_view.innerHTML = '';
  authors_view.innerHTML = "All Authors";

  //GET REQUEST
  fetch(`/authors/${option}`)
    .then(response => response.json())
    .then(authors => {

      if (authors.length == 0) {
        authors_view.innerHTML = '<p style = "font-size: large; font-weight: bold;">No Authors Found</p>';
      }
      else {
        for (author in authors) {

          //SETTING VIEW PARAMETERS
          var authorbox = document.createElement("div");
          var firstname = document.createElement('h3');
          var lastname = document.createElement('h3');
          var id = document.createElement('p');

          id.innerHTML = authors[author]['id'];
          id.style.display = 'none';

          firstname.innerHTML = authors[author]['firstname'];

          lastname.innerHTML = authors[author]['lastname'];


          authorbox.style.borderStyle = 'solid';
          authorbox.style.borderColor = 'grey';
          authorbox.style.borderWidth = '1px';
          authorbox.style.marginBottom = '10px';
          
          authorbox.classList.add('container');
          authorbox.classList.add('authorbox');

          //STYLE
          firstname.style.display = 'inline-block';
          firstname.style.margin = '5px';
          lastname.style.display = 'inline-block';
          lastname.style.margin = '5px';

          //INSERTING
          authors_view.appendChild(authorbox);
          authorbox.appendChild(firstname);
          authorbox.appendChild(lastname);

        }
      }
    }
    );
}


function search() {

  // SHOWING ONLY WHAT WE WANT TO SEE
  var article_view = document.querySelector('#articles-view');
  var authors_view = document.querySelector('#authors-view');
  var compose_view = document.querySelector('#compose-view');
  var newauthor_view = document.querySelector('#newauthor-view');

  article_view.style.display = "none";
  compose_view.style.display = "none";
  authors_view.style.display = "none";
  newauthor_view.style.display = "none";
  
  article_view.style.display = "block";
  compose_view.style.display = "none";
  authors_view.style.display = "none";
  newauthor_view.style.display = "none";

  article_view.innerHTML = '';
  article_view.innerHTML = `Search Result`;

  var searchbar = document.getElementById("searchb");
  var input = searchbar.value;

  //GET REQUEST
  fetch(`/articles/allarticles`)
    .then(response => response.json())
    .then(articles => {

      if (articles.length == 0) {
        article_view.innerHTML = '<p style = "font-size: large; font-weight: bold;">No Articles Found</p>';
      }
      else {
        for (article in articles) {

          if (articles[article]["body"].includes(input)){

          //SETTING VIEW PARAMETERS
          var articlebox = document.createElement("div");
          var title = document.createElement('h1');
          var authfirst = document.createElement('h3');
          var authlast = document.createElement('h3');
          var sub = document.createElement('p');
          var id = document.createElement('p');

          id.innerHTML = articles[article]['id'];
          id.style.display = 'none';
          
          title.innerHTML = articles[article]['title'];
          
          var by = document.createElement("h4");
          by.innerHTML = "By:"

          authfirst.innerHTML = articles[article]['authorfirst'];
          authlast.innerHTML = articles[article]['authorlast'];

          sub.innerHTML = articles[article]['body'];
          

          articlebox.style.borderStyle = 'solid';
          articlebox.style.borderColor = 'grey';
          articlebox.style.borderWidth = '1px';
          articlebox.style.marginBottom = '10px';
          
          articlebox.classList.add('container');
          articlebox.classList.add('article');

          //STYLE
          title.style.display = 'inline-block';
          title.style.margin = '5px';
          authfirst.style.display = 'inline-block';
          authfirst.style.margin = '5px';
          authlast.style.display = 'inline-block';
          authlast.style.margin = '5px';
          sub.style.display = 'inline-block';
          sub.style.margin = '10px';
          

          //INSERTING
          article_view.appendChild(articlebox);
          articlebox.appendChild(title);
          articlebox.appendChild(by);
          articlebox.appendChild(authfirst);
          articlebox.appendChild(authlast);
          articlebox.appendChild(sub);
          articlebox.appendChild(id);


        }
        }
      }
    }
    );
}




function edit_article(id) {

  document.getElementById(`editbutton${id}`).onclick = null;
  var body = document.querySelector(`#bodyofarticle${id}`);
  body.style.display = "none";
  var articleedit = document.createElement("input");
  articleedit.setAttribute('type', 'text');
  articleedit.setAttribute('value', `${body.innerHTML}`);
  articleedit.setAttribute('id', 'newcomment');
  var container = document.getElementById(`#postbodycontainer${id}`);
  container.appendChild(articleedit);
  var save = document.createElement("button");
  save.innerHTML = ("Save");
  container.appendChild(save);
  
  
  save.addEventListener('click', () => {
    fetch(`/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            body: articleedit.value,
        })
      });
      
      articleedit.style.display = 'none';
      save.style.display = 'none';
      body.style.display = "block";
      document.querySelector(`#bodyofarticle${id}`).innerHTML = articleedit.value;
});


}