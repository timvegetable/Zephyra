// Get elements
// const modal = document.getElementById("signInModal");
// const btn = document.getElementById("signIn");
// const span = document.getElementsByClassName("close")[0];


document.getElementById("saleBtn1").onclick = () => makeDeptScreen("Furniture");
document.getElementById("saleBtn2").onclick = () => makeDeptScreen("Clothing");
document.getElementById("saleBtn3").onclick = () => makeDeptScreen("Kids");

const firstAds = document.getElementById("adsFirstRow");
const secondAds = document.getElementById("adsSecondRow");

const SIGN_IN_ELEMENT = document.getElementById("signInModal");
const SIGN_IN_MODAL = bootstrap.Modal.getOrCreateInstance(
  SIGN_IN_ELEMENT,
  {
    focus: true,
    static: false
  }
);

LOGO.onclick = () => goHome();
function goHome() {
  leaveItemScreen();
  CONTENT.replaceChildren(firstAds, secondAds);
}

//When the user clicks the button, open the modal 
const SIGN_IN_BTN = document.getElementById("signIn");
SIGN_IN_BTN.onclick = () => {
  SIGN_IN_MODAL.show();
  blurBackground();
  blur(NAV);
};

SIGN_IN_ELEMENT.addEventListener("hide.bs.modal", () => {
  unblurBackground()
  unblur(NAV);
});
