package com.jdpj.book.services;

import com.jdpj.book.models.Book;
import com.jdpj.book.models.BookList;
import com.jdpj.book.models.ListToBook;

import java.util.List;

public interface BookListService {

    List<BookList> findAll();

    BookList findById(int id);

    BookList save(BookList bookList);

    void deleteById(int id);

    List<Book> getBooksByListId(int id);

    ListToBook saveBookToList(Book book, int listId);
}
