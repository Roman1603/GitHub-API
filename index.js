"use strict";

//Fetches data from API, converts and passes data to be displayed in DOM
const getApi = "https://api.github.com/users";

const STORE = {
  username: "",
  repos: []
};

function handleSearch() {
  $("#js-form").on("submit", function(event) {
    event.preventDefault();
    STORE.username = $("#user").val();

    fetch(`${getApi}/${STORE.username}/repos`)
      .then(res => res.json())
      .then(data => {
        data.map(repo => {
          STORE.repos.push({ name: repo.name, url: repo.html_url });
        });
        render();
      })
      .catch(err => console.log(err.message));
  });
}

function render() {
  const searchResults = STORE.repos.map(
    repo =>
      `<li id ="results-list"><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
  );

  $(".search-results").html(searchResults);
}

$(handleSearch);
