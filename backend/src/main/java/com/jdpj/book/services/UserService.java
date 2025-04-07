package com.jdpj.book.services;

import com.jdpj.book.models.Friend;
import com.jdpj.book.models.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findById(int id);

    User save(User user);

    void deleteById(int id);

    List<Friend> getUserFriends(int id);

    Friend saveFriend(Friend friend);
}
