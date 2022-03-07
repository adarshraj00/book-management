const router=require('express').Router();
const verifyToken=require('../middleware/verifyToken')
const booksController=require('../controllers/books');

// for admin
router.post('/add-new-book',verifyToken.admin,booksController.addNewBook)
router.put('/increment-book-count/:id',verifyToken.admin,booksController.incrementBookCount)
router.put('/decrement-book-count/:id',verifyToken.admin,booksController.decrementBookCount)
router.get('/all',verifyToken.admin,booksController.getAllBooks)
router.delete('/:id',verifyToken.admin,booksController.deleteBook)
//for user
router.post('/issue-book',verifyToken.user,booksController.issueBook)
router.get('/recommendations',verifyToken.user,booksController.getRecomendations)
router.get('/get-issued-books',verifyToken.user,booksController.getIssuedBooks)
router.get('/available',verifyToken.user,booksController.getAvailableBooks)


router.get("/search-book", booksController.searchBook);


module.exports=router;