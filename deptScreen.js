const DEPT_TITLE = document.createElement("h1");
DEPT_TITLE.classList.add("title");

const FILTERS_LABEL = document.createElement("div");
FILTERS_LABEL.classList.add("fs-4", "mb-3");
FILTERS_LABEL.innerHTML = " Filters";

const FILTERS_ICON = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"svg"
);
const FILTERS_ICON_PATH = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"path"
);
FILTERS_ICON.setAttribute("width", "16");
FILTERS_ICON.setAttribute("height", "16");
FILTERS_ICON.setAttribute("viewBox", "0 0 16 16");
FILTERS_ICON.setAttribute("fill", "currentColor");
FILTERS_ICON.classList.add("bi", "bi-sliders");
FILTERS_ICON_PATH.setAttribute("fill-rule", "evenodd");
FILTERS_ICON_PATH.setAttribute(
	"d",
	"M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9" +
		" 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 " +
		"1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9" +
		" 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0" +
		" 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
);
FILTERS_ICON.appendChild(FILTERS_ICON_PATH);
FILTERS_LABEL.prepend(FILTERS_ICON);

const PRICE_FILTER = makePriceFilter();

/** @type {Map<string | number | string[], (item : Item) => boolean>} */
const CONDITIONS = new Map();

function makeDeptScreen(department) {
	leaveItemScreen();
	DEPT_TITLE.innerHTML = department;
	CONTENT.replaceChildren(
		DEPT_TITLE,
		makeFilters(department),
		makeCards(department)
	);
}

function makeCards(department) {
	const container = document.createElement("div");
	container.id = "items";
	container.classList.add("container-fluid");
	const row = document.createElement("div");
	row.id = "itemsRow";
	row.classList.add("row", "row-cols-3");
	DEPTS.get(department)
		.items.map(makeCard)
		.forEach((card) => row.appendChild(card));
	container.appendChild(row);
	return container;
}

/**
 * @param {Item} item
 * @return {HTMLDivElement}
 */
function makeCard(item) {
	const col = document.createElement("div");
	col.classList.add("col");
	const card = document.createElement("div");
	card.classList.add("card", "h-100");
	const img = document.createElement("img");
	img.src = item.imageURLs[0];
	img.classList.add("card-img-top");
	img.alt = item.name;
	card.appendChild(img);
	const body = document.createElement("div");
	body.classList.add("card-body");
	const title = document.createElement("h5");
	title.classList.add("card-title", "item-name");
	title.innerHTML = item.name;
	body.appendChild(title);
	const brand = document.createElement("p");
	brand.classList.add("card-text", "brand");
	brand.innerHTML = item.brand ?? "";
	body.appendChild(brand);
	const price = document.createElement("h5");
	price.style.marginBottom = "0rem";
	price.innerHTML = PRICE_FORMAT.format(item.price);
	body.appendChild(price);
	card.appendChild(body);
	card.onclick = () => makeItemScreen(item);
	col.appendChild(card);
	return col;
}

function makeFilters(department) {
	const filtersElement =
		document.getElementById("filters") ?? document.createElement("aside");
	const nonPriceFilters = DEPTS.get(department).nonPriceFilters;
	if (filtersElement.childElementCount == 0) {
		filtersElement.id = "filters";
		filtersElement.appendChild(FILTERS_LABEL);
		const accordion = document.createElement("div");
		accordion.classList.add("accordion");
		accordion.id = "filterCategories";
		for (const filter of nonPriceFilters) {
			accordion.appendChild(makeFilter(department, filter));
		}
		accordion.appendChild(PRICE_FILTER);
		filtersElement.appendChild(accordion);
		return filtersElement;
	} else {
		const accordion = document.getElementById("filterCategories");
		const newFilters = new Array(nonPriceFilters.length);
		for (let i = 0; i < newFilters.length; i++) {
			newFilters[i] = makeFilter(department, nonPriceFilters[i]);
		}
		accordion.replaceChildren(...newFilters);
		accordion.appendChild(PRICE_FILTER);
		return filtersElement;
	}
}

function makeFilter(department, filter) {
	const item = document.createElement("div");
	item.classList.add("accordion-item");
	const header = document.createElement("h2");
	header.classList.add("accordion-header");
	const button = document.createElement("button");
	button.classList.add("accordion-button");
	button.type = "button";
	button.setAttribute("data-bs-toggle", "collapse");
	button.setAttribute("data-bs-target", "#" + filter);
	button.ariaExpanded = "true";
	button.setAttribute("aria-controls", filter);
	button.innerHTML = filter;
	header.appendChild(button);
	item.appendChild(header);
	const container = document.createElement("div");
	container.id = filter;
	container.classList.add("accordion-collapse", "collapse", "show");
	const body = document.createElement("div");
	body.classList.add("accordion-body");
	const checkboxes = makeCheckboxes(department, filter);
	checkboxes.at(-1).style.marginBottom = "0";
	checkboxes.forEach((checkbox) => body.appendChild(checkbox));
	container.appendChild(body);
	item.appendChild(container);
	return item;
}

/**
 * @param {string} department
 * @param {string} filter
 * @returns {Array<HTMLDivElement>} A list of checkbox elements
 */
function makeCheckboxes(department, filter) {
	const items = DEPTS.get(department).items;
	let options = items
		.map((item) => item.getProperty(filter))
		.filter((opt) => opt !== undefined);
	if (filter.toLowerCase() === "colors") {
		options = options.flat();
	}
	options = Array.from(new Set(options));
	if (filter.toLowerCase() === "colors") {
		for (let i = 0; i < options.length; i++) {
			if (options[i].includes("/")) {
				options[i] = options[i].split("/");
			} else if (options[i].includes(" and ")) {
				options[i] = options[i].split(" and ");
			}
		}
		options = Array.from(new Set(options.flat()));
	}
	const checkboxes = new Array(options.length);
	for (let i = 0; i < options.length; i++) {
		if (!options[i]) {
			continue;
		}
		const div = document.createElement("div");
		div.classList.add("form-check");
		const input = document.createElement("input");
		input.classList.add("form-check-input");
		input.type = "checkbox";
		input.value = "";
		input.id = filter + i;
		input.oninput = () => {
			if (input.checked) {
				CONDITIONS.set(options[i], (item) => {
					const property = item.getProperty(filter);
					return property instanceof Array
						? property?.some((opt) => opt.includes(options[i])) ??
								false
						: property?.includes(options[i]) ?? false;
				});
			} else {
				CONDITIONS.delete(options[i]);
			}
			filterItems(department);
		};
		div.appendChild(input);
		const label = document.createElement("label");
		label.classList.add("form-check-label", "align-middle");
		label.htmlFor = input.id;
		label.innerHTML = options[i];
		div.appendChild(label);
		checkboxes[i] = div;
	}
	return checkboxes;
}

function filterItems(department) {
	let filtered = DEPTS.get(department).items;
	for (const condition of CONDITIONS.values()) {
		filtered = filtered.filter(condition);
	}
	document
		.getElementById("itemsRow")
		.replaceChildren(...filtered.map(makeCard));
}

function makePriceFilter() {
	const item = document.createElement("div");
	item.classList.add("accordion-item");
	const header = document.createElement("h2");
	header.classList.add("accordion-header");
	const button = document.createElement("button");
	button.classList.add("accordion-button");
	button.type = "button";
	button.setAttribute("data-bs-toggle", "collapse");
	button.setAttribute("data-bs-target", "#price");
	button.ariaExpanded = "true";
	button.setAttribute("aria-controls", "price");
	button.innerHTML = "Price";
	header.appendChild(button);
	item.appendChild(header);
	const container = document.createElement("div");
	container.id = "price";
	container.classList.add("accordion-collapse", "collapse", "show");
	const body = document.createElement("div");
	body.classList.add("accordion-body");
	const row = document.createElement("div");
	row.classList.add("row");
	const min = makePriceInput("min");
	const dash = document.createElement("div");
	dash.classList.add("col-1", "text-center", "align-items-center");
	dash.style.display = "flex";
	dash.style.padding = "0 2px";
	dash.style.justifyContent = "center";
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	svg.classList.add("bi", "bi-dash-lg");
	svg.setAttribute("width", "16");
	svg.setAttribute("height", "16");
	svg.setAttribute("fill", "currentColor");
	svg.setAttribute("viewBox", "0 0 16 16");
	path.setAttribute("fill-rule", "evenodd");
	path.setAttribute(
		"d",
		"M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
	);
	svg.appendChild(path);
	dash.appendChild(svg);
	const max = makePriceInput("max");
	const btnCol = document.createElement("div");
	btnCol.classList.add("col-3");
	btnCol.style.paddingLeft = 0;
	const applyBtn = document.createElement("button");
	applyBtn.id = "applyBtn";
	applyBtn.classList.add("btn", "btn-primary");
	applyBtn.style.fontSize = "0.8rem";
	applyBtn.style.padding = "0.3rem 0.5rem";
	applyBtn.innerHTML = "Apply";
	applyBtn.disabled = true;
	applyBtn.onclick = () => {
		CONDITIONS.set("price", priceCondition());
		filterItems(DEPT_TITLE.innerText);
	};
	btnCol.appendChild(applyBtn);
	row.appendChild(min);
	row.appendChild(dash);
	row.appendChild(max);
	row.appendChild(btnCol);
	body.appendChild(row);
	container.appendChild(body);
	item.appendChild(container);
	return item;
}

/**
 * @returns {(item : Item) => boolean}
 */
function priceCondition() {
	let min = parseFloat(document.getElementById("minprice").value);
	let max = parseFloat(document.getElementById("maxprice").value);
	if (isNaN(min)) {
		min = 0;
	}
	if (isNaN(max)) {
		max = Number.MAX_VALUE;
	}
	return (item) => item.price >= min && item.price <= max;
}

function makePriceInput(minOrMax) {
	const col = document.createElement("div");
	col.classList.add("col-4");
	if (minOrMax === "min") {
		col.style.paddingRight = "0";
	} else {
		col.style.paddingLeft = "0";
	}
	const inputGroup = document.createElement("div");
	inputGroup.classList.add("input-group");
	const text = document.createElement("div");
	text.classList.add("input-group-text", "price-input");
	text.innerHTML = "$";
	const input = document.createElement("input");
	input.id = minOrMax + "price";
	const opposite = minOrMax === "max" ? "min" : "max";
	input.type = "text";
	input.classList.add("form-control", "price-input");
	input.placeholder = minOrMax.charAt(0).toUpperCase() + minOrMax.slice(1);
	input.ariaLabel = minOrMax;
	input.oninput = () => {
		if (!validPriceInput(minOrMax)) {
			document.getElementById("applyBtn").disabled = true;
		} else if (validPriceInput(opposite)) {
			document.getElementById("applyBtn").disabled = false;
		}
	};
	inputGroup.appendChild(text);
	inputGroup.appendChild(input);
	col.appendChild(inputGroup);
	return col;
}

/**
 * @param {string} minOrMax
 */
function validPriceInput(minOrMax) {
	const input = document.getElementById(minOrMax + "price").value;
	return input === "" || /^(\d{1,5}|\d{0,5}\.\d{1,2})$/.test(input);
}
