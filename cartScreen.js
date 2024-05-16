// remove(item : Item) : Item - returns the removed item
// checkout() : Array<Item> - returns the list of Items in the cart
// saveForLater(item : Item) : boolean - returns whether the size of the “savedForLater” and “cart” maps both changed
// returnToCart(item : Item) : boolean - returns whether the size of the “savedForLater” and “cart” maps both changed
// calculateTotal() : number - returns the price of all items totaled

const DELIVERY_DATE_STR = getDeliveryDate(3);

const CART_SCREEN_CONTAINER = document.createElement("div");
CART_SCREEN_CONTAINER.classList.add("d-flex", "flex-row");
const CART_LEFT = document.createElement("div");
CART_LEFT.style.width = "100%";
const CART_RIGHT = document.createElement("div");
CART_RIGHT.style.marginLeft = "3rem";
CART_RIGHT.style.width = "40rem";
CART_SCREEN_CONTAINER.append(CART_LEFT, CART_RIGHT);

const CART_LABEL = document.createElement("h2");
CART_LABEL.style.fontWeight = "normal";
const CART_LIST = document.createElement("ul");
CART_LIST.classList.add("list-group");
CART_LIST.style.marginBottom = "1rem";

const SAVED_LABEL = document.createElement("h2");
SAVED_LABEL.style.fontWeight = "bold";
SAVED_LABEL.innerHTML = "Saved for later";
const SAVED_LIST = document.createElement("ul");
SAVED_LIST.classList.add("list-group");

const ORDER_SUMMARY_LABEL = document.createElement("h4");
ORDER_SUMMARY_LABEL.classList.add("text-primary");
ORDER_SUMMARY_LABEL.innerHTML = "<strong>Order Summary</strong>";

const SUBTOTAL_LABEL = document.createElement("p");
SUBTOTAL_LABEL.innerHTML = "Subtotal";
const SUBTOTAL = document.createElement("p");
SUBTOTAL.innerHTML = "$84.98";
const SUBTOTAL_ROW = document.createElement("div");
SUBTOTAL_ROW.classList.add("d-flex", "justify-content-between");
SUBTOTAL_ROW.append(SUBTOTAL_LABEL, SUBTOTAL);

const SHIPPING_COST_LABEL = document.createElement("p");
SHIPPING_COST_LABEL.innerHTML = "Shipping";
const SHIPPING_COST = document.createElement("p");
SHIPPING_COST.innerHTML = "$0.00";
const SHIPPING_COST_ROW = document.createElement("div");
SHIPPING_COST_ROW.classList.add("d-flex", "justify-content-between");
SHIPPING_COST_ROW.append(SHIPPING_COST_LABEL, SHIPPING_COST);

const TAX_LABEL = document.createElement("p");
const TAX = document.createElement("p");
TAX.innerHTML = "$5.10";
const TAX_ROW = document.createElement("div");
TAX_ROW.classList.add("d-flex", "justify-content-between");
TAX_ROW.append(TAX_LABEL, TAX);

const TOTAL_LABEL = document.createElement("p");
TOTAL_LABEL.style.fontWeight = "bold";
const TOTAL = document.createElement("p");
TOTAL.style.fontWeight = "bold";
TOTAL.innerHTML = "$90.08";
const TOTAL_ROW = document.createElement("div");
TOTAL_ROW.classList.add("d-flex", "justify-content-between");
TOTAL_ROW.style.marginBottom = "1rem";
TOTAL_ROW.append(TOTAL_LABEL, TOTAL);

const CHECKOUT_BTN_CONTAINER = document.createElement("div");
CHECKOUT_BTN_CONTAINER.style.width = "100%";
const CHECKOUT_BTN = document.createElement("button");
CHECKOUT_BTN.classList.add("btn", "btn-primary");
CHECKOUT_BTN.style.width = "100%";
CHECKOUT_BTN.innerHTML = "Check Out";
CHECKOUT_BTN.style.fontSize = "1.25rem";
CHECKOUT_BTN_CONTAINER.appendChild(CHECKOUT_BTN);

const CONTINUE_SHOPPING_BTN_CONTAINER = document.createElement("div");
const CONTINUE_SHOPPING_BTN = document.createElement("button");
CONTINUE_SHOPPING_BTN.classList.add("btn");
CONTINUE_SHOPPING_BTN.id = "continueShoppingNormal";
CONTINUE_SHOPPING_BTN.style.fontWeight = "450";
CONTINUE_SHOPPING_BTN.style.marginTop = "1rem";
CONTINUE_SHOPPING_BTN.innerHTML = "Continue shopping";
CONTINUE_SHOPPING_BTN.onclick = () => goHome();
CONTINUE_SHOPPING_BTN_CONTAINER.appendChild(CONTINUE_SHOPPING_BTN);

CART_LEFT.append(CART_LABEL, CART_LIST, SAVED_LABEL, SAVED_LIST);

const DELIVERY_ICON = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"svg"
);
DELIVERY_ICON.classList.add("bi", "bi-truck");
DELIVERY_ICON.setAttribute("width", "16");
DELIVERY_ICON.setAttribute("height", "16");
DELIVERY_ICON.setAttribute("fill", "currentColor");
DELIVERY_ICON.setAttribute("viewBox", "0 0 16 16");
DELIVERY_ICON.style.marginRight = "0.5rem";
{
	const deliveryIconPath = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	deliveryIconPath.setAttribute(
		"d",
		"M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
	);
	DELIVERY_ICON.appendChild(deliveryIconPath);
}

NAV_CART_BTN.onclick = () => makeCartScreen();
function makeCartScreen() {
	leaveItemScreen();
	TAX_LABEL.innerHTML = "Estimated Tax";
	TOTAL_LABEL.innerHTML = "Estimated total";
	CART_RIGHT.replaceChildren(
		ORDER_SUMMARY_LABEL,
		SUBTOTAL_ROW,
		SHIPPING_COST_ROW,
		TAX_ROW,
		TOTAL_ROW,
		CHECKOUT_BTN_CONTAINER,
		CONTINUE_SHOPPING_BTN_CONTAINER
	);

	makeCartList();
	makeSavedList();

	CONTENT.replaceChildren(CART_SCREEN_CONTAINER);
}

function getDeliveryDate(daysFromNow) {
	const date = new Date(Date.now() + daysFromNow * 86400000);
	return `${DAYS[date.getDay()]}, ${
		MONTHS[date.getMonth()]
	} ${date.getDate()}`;
}

function makeDeliveryInfo() {
	const deliveryContainer = document.createElement("div");
	deliveryContainer.classList.add("rounded-3", "delivery-info");
	if (address) {
		const delivery = document.createElement("p");
		delivery.style.marginBottom = 0;
		delivery.innerHTML = `FREE delivery by ${DELIVERY_DATE_STR} to ${
			address.postalcode}`;
		deliveryContainer.append(DELIVERY_ICON.cloneNode(true), delivery);
	} else {
		const requestDeliveryInfoBtn = document.createElement("button");
		requestDeliveryInfoBtn.type = "button";
		requestDeliveryInfoBtn.classList.add("btn", "btn-link", "delivery-info-req-btn");
		requestDeliveryInfoBtn.innerHTML = "Get delivery date using location information";
		requestDeliveryInfoBtn.onclick = () => {
			document.querySelectorAll("button.delivery-info-req-btn").forEach(turnIntoLoading);
			navigator.geolocation.getCurrentPosition(
				(location) => {
					setAddress(location).then(fillDeliveryInfo)
				},
				(error) => {
					address = false;
					const delivery = document.createElement("p");
					delivery.style.marginBottom = 0;
					delivery.innerHTML = `FREE delivery by ${getDeliveryDate(6)} at the latest`;
					document.querySelectorAll("button.delivery-info-req-btn").forEach((btn) => btn.replaceWith(delivery.cloneNode(true)));
				}
			);
		}
		deliveryContainer.append(DELIVERY_ICON.cloneNode(true), requestDeliveryInfoBtn);
	}
	return deliveryContainer;
}

function fillDeliveryInfo(address) {
	const delivery = document.createElement("p");
	delivery.style.marginBottom = 0;
	delivery.innerHTML = `FREE delivery by ${DELIVERY_DATE_STR} to ${
		address.postalcode}`;
	document.querySelectorAll("div.delivery-info").forEach((info) => info.replaceChildren(DELIVERY_ICON.cloneNode(true), delivery.cloneNode(true)));
}

/**
 * @param {HTMLButtonElement} requestDeliveryInfoBtn
 */
function turnIntoLoading(requestDeliveryInfoBtn) {
	requestDeliveryInfoBtn.disabled = true;
	requestDeliveryInfoBtn.style.textDecoration = "none";
	requestDeliveryInfoBtn.style.color = "#2d2d2d";
	requestDeliveryInfoBtn.innerHTML = "Loading...";
}

/**
 * @param {Order} order
 * @return {HTMLLIElement}
 */
function makeOrderRepresentation(order) {
	const listItem = document.createElement("li");
	listItem.classList.add("list-group-item");
	listItem.style.padding = "2rem";
	const container = document.createElement("div");
	container.classList.add("d-flex", "flex-row");

	const imgContainer = makeCartImage(order.itemState);

	const orderInfo = document.createElement("div");
	orderInfo.style.marginLeft = "3rem";
	orderInfo.style.width = "100%";
	const orderLabel = document.createElement("h5");
	orderLabel.style.marginBottom = "0";
	orderLabel.innerHTML = "<strong>" + order.itemState.label + "</strong>";

	const qtyAndPriceRow = document.createElement("div");
	qtyAndPriceRow.classList.add("d-flex", "justify-content-between");
	const qtyContainer = document.createElement("div");
	qtyContainer.classList.add("d-flex");
	const qtyLabel = document.createElement("p");
	qtyLabel.innerHTML = "Qty: ";
	qtyLabel.style.marginBottom = "0";
	const qtyInput = document.createElement("select");
	qtyInput.classList.add("form-select", "cart-qty-select");
	qtyInput.ariaLabel = "Quantity selector";
	qtyInput.append(...makeOptions(COUNT_OPTIONS));
	qtyInput.selectedIndex = order.count - 1;
	qtyInput.oninput = () => {
		order.count = qtyInput.selectedIndex + 1;
		calculateCosts();
	};

	qtyContainer.append(qtyLabel, qtyInput);
	const price = document.createElement("p");
	price.style.fontWeight = "500";
	price.style.marginBottom = "0";
	price.innerHTML = PRICE_FORMAT.format(order.itemState.item.price);
	qtyAndPriceRow.append(qtyContainer, price);

	const saveAndRemoveRow = document.createElement("div");
	saveAndRemoveRow.classList.add("d-flex", "justify-content-between");
	saveAndRemoveRow.style.margin = "0.5rem 0rem";
	const saveBtn = document.createElement("button");
	saveBtn.classList.add("btn", "btn-link");
	saveBtn.style.paddingLeft = 0;
	saveBtn.style.fontWeight = "500";
	saveBtn.innerHTML = "Save for later";
	saveBtn.onclick = () => {
		SAVED.set(order.itemState.label, order.itemState);
		CART.delete(order.itemState.label);
		makeCartList();
		makeSavedList();
	};
	const removeBtn = document.createElement("button");
	removeBtn.classList.add("btn", "btn-link", "remove-btn");
	removeBtn.innerHTML = "Remove";
	removeBtn.onclick = () => {
		CART.delete(order.itemState.label);
		makeCartList();
	};
	saveAndRemoveRow.append(saveBtn, removeBtn);

	orderInfo.append(
		orderLabel,
		qtyAndPriceRow,
		saveAndRemoveRow,
		makeDeliveryInfo()
	);

	container.append(imgContainer, orderInfo);
	listItem.appendChild(container);
	return listItem;
}

function makeCartList() {
	CART_LABEL.innerHTML = `<strong>Cart</strong> (${CART.size} ${
		CART.size == 1 ? "item" : "items"
	})`;
	CART_LIST.replaceChildren();
	for (const order of CART.values()) {
		CART_LIST.appendChild(makeOrderRepresentation(order));
	}
	if (CART.size == 0) {
		const listItem = document.createElement("li");
		listItem.classList.add("list-group-item");
		listItem.style.padding = "1rem 2rem";
		const noItems = document.createElement("p");
		noItems.style.fontWeight = "500";
		noItems.innerHTML = "Cart is empty";
		noItems.style.marginBottom = "0";
		listItem.appendChild(noItems);
		CART_LIST.appendChild(listItem);
		CONTINUE_SHOPPING_BTN_CONTAINER.style.display = "flex";
		CONTINUE_SHOPPING_BTN_CONTAINER.style.justifyContent = "center";
		CART_LEFT.appendChild(CONTINUE_SHOPPING_BTN_CONTAINER);
		CART_RIGHT.remove();
		CART_BADGE.remove();
	} else {
		CONTINUE_SHOPPING_BTN_CONTAINER.style.display = "";
		CONTINUE_SHOPPING_BTN_CONTAINER.style.justifyContent = "";
		CART_RIGHT.appendChild(CONTINUE_SHOPPING_BTN_CONTAINER);
		CART_LEFT.after(CART_RIGHT);
		CART_BADGE.innerHTML = CART.size;
		NAV_CART_BTN.appendChild(CART_BADGE);
	}
	calculateCosts();
}

function makeSavedList() {
	SAVED_LIST.replaceChildren();
	for (const itemState of SAVED.values()) {
		SAVED_LIST.appendChild(makeSavedRepresentation(itemState));
	}
	if (SAVED.size == 0) {
		const listItem = document.createElement("li");
		listItem.classList.add("list-group-item");
		listItem.style.padding = "1rem 2rem";
		const noItems = document.createElement("p");
		noItems.style.fontWeight = "500";
		noItems.innerHTML = "No items saved yet";
		noItems.style.marginBottom = "0";
		listItem.appendChild(noItems);
		SAVED_LIST.appendChild(listItem);
	}
}

function calculateCosts() {
	let subtotal = 0;
	for (const order of CART.values()) {
		subtotal += order.value();
	}
	SUBTOTAL.innerHTML = PRICE_FORMAT.format(subtotal);
	TAX.innerHTML = PRICE_FORMAT.format(subtotal * 0.06);
	TOTAL.innerHTML = PRICE_FORMAT.format(subtotal * 1.06);
}

/**
 * @param {ItemState} itemState
 * @return {HTMLLIElement}
 */
function makeSavedRepresentation(itemState) {
	const listItem = document.createElement("li");
	listItem.classList.add("list-group-item");
	listItem.style.padding = "1rem 2rem";
	const container = document.createElement("div");
	container.classList.add("d-flex", "flex-row");

	const imgContainer = makeCartImage(itemState);

	const savedInfo = document.createElement("div");
	savedInfo.style.marginLeft = "3rem";
	savedInfo.style.width = "100%";

	const labelAndPriceRow = document.createElement("div");
	labelAndPriceRow.classList.add("d-flex", "justify-content-between");
	const label = document.createElement("p");
	label.style.fontWeight = "500";
	label.style.marginBottom = 0;
	label.innerHTML = itemState.label;
	const price = document.createElement("p");
	price.style.fontWeight = "500";
	price.style.marginLeft = "3rem";
	price.style.marginBottom = 0;
	price.innerHTML = PRICE_FORMAT.format(itemState.item.price);
	labelAndPriceRow.append(label, price);

	const cartAndRemoveRow = document.createElement("div");
	cartAndRemoveRow.classList.add("d-flex", "justify-content-between");
	cartAndRemoveRow.style.margin = "0.5rem 0rem";
	const cartBtn = document.createElement("button");
	cartBtn.classList.add("btn", "btn-link");
	cartBtn.style.fontWeight = "500";
	cartBtn.style.paddingLeft = 0;
	cartBtn.innerHTML = "Add to cart";
	cartBtn.onclick = () => {
		CART.set(itemState.label, new Order(itemState, 1));
		SAVED.delete(itemState.label);
		makeCartList();
		makeSavedList();
	};
	const removeBtn = document.createElement("button");
	removeBtn.classList.add("btn", "btn-link", "remove-btn");
	removeBtn.innerHTML = "Remove";
	removeBtn.onclick = () => {
		SAVED.delete(itemState.label);
		makeSavedList();
	};
	cartAndRemoveRow.append(cartBtn, removeBtn);

	savedInfo.append(labelAndPriceRow, cartAndRemoveRow, makeDeliveryInfo());
	container.append(imgContainer, savedInfo);
	listItem.appendChild(container);
	return listItem;
}

/**
 * @param {ItemState} itemState
 * @returns {HTMLDivElement}
 */
function makeCartImage(itemState) {
	const imgContainer = document.createElement("div");
	imgContainer.style.display = "flex";
	imgContainer.style.alignItems = "center";
	const img = document.createElement("img");
	img.classList.add("cart-img");
	img.src = itemState.imageURL;
	imgContainer.appendChild(img);
	return imgContainer;
}
