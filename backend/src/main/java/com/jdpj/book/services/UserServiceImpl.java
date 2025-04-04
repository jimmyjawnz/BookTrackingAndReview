package com.jdpj.book.services;

import com.jdpj.book.dao.FriendRepository;
import com.jdpj.book.dao.UserRepository;
import com.jdpj.book.models.Friend;
import com.jdpj.book.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private FriendRepository friendRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, FriendRepository friendRepository) {
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(int id) {
        Optional<User> result = userRepository.findById(id);

        User user = null;

        if (result.isPresent()) {
            user = result.get();
        }
        else {
            // we didn't find the employee
            throw new RuntimeException("Did not find User id - " + id);
        }

        return user;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteById(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<Friend> getUserFriends(int id) {
        List<Friend> allFriends = friendRepository.findAll();
        return allFriends.stream()
                .filter(friend -> friend.getUser().getId() == id)
                .collect(Collectors.toList());
    }
}
