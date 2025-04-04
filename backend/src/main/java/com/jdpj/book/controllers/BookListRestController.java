package com.jdpj.book.controllers;

import com.jdpj.book.models.Book;
import com.jdpj.book.models.BookList;
import com.jdpj.book.services.BookListService;
import com.jdpj.book.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookListRestController {
    private BookListService bookListService;

    @Autowired
    public BookListRestController(BookListService bookListService) {
        this.bookListService = bookListService;
    }

    @GetMapping("/bookLists")
    public List<BookList> findAll() {
        return bookListService.findAll();
    }

    @GetMapping("/bookLists/{bookListId}")
    public BookList getBookList(@PathVariable int bookListId) {

        BookList bookList = bookListService.findById(bookListId);

        if (bookList == null) {
            throw new RuntimeException("BookList id not found - " + bookListId);
        }

        return bookList;
    }

    @PostMapping("/bookLists")
    public BookList addBookList(@RequestBody BookList bookList) {

        bookList.setId(0);

        return bookListService.save(bookList);
    }

    @PutMapping("/bookLists")
    public BookList updateBookList(@RequestBody BookList bookList) {

        return bookListService.save(bookList);
    }

    @DeleteMapping("/bookLists/{bookListId}")
    public String deleteBookList(@PathVariable int bookListId) {

        BookList dbBookList = bookListService.findById(bookListId);

        if (dbBookList == null) {
            throw new RuntimeException("BookList id not found - " + bookListId);
        }

        bookListService.deleteById(bookListId);

        return "Deleted BookList id - " + bookListId;
    }

}
