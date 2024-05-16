// server : WebSocket
// send(message : object) : void
// receive (message : MessageEvent) → void


const SERVER = new WebSocket("wss://8f55c460-8b76-4096-928f-28c82669610e-00"
  + "-1pe68304dlnn2.kirk.replit.dev/");
const URL_MAKER = window.URL || window.webkitURL;

SERVER.onmessage = handleMessage;

function handleMessage(messageEvent) {
  const msg = JSON.parse(messageEvent.data);
  switch (msg.cmd) {
    case "init":
      logo.src = pngURLFromBase64(msg.logo);
      break;
  }

  if (msg.messageEvent == "validLogin") {
    // alert("Login valid");
    signIn.innerHTML = /*signIn.firstChild.outerHTML +*/"Hi, " + document.getElementById("user").value;
    SIGN_IN_MODAL.hide();
  }
  else if (msg.messageEvent == "validSignup") {
    alert("Welcome to Zephyra, " + user.value + "!");
  }
  else if (msg.messageEvent == "invalidSignup") {
    alert("Sorry, invalid username");
  }
}

// console.log(signIn.firstChild);

function pngURLFromBase64(base64) {
  const charArray = Array.from(window.atob(base64));
  const bytes = new Uint8Array(charArray.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = charArray[i].charCodeAt(0);
  }
  return URL_MAKER.createObjectURL(new File([bytes], { type: "image/png" }));
}

// Eventually this will be replaced by sending the logo and categories from the
// server

logo.src = "assets/logo.png";

[
  "Arts and Crafts",
  "Clothing",
  "Electronics",
  "Furniture",
  "Groceries",
  "Health",
  "Kids",
  "Sports"
].forEach(addCategory);

function addCategory(category) {
  const element = document.createElement("a");
  element.classList.add("nav-link");
  element.href = "#";
  element.innerHTML = category;
  element.onclick = () => makeDeptScreen(category);
  navCategories.appendChild(element);
}

function send(message) {
  console.log("server message sent");
  SERVER.send(JSON.stringify({ serverMSG: message }));
}