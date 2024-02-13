/**
 * The above functions fetch logged-in user orders and logged-in user data from an API.
 * @param userId - The `userId` parameter is the unique identifier of the logged-in user. It is used to
 * fetch the orders and user data associated with that user.
 * @returns Both functions are returning a Promise that resolves to an object containing the fetched
 * data.
 */
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/order?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/users/${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}
