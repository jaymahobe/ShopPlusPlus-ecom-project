/**
 * The above code contains several functions for making asynchronous requests to a server for user
 * authentication and data manipulation.
 * @param userData - userData is an object that contains the user's data such as username, email, and
 * password. It is used to create a new user in the system.
 * @returns The functions `createUser`, `checkUser`, `updateUser`, `logOutUser`, `checkJwtAuth`, and
 * `changePasswordRequest` all return a Promise that resolves to an object with a `data` property. The
 * `data` property contains the response data from the server.
 */

export function createUser(userData) {
  // todo here
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    // todo on server
    const data = await response.json();
    resolve({ data });
  });
}

// this is for check credentials and user is valid and exist in db
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      // todo on server
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function logOutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout", {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      });
      if (response.ok) {
        resolve({ data: "success" });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function checkJwtAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function changePasswordRequest(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/change-password", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      reject(error);
    }
  });
}
