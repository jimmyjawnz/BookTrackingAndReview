package com.jdpj.book.dao;

import com.jdpj.book.models.Review;
import com.jdpj.book.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
