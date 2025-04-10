package com.jdpj.book.controllers;

import com.jdpj.book.models.Book;
import com.jdpj.book.models.BookList;
import com.jdpj.book.models.ListToBook;
import com.jdpj.book.services.BookListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.jdpj.book.dto.BookListdto;
import com.jdpj.book.dto.BookDTO;
import java.util.stream.Collectors;





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
    public List<BookListdto> findAll() {
        return bookListService.findAll().stream()
                .map(bookList -> new BookListdto(
                        bookList.getId(),
                        bookList.getName(),
                        bookList.getVisibility(),
                        bookList.getUser().getId()
                ))
                .toList();
    }


    @GetMapping("/bookLists/{bookListId}")
    public BookList getBookList(@PathVariable int bookListId) {

        BookList bookList = bookListService.findById(bookListId);
        System.out.println(bookListService.findAll());


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

//    @GetMapping("/booksInList/{bookListId}")
//    public List<Book> getBooksInList(@PathVariable int bookListId) {
//
//        BookList bookList = bookListService.findById(bookListId);
//
//        if (bookList == null) {
//            throw new RuntimeException("BookList id not found - " + bookListId);
//        }
//
//        List<Book> books = bookListService.getBooksByListId(bookListId);
//
//        if (books == null) {
//            throw new RuntimeException("BookList books returned null - " + bookListId);
//        }
//
//        return books;
//    }

    @PostMapping("booksInList/{bookListId}")
    public ListToBook addBookToList(@PathVariable int bookListId, @RequestBody Book book) {
        return bookListService.saveBookToList(book, bookListId);
    }

    @GetMapping("/booksInList/{bookListId}")
    public List<BookDTO> getBooksInList(@PathVariable Long bookListId) {
        List<Book> books = bookListService.getBooksByListId(bookListId.intValue());
        return books.stream()
                .map(book -> new BookDTO((long) book.getId(), book.getTitle(), book.getRating()))
                .collect(Collectors.toList());
    }



}
