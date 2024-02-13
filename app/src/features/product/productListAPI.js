// A mock function to mimic making an async request for data
/**
 * The code exports several functions for fetching, adding, updating, and searching products from a
 * server using HTTP requests.
 * returns The functions in the code are returning promises that resolve to an object containing the
 * fetched data.
 */
export function fetchAllproducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function addProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductByFilter(filter, sort, pagination) {
  let queryPath = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryPath += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryPath += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryPath += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("/products?" + queryPath);
    const data = await response.json();
    const totalProduct = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalProducts: +totalProduct } });
  });
}

// Product by id for fetch for product detail page

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function searchProduct(keyword) {
  // todo here
  if (keyword) {
    return new Promise(async (resolve) => {
      const response = await fetch(`/products?q=${keyword}`);
      const data = await response.json();
      resolve({ data });
    });
  }
}

//================================================================//
// here we are fetching product by brands for landing page for so we can manage brands and showcase them according to brands

export function fetchProductForHomePage() {
  // todo here
  return new Promise(async (resolve) => {
    const response = await fetch("/products");
    const data = await response.json();
    resolve({ data });
  });
}
