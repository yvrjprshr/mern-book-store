const Book = require('../models/Book.js');

const getAllBooks = async (req, res, next) => {
    let books;

    try {
        books = await Book.find();

    } catch (err) {
        console.log(err);
    }

    if (!books) {
        return res.status(404).json({ message: "No Products found" });
    }

    return res.status(200).json({ books });
}

const getById = async(req, res, next) => {
    const id = req.params.id;
    console.log('hare rama', id);
    let book;
    try{
        book = await Book.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!book){
        return res.status(400).json({message: 'No book Found'});
    }

    return res.status(200).json({book});
}

const addBook = async (req, res, next) => {
    console.log('hare rama', req.body);
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
        book = new Book({
            name,
            author,
            description,
            price,
            available,
            image
        });
        book = await book.save();
    }catch(err){
        console.log(err);
    }

    if(!book){
        return res.status(500).json({message: "unable to add"});
    }

    return res.status(201).json({book});
}

const updateBook = async (req, res, nect) => {
    const id = req.params.id;
    const {name, author, description, price, available, image} = req.body;
    let book;
    try{
        book = await Book.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            image
        });
        book = await book.save();
    }catch(err){
        console.log(err);
    }

    
    if(!book){
        return res.status(404).json({message: 'Unable to update by this Id'});
    }

    return res.status(200).json({book});

};

const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try{
        book = await Book.deleteOne({_id:id});
    }catch(err){
        console.log('unable to delete book by this id');
    }
    if(!book){
        return res.status(400).json({message: 'unable to delete'})
    }

    return res.status(200).json({message: 'Book successfully deleted'});
}

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;