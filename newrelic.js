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
  license_key: '01ea5527398dc1492a24e52a84a97aceFFFFNRAL',
  logging: {
    /**
     * Level at which to log. 'trace' is most verbose, 'fatal' is least.
     * Options are 'trace', 'debug', 'info', 'warn', 'error', and 'fatal'.
     */
    level: 'info'
  }
}
