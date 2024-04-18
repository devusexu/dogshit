require("dotenv").config();
const { expect } = require("chai");
const axios = require("axios");
const mongoose = require("mongoose");

const app = require("../../app");
const { User } = require("../../models");

describe("Integration test - API", () => {
  let server;
  before(async () => {
    await mongoose.connect(process.env.MONGODB_TESTING_URI);
    server = app.listen(8000);
  });

  after(async () => {
    // Close the Mongoose connection after all tests
    await mongoose.disconnect();
    server.close();
  });

  beforeEach(async () => {
    // Create the test user before each test
    await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password",
    });
  });

  afterEach(async () => {
    // Clean up the database after each test
    await User.deleteMany();
  });
  describe("/users/login", () => {
    describe("POST", () => {
      it("Should return a valid authentication token when provided with correct credentials", async () => {
        const response = await axios.post(
          "http://localhost:8000/api/users/login",
          {
            email: "test@example.com",
            password: "password",
          },
        );
        expect(response.status).to.equals(200);
        expect(response.data).to.have.property("token");
      });
    });
  });
});
