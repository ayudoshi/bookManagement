const express = require('express');
const { createComicBook, updateComicBook, deleteComicBook, getAllComics, getComicsWithSorting, getComicsWithFilters, getComicBookDetails  } = require('../controllers/comicBookController');
const router = express.Router();

//Create a comic book
router.post('/addComic', createComicBook);

//Update a comic book
router.put('/updateComic/:id', updateComicBook);

//Delete a comic book
router.delete('/deleteComic/:id', deleteComicBook);

//Get all comic books
router.get('/allComics', getAllComics);

//Get all comic books with filter provided
router.get('/allComics/filter', getComicsWithFilters);

//Get all comic books with sorting option provided
router.get('/allComics/sort', getComicsWithSorting);

//Get details of a specific comic book by ID
router.get('/comic/:id', getComicBookDetails);

module.exports = router;
