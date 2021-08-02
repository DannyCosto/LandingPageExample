// Allows search params
var urlParams = new URLSearchParams(window.location.search);
let search = urlParams.get("model") ? urlParams.get("model") : " ";

// Adds car models to header
let showCarsDiv = document.createElement("div");
showCarsDiv.id = "show-cars";
let showCarsImage = document.createElement("img");
showCarsImage.src = "./images/full_line.png";
showCarsImage.alt = "full-line";
let headerBackground = document.getElementById("header-background");
showCarsDiv.append(showCarsImage);
headerBackground.append(showCarsDiv);

// GET fetch with conditional rendering
fetch(`https://dv.stk2.pro/dev/test/api.php?model=${search}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.result === "error") {
      // Error page
    } else {
      // console.log(data);
      // Car image
      showCarsImage.className = "loaded-cars";
      showCarsImage.src = data.img;

      // Car year + model
      let showCarsYrModel = document.createElement("p");
      showCarsYrModel.className = "year-model";
      showCarsYrModel.innerText = `${data.year} ${data.model}`;
      headerBackground.append(showCarsYrModel);

      // Offer deals
      document.getElementById("monthly_number").innerText =
        "$" + formateNumber(data.monthly);
      document.getElementById("month_number").innerText = data.duration;
      document.getElementById("down_number").innerText =
        "$" + formateNumber(data.down);

      // Bullet points
      data.bullets.forEach((element) => {
        let listElement = document.createElement("li");
        listElement.innerHTML = "- " + element.text;
        document.getElementById("bullets_list").append(listElement);
      });

      // Prices
      document.getElementById("page_one").classList.add("_show");
      document.getElementById("page_one").classList.remove("_hide");
      document.getElementById("page_two").classList.add("_hide");
      document.getElementById("page_two").classList.remove("_show");
    }
  });

//Alert buttons
let quoteButton = document.getElementById("quote");
quoteButton.onclick = () => {
  alert("REQUEST A QUOTE");
};

let quote_errorButton = document.getElementById("quote_error");
quote_errorButton.onclick = () => {
  alert("REQUEST A QUOTE");
};

let dealerButton = document.getElementById("dealer");
dealerButton.onclick = () => {
  alert("FIND A DEALER");
};

// Formats prices
function formateNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
