package com.jdpj.book.dao;

import com.jdpj.book.models.Book;
import com.jdpj.book.models.BookList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookListRepository extends JpaRepository<BookList, Integer> {
}
