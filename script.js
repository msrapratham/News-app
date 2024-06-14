var main_container = document.getElementsByClassName("main")[0];
var category = "";

async function getData(url) {
  try {
    // Clear previous cards
    main_container.innerHTML = "";

    // Api Call
    const response = await fetch(url);
    const data = await response.json();
    const articles = data.articles;
    console.log("News Data :", articles);

    // If result is not found
    if (articles.length === 0) {
      main_container.innerHTML = "<p>No news articles found</p>";
    } else {
      // Rendering Cards
      articles.forEach(function (elem) {
        if (elem.urlToImage !== null) {
          var card_div = document.createElement("div");
          card_div.classList.add("news-card");
          card_div.innerHTML = `<div class="card-img" >
      <img class ="imgon" src="${elem.urlToImage}" alt="Source Down">
      </div>
      <div class ="news-info">
      <p class="font-min author">${elem.author}</p>
      <p class="font-min source">${elem.source.name}</p>
      <p class ="headline">${elem.title}</p>
  </div>`;

          main_container.appendChild(card_div);

          // Adding Onclick listeners on cards
          card_div.addEventListener("click", () => {
            window.open(elem.url, "_blank");
          });
        }
      });
    }
  } catch {
    console.error(error);
  }
}

// Onclick Function
function navclicked(event) {
  category = event.target.id.toLowerCase();
  console.log(" Option clicked(Nav Bar):", category);

  getData(
    `https://newsapi.org/v2/everything?q=${category}&apiKey=bb4b06d4b7f3467c918a008a6a4c5dbf`
  );
}

// Calling news for Home Page
getData(
  "https://newsapi.org/v2/everything?q=business&apiKey=bb4b06d4b7f3467c918a008a6a4c5dbf"
);

// Navtabs
const business = document.getElementById("Business");
const sports = document.getElementById("Sports");
const entertainment = document.getElementById("Entertainment");
const technology = document.getElementById("technology");

business.addEventListener("click", navclicked);
sports.addEventListener("click", navclicked);
entertainment.addEventListener("click", navclicked);
technology.addEventListener("click", navclicked);

// Search

const searchBar = document.getElementById("search-bar");
const btn = document.getElementById("btn");

function btnPressed() {
  category = searchBar.value.toLowerCase();
  console.log("News searched :", category);
  getData(
    `https://newsapi.org/v2/everything?q=${category}&apiKey=bb4b06d4b7f3467c918a008a6a4c5dbf`
  );
}

// Listen for Enter key press on search bar
searchBar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    btnPressed();
  }
});

btn.addEventListener("click", btnPressed);

// nav icon
const icon = document.getElementById("nav-logo");
icon.addEventListener("click", () => {
  console.log("Nav icon clicked");
  searchBar.value = "";
  getData(
    "https://newsapi.org/v2/everything?q=business&apiKey=bb4b06d4b7f3467c918a008a6a4c5dbf"
  );
});
