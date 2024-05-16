class Item {
	/**
	 * @param {string} department
	 * @param {string} name
	 * @param {string} price
	 * @param {Array<string>} imageURLs
	 * @param {string} description
	 * @param {string} category
	 * @param {string} brand
	 * @param {Array<string>} colors
	 * @param {Array<string>} sizes
	 */
	constructor(
		department,
		name,
		price,
		imageURLs,
		description,
		category,
		brand,
		colors,
		sizes
	) {
		this.department = department;
		this.name = name;
		this.price =
			typeof price === "number"
				? price
				: parseFloat(price.replaceAll(/[$,]/g, ""));
		this.imageURLs = imageURLs;
		this.description = description;
		this.category = category;
		this.brand = brand;
		this.colors = colors;
		this.sizes = sizes;
	}
	toString() {
		if (this.name.toLowerCase().includes(this.brand.toLowerCase())) {
			return this.name;
		} else {
			return this.brand + " " + this.name;
		}
	}

	/**
	 * @param {string} field
	 */
	getProperty(field) {
		switch (field.toLowerCase()) {
			case "department":
				return this.department;
			case "name":
				return this.name;
			case "price":
				return this.price;
			case "imageURLs":
				return this.imageURLs;
			case "brands":
			case "brand":
				return this.brand;
			case "category":
			case "categories":
				return this.category;
			case "colors":
				return this.colors;
			case "sizes":
				return this.sizes;
			default:
				throw new ReferenceError("no such field exists");
		}
	}
}

class ItemState {
	/**
	 * @param {Item} item
	 * @param {string} color
	 * @param {string} size
	 */
	constructor(item, color, size) {
		this.item = item;
		this.color = color;
		this.size = size;
		this.imageURL =
			this.item.imageURLs[
				this.color ? this.item.colors.indexOf(this.color) : 0
			];
		this.label = this.item.toString();
		if (this.color) {
			this.label = this.color + " " + this.label;
		}
		if (this.size) {
			this.label += ", " + this.size;
		}
	}
}

class Order {
	/**
	 * @param {ItemState} itemState
	 * @param {number} count
	 */
	constructor(itemState, count) {
		this.itemState = itemState;
		this.count = count;
	}

	value() {
		return this.itemState.item.price * this.count;
	}
}

class DepartmentInfo {
	/**
	 *
	 * @param {Array<Item>} items
	 * @param {Array<string>} filters
	 */
	constructor(items, filters) {
		this.items = items;
		this.nonPriceFilters = filters;
		this.nonPriceFilters.splice(this.nonPriceFilters.indexOf("Price"), 1);
	}
}

/** @type {Map<string, Item>} */
const ITEMS = new Map();

/** @type {Map<string, DepartmentInfo>} */
const DEPTS = new Map([
	[
		"Arts and Crafts",
		new DepartmentInfo([], ["Categories", "Brands", "Colors"]),
	],
	[
		"Clothing",
		new DepartmentInfo([], ["Categories", "Brands", "Colors", "Sizes"]),
	],
	["Electronics", new DepartmentInfo([], ["Categories", "Brands", "Colors"])],
	["Furniture", new DepartmentInfo([], ["Categories", "Brands", "Colors"])],
	["Groceries", new DepartmentInfo([], ["Categories"])],
	["Health", new DepartmentInfo([], ["Categories", "Brands", "Sizes"])],
	["Kids", new DepartmentInfo([], ["Categories", "Brands"])],
	[
		"Sports",
		new DepartmentInfo([], ["Categories", "Brands", "Colors", "Sizes"]),
	],
]);

/** @type {Array<string>} */
const POSSIBLE_RESULTS = [];

/** @type {Map<string, Order>} */
const CART = new Map();
/** @type {Map<string, ItemState>} */
const SAVED = new Map();

makeDepts();

async function makeDepts() {
	for (const [dept, deptInfo] of DEPTS) {
		const blob = await fetch("test-assets/" + dept + ".csv").then(
			(response) => response.blob()
		);
		Papa.parse(blob, {
			complete: (results) => {
				const lines = results.data;
				lines.shift();
				for (const line of lines) {
					line[2] = line[2].split(/,\s*/);
					line[6] = line[6] ? line[6].split(/,\s*/) : undefined;
					line[7] = line[7] ? line[7].split(/,\s*/) : undefined;
					const newItem = new Item(dept, ...line);
					ITEMS.set(newItem.toString(), newItem);
					POSSIBLE_RESULTS.push(newItem.toString());
					deptInfo.items.push(newItem);
				}
			},
		});
	}
}
