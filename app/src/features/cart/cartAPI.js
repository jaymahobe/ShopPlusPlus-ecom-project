/**
 * The above code provides functions for adding items to a cart, fetching cart items by user ID,
 * updating the quantity of items in the cart, deleting items from the cart, and resetting the cart.
 * @param item - The `item` parameter represents the item that you want to add to the cart. It should
 * be an object containing the necessary information about the item, such as its name, price, quantity,
 * etc.
 * @returns The functions `addToCart`, `fetchCartItemsByUserId`, `updateQuantity`,
 * `deleteItemfromCart`, and `resetCart` all return a Promise that resolves to an object containing the
 * data or status of the operation.
 */
// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

// api call for handle update cart for quantity
export function updateQuantity(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

// for handel delete items from the cart
export function deleteItemfromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchCartItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemfromCart(item);
    }
    resolve({ status: "Done cart is empty now" });
  });
}
