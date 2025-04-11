package com.jdpj.book.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Primary key userid is auto generated
    @Column(name="userid")
    private int id;

    // Optional username
    @Nullable
    @Column(name="username")
    private String userName;

    // Required password, stored hashed in the database
    @Column(name="password")
    private String password;

    // Required email
    @Column(name="email")
    private String email;

    // Grabs a list of users that this user has added as friends
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Friend> listFriends = new ArrayList<>();

    // Grabs a list of users who have added this user as a friend
    @OneToMany(mappedBy = "friend", fetch = FetchType.LAZY)
    private List<Friend> listFriended = new ArrayList<>();

    // Grabs a list of book lists created by this user
    @OneToMany(mappedBy = "userBL", fetch = FetchType.LAZY)
    private List<BookList> listBookLists = new ArrayList<>();

    // List of reviews written by this user
    @OneToMany(mappedBy = "userR", fetch = FetchType.LAZY)
    private List<Review> listReviews = new ArrayList<>();

    // define getter/setters for all fields
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Friend> getFriends() {
        return  this.listFriends;
    }

    public void setFriends(List<Friend> friends) {
        this.listFriends = friends;
    }

    public void setFriended(List<Friend> friends) {
        this.listFriended = friends;
    }

    public List<Friend> getFriended() {
        return  this.listFriended;
    }

    public void setBookLists(List<BookList> bookLists) {
        this.listBookLists = bookLists;
    }

    public List<BookList> getBookLists() {
        return  this.listBookLists;
    }

    public void setReviews(List<Review> reviews) { this.listReviews = reviews; }

    public List<Review> getReviews() {return this.listReviews;}

    // define constructors
    public User() {
    }

    // All-Arg constructor excluding the auto generated ID
    public User(String userName, String password, String email, List<Friend> friends, List<BookList> booklists, List<Review> reviews) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.listFriends = friends;
        this.listBookLists = booklists;
        this.listReviews = reviews;
    }

    // define toString
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
