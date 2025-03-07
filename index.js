
function updateTime() {
  // Los Angeles
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");
    losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = losAngelesTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
  
  // Paris
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");
    parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
  
  // Tokyo
  let tokyoElement = document.querySelector("#tokyo");
  if (tokyoElement) {
    let tokyoDateElement = tokyoElement.querySelector(".date");
    let tokyoTimeElement = tokyoElement.querySelector(".time");
    let tokyoTime = moment().tz("Asia/Tokyo");
    tokyoDateElement.innerHTML = tokyoTime.format("MMMM Do YYYY");
    tokyoTimeElement.innerHTML = tokyoTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
  
  
  let currentLocationElement = document.querySelector("#current-location");
  if (currentLocationElement) {
    let currentDateElement = currentLocationElement.querySelector(".date");
    let currentTimeElement = currentLocationElement.querySelector(".time");
    let currentTimeZone = moment.tz.guess();
    let currentTime = moment().tz(currentTimeZone);
    currentDateElement.innerHTML = currentTime.format("MMMM Do YYYY");
    currentTimeElement.innerHTML = currentTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}


function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  
  if (cityTimeZone === "") {
    return;
  }
  
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  
  
  let homepageUrl = `https://en.wikipedia.org/wiki/${cityName}`;
  
  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      <a href="${homepageUrl}" class="home-link" target="_blank">Go to ${cityName} homepage</a>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
  </div>
  `;
}


function addCurrentLocation() {
  let currentTimeZone = moment.tz.guess();
  let cityName = currentTimeZone.replace("_", " ").split("/")[1] || "Your Location";
  let currentTime = moment().tz(currentTimeZone);
  
  let currentLocationElement = document.createElement("div");
  currentLocationElement.id = "current-location";
  currentLocationElement.classList.add("city");
  
  currentLocationElement.innerHTML = `
    <div>
      <h2>${cityName} (Your Location)</h2>
      <div class="date">${currentTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${currentTime.format("h:mm:ss")} <small>${currentTime.format("A")}</small></div>
  `;
  
  
  let container = document.querySelector(".container");
  let citySelector = document.querySelector(".city-selector");
  container.insertBefore(currentLocationElement, citySelector.nextSibling);
}


document.addEventListener("DOMContentLoaded", function() {
  
  updateTime();
  
 
  setInterval(updateTime, 1000);
  
  
  addCurrentLocation();
  
  
  let citiesSelectElement = document.querySelector("#city");
  citiesSelectElement.addEventListener("change", updateCity);
});
