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

const { config } = require('./config');

/**
 * Generate pagination dataset for the given parameters.
 * 
 * @param {number} totalItems - The total items to paginate.
 * @param {number} currentPage - The current page. 
 * @param {Object} [options={}] - Optional paginate options.
 * @param {number} [options.itemsPerPage=config.itemsPerPage] - The total items to display "per" page. 
 * @param {boolean} [options.debug=config.debug] - True to enable debug mode, false to disable debug mode.
 * @param {number} [options.maxPageHyperlinks=config.maxPageHyperlinks] - The total page hyperlinks to display.
 * @param {boolean} [options.includeFirstHyperlink=config.includeFirstHyperlink] - True to include a "go to first" link, false not to include one.
 * @param {boolean} [options.includeLastHyperlinks=config.includeLastHyperlinks] - True to include a "go to last" link, false not to include one.
 * @returns {Object} An object containing the pagination details.
 */
const paginate = (totalItems, currentPage, options = {}) => {
    const {
        itemsPerPage = config.itemsPerPage,
        debug = config.debug,
        maxPageHyperlinks = config.maxPageHyperlinks,
        includeFirstHyperlink = config.includeFirstHyperlink,
        includeLastHyperlinks = config.includeLastHyperlinks,
    } = options;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Ensure that currentPage is within bounds.
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    // Calculate the range of pages to display.
    let startPage = Math.max(currentPage - Math.floor(maxPageHyperlinks / 2), 1);
    let endPage = Math.min(startPage + maxPageHyperlinks - 1, totalPages);

    // Adjust the startPage if the range is "too small".
    if (endPage - startPage + 1 < maxPageHyperlinks) {
        startPage = Math.max(endPage - maxPageHyperlinks + 1, 1);
    }

    // Prepare the pagination links.
    const pageLinks = [];

    for (let i = startPage; i <= endPage; i++) {
        pageLinks.push({
            page: i,
            active: i === currentPage,
        });
    }

    // Prepare the pagination dataset.
    const pagination = {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        pageLinks,
        hasPrevious: currentPage > 1,
        hasNext: currentPage < totalPages,
        previousPage: currentPage > 1 ? currentPage - 1 : null,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
    };

    if (includeFirstHyperlink && currentPage > 1) {
        pagination.firstPage = 1;
    }

    if (includeLastHyperlinks && currentPage < totalPages) {
        pagination.lastPage = totalPages;
    }

    // If debug is enabled then we shall display the debug information.
    if (debug) {
        pagination.debugInfo = {
            startPage,
            endPage,
            maxPageHyperlinks,
        };
    }

    return pagination;
};

module.exports = paginate;