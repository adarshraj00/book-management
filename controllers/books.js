const Book = require("../Models/Book");

module.exports = {
  addNewBook: async (req, res) => {
    try {
      // same title ,same name,year published cannot be added again.
      const book = await Book.find({
        title: req.body.title,
        name: req.body.name,
        yearOfPublication: req.body.yearOfPublication,
      });
      if (book.length > 0) {
        return res.status(400).json({ msg: "book already exists" });
      }
      const newBook = new Book(req.body);
      await newBook.save();
      res.status(200).json({ msg: "book added" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  },
  incrementBookCount: async (req, res) => {
    try {
      console.log(req.params);
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(400).json({ msg: "book does not exist" });
      }
      book.noOfCopies++;
      await book.save();
      res
        .status(200)
        .json({ msg: "book count incremented", count: book.noOfCopies });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  },
  decrementBookCount: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(400).json({ msg: "book does not exist" });
      }
      if (book.noOfCopies === 0) {
        return res.status(400).json({ msg: "book count is already 0" });
      }
      book.noOfCopies--;
      await book.save();
      res
        .status(200)
        .json({ msg: "book count decremented", count: book.noOfCopies });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  },
  deleteBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);

      // if already issued cant be deleted
      if (!book) {
        return res.status(400).json({ msg: "book does not exist" });
      }
      await book.remove();
      res.status(200).json({ msg: "book deleted", book });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  },
  issueBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(400).json({ msg: "book does not exist" });
      }
      if(book.noOfCopies===book.issueCount){
        return res.status(400).json({ msg: "book is out of stock" });
      }
      book.issueCount++;
      await book.save();
      res.status(200).json({ msg: "book issued", book });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  },
  searchBook: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      res.status(500).json({});
    }
  },
  getIssuedBooks: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      res.status(500).json({});
    }
  },
  getAvailableBooks: async (req, res) => {
    try {
      let books = await Book.find({}); //??
      books = books.filter((book) => {
        return book.noOfCopies > book.issueCount;
      });
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).json({msg:"server error"});
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find({});
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  },
  getRecomendations: async (req, res) => {
    try {
      let books = await Book.find({}).sort({ issueCount: -1 }).limit(5);
      console.log(books, "books");
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  },
  searchBook: async (req, res) => {
    try {
      const query = req.query;
      let obj = {};
      if (query.title) {
        obj.title = query.title;
      }
      if (query.author) {
        obj.author = query.author;
      }
      if (query.startYear) {
        obj.yearOfPublication = { $gte: query.startYear };
      }
      if (query.endYear) {
        obj.yearOfPublication = {
          ...obj.yearOfPublication,
          $lte: query.endYear,
        };
      }
      const books = await Book.find(obj);
      res.status(200).json({ books });
    } catch (err) {
      console.log(err);
      res.status(500).json({msg});
    }
  },
};
