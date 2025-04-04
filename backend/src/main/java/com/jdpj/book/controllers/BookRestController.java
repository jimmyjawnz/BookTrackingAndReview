package com.jdpj.book.controllers;

import com.jdpj.book.models.Book;
import com.jdpj.book.models.Review;
import com.jdpj.book.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookRestController {
    private BookService bookService;

    @Autowired
    public BookRestController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public List<Book> findAll() {
        return bookService.findAll();
    }

    @GetMapping("/books/{bookId}")
    public Book getBook(@PathVariable int bookId) {

        Book book = bookService.findById(bookId);

        if (book == null) {
            throw new RuntimeException("Book id not found - " + bookId);
        }

        return book;
    }

    @PostMapping("/books")
    public Book addBook(@RequestBody Book book) {

        book.setId(0);

        return bookService.save(book);
    }

    @PutMapping("/books")
    public Book updateBook(@RequestBody Book book) {

        return bookService.save(book);
    }

    @DeleteMapping("/books/{bookId}")
    public String deleteBook(@PathVariable int bookId) {

        Book dbBook = bookService.findById(bookId);

        if (dbBook == null) {
            throw new RuntimeException("Book id not found - " + bookId);
        }

        bookService.deleteById(bookId);

        return "Deleted book id - " + bookId;
    }

    @GetMapping("/bookReviews/{bookId}")
    public List<Review> getBookReviews(@PathVariable int bookId) {

        Book book = bookService.findById(bookId);

        if (book == null) {
            throw new RuntimeException("Book id not found - " + bookId);
        }

        List<Review> reviews = bookService.getBookReviews(bookId);

        if (reviews == null) {
            throw new RuntimeException("Book reviews returned null - " + bookId);
        }

        return reviews;
    }
}
