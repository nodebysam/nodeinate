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

const test = require('ava');
const paginate = require('../index');

test('should calculate pagination correctly with default values', t => {
    const result = paginate(100, 5);
    t.is(result.currentPage, 5);
    t.is(result.totalPages, 5);
    t.is(Object.keys(result.pageLinks).length, 5);
});

test('should return correct page data when on the first page', t => {
    const result = paginate(100, 1);
    t.is(result.currentPage, 1);
    t.is(result.hasPrevious, false);
    t.is(result.hasNext, true);
    t.is(result.previousPage, null);
    t.is(result.nextPage, 2);
});

test('should return correct page data when on the last page', t => {
    const result = paginate(100, 5);
    t.is(result.currentPage, 5);
    t.is(result.hasPrevious, true);
    t.is(result.hasNext, false);
    t.is(result.previousPage, 4);
    t.is(result.nextPage, null);
});

test('should handle custom itemsPerPage correctly', t => {
    const result = paginate(100, 5, { itemsPerPage: 35 });
    t.is(result.currentPage, 3);
    t.is(result.hasPrevious, true);
    t.is(result.hasNext, false);
    t.is(result.previousPage, 2);
    t.is(result.nextPage, null);
    t.is(result.totalPages, 3);
    t.is(result.pageLinks.length, 3);
});

test('should limit the number of page links based on maxPageHyperlinks', t => {
    const result = paginate(100, 5, { maxPageHyperlinks: 3 });
    t.is(result.pageLinks.length, 3);
    t.is(result.pageLinks[0].page, 3);
    t.is(result.pageLinks[1].page, 4);
    t.is(result.pageLinks[2].page, 5);
});

test('should include "go to first" hyperlink if includeFirstHyperlink is true', t => {
    const result = paginate(100, 5, { includeFirstHyperlink: true });
    t.is(result.firstPage, 1);
});

test('should not include "go to first" hyperlink if includeFirstHyperlink is false', t => {
    const result = paginate(100, 5, { includeFirstHyperlink: false });
    t.is(result.firstPage, undefined);
});

test('should include "go to last" hyperlink if includeLastHyperlink is true', t => {
    const result = paginate(1000, 5, { includeLastHyperlinks: true });
    t.is(result.lastPage, 50);
});

test('should include debug information when debug mode is enabled', t => {
    const result = paginate(100, 5, { debug: true });

    t.deepEqual(result.debugInfo, {
        startPage: 1,
        endPage: 5,
        maxPageHyperlinks: 8,
    });
});

test('should not include debug information when debug mode is disabled', t => {
    const result = paginate(100, 5, { debug: false });
    t.is(result.debugInfo, undefined);
});

test('should handle pagination with zero items', t => {
    const result = paginate(0, 1);
    t.is(result.totalPages, 0);
    t.deepEqual(result.pageLinks, []);
});

test('should handle pagination with a single item correctly', t => {
    const result = paginate(1, 1);
    t.is(result.totalPages, 1);
    t.is(result.pageLinks.length, 1);
});

test('should handle currentPage less than 1 by setting it to 1', t => {
    const result = paginate(100, -1);
    t.is(result.currentPage, 1);
});

test('should handle currentPage greater than totalPages by setting it to totalPages', t => {
    const result = paginate(100, 1000);
    t.is(result.currentPage, 5);
});

test('should handle all options combined correctly', t => {
    const result = paginate(200, 10, {
        itemsPerPage: 30,
        maxPageHyperlinks: 5,
        includeFirstHyperlink: true,
        includeFirstHyperlink: true,
        debug: true,
    });

    t.is(result.currentPage, 7);
    t.is(result.totalPages, 7);
    t.is(result.pageLinks.length, 5);
    t.is(result.firstPage, 1);
    t.is(result.lastPage, undefined);
    t.deepEqual(result.debugInfo, {
        startPage: 3,
        endPage: 7,
        maxPageHyperlinks: 5,
    });
});