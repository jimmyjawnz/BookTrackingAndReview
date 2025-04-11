package com.jdpj.book.dto;

// DTO used to transfer simplified book list data
public class BookListdto {

    private int id;
    private String name;
    private boolean visibility;
    private int userId;

    // Constructor to initialize all the fields
    public BookListdto(int id, String name, boolean visibility, int userId) {
        this.id = id;
        this.name = name;
        this.visibility = visibility;
        this.userId = userId;
    }

    // Getters and setters
    public int getId() { return id; }
    public String getName() { return name; }
    public boolean getVisibility() { return visibility; }
    public int getUserId() { return userId; }

}
