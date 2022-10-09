// variables
const generalBtn = document.getElementById("general");
const negociosBtn = document.getElementById("negocios");
const deportesBtn = document.getElementById("deportes");
const entretenimientoBtn = document.getElementById("entretenimiento");
const tecnologiaBtn = document.getElementById("tecnologia");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

//array
var newsDataArr = []

//api
const API_KEY = "9f8d47eb58df4d29b916235572052ac4";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=ar&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function(){
    newsType.innerHTML="<h4>Titulares</h4>";
    fetchHeadlines();
};



generalBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Noticias Generales</h4>";
    fetchGeneralNews();
});

negociosBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Negocios</h4>";
    fetchBussinessNews();
});

deportesBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Deportes</h4>";
    fetchSportsNews();
});

tecnologiaBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Tecnologia</h4>";
    fetchTechnologyNews();
});

entretenimientoBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Entretenimiento</h4>";
    fetchEntertainmentNews();
});

searchBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Buscar : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const response = await fetch (HEADLINES_NEWS+API_KEY);
newsDataArr = [];
    if(response.status >=200 && response.status < 300){
const myJson = await response.json();
newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchGeneralNews = async () => {
    const response = await fetch (GENERAL_NEWS+API_KEY);
newsDataArr = [];
    if(response.status >=200 && response.status < 300){
const myJson = await response.json();
newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}


const fetchBussinessNews = async () => {
    const response = await fetch (BUSSINESS_NEWS+API_KEY);
newsDataArr = [];
    if(response.status >=200 && response.status < 300){
const myJson = await response.json();
newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchSportNews = async () => {
    const response = await fetch (SPORTS_NEWS+API_KEY);
newsDataArr = [];
    if(response.status >=200 && response.status < 300){
const myJson = await response.json();
newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch (TECHNOLOGY_NEWS+API_KEY);
newsDataArr = [];
    if(response.status >=200 && response.status < 300){
const myJson = await response.json();
newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const response = await fetch (ENTERTAINMENT_NEWS+API_KEY);
newsDataArr = [];
    if(response.status >=200 && response.status < 300){
const myJson = await response.json();
console.log(myJson);
newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchQueryNews = async () => {

if(newsQuery.value == null)
return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
newsDataArr = [];
    if(response.status >= 200 && response.status <300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle error
        console.log(response.status, response.statusText);
    }

    displayNews();
}

function displayNews() {
    newsdetails.innerHTML = "";

    if(newsDataArr.length == 0){
        newsdetails.innerHTML = "<h5>No se encontraron datos.</h5>"
        return;
    }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("heiht","matchparnt");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Leer mas"

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}