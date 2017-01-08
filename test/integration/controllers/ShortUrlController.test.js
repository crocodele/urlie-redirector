var request = require("supertest");

describe("ShortUrlController", function() {

  describe("#findByHash", function() {
    it("should redirect to target URL when key is found", function(done) {
      var hash = "-fDnkY";
      request(sails.hooks.http.app)
      .get("/" + hash)
      .expect(302)
      .expect("Location", "https://www.google.com/")
      .end(done);
    });

    it("should return 404 when key is missing", function(done) {
      var hash = "-ks8AmPq4";
      request(sails.hooks.http.app)
      .get("/" + hash)
      .expect(404)
      .end(done);
    });
  });

});
