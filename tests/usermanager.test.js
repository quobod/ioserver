import { expect, assert, should } from "chai";
import userman from "../custom_modules/users.js";
let UM = null;

const log = (arg = "") => console.log(arg);

beforeEach("Instantiate userman class", () => {
  log(`\t\tbeforeEach fired`);
  UM = new userman();
});

afterEach("Nullify userman object", () => {
  log(`\t\tafterEach fired`);
  UM = null;
});

describe("usermanager class", () => {
  it("test class instantiation", () => {
    expect(UM).to.not.equal(null);
  });
});

describe("usermanager class", () => {
  describe("test empty users array instance variable", () => {
    it("should return an empty array", () => {
      expect(UM.getUsers().length).to.equal(0);
    });
  });
});

describe("usermanager class", () => {
  describe("test users array instance variable", () => {
    it("should return an array of one length", () => {
      UM.addUser("anita@gmail.net", "passed_the_word", 1234);
      expect(UM.getUsers().length).to.equal(1);
    });
  });
});

describe("usermanager class", () => {
  describe("test users array instance variable", () => {
    describe("adding user with an existing email", () => {
      it("should return an array of one length", () => {
        UM.addUser("anita@gmail.net", "passed_the_word", 1234);
        UM.addUser("anita@gmail.net", "passed_the_word", 1234);
        expect(UM.getUsers().length).to.equal(1);
      });
    });
  });
});

describe("usermanager class", () => {
  describe("usermanager contains one user", () => {
    describe("test removeUserByEmail method", () => {
      it("getUsers method should return an array of length zero", () => {
        UM.removeUserByEmail("anita@gmail.net");
        expect(UM.getUsers().length).to.equal(0);
      });
    });
  });
});

describe("usermanager class", () => {
  describe("usermanager contains one user", () => {
    describe("test removeUserById method", () => {
      describe("will pass the ID as a string argument", () => {
        it("getUsers method should return an array of length zero", () => {
          UM.addUser("anita@gmail.net", "passed_the_word", 1234);
          UM.removeUserById("1234");
          expect(UM.getUsers().length).to.equal(0);
        });
      });
    });
  });
});

describe("usermanager class", () => {
  describe("usermanager contains one user", () => {
    describe("test removeUserById method", () => {
      describe("will pass the ID as an integer argument", () => {
        it("getUsers method should return an array of length zero", () => {
          UM.addUser("anita@gmail.net", "passed_the_word", 1234);
          UM.removeUserById("1234");
          expect(UM.getUsers().length).to.equal(0);
        });
      });
    });
  });
});
