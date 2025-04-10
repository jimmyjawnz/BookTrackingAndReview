package com.jdpj.book.dto;

public class BookDTO {
    private Long id;
    private String title;
    private int rating;

    // constructor
    public BookDTO(Long id, String title, int rating) {
        this.id = id;
        this.title = title;
        this.rating = rating;
    }

    // getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public int getRating() { return rating; }
}