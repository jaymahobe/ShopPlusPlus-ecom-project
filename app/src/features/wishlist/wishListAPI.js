/**
 * The code above contains JavaScript functions for adding items to a wishlist, fetching a wishlist by
 * user ID, and deleting an item from the wishlist.
 * @param item - The `item` parameter in the `addToWishList` function represents the item that you want
 * to add to the wishlist. It should be an object containing the necessary information about the item,
 * such as its name, price, and any other relevant details.
 * @returns The functions `addToWishList`, `fetchWishlistByUserId`, and `deleteItemFromWishlist` are
 * all returning a Promise that resolves to an object containing the data returned from the server.
 */
export function addToWishList(item) {
  // todo here
  return new Promise(async (resolve) => {
    const response = await fetch("/wishlist", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    // todo on server
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchWishlistByUserId(userId) {
  // todo hereee
  return new Promise(async (resolve) => {
    const response = await fetch(`/wishlist?user=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}

// // for handel delete items from the cart
export function deleteItemFromWishlist(itemId) {
  // todo here
  return new Promise(async (resolve) => {
    const response = await fetch("/wishlist/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    // todo on server
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}
