package com.jdpj.book.services;

import com.jdpj.book.dao.BookListRepository;
import com.jdpj.book.models.BookList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookListServiceImpl implements BookListService {
    private BookListRepository bookListRepository;

    @Autowired
    public BookListServiceImpl(BookListRepository bookListRepository) {
        this.bookListRepository = bookListRepository;
    }

    @Override
    public List<BookList> findAll() {
        return bookListRepository.findAll();
    }

    @Override
    public BookList findById(int id) {
        Optional<BookList> result = bookListRepository.findById(id);

        BookList bookList = null;

        if (result.isPresent()) {
            bookList = result.get();
        }
        else {
            // we didn't find the employee
            throw new RuntimeException("Did not find BookList id - " + id);
        }

        return bookList;
    }

    @Override
    public BookList save(BookList bookList) {
        return bookListRepository.save(bookList);
    }

    @Override
    public void deleteById(int id) {
        bookListRepository.deleteById(id);
    }
}
