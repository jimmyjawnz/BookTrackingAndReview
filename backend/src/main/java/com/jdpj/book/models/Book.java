package com.jdpj.book.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bookid")
    private int id;

    @Column(name="title")
    private String title;

    @Nullable
    @Column(name="image")
    private String image;

    @Nullable
    @Column(name="rating")
    private int rating;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<ListToBook> listToBooks;

    // constructors
    public Book() { }

    public Book(int id, String title, String image, int rating, List<ListToBook> listToBooks) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.rating = rating;
        this.listToBooks = listToBooks;
    }

    // Getter and Setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and Setter for title
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // Getter and Setter for image
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Getter and Setter for rating
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    // Getter and Setter for listToBooks
    public List<ListToBook> getListToBooks() {
        return listToBooks;
    }

    public void setListToBooks(List<ListToBook> listToBooks) {
        this.listToBooks = listToBooks;
    }

    // define toString
    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", image='" + image + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
}
