// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  console.log("generated pw: " + password);

  passwordText.value = password;

}

function generatePassword() {
//ask user if they would like to specify password length
var specifyLength = window.confirm("would you like to provide the length of the password?");

var passwordLength;
if (specifyLength === true){
 passwordLength = askForPasswordLength();
  }

  var lowercase;
  var uppercase;
  var numeric;
  var specialCharacters;


  while (!(lowercase || uppercase || numeric || specialCharacters)) {
    window.alert ("Please confirm one of the character options that follow");
    var lowercase = window.confirm ("Would you like to include lowercase characters?");
    var uppercase = window.confirm ("Would you like to include uppercase characters?");
    var numeric  = window.confirm ("Would you like to include numeric characters characters?");
    var specialCharacters = window.confirm ("Would you like to include special characters?");
  }

  var password = createRandomPassword(passwordLength, lowercase, uppercase, numeric, specialCharacters);
return password;
}

function createRandomPassword(pwLength = 128, isLowercase, isUppercase, isNumeric, isSpecialCharacters){
  //create arrays for all different types of characters
 var alphabet = "abcdefghijklmnopqrstuvwxyz";

 var lowercase = alphabet.split ("");
 var uppercase = alphabet.toUpperCase().split("");
 var numbers = "0123456789".split("");
 var special = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split("");

 //create an array of all characters the user wants us to choose from
 var allCharacters = [];
 if (isLowercase) {
   allCharacters.push.apply(allCharacters, lowercase);
 }
 if (isUppercase){
   allCharacters.push.apply(allCharacters, uppercase);
 }
 if (isNumeric) {
   allCharacters.push.apply(allCharacters, special);
 }
 console.log("all char array: " + allCharacters);


 // loop to create password
 var password = "";
for (var i = 0; i < pwLength; i++){

  var character;

  //add at least one character of type specified by user
  //once there is at least one of each type, add random character from full set of characters

  if (isLowercase) {
    character = getRandomCharacterFromArray(lowercase);
    isLowercase = false;
  }else if (isUppercase) {
    character = getRandomCharacterFromArray(uppercase);
    isUppercase = false;
  }else if (isNumeric) {
    character = getRandomCharacterFromArray(numbers);
    isNumeric=false;
  }else if (isSpecialCharacters) {
    character = getRandomCharacterFromArray(special);
    isSpecialCharacters = false;
  }else {
    character = getRandomCharacterFromArray(allCharacters);
  }
  password += character;
}
return password;

}
// give us a random character from an array of characters
function getRandomCharacterFromArray(charArray) {
  // ["0", "1", "2", "3", ... ]
  var lengthOfArray = charArray.length;
  // 10
  var randomDecimal = Math.random();
  // .34323452 decimal between 0 and 1, but we can't do array[.3432]
  var randomIndex = Math.floor(lengthOfArray * randomDecimal);
  // 10 * .34323452 = 3.4323452 we can't do array[3.4323452] floor makes this array[3]
  // randomIndex becomes 3
  var randomChar = charArray[randomIndex];
  return randomChar;
}


// helper function to ask for and validate password length
function askForPasswordLength() {
  var pwLength = window.prompt("How long would you like your password to be? (Must be between 8-128 characters)");

 
  //while password length isnt a number or passworth length isnt between 8 and 128,keep prompting user
  while (isNaN(pwLength) || (parseInt (pwLength) <  8 || parseInt(pwLength) > 128)) {
    passwordLength = window.prompt("Please specify a number that is between 8 and 128 characters");
    }
    return parseInt(pwLength);
  

}

// Add event listener to generate button
//when this event happens, call this function
generateBtn.addEventListener("click", writePassword);