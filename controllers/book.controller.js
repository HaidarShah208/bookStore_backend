import User from "../model/user.js";
import Book from "../model/books.js";

//create book
export const postBook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Only admin can add books" });
    }
    const { url, title, author, price, description, language } = req.body;
    if (!url || !title || !author || !price || !description || !language) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const isTitle = await Book.findOne({ title });
    if (isTitle) {
      return res.status(400).json({ error: "Book title already exists" });
    }
    const book = new Book({ url, title, author, price, description, language });
    await book.save();
    res.status(201).json({ success: true, message: "book created", book });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// update book
export const updateBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Only admin can add books" });
    }
    const { id } = req.params;
    const { url, title, author, price, desc, language } = req.body;
    const book = await Book.findByIdAndUpdate(
      id,
      { $set: { url, title, author, price, desc, language } }, // Wrap fields in an object
      { new: true, runValidators: true } // Options to return updated book and validate input
    );
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ success: true, message: "Book updated", book });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// delete book
export const deleteBook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Only admin can delete books" });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ success: true, message: "Book deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// getBooks
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }); // latest shown first
    res.json({ success: true, books });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// recent books
export const recentBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }).limit(4); // means only latest added 4 books shown
    res.json({ success: true, books });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// get books by id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ success: true, book });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// add to favourtes
export const addToFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (user.favourties.includes(id)) {
      return res.status(400).json({ error: "Book already in favourites" });
    }
    user.favourties.push(id);
    await user.save();
    res.json({ success: true, message: "Book added to favourites", book });
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

// remove book from favorites
export const removeFromFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (user.favourties.includes(id)) {
      const index = user.favourties.indexOf(id);
      user.favourties.splice(index, 1);
    }
    await user.save();
    res.json({ success: true, message: "Book removed from favourites", book });
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

// get favroute books of particular user
export const getFavrouteBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favourties");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, books: user.favourties });
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

// add to cart
export const addToCart = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { id } = req.params;
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      if (user.cart.includes(id)) {
        return res.status(400).json({ error: "Book already in Cart" });
      }
      user.cart.push(id);
      await user.save();
      res.json({ success: true, message: "Book added to Cart", book });
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };


// remove from cart
export const removeFromCart = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { id } = req.params;
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      if (user.cart.includes(id)) {
        const index = user.cart.indexOf(id);
        user.cart.splice(index, 1);
      }
      await user.save();
      res.json({ success: true, message: "Book removed from cart", book });
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };


 // get cart for particuler user
 export const getCartBooks = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate("cart");
      const cart=user.cart.reverse()
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ success: true, data: cart });
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };