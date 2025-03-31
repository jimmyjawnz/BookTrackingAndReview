package com.jdpj.book.services;

import com.jdpj.book.models.Friend;
import com.jdpj.book.models.User;

import java.util.List;

public interface FriendService {
    List<User> findAll();

    Friend findById(int id);

    Friend save(Friend Friend);

    void deleteById(int id);
}
