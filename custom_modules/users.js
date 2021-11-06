class User {
  constructor(email, password, id) {
    this.email = email;
    this.password = password;
    this.id = id;
  }

  getEmail() {
    return this.email;
  }

  getId() {
    return this.id;
  }

  getPassword() {
    return this.password;
  }

  setPassword(newPassword) {
    this.password = newPassword;
  }

  toString() {
    return this.email.trim();
  }
}

class UserManager {
  constructor() {
    this.users = [];
  }

  addUser(email, password, id) {
    let index = -1;

    index = this.users.findIndex((u) => u.getEmail() == email);

    if (index == -1) {
      const newUser = new User(email, password, id);
      this.users.push(newUser);
    }
  }

  removeUserByEmail(email) {
    this.users = this.users.filter((u) => u.getEmail() != email);
  }

  removeUserById(id) {
    this.users = this.users.filter((u) => u.getId() != id);
  }

  removeUsers() {
    this.users = [];
  }

  getUserByEmail(email) {
    let index = -1;

    index = this.users.findIndex((u) => u.getEmail() == email);

    if (index != -1) {
      return this.users[index];
    }

    return null;
  }

  getUserById(id) {
    let index = -1;

    index = this.users.findIndex((u) => u.getId() == id);

    if (index != -1) {
      return this.users[index];
    }

    return null;
  }

  getUsers() {
    return this.users;
  }
}

const userman = UserManager;

export default userman;
