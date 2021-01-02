export class Database {
  static create(user, url) {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }

  static getCatalog(url) {
    return fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Something gone wrong ${response.status}`);
        }
        return response.json();
      })
      .catch((err) => {
        console.log(`Fetch error ${err}`);
      });
  }
}
