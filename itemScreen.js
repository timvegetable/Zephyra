const ITEM_HEADER = document.createElement("div");
ITEM_HEADER.classList.add(
	"top-header",
	"d-flex",
	"justify-content-between",
	"sticky-top",
	"shadowed"
);
ITEM_HEADER.id = "itemHeader";

const ITEM_TITLE = document.createElement("h2");
ITEM_TITLE.id = "itemTitle";
const ITEM_NAME = document.createElement("strong");
const ITEM_BRAND = document.createElement("span");
ITEM_BRAND.id = "itemBrand";
ITEM_TITLE.append(ITEM_NAME, document.createElement("br"), ITEM_BRAND);

const PRICE_AND_CART_BTN = document.createElement("div");
PRICE_AND_CART_BTN.id = "priceAndCartBtn";
const TOP_CART_BTN = document.createElement("button");
TOP_CART_BTN.id = "topCartBtn";
TOP_CART_BTN.classList.add("btn", "btn-primary");
TOP_CART_BTN.style.fontWeight = 500;
TOP_CART_BTN.innerHTML = "Add to Cart";
const PRICE_INFO = document.createElement("div");
PRICE_INFO.id = "priceInfo";
const ITEM_PRICE_TOP = document.createElement("p");
ITEM_PRICE_TOP.id = "itemPriceTop";
let shippingInfo = document.createElement("p");
shippingInfo.id = "shippingInfo";
shippingInfo.innerHTML = "Free Shipping";
PRICE_INFO.append(ITEM_PRICE_TOP, shippingInfo);
PRICE_AND_CART_BTN.append(TOP_CART_BTN, PRICE_INFO);
ITEM_HEADER.append(ITEM_TITLE, PRICE_AND_CART_BTN);

const ITEM_CONTAINER = document.createElement("div");
ITEM_CONTAINER.id = "itemContainer";
ITEM_CONTAINER.classList.add("d-flex", "flex-row");
const ITEM_PICS = document.createElement("div");
ITEM_PICS.id = "itemPics";
ITEM_PICS.classList.add("m-0", "border-0");
const ITEM_CAROUSEL = document.createElement("div");
ITEM_CAROUSEL.id = "itemCarousel";
ITEM_CAROUSEL.classList.add("carousel", "slide");
const CAROUSEL_INDICATORS = document.createElement("div");
CAROUSEL_INDICATORS.classList.add("carousel-indicators");
const CAROUSEL_INNER = document.createElement("div");
CAROUSEL_INNER.classList.add("carousel-inner");
ITEM_CAROUSEL.appendChild(CAROUSEL_INNER);
const CAROUSEL_PREV = document.createElement("button");
CAROUSEL_PREV.classList.add("carousel-control-prev");
CAROUSEL_PREV.type = "button";
CAROUSEL_PREV.setAttribute("data-bs-target", "#itemCarousel");
CAROUSEL_PREV.setAttribute("data-bs-slide", "prev");
const CAROUSEL_NEXT = document.createElement("button");
CAROUSEL_NEXT.classList.add("carousel-control-next");
CAROUSEL_NEXT.type = "button";
CAROUSEL_NEXT.setAttribute("data-bs-target", "#itemCarousel");
CAROUSEL_NEXT.setAttribute("data-bs-slide", "next");
finishCarousel();

const ITEM_INFO = document.createElement("div");
ITEM_INFO.id = "itemInfo";
ITEM_CONTAINER.appendChild(ITEM_INFO);
const ABOUT = document.createElement("h4");
ABOUT.innerHTML = "<strong>About this item:</strong>";
const ITEM_DESC = document.createElement("p");
ITEM_DESC.style.marginBottom = "0";
const ITEM_COLOR_PROMPT = document.createElement("h4");
ITEM_COLOR_PROMPT.innerHTML = "<strong>Choose a color:</strong>";
const ITEM_COLOR_SELECT = document.createElement("select");
ITEM_COLOR_SELECT.classList.add("form-select");
ITEM_COLOR_SELECT.ariaLabel = "Color selector";
ITEM_COLOR_SELECT.oninput = () =>
	new bootstrap.Carousel(ITEM_CAROUSEL).to(
		ITEM_COLOR_SELECT.options.selectedIndex
	);
const ITEM_SIZE_PROMPT = document.createElement("h4");
ITEM_SIZE_PROMPT.innerHTML = "<strong>Choose a size:</strong>";
const ITEM_SIZE_SELECT = document.createElement("select");
ITEM_SIZE_SELECT.classList.add("form-select");
ITEM_SIZE_SELECT.ariaLabel = "Size selector";
const BOTTOM_ROW = document.createElement("row");
BOTTOM_ROW.classList.add("row");
const ITEM_PRICE_BOTTOM = document.createElement("h4");
ITEM_PRICE_BOTTOM.id = "itemPriceBottom";
const ITEM_QUANTITY_SELECT = document.createElement("select");
ITEM_QUANTITY_SELECT.id = "quantitySelector";
ITEM_QUANTITY_SELECT.classList.add("form-select");
ITEM_QUANTITY_SELECT.ariaLabel = "Quantity selector";
const BOTTOM_CART_BTN = document.createElement("button");
BOTTOM_CART_BTN.id = "bottomCartBtn";
BOTTOM_CART_BTN.classList.add("btn", "btn-primary");
BOTTOM_CART_BTN.innerHTML = "Add to Cart";
finishBottomRow();

function finishCarousel() {
	const carouselPrevIcon = document.createElement("span");
	carouselPrevIcon.classList.add("carousel-control-prev-icon");
	carouselPrevIcon.ariaHidden = "true";
	const prevHidden = document.createElement("span");
	prevHidden.classList.add("visually-hidden");
	prevHidden.innerHTML = "Previous";
	CAROUSEL_PREV.append(carouselPrevIcon, prevHidden);

	const carouselNextIcon = document.createElement("span");
	carouselNextIcon.classList.add("carousel-control-next-icon");
	carouselPrevIcon.ariaHidden = "true";
	const nextHidden = document.createElement("span");
	nextHidden.classList.add("visually-hidden");
	nextHidden.innerHTML = "Next";
	CAROUSEL_NEXT.append(carouselNextIcon, nextHidden);

	ITEM_PICS.appendChild(ITEM_CAROUSEL);
	ITEM_CONTAINER.appendChild(ITEM_PICS);
}

function finishBottomRow() {
	const quantityCol = document.createElement("div");
	quantityCol.classList.add("col-2");
	quantityCol.appendChild(ITEM_QUANTITY_SELECT);
	const cartBtnCol = document.createElement("div");
	cartBtnCol.classList.add("col");
	cartBtnCol.appendChild(BOTTOM_CART_BTN);
	BOTTOM_ROW.append(quantityCol, cartBtnCol);
}

function makeLine() {
	const line = document.createElement("div");
	line.classList.add("line");
	return line;
}

/**
 * @param {Item} item
 */
function makeItemScreen(item) {
	ITEM_NAME.innerHTML = item.name;
	if (item.name.includes(item.brand)) {
		ITEM_BRAND.remove();
	} else {
		ITEM_BRAND.innerHTML = " by " + item.brand;
		if (!ITEM_TITLE.contains(ITEM_BRAND)) {
			ITEM_TITLE.appendChild(ITEM_BRAND);
		}
	}
	ITEM_PRICE_TOP.innerHTML = PRICE_FORMAT.format(item.price);

	NAV.classList.remove("shadowed");
	NAV.after(ITEM_HEADER);

	CAROUSEL_INNER.replaceChildren(...makeCarouselImages(item));
	if (item.imageURLs.length !== 1) {
		CAROUSEL_INDICATORS.replaceChildren(
			...makeCarouselIndicators(item.imageURLs.length)
		);
		ITEM_CAROUSEL.prepend(CAROUSEL_INDICATORS);
		ITEM_CAROUSEL.append(CAROUSEL_PREV, CAROUSEL_NEXT);
	} else {
		CAROUSEL_INDICATORS.remove();
		CAROUSEL_PREV.remove();
		CAROUSEL_NEXT.remove();
	}
	const itemInfoChildren = [ABOUT, ITEM_DESC, makeLine()];
	ITEM_DESC.innerText = item.description;
	if (item.colors || item.sizes) {
		if (item.colors) {
			ITEM_COLOR_SELECT.replaceChildren(...makeOptions(item.colors));
			itemInfoChildren.push(ITEM_COLOR_PROMPT, ITEM_COLOR_SELECT);
		}
		if (item.sizes) {
			ITEM_SIZE_SELECT.replaceChildren(...makeOptions(item.sizes));
			itemInfoChildren.push(ITEM_SIZE_PROMPT, ITEM_SIZE_SELECT);
		}
		itemInfoChildren.push(makeLine());
	}
	ITEM_PRICE_BOTTOM.innerHTML =
		"<strong>" + PRICE_FORMAT.format(item.price) + "</strong>";
	ITEM_QUANTITY_SELECT.replaceChildren(...makeOptions(COUNT_OPTIONS));
	itemInfoChildren.push(BOTTOM_ROW);
	TOP_CART_BTN.onclick = () => {
		addToCart(item);
		makeCartScreen();
	};
	BOTTOM_CART_BTN.onclick = () => {
		addToCart(item);
		makeCartScreen();
	};
	ITEM_INFO.replaceChildren(...itemInfoChildren);
	CONTENT.replaceChildren(ITEM_CONTAINER);
}

/**
 *
 * @param {number} count
 * @returns {Array<HTMLButtonElement>}
 */
function makeCarouselIndicators(count) {
	const indicators = new Array(count);
	for (let i = 0; i < count; i++) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.setAttribute("data-bs-target", "#itemCarousel");
		btn.setAttribute("data-bs-slide-to", i.toString());
		btn.ariaLabel = "Slide " + (i + 1);
		indicators[i] = btn;
	}
	indicators[0].classList.add("active");
	indicators[0].setAttribute("aria-current", "true");
	return indicators;
}

/**
 * @param {Item} item
 * @return {Array<HTMLDivElement>}
 */
function makeCarouselImages(item) {
	const carouselItems = new Array(item.imageURLs.length);
	for (let i = 0; i < carouselItems.length; i++) {
		const carouselItem = document.createElement("div");
		carouselItem.classList.add("carousel-item");
		if (item.department === "Clothing") {
			carouselItem.style.paddingTop = "0";
			carouselItem.style.height = "45rem";
		}
		const img = document.createElement("img");
		img.src = item.imageURLs[i];
		img.classList.add("itemPic");
		img.alt = item.colors ? `${item.colors?.[i]} ${item.name}` : item.name;
		carouselItem.appendChild(img);
		carouselItems[i] = carouselItem;
	}
	carouselItems[0].classList.add("active");
	return carouselItems;
}

/**
 * @param {Array<string>} options
 * @return {Array<HTMLOptionElement>}
 */
function makeOptions(options) {
	const optionOutput = options.map(makeOption);
	optionOutput[0].selected = true;
	return optionOutput;
}

function leaveItemScreen() {
	NAV.classList.add("shadowed");
	ITEM_HEADER.remove();
}

/**
 * @param {Item} item
 */
function addToCart(item) {
	let color;
	let size;
	if (item.colors) {
		color = ITEM_COLOR_SELECT.selectedOptions[0].value;
	}
	if (item.sizes) {
		size = ITEM_SIZE_SELECT.selectedOptions[0].value;
	}
	const state = new ItemState(item, color, size);
	CART.set(
		state.label,
		new Order(
			state,
			parseInt(ITEM_QUANTITY_SELECT.selectedOptions[0].value)
		)
	);
}
