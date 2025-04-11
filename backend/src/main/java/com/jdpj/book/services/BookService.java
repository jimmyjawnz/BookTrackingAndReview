package com.jdpj.book.services;

import java.util.List;

import com.jdpj.book.models.Book;
import com.jdpj.book.models.Review;

public interface BookService {

    // Retrieves a list of all books in the system
    List<Book> findAll();

    // Find a specific book in the database by it's ID
    Book findById(int id);

    // Save a new book or update an existing one
    Book save(Book book);

    // Delete a book from the database using it's ID
    void deleteById(int id);

    // Retrieve all reviews for a specific book
    List<Review> getBookReviews(int id);
}
