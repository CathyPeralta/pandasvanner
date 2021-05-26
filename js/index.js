(function () {
  let arstastor = document.querySelector("#arstastor");
  let bjorkhagenstor = document.querySelector("#bjorkhagenstor");
  let arstamini = document.querySelector("#arstamini");
  let bjorkhagenmini = document.querySelector("#bjorkhagenmini");
  let storform = document.querySelector(".pandastor form");
  let miniform = document.querySelector(".pandamini form");

  miniform.addEventListener("change", function (event) {
    if (arstamini.checked) {
      let span = arstamini.nextElementSibling.querySelector("span");
      span.innerHTML = "13:00-14:30";
    } else {
      let span = arstamini.nextElementSibling.querySelector("span");
      span.innerHTML = "";
    }
    if (bjorkhagenmini.checked) {
      let span = bjorkhagenmini.nextElementSibling.querySelector("span");
      span.innerHTML = "10:00-11:30";
    } else {
      let span = bjorkhagenmini.nextElementSibling.querySelector("span");
      span.innerHTML = "";
    }
  });

  storform.addEventListener("change", function (event) {
    if (arstastor.checked) {
      let span = arstastor.nextElementSibling.querySelector("span");
      span.innerHTML = "14:00-16:00";
    } else {
      let span = arstastor.nextElementSibling.querySelector("span");
      span.innerHTML = "";
    }
    if (bjorkhagenstor.checked) {
      let span = bjorkhagenstor.nextElementSibling.querySelector("span");
      span.innerHTML = "10:00-12:00";
    } else {
      let span = bjorkhagenstor.nextElementSibling.querySelector("span");
      span.innerHTML = "";
    }

    // Validate periods
    let periods = storform.querySelectorAll("input[type=checkbox]");
    let firstPeriod = periods[0];
    let checked = 0;

    for (let i = 0; i < periods.length; i++) {
      if (periods[i].checked) {
        checked++;
      }
    }
    if (checked === 0) {
      firstPeriod.setCustomValidity("Välj minst ett av dessa alternativ");
    } else {
      firstPeriod.setCustomValidity("");
    }
  });
})();
