package com.jdpj.book.services;

import com.jdpj.book.models.Book;
import com.jdpj.book.models.BookList;

import java.util.List;

public interface BookListService {

    List<BookList> findAll();

    BookList findById(int id);

    BookList save(BookList bookList);

    void deleteById(int id);
}
