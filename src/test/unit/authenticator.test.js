const { expect } = require("chai");
const sinon = require("sinon");
const { isAuthenticated } = require("../../middlewares");
const { BadRequestError } = require("../../utils/error");

describe("Unit test - Middleware", () => {
  describe("isAuthenticated", () => {
    it("Should throw a BadRequestError when no Bearer token is provided", () => {
      const req = {
        headers: {
          authorization: "", // No Bearer token provided
        },
      };
      const res = {};
      const next = sinon.spy(); // Spy on the next function

      // Call the middleware function
      isAuthenticated(req, res, next);

      // Assert that next was called with a BadRequestError
      expect(next.calledOnce).to.be.true;
      expect(next.args[0][0]).to.be.instanceOf(BadRequestError);
      expect(next.args[0][0].message).to.equal(
        "Token should be included in the authorization header",
      );
    });
  });
});
