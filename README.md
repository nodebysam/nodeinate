# NodeInate

NodeInate is a lightweight and flexible pagination library for Node.js, designed to simplify data pagination in your applications. Whether you're handling large datasets or need simple pagination for API responses, NodeInate provides an easy-to-use solution.

## Installation

To install NodeInate, you can use `npm` or `yarn`:

```bash
npm install nodeinate
```

or

```bash
yarn add nodeinate
```

## Usage
### Basic Example
To use NoteInate in your project, simply require it and call the __paginate__ function with your data parameters.

```javascript
const pageinate = require('nodeinate');

// Example: Paginate 200 items with 10 items per page on the current page 1.
const pagination = paginate(200, 1 {
    itemsPerPage: 20, // Items per page.
});

console.log(pagination);
```

### Parameters
__totalItems (required)__
* The total number of items to paginate.
* Type: __number__
* Example: __200__

__currentPage (required)__
* The current page number.
* Type __number__
* Example: __1__

__options (optional)__
* An object containing optional parameters for customizing pagination.

__itemsPerPage__
* The number of items per page.
* Type: __number__ (default: __config.itemsPerPage__)
* Example: __20__

__debug__
* Whether to enable debug mode.
* Type: __boolean__ (default: __config.debug__)
* Example: __true__

__maxPageHyperlinks__
* The maximum number of page hyperlinks to display.
* Type: __number__ (default: __config.maxPageHyperlinks__)
* Example: __5__

__includeFirstHyperlink__
* Whether to include a "Go to first page" hyperlink.
* Type: __boolean__ (default: __config.includeFirstHyperlink__)
* Exmaple: __true__

__includeLastHyperlink__
* Whether to include a "Go to last page" hyperlink.
* Type: __boolean__ (default: __config.includeLastHyperlink__)
* Example: __true__

### Example Output
```json
{
  "currentPage": 1,
  "totalPages": 10,
  "totalItems": 200,
  "itemsPerPage": 20,
  "pageLinks": [
    { "page": 1, "active": true },
    { "page": 2, "active": false },
    { "page": 3, "active": false },
    { "page": 4, "active": false },
    { "page": 5, "active": false }
  ],
  "hasPrevious": false,
  "hasNext": true,
  "previousPage": null,
  "nextPage": 2,
  "firstPage": 1,
  "lastPage": 10,
  "debugInfo": {
    "startPage": 1,
    "endPage": 5,
    "maxPageHyperlinks": 5
  }
}
```

### Explanation of Output
* __currentPage:__ The current page number.
* __totalPages:__ The total number of pages based on the total items and items per page.
* __totalItems:__ The total number of items.
* __itemsPerPage:__ The number of items per page.
* __pageLinks:__ An array of page link objects with __page__ and __active__ properties.
    * __page:__ The page number.
    * __active:__ A boolean indicating if this page is the current page.
* __hasPrevious:__ __true__ if there is a previous page, otherwise __false__.
* __hasNext:__ __true__ if there is a next page, otherwise __false__.
* __previousPage:__ The page number of the previous page, or __null__ if there is no previous page.
* __nextPage:__ The page number of the next page, or __null__ if there is no next page.
* __firstPage:__ The first page link if enabled.
* __lastPage:__ The last page link if enabled.
* __debugInfo:__ (only shown when debug is true): Contains details about the range of pages displayed (__startPage__, __endPage__) and the max number of page hyperlinks (__maxPageHyperlinks__).

## Configuration
You can configure the default values of __NodeInate__ by modifying the __config.js__ file.

### Default Configuration
The default configuration values are as follows:

```javascript
module.exports = {
  itemsPerPage: 20,
  debug: false,
  maxPageHyperlinks: 8,
  includeFirstHyperlink: true,
  includeLastHyperlinks: true,
};
```

* __itemsPerPage:__ Default number of items displayed per page.
* __debug:__ Enables debug mode which shows additional information about the pagination range.
* __maxPageHyperlinks:__ Maximum number of page hyperlinks to display in the pagination.
* __includeFirstHyperlink:__ Whether to include a "Go to first page" link.
* __includeLastHyperlink:__ Whether to include a "Go to last page" link.

To modify the default settings, change the values in the __config.js__ file.

## Tests
NodeInate is tested using the AVA test runner. You can run the tests to ensure that everything works correctly.

### Running Tests
To run the tests, use the following command:

```bash
npm test
```

Or if you are using Yarn:

```bash
yarn test
```

## License
NodeInate is licensed under the __GNU General Public Licsnse v3.0__.
See the [LICENSE](./LICENSE) file for more details.

## Contributing
If you would like to contribute to the development of NodeInate, please feel free to fork the repository and submit all pull requests.

For any issues or feature requests, please open an issue in the repository.