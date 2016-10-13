/**
 * ShortUrlController
 *
 * @description :: Server-side logic for managing short URLs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
  * Find short URL for current hostname by hash
  */
  findByHash: function(req, res) {
    // Construct lookup key
    var key = req.host + ":" + req.param("hash");

    // Get short URL by key
    ShortUrl.findOne({key: key})
      .then(function(shortUrl) {
        // Not found
        if (!shortUrl) {
          // Show 404 error page
          return res.notFound();
        }

        // Log details for found short URL
        sails.log.debug(
          "Found short URL by key '" + key + "', " +
          "pointing to target URL " + shortUrl.targetUrl
        );

        // Redirect to target URL
        return res.redirect(shortUrl.targetUrl);
      })
      .catch(function(error) {
        // Log error
        sails.log.error(error);

        // Show error page
        return res.serverError(err);
      });
  },
};
