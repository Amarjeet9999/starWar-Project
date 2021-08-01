/** @format */

var searchSuggestion = document.getElementById("searchSuggestion");
var timerId;
async function searchCharacter() {
  let query = document.getElementById("serch").value;
  if (query.length <= 2) {
    document.getElementById("searchSuggestion").style.borderTop = "none";
    document.getElementById("container").style.marginTop = "20rem";
    return false;
  }
  let res = await fetch(`https://swapi.dev/api/people/?search=${query}`);
  let data = await res.json();
  if (data.results.length == 0) {
    document.getElementById("noResult").style.display = "block";
  } else if (data.results.length !== 0) {
    document.getElementById("noResult").style.display = "none";
  }
  return data.results;
}

function throttleFunction() {
  if (timerId) {
    return false;
  }

  timerId = setTimeout(() => {
    main();
    timerId = undefined;
  }, 500);
}

function appendSearchSuggetion(d) {
  searchSuggestion.innerHTML = null;
  d.forEach(
    ({
      name: names,
      gender,
      birth_year,
      height,
      eye_color,
      mass,
      hair_color,
    }) => {
      let div = document.createElement("div");
      div.setAttribute("class", "searchedItems");
      let li = document.createElement("li");
      li.innerText = names;
      li.setAttribute("class", "suggestionP");
      li.addEventListener("click", appendDetails);
      //***********Appending in nextPage */
      li.addEventListener("click", () => {
        document.getElementById("nameDetails").innerText = names;
        document.getElementById(
          "birthYearP"
        ).innerText = `Birth Year : ${birth_year}`;
        document.getElementById("genderP").innerText = `Gender : ${gender}`;
        document.getElementById("heightP").innerText = `Height : ${height}`;
        document.getElementById(
          "eyeColor"
        ).innerText = `Eye Color : ${eye_color}`;
        document.getElementById("massP").innerText = `Mass : ${mass}`;
        document.getElementById(
          "hairColorP"
        ).innerText = `Hair Color : ${hair_color}`;
      });
      //***********Appending in nextPage */

      let span = document.createElement("span");
      span.innerText = gender;
      span.style.fontSize = "1.3rem";
      span.style.color = "rgb(175, 174, 174)";
      div.append(li, span);
      let divTwo = document.createElement("div");
      let span_birth = document.createElement("p");
      span_birth.innerText = birth_year;
      span_birth.setAttribute("class", "spanYear");
      divTwo.append(span_birth);
      searchSuggestion.append(div, divTwo);
    }
  );
}

// **********************************
async function main() {
  let character = await searchCharacter();
  if (character.length != 0) {
    let names = document.getElementById("searchSuggestion");
    names.style.display = "block";
    appendSearchSuggetion(character);
    document.getElementById("container").style.marginTop = "10rem";
    document.getElementById("searchSuggestion").style.borderTop =
      "1px solid white";
    console.log(character);
  } else {
    searchSuggestion.style.display = "none";
    names.style.display = "none";
  }
}
// **********************************

// **********************************
// function for showing another container if clicking on any suggestions
function appendDetails() {
  document.getElementById("container").style.display = "none";
  document.getElementById("detailsContainer").style.display = "block";
}
// **********************************

// **********************************
///Function for back button
function backToHome() {
  document.getElementById("container").style.display = "block";
  document.getElementById("searchSuggestion").style.borderTop = "none";
  document.getElementById("detailsContainer").style.display = "none";
  searchSuggestion.innerHTML = null;
  document.getElementById("serch").value = null;
  document.getElementById("container").style.marginTop = "20rem";
}
// **********************************
