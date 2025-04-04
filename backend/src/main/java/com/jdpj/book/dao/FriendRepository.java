package com.jdpj.book.dao;

import com.jdpj.book.models.BookList;
import com.jdpj.book.models.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Integer> {
}
