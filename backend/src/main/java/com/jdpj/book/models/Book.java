package com.jdpj.book.models;

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

    @Column(name="author")
    private String author;

    @Column(name="year")
    private int year;

    @Column(name="rating")
    private int rating;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<ListToBook> listToBooks;

    // constructors
    public Book() { }

    public Book(int id, String title, String author, int year, int rating, List<ListToBook> listToBooks) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
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

    // Getter and Setter for author
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    // Getter and Setter for year
    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
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
                ", author='" + author + '\'' +
                ", year='" + year + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
}
