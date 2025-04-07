package com.jdpj.book.services;

import com.jdpj.book.dao.BookRepository;
import com.jdpj.book.dao.ReviewRepository;
import com.jdpj.book.models.Book;
import com.jdpj.book.models.Friend;
import com.jdpj.book.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book findById(int id) {
        Optional<Book> result = bookRepository.findById(id);

        Book book = null;

        if (result.isPresent()) {
            book = result.get();
        }
        else {
            // we didn't find the employee
            throw new RuntimeException("Did not find book id - " + id);
        }

        return book;
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void deleteById(int id) {
        bookRepository.deleteById(id);
    }

    @Override
    public List<Review> getBookReviews(int id) {
        List<Review> allReviews = reviewRepository.findAll();
        return allReviews.stream()
                .filter(review -> review.getBook().getId() == id)
                .collect(Collectors.toList());
    }
}
