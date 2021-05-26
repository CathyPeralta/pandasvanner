(function () {
  let pharams = new URLSearchParams(window.location.search);
  let period = pharams.getAll("period");
  let plats = pharams.get("plats");
  let kurs = pharams.get("kurs");

  let kursspan = document.getElementById("kurs");
  let platsspan = document.getElementById("plats");
  let periodspan = document.getElementById("period");

  if (plats === "arsta") {
    plats = "Årsta";
  }
  if (plats === "bjorkhagen") {
    plats = "Björkhagen";
  }
  if (kurs === "mini") {
    kurs = "Panda Mini";
  }
  if (kurs === "stor") {
    kurs = "Panda Stor";
  }

  kursspan.innerHTML = kurs;
  platsspan.innerHTML = plats;
  periodspan.innerHTML = period;
})();
