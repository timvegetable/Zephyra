let address = null;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const NAV = document.getElementById("nav");
const CONTENT = document.getElementById("content");
const LOGO = document.getElementById("logo");
const NAV_CART_BTN = document.getElementById("navCartBtn");
const CART_BADGE = document.createElement("span");
CART_BADGE.classList.add(
	"position-absolute",
	"top-100",
	"start-100",
	"translate-middle",
	"badge",
	"rounded-pill",
	"bg-primary"
);
CART_BADGE.style.fontWeight = "500";
CART_BADGE.style.padding = "0.28em 0.52em";

const PRICE_FORMAT = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

LOGO.style.cursor = "pointer";

{
	const saleDate = new Date(Date.now() + 7 * 86400000);
	document.getElementById(
		"saleAlert"
	).childNodes[0].textContent = `Special deal week! Shop offers on furniture through ${
		saleDate.getMonth() + 1
	}/${saleDate.getDate()}. `;
}

/**
 *
 * @param {GeolocationPosition} position
 */
async function setAddress(position) {
	const request = new Request(
		`https://secure.geonames.org/findNearestAddressJSON?lat=${position.coords.latitude}&lng=${position.coords.longitude}&username=zephyra`
	);
	const response = await fetch(request);
	address = (await response.json()).address;
	return address;
}

/**
 *
 * @param {string} value
 * @returns {HTMLOptionElement}
 */
function makeOption(value) {
	const option = document.createElement("option");
	option.value = value;
	option.innerHTML = value;
	return option;
}

document.getElementById("saleLink").onclick = () => makeDeptScreen("Furniture");

/**
 * @param {HTMLElement} element
 */
function blur(element) {
	element.style.pointerEvents = "none";
	element.animate(BLUR_ANIMATION.keyframes, BLUR_ANIMATION.options);
}

/**
 * @param {HTMLElement} element
 */
function unblur(element) {
	element.animate(UNBLUR_ANIMATION.keyframes, UNBLUR_ANIMATION.options);
	element.style.pointerEvents = "";
}

function blurBackground() {
	if (document.getElementById("saleAlert")) {
		blur(saleAlert);
	}
	if (document.getElementById("itemHeader")) {
		blur(itemHeader);
	}
	blur(CONTENT);
}

function unblurBackground() {
	if (document.getElementById("saleAlert")) {
		unblur(saleAlert);
	}
	if (document.getElementById("itemHeader")) {
		unblur(itemHeader);
	}
	unblur(CONTENT);
}
