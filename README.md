
# BookManagement API

This is a Node.js + Express + MongoDB API for managing comic books. The API includes routes for:
- Creating, editing, and deleting comic books
- Fetching a list of all comics with pagination
- Filtering and sorting comics based on attributes like `price`, `yearOfPublication`, `authorName`, etc.
- Fetching details of a single comic book by ID

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud instance)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ayudoshi/bookManagement.git
   cd bookManagement
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```
   MONGODB_URI=<your_mongodb_connection_string>
   PORT=3000
   ```

   Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.

4. **Run the server**

   ```bash
   npm start
   ```

   The API will be running on `http://localhost:3000`.

## API Endpoints

### 1. Add Comic Book

- **Endpoint**: `/api/addComic`
- **Method**: `POST`
- **Description**: Add a comic book if at least one parameter is unique. Checks for discount between 0-100 and integer parameters to be greater than 0.
- **Query Parameters**:
  - `bookName` (required): The book name.
  - `authorName` (required): The author name.
  - `yearOfPublication` (required): The year in which book was published. 
  - `price` (required): The price of book.
  - `discount` (optional): Discount price (default: 0)
  - `numberOfPages` (required): Total number of pages in the book.
  - `condition` (optional): Book condition (default: new)
  - `description` (optional): Description of the book.

### 2. Update Comic Book

- **Endpoint**: `/api/updateComic/:id`
- **Method**: `PUT`
- **Description**: Update a comic book. Checks for discount between 0-100 and integer parameters to be greater than 0.
- **Query Parameters**:
  - `bookName` (required): The book name.
  - `authorName` (required): The author name.
  - `yearOfPublication` (required): The year in which book was published. 
  - `price` (required): The price of book.
  - `discount` (optional): Discount price (default: 0)
  - `numberOfPages` (required): Total number of pages in the book.
  - `condition` (optional): Book condition (default: new)
  - `description` (optional): Description of the book.

### 3. Get All Comics (with Pagination)

- **Endpoint**: `/api/allcomics`
- **Method**: `GET`
- **Description**: Fetch all comics with pagination.
- **Query Parameters**:
  - `page` (optional): The page number (default: 1)
  - `limit` (optional): The number of records per page (default: 10)
 
### 4. Delete a Comic

- **Endpoint**: `/api/deleteComic/:id`
- **Method**: `DELETE`
- **Description**: Delete a comic with specified ID in URL if found in database.
- **Query Parameters**:
  - `ID` (required): The comic book ID to be deleted.

### 5. Get Comics with Filters (with Pagination)

- **Endpoint**: `/api/allcomics/filter`
- **Method**: `GET`
- **Description**: Fetch comics by applying filters like book name, author name, etc with atleast one valid filter.
- **Query Parameters**:
  - `bookName`: Filter by comic book name
  - `authorName`: Filter by author name
  - `yearOfPublication`: Filter by year of publication
  - `price`: Filter by maximum price
  - `discount`: Filter by minimum discount
  - `numberOfPages`: Filter by minimum number of pages
  - `condition`: Filter by condition (`new` or `used`)
  - Pagination parameters: `page` (optional): The page number (default: 1), `limit` (optional): The number of records per page (default: 10)

### 6. Get Comics with Sorting (with Pagination)

- **Endpoint**: `/api/allcomics/sort`
- **Method**: `GET`
- **Description**: Fetch comics with sorting by price, year of publication, etc with only one valid sorting option.
- **Query Parameters**:
  - `sort` (required): Sort by a specific attribute (e.g., `price`, `yearOfPublication`, `authorName`, etc.)
  - `order` (optional): Sort order (`asc` for ascending, `desc` for descending) (default: `asc`)
  - Pagination parameters: `page` (optional): The page number (default: 1), `limit` (optional): The number of records per page (default: 10

### 7. Get a Comic Book by ID

- **Endpoint**: `/api/comic/:id`
- **Method**: `GET`
- **Description**: Get a comic book with the specified ID if exist in database.
- **Query Parameters**:
  - `ID` (required): The comic book ID to be fetched.

## Testing with Postman

You can test the API using the provided Postman collection.

1. Download the Postman collection file from [here](./MangoJelly.postman_collection.json).
2. Import the collection into Postman.
3. Use the collection to test the various API endpoints.
