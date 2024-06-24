'use strict';
/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['FoodMe App'],
  /**
   * Your New Relic license key.
   */
  license_key: 'your_license_key_here',
  logging: {
    /**
     * Level at which to log. 'trace' is most verbose, 'fatal' is least.
     * Options are 'trace', 'debug', 'info', 'warn', 'error', and 'fatal'.
     */
    level: 'info'
  }
}
