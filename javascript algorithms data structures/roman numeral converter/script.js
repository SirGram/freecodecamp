let newNumber;

function convert(number) {
  console.log(newNumber);
  console.log(number);

  if (number - 1000 >= 0) {
    number -= 1000;
    newNumber += "M";
    convert(number);
  } else if (number - 900 >= 0) {
    number -= 900;
    newNumber += "CM";
    convert(number);
  } else if (number - 500 >= 0) {
    number -= 500;
    newNumber += "D";

    convert(number);
  } else if (number - 400 >= 0) {
    number -= 400;
    newNumber += "CD";

    convert(number);
  } else if (number - 100 >= 0) {
    number -= 100;
    newNumber += "C";

    convert(number);
  } else if (number - 90 >= 0) {
    number -= 90;
    newNumber += "XC";

    convert(number);
  } else if (number - 50 >= 0) {
    number -= 50;
    newNumber += "L";

    convert(number);
  } else if (number - 40 >= 0) {
    number -= 40;
    newNumber += "XL";

    convert(number);
  } else if (number - 900 >= 0) {
    number -= 900;
    newNumber += "CM";

    convert(number);
  } else if (number - 10 >= 0) {
    number -= 10;
    newNumber += "X";

    convert(number);
  } else if (number - 9 >= 0) {
    number -= 9;
    newNumber += "IX";

    convert(number);
  } else if (number - 5 >= 0) {
    number -= 5;
    newNumber += "V";

    convert(number);
  } else if (number - 4 >= 0) {
    number -= 4;
    newNumber += "IV";

    convert(number);
  } else if (number - 1 >= 0) {
    number -= 1;
    newNumber += "I";

    convert(number);
  }
  return newNumber;
}
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("#convert-btn");

  const numberInput = document.querySelector("#number");
  const output = document.querySelector("#output");
  button.addEventListener("click", function () {
    if (numberInput.value === "") {
      output.innerHTML = "Please enter a valid number";
    } else if (numberInput.value < 1) {
      output.innerHTML = "Please enter a number greater than or equal to 1";
    } else if (numberInput.value > 3999) {
      output.innerHTML = "Please enter a number less than or equal to 3999";
    } else {
      newNumber = "";
      output.innerHTML = convert(numberInput.value);
    }
  });
});
