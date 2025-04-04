package com.jdpj.book.services;

import com.jdpj.book.models.Book;
import com.jdpj.book.models.User;

import java.util.List;

public interface BookService {

    List<Book> findAll();

    Book findById(int id);

    Book save(Book book);

    void deleteById(int id);
}
