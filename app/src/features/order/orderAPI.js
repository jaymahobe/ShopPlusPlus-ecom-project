/**
 * The code includes functions for placing an order, fetching all orders for an admin, and updating an
 * order.
 * @param order - The `order` parameter is an object that represents the order details. It could
 * contain properties such as `orderId`, `customerName`, `items`, `totalAmount`, etc.
 * @returns The functions `placeOrder`, `fetchAllOrderForAdmin`, and `updateOrder` are all returning a
 * Promise that resolves to an object containing the data returned from the server.
 */
// A mock function to mimic making an async request for data
export function placeOrder(order) {
  // todo here
  return new Promise(async (resolve) => {
    const response = await fetch("/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    // todo on server
    const data = await response.json();
    resolve({ data });
  });
}

// this is for admin page this api fetch all the order from the users

export function fetchAllOrderForAdmin() {
  // todo here
  return new Promise(async (resolve) => {
    const response = await fetch("/order/admin");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(update) {
  // todo here
  return new Promise(async (resolve) => {
    const response = await fetch("/order/admin/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    // todo on server
    const data = await response.json();
    resolve({ data });
  });
}
