export class Database {
  static create(user) {
    return fetch(
      "https://beershop-c42a5-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((respone) => respone.json())
      .then((response) => {
        console.log(response);
      });
  }
}
