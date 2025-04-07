package com.jdpj.book.dao;

import com.jdpj.book.models.ListToBook;
import com.jdpj.book.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListToBookRepository extends JpaRepository<ListToBook, Integer> {
}
