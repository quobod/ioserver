import express from "express";
import { Server } from "socket.io";
import https from "https";
// import http from "http";
import path from "path";
import { log, cls, successMessage } from "./custom_modules/index.js";
import userman from "./custom_modules/users.js";
import { fs } from "mz";

function letsencryptOptions(domain) {
  const path = "/etc/letsencrypt/live/";
  return {
    key: fs.readFileSync(path + domain + "/privkey.pem"),
    cert: fs.readFileSync(path + domain + "/cert.pem"),
    ca: fs.readFileSync(path + domain + "/chain.pem"),
  };
}

const options = letsencryptOptions("rmediatech.com");

const __dirname = path.resolve(".");
const UserManager = new userman();
const app = express();
const server = https.createServer(options, app);
// const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Static assets
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  if (!UserManager.getUserById(socket.conn.id)) {
    socket.emit("register", { userId: socket.conn.id });
  }

  // User registration
  socket.on("register", (data) => {
    const { email, pwd1, pwd2 } = data;
    log(
      `\n\n\t\t\tUser Registration\n\t\tEmail:\t${email}\n\t\tPassword:\t${pwd1}\n\t\tPassword2:\t${pwd2}\n\n`
    );

    if (UserManager.getUserByEmail(email)) {
      log(
        `\t\tUser submitted registration form, so am checking if user is already registered\n`
      );
      socket.emit("signup failed", {
        cause: `Email ${email} is already registered`,
      });
    } else if (pwd1 != pwd2) {
      log(`\t\tChecking if registration passwords match\n`);
      socket.emit("signup failed", { cause: `Passwords don't match` });
    } else {
      log(`\t\tRegistration validation is good.\n\t\tRegistering User\n`);
      UserManager.addUser(email, pwd1, socket.conn.id);
      socket.emit("signup succeeded", { userId: socket.conn.id });
      log(UserManager.getUsers());
    }
  });

  // User signin
  socket.on("sign in", (data) => {
    const { email, password } = data;

    log(
      `\n\n\t\tSign In Data\n\t\t\tEmail: ${email}\n\t\t\tPassword: ${password}\n\n`
    );

    const user = UserManager.getUserByEmail(email);

    log(`\n\n\t\tChecking if user exists\n\n`);

    if (user != null) {
      log(`\n\n\t\tChecking if user's password is valid\n\n`);

      if (password == user.getPassword()) {
        socket.emit("signin succeeded", { status: true });
      } else {
        socket.emil("signin failed", { cause: `Credentials invalid` });
      }
    } else {
      socket.emit("signin failed", { cause: "User not found" });
    }
  });

  // User exit
  socket.on("disconnectme", () => {
    const user = UserManager.getUserById(socket.conn.id);
    log(`\n\n\t\tUser disconnected\n\n`);
  });

  socket.on("disconnecting", () => {
    const user = UserManager.getUserById(socket.conn.id);
    if (null != user) {
      UserManager.removeUserById(user.getId());
    }

    const users = UserManager.getUsers();
    if (0 == users.length) {
      log(`\n\n\t\tConnected Users: zero 0\n\n`);
    } else {
      log(`\n\n\t\tConnected Users: ${users.length}\n\n`);
    }
  });
});

server.listen(3000, () => {
  cls();
  successMessage(`\n\t\tServer listening on *:3000\n\n`);
});
