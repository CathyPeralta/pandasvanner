(function () {
  const PRICE_MINI = 1599;
  const PRICE_STOR = 920;
  const PRICE_STOR_EXTRA = 782;

  const MINI_AGES = [2, 3, 4, 5];
  const STOR_AGES = [6, 7, 8];

  let paymentSuccess = false;
  let imgcell = document.getElementById("img");
  let kurscell = document.getElementById("valdkurs");
  let platscell = document.getElementById("plats");
  let periodcell = document.getElementById("period");
  let priscell = document.getElementById("pris");

  let alder = document.getElementById("alder");

  let pharams = new URLSearchParams(window.location.search);
  let period = pharams.getAll("period");
  let plats = pharams.get("plats");
  let kurs = pharams.get("kurs");
  let tid = "";
  let pris = 0;

  if (!period || period.length === 0 || !plats || !kurs) {
    window.location.href = "/";
  }

  if (plats === "arsta") {
    plats = "Årsta";
    if (kurs === "mini") {
      tid = "13.00-14.30";
    }
    if (kurs === "stor") {
      tid = "14.00-16.00";
    }
  }
  if (plats === "bjorkhagen") {
    plats = "Björkhagen";
    if (kurs === "mini") {
      tid = "10.00-11.30";
    }
    if (kurs === "stor") {
      tid = "10.00-12.00";
    }
  }
  if (kurs === "mini") {
    kurs = "Panda Mini";
    pris = PRICE_MINI;
    imgcell.src = "./images/panda-mini.png";

    let options = alder.querySelectorAll("option");
    for (let i = 0; i < options.length; i++) {
      if (!MINI_AGES.includes(parseInt(options[i].value))) {
        options[i].remove();
      }
    }
  }
  if (kurs === "stor") {
    kurs = "Panda Stor";

    pris = PRICE_STOR;
    imgcell.src = "./images/panda-stor.png";
    if (period.length > 1) {
      pris = pris + PRICE_STOR_EXTRA * (period.length - 1);
    }
    let options = alder.querySelectorAll("option");
    for (let i = 0; i < options.length; i++) {
      if (options[i].value && !STOR_AGES.includes(parseInt(options[i].value))) {
        options[i].remove();
      }
    }
  }
  plats = plats + " " + tid + "";

  kurscell.innerHTML = kurs;
  platscell.innerHTML = plats;
  periodcell.innerHTML = period.join(", ");
  priscell.innerHTML = pris + " SEK";

  let platsinput = document.getElementById("platshidden");
  let periodinput = document.getElementById("periodhidden");
  let kursinput = document.getElementById("kurshidden");

  platsinput.value = plats;
  periodinput.value = period;
  kursinput.value = kurs;

  //------ Paypal

  function initPayPalButton() {
    paypal
      .Buttons({
        style: {
          shape: "pill",
          color: "gold",
          layout: "vertical",
          label: "pay",
        },
        onInit: function (data, actions) {
          actions.disable();

          let form = document.querySelector(".checkoutform");
          let formButton = form.querySelector("button[type=submit]");
          let paypalOverlay = document.querySelector(
            ".complete-before-payment"
          );

          form.addEventListener("change", function (event) {
            if (!form.reportValidity()) {
              actions.disable();
              paypalOverlay.classList.remove("hidden");
              formButton.disabled = false;
            }
          });

          form.addEventListener("submit", function (event) {
            if (!paymentSuccess) {
              event.preventDefault();
              if (form.reportValidity()) {
                paypalOverlay.scrollIntoView();
                actions.enable();
                paypalOverlay.classList.add("hidden");
                formButton.disabled = true;
              }
            }
          });
        },

        createOrder: function (data, actions) {
          let amount = pris;
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "SEK",
                  value: amount,
                  breakdown: {
                    item_total: { currency_code: "SEK", value: amount },
                    shipping: { currency_code: "SEK", value: 0 },
                    tax_total: { currency_code: "SEK", value: 0 },
                  },
                },
              },
            ],
          });
        },

        onApprove: function (data, actions) {
          const loader = document.querySelector(".loader");
          loader.classList.remove("hidden");
          return actions.order
            .capture()
            .then(function (details) {
              // Send confirmation mail to info pandasvanner, then redirect to order confirmation
              paymentSuccess = true;
              let form = document.querySelector(".checkoutform");
              let formData = new FormData(form);

              fetch(form.action, {
                method: form.method,
                body: formData,
              }).then((res) => {
                fetch("https://mailthis.to/confirm").then(
                  () =>
                    (window.location.href =
                      "/orderbekraftelse.html?kurs=" +
                      kurs +
                      "&period=" +
                      period +
                      "&plats=" +
                      plats)
                );
              });
            })
            .catch(function (error) {
              console.log(error);
              alert(
                "Transaktionen misslyckades. Prova igen eller kontakta support på info@pandasvanner.se"
              );
              loader.classList.add("hidden");
            });
        },

        onError: function (err) {
          loader.classList.add("hidden");
          alert(
            "Transaktionen misslyckades. Prova igen eller kontakta support på info@pandasvanner.se"
          );
          console.log(err);
        },
      })
      .render("#paypal-button-container");
  }
  initPayPalButton();
})();
