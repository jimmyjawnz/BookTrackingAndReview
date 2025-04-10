package com.jdpj.book.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userid")
    private int id;

    @Nullable
    @Column(name="username")
    private String userName;

    @Column(name="password")
    private String password;

    @Column(name="email")
    private String email;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Friend> listFriends = new ArrayList<>();

    @OneToMany(mappedBy = "friend", fetch = FetchType.LAZY)
    private List<Friend> listFriended = new ArrayList<>();

    @OneToMany(mappedBy = "userBL", fetch = FetchType.LAZY)
    private List<BookList> listBookLists = new ArrayList<>();

    @OneToMany(mappedBy = "userR", fetch = FetchType.LAZY)
    private List<Review> listReviews = new ArrayList<>();

    // define getter/setters
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
