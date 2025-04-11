package com.jdpj.book.services;

import java.util.List;

import com.jdpj.book.models.BookList;
import com.jdpj.book.models.Friend;
import com.jdpj.book.models.User;

public interface UserService {

    // Method to retrieve all users in a list
    List<User> findAll();

    User findById(int id);

    // Save a new user or update existing ones
    User save(User user);

    // Delete a user by their unique id
    void deleteById(int id);

    // Method to get a list of friends for a given user
    List<Friend> getUserFriends(int id);

    Friend saveFriend(Friend friend);

    // Method to get all book lists owned by a given user based on user ID
    List<BookList> getOwnedBookLists(int id);
}
