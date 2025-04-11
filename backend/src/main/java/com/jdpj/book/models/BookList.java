package com.jdpj.book.models;

import java.util.List;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="booklists") // Maps the entity to the booklists table in the database
public class BookList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increments the id value
    @Column(name="booklistid")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY) // Many book lists can belong to one user
    @JoinColumn(name = "userid")
    private User userBL;

    @Nullable
    @Column(name="name") // Optional name for the book list
    private String name;

    // Null -> Private | 0 -> Friends | 1 -> Public
    @Nullable
    @Column(name="visibility")
    private boolean visibility;

    @OneToMany(mappedBy = "booklist", fetch = FetchType.LAZY)
    // One book list can contain multiple books
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
