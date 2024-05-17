/** @type {HTMLDivElement} */
const SEARCH_CONTAINER = document.getElementById("searchCollapse");
const SEARCH_COLLAPSE = bootstrap.Collapse.getOrCreateInstance(
	SEARCH_CONTAINER,
	{
		toggle: false,
	}
);
const SEARCH_SPACER = document.createElement("div");
SEARCH_SPACER.style.display = "none";
SEARCH_SPACER.style.height = "3.2rem";
document.body.prepend(SEARCH_SPACER);
const SEARCH_RESULTS = document.getElementById("searchResultsContainer");
/** @type {HTMLInputElement} */
const SEARCH_INPUT = document.getElementById("searchInput");
SEARCH_INPUT.oninput = () => {
	SEARCH_RESULTS.replaceChildren();
	const target = SEARCH_INPUT.value.trim().toLowerCase();
	if (target === "") {
		return;
	}
	/** @type {Array<string>} */
	const sorted = POSSIBLE_RESULTS.toSorted(makeSortFunction(target));
	for (let i = 0; i < 4; i++) {
		const result = sorted[i].toLowerCase();
		const start = result.indexOf(target);
		if (start < 0) {
			continue;
		}
		const item = ITEMS.get(sorted[i]);
		const resultStart =
			compareResults(result, item.name, target) > 0
				? item.name.toLowerCase().indexOf(target) +
				  item.brand.length +
				  1
				: start;
		SEARCH_RESULTS.appendChild(
			makeSearchResult(
				sorted[i],
				sorted[i].slice(resultStart, resultStart + target.length),
				resultStart
			)
		);
	}
	if (SEARCH_RESULTS.hasChildNodes()) {
		const title = document.createElement("h5");
		title.style.fontWeight = "bold";
		title.innerHTML = "Top Results";
		SEARCH_RESULTS.prepend(title);
		SEARCH_RESULTS.lastElementChild.style.marginBottom = "2.5rem";
	}
};

const BLUR_ANIMATION = {
	keyframes: [{ filter: "blur(8px)" }],
	options: {
		easing: "ease",
		fill: "forwards",
		duration: 350,
	},
};

const UNBLUR_ANIMATION = {
	keyframes: [{ filter: "none" }],
	options: {
		easing: "ease",
		fill: "forwards",
		duration: 350,
	},
};

SEARCH_CONTAINER.addEventListener("show.bs.collapse", () => {
	NAV.style.position = "fixed";
	SEARCH_SPACER.style.display = "block";

	if (document.body.contains(ITEM_HEADER)) {
		NAV.style.zIndex = 2000;
	}
	blurBackground();

	setTimeout(
		() =>
			(document.onclick = (evt) => {
				if (!SEARCH_CONTAINER.contains(evt.target)) {
					SEARCH_COLLAPSE.hide();
				}
			}),
		10
	);
});

SEARCH_CONTAINER.addEventListener("shown.bs.collapse", () => {
	SEARCH_INPUT.focus();
	document.onscroll = () => SEARCH_COLLAPSE.hide();
});

SEARCH_CONTAINER.addEventListener("hide.bs.collapse", () => {
	if (document.body.contains(ITEM_HEADER)) {
		NAV.style.zIndex = "";
	}
	unblurBackground();
});

SEARCH_CONTAINER.addEventListener("hidden.bs.collapse", () => {
	SEARCH_SPACER.style.display = "none";
	NAV.style.position = "";
	SEARCH_INPUT.value = "";
	SEARCH_RESULTS.replaceChildren();
});

/**
 * @param {string} result
 * @param {string} target
 * @param {number} start
 */
function makeSearchResult(result, target, start) {
	const button = document.createElement("button");
	button.classList.add("btn", "btn-light", "search-result");
	const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	icon.classList.add("bi", "bi-arrow-right-short");
	icon.setAttribute("width", "16");
	icon.setAttribute("height", "16");
	icon.setAttribute("fill", "currentColor");
	icon.setAttribute("viewBox", "0 0 16 16");
	icon.style.marginRight = "0.5rem";
	const iconPath = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	iconPath.setAttribute("fill-rule", "evenodd");
	iconPath.setAttribute(
		"d",
		"M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
	);
	icon.appendChild(iconPath);

	const item = ITEMS.get(result);
	const targetSpan = document.createElement("span");
	targetSpan.style.fontWeight = "bold";
	targetSpan.style.color = "rgb(64, 64, 64)";
	targetSpan.innerHTML = target;
	const deptSpan = document.createElement("span");
	deptSpan.style.color = "rgb(190, 190, 190)";
	deptSpan.innerHTML = " - " + item.department;
	button.innerHTML =
		result.slice(0, start) +
		targetSpan.outerHTML +
		result.slice(start + target.length);
	button.appendChild(deptSpan);
	button.onclick = () => {
		SEARCH_COLLAPSE.hide();
		makeItemScreen(item);
	};
	button.prepend(icon);

	return button;
}

/**
 * @param {string} sortTarget
 * @returns {(a: string, b: string) => number}
 */
function makeSortFunction(sortTarget) {
	const target = sortTarget.toLowerCase();
	/** @type {(one: string, two: string) => number} */
	const compare = (one, two) => compareResults(one, two, target);
	return function (one, two) {
		const itemOne = ITEMS.get(one);
		const itemTwo = ITEMS.get(two);
		const bestOfOne = compare(one, itemOne.name) > 0 ? itemOne.name : one;
		const bestOfTwo = compare(two, itemTwo.name) > 0 ? itemTwo.name : two;
		return compare(bestOfOne, bestOfTwo);
	};
}

/**
 * @param {string} one
 * @param {string} two
 * @param {string} target
 * @returns {number}
 */
function compareResults(one, two, target) {
	const a = one.toLowerCase();
	const b = two.toLowerCase();
	const aIndex = a.indexOf(target);
    const bIndex = b.indexOf(target);
    if (aIndex == bIndex) {
        return 0;
    } else if (bIndex == -1) {
        return -1;
    } else if (aIndex == -1) {
        return 1;
    } else if (aIndex < bIndex) {
        return -1;
    } else {
        return 1;
    }
}
