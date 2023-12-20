const API_KEY = "8e30d0fe83524031b054347c5abfb6a9";
const url = "https://newsapi.org/v2/everything?q=";

const pageSize = 10;
let currentPage = 1;

window.addEventListener("load", () => fetchNews("India", currentPage, pageSize));

function reload() {
    window.location.reload();
}

const bottomToTopButton = document.getElementById("bottom-to-top");

window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        bottomToTopButton.style.display = "block";
    } else {
        bottomToTopButton.style.display = "none";
    }
});


function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}


async function fetchNews(query,pageNumber, pageSize) {
    const res = await fetch(`${url}${query}&page=${pageNumber}&pageSize=${pageSize}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });

    const bookmarkIcon = cardClone.querySelector(".fa-bookmark-o");

    const isBookmarked = localStorage.getItem(article.url);
    if (isBookmarked) {
        bookmarkIcon.classList.remove("fa-bookmark-o");
        bookmarkIcon.classList.add("fa-bookmark");
    }

    bookmarkIcon.addEventListener("click", (event) => {
  
        event.preventDefault();


        const isCurrentlyBookmarked = bookmarkIcon.classList.contains("fa-bookmark");
        if (isCurrentlyBookmarked) {
            bookmarkIcon.classList.remove("fa-bookmark");
            bookmarkIcon.classList.add("fa-bookmark-o");
            localStorage.removeItem(article.url);
        } else {
            bookmarkIcon.classList.remove("fa-bookmark-o");
            bookmarkIcon.classList.add("fa-bookmark");
            localStorage.setItem(article.url, JSON.stringify(article));
        }
    });
    const card = cardClone.querySelector(".card");
    card.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.classList.toggle("show");

    const myBookmarksLink = document.querySelector("#dropdown-content a[href='#']");
    myBookmarksLink.addEventListener("click", () => {
        const bookmarkedArticles = Object.keys(localStorage).map((url) => JSON.parse(localStorage.getItem(url)));
        bindData(bookmarkedArticles);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    });
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const nav = document.querySelector('nav');
    nav.classList.toggle("dark-mode");
}

document.getElementById('nextButton').addEventListener('click', () =>{
    currentPage++;
    fetchNews("India", currentPage, pageSize);
});

document.getElementById('prevButton').addEventListener('click' , () =>{
    if(currentPage > 1){
        currentPage--;
        fetchNews("India", currentPage, pageSize);
    }
});

