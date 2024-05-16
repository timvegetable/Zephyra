// validate() : boolean
// pay() : void
const CHECKOUT_TITLE = document.createElement("h1");
CHECKOUT_TITLE.classList.add("title");
CHECKOUT_TITLE.innerHTML = "Checkout";

const CHECKOUT_CONTAINER = document.createElement("div");
CHECKOUT_CONTAINER.classList.add("d-flex", "flex-row");
const CHECKOUT_LEFT = document.createElement("div");
CHECKOUT_LEFT.style.width = "100%";
const CHECKOUT_RIGHT = document.createElement("div");
CHECKOUT_RIGHT.style.marginLeft = "6rem";
CHECKOUT_RIGHT.style.width = "50rem";
CHECKOUT_CONTAINER.append(CHECKOUT_LEFT, CHECKOUT_RIGHT);

const SHIPPING_CONTAINER = document.createElement("div");
SHIPPING_CONTAINER.classList.add("checkout-internal-container");
const SHIPPING_FORM = document.createElement("form");
SHIPPING_FORM.classList.add(
  "m-0",
  "p-4",
  "row",
  "shadow-sm",
  "rounded-3",
  "border",
  "border-primary"
);

const SHIPPING_LABEL = document.createElement("h4");
SHIPPING_LABEL.classList.add("text-secondary");
SHIPPING_LABEL.innerHTML = "Shipping Address";
const SHIPPING_FIRST_NAME = makeCheckoutInput("First name");
const SHIPPING_LAST_NAME = makeCheckoutInput("Last name");
const SHIPPING_ADDRESS = makeCheckoutInput("Address");
const SHIPPING_CITY = makeCheckoutInput("City");
const SHIPPING_STATE = makeCheckoutInput("Two-letter state abbreviation (ex: MD)");
const SHIPPING_ZIP = makeCheckoutInput("Zip code");
SHIPPING_ZIP.style.marginBottom = "0.5rem";
SHIPPING_FORM.append(
  SHIPPING_FIRST_NAME,
  SHIPPING_LAST_NAME,
  SHIPPING_ADDRESS,
  SHIPPING_CITY,
  SHIPPING_STATE,
  SHIPPING_ZIP
);
SHIPPING_CONTAINER.append(SHIPPING_LABEL, SHIPPING_FORM);

const PAYMENT_METHOD_CONTAINER = document.createElement("div");
PAYMENT_METHOD_CONTAINER.classList.add("checkout-internal-container");
const PAYMENT_METHOD_FORM = document.createElement("form");
PAYMENT_METHOD_FORM.classList.add(
  "m-0",
  "p-4",
  "row",
  "shadow-sm",
  "rounded-3",
  "border",
  "border-primary"
);
const PAYMENT_METHOD_CARD_INFO = makeCheckoutInput("Card number");
const PAYMENT_METHOD_ZIP = makeCheckoutInput("Billing zip code");
const PAYMENT_METHOD_SECURITY_CODE = makeCheckoutInput("Security code");
PAYMENT_METHOD_SECURITY_CODE.style.marginBottom = "0.5rem";
{
  const paymentMethodLabel = document.createElement("h4");
  paymentMethodLabel.classList.add("text-secondary");
  paymentMethodLabel.innerHTML = "Payment Method";
  PAYMENT_METHOD_FORM.append(
    PAYMENT_METHOD_CARD_INFO,
    PAYMENT_METHOD_ZIP,
    PAYMENT_METHOD_SECURITY_CODE
  );
  PAYMENT_METHOD_CONTAINER.append(paymentMethodLabel, PAYMENT_METHOD_FORM);
}

const CHECKOUT_CART_LABEL = document.createElement("h4");
CHECKOUT_CART_LABEL.classList.add("text-primary");
CHECKOUT_CART_LABEL.style.fontWeight = "normal";
CHECKOUT_CART_LABEL.innerHTML = "<strong>Cart</strong> (0 items)";

const CHECKOUT_CART_EXTERNAL_CONTAINER = document.createElement("div");
CHECKOUT_CART_EXTERNAL_CONTAINER.classList.add("checkout-internal-container");
const CHECKOUT_CART_CONTAINER = document.createElement("div");
CHECKOUT_CART_CONTAINER.classList.add(
  "m-0",
  "p-4",
  "row",
  "shadow-sm",
  "rounded-3",
  "border",
  "border-primary"
);
CHECKOUT_CART_EXTERNAL_CONTAINER.appendChild(CHECKOUT_CART_CONTAINER);

const CONFIRM_PURCHASE_BTN = document.createElement("button");
CONFIRM_PURCHASE_BTN.classList.add(
  "btn",
  "btn-primary",
  "rounded",
  "float-end"
);
CONFIRM_PURCHASE_BTN.innerHTML = "Confirm Purchase";
CONFIRM_PURCHASE_BTN.style.width = "100%";

CHECKOUT_LEFT.append(
  SHIPPING_CONTAINER,
  PAYMENT_METHOD_CONTAINER,
  CHECKOUT_CART_LABEL,
  CHECKOUT_CART_EXTERNAL_CONTAINER
);

CHECKOUT_BTN.onclick = makeCheckoutScreen;
function makeCheckoutScreen() {
  TAX_LABEL.innerHTML = "Tax";
  TOTAL_LABEL.innerHTML = "Total";

  if (address === null) {
    const fillLocationBtn = document.createElement("button");
    fillLocationBtn.id = "fillLocationBtn";
    fillLocationBtn.classList.add("btn", "btn-primary");
    fillLocationBtn.style.marginLeft = "1rem";
    fillLocationBtn.innerHTML = "Fill using location information*";
    const caveat = document.createElement("p");
    caveat.id = "caveat";
    caveat.style.marginBottom = 0;
    caveat.style.fontSize = "0.75rem";
    caveat.style.fontWeight = "normal";
    caveat.style.color = "black";
    caveat.innerHTML = "*May be slightly inaccurate"
    fillLocationBtn.onclick = () => {
      fillLocationBtn.disabled = true;
      fillLocationBtn.classList.replace("btn-primary", "btn-secondary");
      fillLocationBtn.innerHTML = "Loading...";
      navigator.geolocation.getCurrentPosition(
          (location) => {
            setAddress(location).then(fillAddressInfo)
          },
          (error) => {
            address = false;
            fillLocationBtn.remove();
            caveat.remove();
          }
      );
    }
    SHIPPING_LABEL.append(fillLocationBtn, caveat);
  } else if (address) {
    fillAddressInfo(address);
  }

  CHECKOUT_RIGHT.replaceChildren(
    ORDER_SUMMARY_LABEL,
    SUBTOTAL_ROW,
    SHIPPING_COST_ROW,
    TAX_ROW,
    TOTAL_ROW,
    CONFIRM_PURCHASE_BTN
  );

  makeCheckoutCart();
  CONTENT.replaceChildren(CHECKOUT_TITLE, CHECKOUT_CONTAINER);
}

function fillAddressInfo(address) {
  SHIPPING_ADDRESS.value = address.streetNumber + " " + address.street;
  SHIPPING_CITY.value = address.placename;
  SHIPPING_STATE.value = address.adminCode1;
  SHIPPING_ZIP.value = address.postalcode;
  document.getElementById("fillLocationBtn")?.remove();
  document.getElementById("caveat")?.remove();
}

function makeCheckoutInput(placeholder) {
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("line-input");
  input.style.marginBottom = "1rem";
  input.placeholder = placeholder;
  return input;
}

function makeCheckoutCart() {
  CHECKOUT_CART_LABEL.innerHTML = `<strong>Cart</strong> (${CART.size} ${
    CART.size == 1 ? "item" : "items"
  })`;
  CHECKOUT_CART_CONTAINER.replaceChildren();
  for (const order of CART.values()) {
    CHECKOUT_CART_CONTAINER.appendChild(
      makeCheckoutOrderRepresentation(order)
    );
  }
}

/**
 * @param {Order} order
 */
function makeCheckoutOrderRepresentation(order) {
  const container = document.createElement("div");
  container.classList.add("d-flex", "flex-row");

  const imgContainer = makeCheckoutCartImage(order.itemState);

  const orderInfo = document.createElement("div");
  orderInfo.style.marginLeft = "1.5rem";
  orderInfo.style.width = "100%";

  const labelAndPriceRow = document.createElement("div");
  labelAndPriceRow.classList.add("d-flex", "justify-content-between");
  const label = document.createElement("p");
  label.style.fontWeight = "500";
  label.style.marginBottom = 0;
  label.innerHTML = order.itemState.label;
  const price = document.createElement("p");
  price.style.fontWeight = "500";
  price.style.marginLeft = "3rem";
  price.style.marginBottom = 0;
  price.innerHTML = PRICE_FORMAT.format(order.itemState.item.price);
  labelAndPriceRow.append(label, price);

  const qtyContainer = document.createElement("div");
  const qty = document.createElement("p");
  qty.style.color = "gray";
  qty.innerHTML = "Quantity: " + order.count;
  qtyContainer.appendChild(qty);

  orderInfo.append(labelAndPriceRow, qtyContainer);
  container.append(imgContainer, orderInfo);
  return container;
}

/**
 * @param {ItemState} itemState
 */
function makeCheckoutCartImage(itemState) {
  const imgContainer = document.createElement("div");
  imgContainer.style.display = "flex";
  imgContainer.style.alignItems = "center";
  const img = document.createElement("img");
  img.classList.add("cart-img");
  img.style.width = "4.5rem";
  img.style.height = "4.5rem";
  img.src = itemState.imageURL;
  imgContainer.appendChild(img);
  return imgContainer;
}
