/**
 * NODEINATE
 * 
 * NodeInate is a lightweight and flexible pagination library for Node.js,
 * designed to simplify data pagination in your applications.
 * 
 * By Sam Wilcox <wilcox.sam@gmail.com>
 * 
 * This library is licensed under the GNU 3.0 license.
 * See the LICENSE file for more details regarding the user license.
 */

/**
 * NodeInate library configuration.
 */
const config = {
    // Default items per page value.
    itemsPerPage: 20,

    // Debug mode for detailed debug information; not recommended for production.
    debug: false,

    // Max number of page hyperlinks to display.
    maxPageHyperlinks: 8,

    // Include "first" link.
    includeFirstHyperlink: true,

    // Include "last" link.
    includeLastHyperlinks: true,
}

/**
 * Update the library configurations dynamically.
 * 
 * @param {Object} newConfig - An object containing the updated configuration values.
 */
function setConfig(newConfig) {
    for (const key in newConfig) {
        if (config.hasOwnProperty(key)) {
            if (typeof config[key] === 'object' && typeof newConfig[key] === 'object') {
                Object.assign(config[key], newConfig[key]);
            } else {
                config[key] = newConfig[key];
            }
        }
    }

    if (config.debug && process.env.NODE_ENV !== 'test') {
        console.log('[NODEINATE DEBUG] Updated configuration:', config);
    }
}

module.exports = { config, setConfig };