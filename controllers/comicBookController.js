const ComicBook = require('../models/comicBookModel');

// Create a new comic book
exports.createComicBook = async (req, res) => {
  try {
    const existingComic = await ComicBook.findOne(req.body);

    //Check for existing comic book with all the same attributes
    if (existingComic) {
      return res.status(400).json({
        success: false,
        message: 'Comic book with these attributes already exists.'
      });
    }

    const {  yearOfPublication, price, discount, numberOfPages, condition } = req.body;

    // Validate the condition
    const validConditions = ['new', 'used'];
    if (!validConditions.includes(condition)) {
      return res.status(400).json({
        success: false,
        message: 'Condition must be either "new" or "used".'
      });
    }

    // Validate the discount value (must be between 0 and 100)
    if (discount < 0 || discount > 100) {
      return res.status(400).json({
        success: false,
        message: 'Discount must be a value between 0 and 100.'
      });
    }

    //Validate the integer input 
    if (price < 0 || numberOfPages < 0 || yearOfPublication < 0 ) {
      return res.status(400).json({
        success: false,
        message: 'Check price, numberOfPages and yearOfPublication.'
      });
    }

    const comicBook = await ComicBook.create(req.body);
    res.status(201).json({ success: true, data: comicBook });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a comic book
exports.updateComicBook = async (req, res) => {
  try {

    const {  yearOfPublication, price, discount, numberOfPages, condition } = req.body;

    // Validate the condition
    const validConditions = ['new', 'used'];
    if (!validConditions.includes(condition)) {
      return res.status(400).json({
        success: false,
        message: 'Condition must be either "new" or "used".'
      });
    }

    // Validate the discount value (must be between 0 and 100)
    if (discount < 0 || discount > 100) {
      return res.status(400).json({
        success: false,
        message: 'Discount must be a value between 0 and 100.'
      });
    }

    // Validate the integer input
    if (price < 0 || numberOfPages < 0 || yearOfPublication < 0 ) {
      return res.status(400).json({
        success: false,
        message: 'Check price, numberOfPages and yearOfPublication.'
      });
    }

    const comicBook = await ComicBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comicBook) return res.status(404).json({ success: false, message: 'Comic book not found' });
    res.status(200).json({ success: true, data: comicBook });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a comic book
exports.deleteComicBook = async (req, res) => {
  try {
    const comicBook = await ComicBook.findByIdAndDelete(req.params.id);
    if (!comicBook) return res.status(404).json({ success: false, message: 'Comic book not found' });
    res.status(200).json({ success: true, message: 'Comic book deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//Get all comic books with page limit 10
exports.getAllComics = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate how many records to skip
    const skip = (page - 1) * limit;

    const comicBooks = await ComicBook.find()
      .skip(skip)
      .limit(Number(limit));

    const totalComics = await ComicBook.countDocuments();

    res.status(200).json({
      success: true,
      data: comicBooks,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalComics / limit),
        totalRecords: totalComics
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};



// Get all comic books with sorting based on query parameters
exports.getComicsWithSorting = async (req, res) => {
  try {
    const { sort, order = 'asc', page = 1, limit = 10 } = req.query;

    // Validate sorting and field types
    const validSortFields = {
      'bookName': 'string',
      'authorName': 'string',
      'yearOfPublication': 'number',
      'price': 'number',
      'discount': 'number',
      'numberOfPages': 'number'
    };

    if (!sort) {
      return res.status(400).json({ success: false, message: `Sorting option error. Valid options: ${Object.keys(validSortFields).join(', ')}` });
    }

    if (!validSortFields[sort]) {
      return res.status(400).json({ success: false, message: `Invalid sort field: ${sort}. Valid options: ${Object.keys(validSortFields).join(', ')}` });
    }

    const sortOrder = order === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const comicBooks = await ComicBook.find()
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    const totalComics = await ComicBook.countDocuments();

    if (comicBooks.length === 0) {
      return res.status(404).json({ success: false, message: `No comics found for sorting by ${sort}.` });
    }

    res.status(200).json({
      success: true,
      data: comicBooks,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalComics / limit),
        totalRecords: totalComics
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// Get all comic books with filters based on query parameters
exports.getComicsWithFilters = async (req, res) => {
  try {
    const { bookName, authorName, yearOfPublication, price, discount, numberOfPages, condition, page = 1, limit = 10 } = req.query;

    // Define valid filter attributes and their types
    const validFilters = {
      bookName: 'string',
      authorName: 'string',
      yearOfPublication: 'number',
      price: 'number',
      discount: 'number',
      numberOfPages: 'number',
      condition: 'string'
    };

    // Check if at least one valid filter is provided
    const filtersProvided = { bookName, authorName, yearOfPublication, price, discount, numberOfPages, condition };
    const filterKeys = Object.keys(filtersProvided).filter(key => filtersProvided[key]);

    if (filterKeys.length === 0) {
      return res.status(400).json({ success: false, message: `Filter option error. Valid options: ${Object.keys(validFilters).join(', ')}` });
    }

    // Validate each filter
    for (const key of filterKeys) {
      if (!validFilters[key]) {
        return res.status(400).json({ success: false, message: `Invalid filter field: ${key}. Valid options are: ${Object.keys(validFilters).join(', ')}` });
      }

      const filterType = validFilters[key];
      const filterValue = filtersProvided[key];

      // Ensure numeric fields are numbers
      if (filterType === 'number' && isNaN(filterValue)) {
        return res.status(400).json({ success: false, message: `Filter "${key}" must be a number.` });
      }
    }

    // Create the MongoDB query object based on the validated filters
    let query = {};
    if (bookName) query.bookName = new RegExp(bookName, 'i');
    if (authorName) query.authorName = new RegExp(authorName, 'i');
    if (yearOfPublication) query.yearOfPublication = yearOfPublication;
    if (price) query.price = { $lte: price }; // Assuming we want to filter by max price
    if (discount) query.discount = { $gte: discount }; // Assuming we want to filter by minimum discount
    if (numberOfPages) query.numberOfPages = { $gte: numberOfPages }; // Assuming minimum number of pages
    if (condition) query.condition = condition;

    const skip = (page - 1) * limit;

    const comicBooks = await ComicBook.find(query)
      .skip(skip)
      .limit(Number(limit));

    const totalComics = await ComicBook.countDocuments(query);

    if (comicBooks.length === 0) {
      return res.status(404).json({ success: false, message: 'No comics found matching the provided filters.' });
    }

    res.status(200).json({
      success: true,
      data: comicBooks,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalComics / limit),
        totalRecords: totalComics
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//Get a comic book based on ID
exports.getComicBookDetails = async (req, res) => {
  try {
    const comicBook = await ComicBook.findById(req.params.id);
    if (!comicBook) return res.status(404).json({ success: false, message: 'Comic book not found' });
    res.status(200).json({ success: true, data: comicBook });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
