

// <div id="thing" class="class1 class2">
//   <p>text</p>
// </div>

// const thing = document.createElement("div");
// thing.id = "thing";
// thing.classList.add("class1", "class2");
// const text = document.createElement("p");
// text.innerHTML = "text";
// thing.appendChild(text);

/*METHOD REQUIREMENTS:
    - send user and password to backend 
    - backend will ensure that the value matches the key and return this information to this method
*/
//checkAccount(user: String, pass: String)

// USERNAME MUST BE ALPHANUMERIC OR UNDERSCORES ONLY
// Use this regex test: /^[a-zA-Z0-9_]*$/.test(stringToBeTested)

// Display error message. change conditional for if user inputs a comma
function validateForm() {
   var fname = document.getElementById("fname").value; 
   if (/^[A-Z]\D{2,30}$/.test(fname) == false)
   {
       document.getElementById("errorName").innerHTML = "Don't use a comma when creating username or password"; 
       return false;
   }
   return fname;
}

const screenContainer = document.createElement("div");
screenContainer.classList.add("container");

const ACCOUNT_TITLE = document.createElement("h1");
ACCOUNT_TITLE.classList.add("title");
ACCOUNT_TITLE.innerHTML = "Create your Zephyra account";
ACCOUNT_TITLE.style.textAlign = "center";

const accountRow = document.createElement("div");
accountRow.classList.add("row", "m-4", "text-center");

const accountH2 = document.createElement("h2");
accountH2.innerHTML = "Create Account";
accountH2.classList.add("text-primary", "display-4", "fw-normal");

accountRow.append(accountH2);

const accountContainer = document.createElement("div");
accountContainer.classList.add("d-flex", "justify-content-center");

const accountForm = document.createElement("form");
accountForm.classList.add("row", "shadow-sm", "rounded-3", "border", "border-primary");
accountForm.style.width = "50rem";
accountForm.style.padding = "0.75rem 1.5rem"
accountForm.id = "accountForm";

accountContainer.append(accountForm);

const nameDiv = document.createElement("div");
nameDiv.classList.add("d-flex", "justify-content-between", "account-row");

const FIRST_NAME_INPUT = document.createElement("input");
FIRST_NAME_INPUT.type = "text";
FIRST_NAME_INPUT.classList.add("line-input");
FIRST_NAME_INPUT.id = "name";
FIRST_NAME_INPUT.placeholder = "Fake first name";
FIRST_NAME_INPUT.style.marginRight = "1rem";

const LAST_NAME_INPUT = document.createElement("input");
LAST_NAME_INPUT.type = "text";
LAST_NAME_INPUT.classList.add("line-input");
LAST_NAME_INPUT.id = "name";
LAST_NAME_INPUT.placeholder = "Fake last name";
LAST_NAME_INPUT.style.marginLeft = "1rem";

nameDiv.append(FIRST_NAME_INPUT, LAST_NAME_INPUT);

const usernameDiv = document.createElement("div");
usernameDiv.classList.add("account-row");

const USERNAME_INPUT = document.createElement("input");
USERNAME_INPUT.type = "text";
USERNAME_INPUT.classList.add("line-input");
USERNAME_INPUT.id = "username";
USERNAME_INPUT.placeholder = "Fake username";

usernameDiv.appendChild(USERNAME_INPUT);

const passwordDiv = document.createElement("div");
passwordDiv.classList.add("account-row");

const PASSWORD_INPUT = document.createElement("input");
PASSWORD_INPUT.type = "text";
PASSWORD_INPUT.classList.add("line-input");
PASSWORD_INPUT.id = "password";
PASSWORD_INPUT.placeholder = "Fake PIN";

passwordDiv.appendChild(PASSWORD_INPUT);

const confirmDiv = document.createElement("div");
confirmDiv.classList.add("account-row");

const CONFIRM_PASSWORD_INPUT = document.createElement("input");
CONFIRM_PASSWORD_INPUT.type = "text";
CONFIRM_PASSWORD_INPUT.classList.add("line-input");
CONFIRM_PASSWORD_INPUT.id = "confirmPassword";
CONFIRM_PASSWORD_INPUT.placeholder = "Confirm fake PIN";

confirmDiv.appendChild(CONFIRM_PASSWORD_INPUT);

const accountFooter = document.createElement("div");
accountFooter.classList.add("text-center", "account-row");

const ACCOUNT_BTN = document.createElement("button");
ACCOUNT_BTN.setAttribute("button","button");
ACCOUNT_BTN.classList.add("btn", "btn-primary");
ACCOUNT_BTN.id = "accountButton";
ACCOUNT_BTN.innerHTML = "Create account";
ACCOUNT_BTN.style.padding = "0.5rem 3rem";
ACCOUNT_BTN.style.fontSize = "1.1rem";

accountFooter.appendChild(ACCOUNT_BTN);

accountForm.append(nameDiv, usernameDiv, passwordDiv, confirmDiv, accountFooter);
accountContainer.append(accountForm);
screenContainer.appendChild(accountContainer);

document.getElementById("createAcc").onclick = () => makeAccountScreen();
function makeAccountScreen() {
  SIGN_IN_MODAL.hide();
  CONTENT.replaceChildren(ACCOUNT_TITLE, screenContainer);
}

//document.getElementById("signIn").onclick = () =>
// ^^ OPEN UP MODAL




//Login button stuff
//when logged in: save username as a variable outside, so when items are saved/orders are saved to the correct username within the csv
//^^ export user on line 4

/* METHOD REQUIREMENTS: 
    - send user and password to backend (how to send both in one message?)
    - backend will send info back and ensure that this account is NOT already in use
    - CHECK TO MAKE SURE THAT USERNAME & PASS DOES NOT INCLUDE COMMAS (this would mess up the csv file)
*/
//newAccount(user: String, pass: String)

ACCOUNT_BTN.onclick = () => {
  const userInput = document.getElementById("username");
  if (confirmPassword.value != password.value) {
    alert("Passwords do not match, please try again");
  } else if (!(/\d{1,10}/.test(password.value))) {
    alert("PIN must");
  } else if (!(/^[a-zA-Z0-9_]*$/.test(userInput.value))) {
    alert("Username must only consist of letters, numbers, and/or underscores");
  } else {
    const msgData = {
      method: "signupAttempt",
      name: document.getElementById("name").value,
      username: userInput.value,
      password: password.value
    }
    console.log(msgData);
    send(msgData);
  }
};

loginBtn.onclick = () => {
  const msgData = {
    method: "loginAttempt",
    username: document.getElementById("user").value,
    password: passwordSignIn.value
  }
  console.log(msgData);
  send(msgData);
  // if login sucessful{
  //   user = user.value
  //   continue to home screen
  // }else{
  //   indicate to user that they must try logging in again
  // }
};