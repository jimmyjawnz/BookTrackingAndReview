package com.jdpj.book.services;

// List of imports for models, repositories, Spring Boot, and Bcrypt
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jdpj.book.dao.BookListRepository;
import com.jdpj.book.dao.FriendRepository;
import com.jdpj.book.dao.UserRepository;
import com.jdpj.book.models.BookList;
import com.jdpj.book.models.Friend;
import com.jdpj.book.models.User;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private FriendRepository friendRepository;
    private BookListRepository bookListRepository;

    // Constructor dependency injection for UserRepository and FriendRepository
    @Autowired
    public UserServiceImpl(UserRepository userRepository, FriendRepository friendRepository) {
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
    }

    // Returns a list of all users from the database
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Finds a user in the database by the given ID
    // Throw an exception if no user is linked to the given ID
    @Override
    public User findById(int id) {
        Optional<User> result = userRepository.findById(id);

        User user = null;

        if (result.isPresent()) {
            user = result.get();
        }
        else {
            throw new RuntimeException("Did not find User id - " + id);
        }

        return user;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Saves a user to the database after encoding a plain-text password
    // assuming it wasn't already encoded
    @Override
    public User save(User user) {
        // Hashes the password only if it hasn't been encoded yet
        if (!user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    // Deletes a user from the database by their ID
    @Override
    public void deleteById(int id) {
        userRepository.deleteById(id);
    }

    // Returns a list of friends associated with the provided user ID
    @Override
    public List<Friend> getUserFriends(int id) {
        List<Friend> allFriends = friendRepository.findAll();
        // Filters only the friends where the user ID matches
        return allFriends.stream()
                .filter(friend -> friend.getUser().getId() == id)
                .collect(Collectors.toList());
    }

    // Saves a new friend to the current user
    @Override
    public Friend saveFriend(Friend friend) {
        return friendRepository.save(friend);
    }

    // Returns all the book lists owned by the user with the provided ID
    @Override
    public List<BookList> getOwnedBookLists(int id) {
        List<BookList> allBookLists = bookListRepository.findAll();
        // Filters the book lists by user ID
        return allBookLists.stream()
                .filter(bl -> bl.getUser().getId() == id)
                .collect(Collectors.toList());
    }
}
