import express from 'express';
import { addToCart, addToFavourites, deleteBook, getBookById, getBooks, getCartBooks, getFavrouteBooks, postBook, recentBooks, removeFromCart, removeFromFavourites, updateBooks } from '../controllers/book.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.post('/addBook',isAuthenticated,postBook)
router.put('/updateBook/:id',isAuthenticated,updateBooks)
router.delete('/deleteBook/:id',isAuthenticated,deleteBook)
router.get('/getBook/:id',getBookById)
router.get('/getBooks',getBooks)
router.get('/recentBooks',recentBooks)
router.put('/favourteBook/:id',isAuthenticated,addToFavourites)
router.get('/removefavourteBook/:id',isAuthenticated,removeFromFavourites)
router.get('/getfavourteBooks',isAuthenticated,getFavrouteBooks)
router.put('/addToCart/:id',isAuthenticated,addToCart)
router.put('/removeToCart/:id',isAuthenticated,removeFromCart)
router.get('/getCartBooks',isAuthenticated,getCartBooks)

export default router
