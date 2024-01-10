let price = 19.5;
let cash;
let cid = [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];
const coinUnit = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

let total;
const phrase = ["INSUFFICIENT_FUNDS", "CLOSED", "OPEN"];
let currentPhrase;
document.addEventListener("DOMContentLoaded", function () {
  // Your code here

  let $button = document.querySelector("#purchase-btn");

  let $price = document.querySelector("#price");
  $price.innerHTML = `Price: ${price}`;
  let $changeDue = document.querySelector("#change-due");

  let $drawer = document.querySelector("#drawer");
  $changeDue.style.display = "none";

  $button.addEventListener("click", function () {
    cash = parseFloat(document.querySelector("#cash").value);
    console.log("cash", cash);
    getTotal();
    console.log(total);
    if (cash < price) {
      currentPhrase = phrase[1];
      window.alert("Customer does not have enough money to purchase the item");
    } else if (cash == price) {
      $changeDue.innerHTML = "No change due - customer paid with exact cash";
    } else {
      let changeDueValue = getChange(cash);
      console.log(changeDueValue);

      getChangeDiv(changeDueValue);
      drawer();

    }
    
    $changeDue.style.display = "block";
  });

  function getTotal() {
    total = 0;
    for (let i = 0; i < cid.length; i++) {
      total += cid[i][1];
    }
    return total;
  }
  function canProvideChange(amount) {
    let remainingAmount = amount;

    for (let i = coinUnit.length - 1; i >= 0; i--) {
      let coinValue = coinUnit[i][1];
      let availableCoins = Math.floor(cid[i][1] / coinValue);
      let usedCoins = Math.min(
        availableCoins,
        Math.floor(remainingAmount / coinValue)
      );

      remainingAmount -= usedCoins * coinValue;

      console.log(
        `coin: ${coinUnit[i][0]}, availableCoins: ${availableCoins}, usedCoins: ${usedCoins}, remainingAmount: ${remainingAmount}`
      );
    }

    // Check if remainingAmount is close to zero due to precision issues
    return Math.abs(remainingAmount) < 0.01;
  }

  function getChange(cash) {
    let currentChangeDueValue = [];
    let change = cash - price;

    if (!canProvideChange(change)) {
      currentPhrase = phrase[0];
      console.log(currentPhrase);
    } else {
      currentPhrase = phrase[2];
      let actualChange; // Declare actualChange outside the if block
      for (let i = cid.length - 1; i >= 0; i--) {
        let coinName = cid[i][0];
        let coinEntry = coinUnit.find((entry) => entry[0] === coinName);
        let coinValue = coinEntry[1];
        const usedCoins = Math.min(
          Math.floor(change / coinValue),
          Math.floor(cid[i][1] / coinValue)
        );

        if (usedCoins > 0) {
          actualChange = parseFloat((usedCoins * coinValue).toFixed(2));
          change = parseFloat((change - actualChange).toFixed(2));
          cid[i][1] = parseFloat((cid[i][1] - actualChange).toFixed(2));
          currentChangeDueValue.push([coinName, actualChange]);
        }

        console.log(
          `coinName: ${coinName}, usedCoins: ${usedCoins}, actualChange: ${actualChange}, change: ${change}`
        );
      }
    }

    change = parseFloat(change.toFixed(2));
    return currentChangeDueValue.reverse();
  }

  function getChangeDiv(change) {
    console.log(change);
    $changeDue.innerHTML = `Status: ${currentPhrase} `;
    for (let coin of change.reverse()) {
      console.log(coin);

      $changeDue.innerHTML += `${coin[0]}: $${coin[1]} `;
    }
  }

  const drawer = () => {
    $drawer.innerHTML = cid
      .map((coin) => `<p>${coin[0]}: ${coin[1]}</p>`)
      .join("");
  };
  drawer();
});
