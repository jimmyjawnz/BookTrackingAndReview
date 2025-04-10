package com.jdpj.book.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="booklists")
public class BookList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booklistid")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private User userBL;

    @Nullable
    @Column(name="name")
    private String name;

    // Null -> Private | 0 -> Friends | 1 -> Public
    @Nullable
    @Column(name="visibility")
    private boolean visibility;

    @OneToMany(mappedBy = "booklist", fetch = FetchType.LAZY)
    private List<ListToBook> listToBooks;

    // constructors
    public BookList() {
    }

    public BookList(int id, User user, String name, boolean visibility, List<ListToBook> listToBooks) {
        this.id = id;
        this.userBL = user;
        this.name = name;
        this.visibility = visibility;
        this.listToBooks = listToBooks;
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
        return userBL;
    }

    public void setUser(User user) {
        this.userBL = user;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for visibility
    public boolean getVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    // Getter and Setter for listToBooks
    public List<ListToBook> getListToBooks() {
        return listToBooks;
    }

    public void setListToBooks(List<ListToBook> listToBooks) {
        this.listToBooks = listToBooks;
    }
}
