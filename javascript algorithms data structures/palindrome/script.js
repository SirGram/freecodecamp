function checkPalindrome(text) {
  let textNoPunctuation, textNoSpaces, textReversed;
  textNoPunctuation = text.replace(/[^\w\s]/g, "").toLowerCase();
  textNoSpaces = textNoPunctuation.replace(/[ _]/g, "")
  console.log(textNoSpaces);
  textReversed = textNoSpaces.split("").reverse().join("");
  console.log(textReversed);
  return textNoSpaces === textReversed;
}

document.addEventListener("DOMContentLoaded", function () {
  const textInput = document.querySelector("#text-input");
  const checkButton = document.querySelector("#check-btn");
  const result = document.querySelector("#result");

  checkButton.addEventListener("click", function () {
    console.log("click");
    if (textInput.value === "") {
      alert("Please input a value");
    } else {
      if (checkPalindrome(textInput.value)) {
        result.innerHTML = `${textInput.value} is a palindrome`;
        result.style.boxShadow = 
        "0px 0 10px green";
       
      } else {
        result.innerHTML = `${textInput.value} is not a palindrome`;
      }
      result.style.display = "flex";
      result.style.boxShadow = 
        "0px 0 10px red";
    }
  });
});
