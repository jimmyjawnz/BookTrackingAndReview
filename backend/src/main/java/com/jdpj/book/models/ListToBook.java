package com.jdpj.book.models;

import jakarta.persistence.*;

@Entity
@Table(name="listtobook")
public class ListToBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booktolistid")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booklistid")
    private BookList booklist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookid")
    private Book book;

    // constructors
    public ListToBook() {
    }

    public ListToBook(int id, BookList booklist, Book book) {
        this.id = id;
        this.booklist = booklist;
        this.book = book;
    }

    // Getter and Setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and Setter for BookList
    public BookList getBookList() {
        return booklist;
    }

    public void setBookList(BookList booklist) {
        this.booklist = booklist;
    }

    // Getter and Setter for Book
    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

}
