package com.jdpj.book.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

@Entity
@Table(name="reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reviewid")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private User userR;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookid")
    private Book book;

    @Column(name="content")
    @Nullable
    private String content;

    @Column(name="rating")
    @Nullable
    private int rating;

    // constructors
    public Review() {
    }

    public Review(int id, User user, Book book, String content, int rating) {
        this.id = id;
        this.userR = user;
        this.book = book;
        this.content = content;
        this.rating = rating;
    }

    // Getter and Setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and Setter for user
    public User getUser() {
        return userR;
    }

    public void setUser(User user) {
        this.userR = user;
    }

    // Getter and Setter for Book
    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    // Getter and Setter for content
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Getter and Setter for rating
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

}
