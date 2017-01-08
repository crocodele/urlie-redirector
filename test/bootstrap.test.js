var sails = require("sails");
var Barrels = require("barrels");

// Prepare for testing
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift
  this.timeout(5000);

  // Start server
  sails.lift(
    {
      environment: "test",
      port: 9999,
      hostName: "localhost:9999",
      connections: {
        // Redis
        redis: {
          adapter: "sails-redis",
          port: 6379,
          host: "localhost",
          password: null,
          database: 1,
        },
      },
      models: {
        migrate: "drop",
      },
    },
    function(error, server) {
      // Quit on error
      if (error) {
        return done(error);
      }

      // Load fixtures
      barrels = new Barrels(process.cwd() + '/test/fixtures');
      barrels.populate(function(error) {
        done(error, sails);
      });
    }
  );
});

// Clean up after testing
after(function(done) {
  console.log();
  sails.lower(done);
});
