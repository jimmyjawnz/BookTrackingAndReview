package com.jdpj.book.services;

import com.jdpj.book.dao.BookListRepository;
import com.jdpj.book.dao.BookRepository;
import com.jdpj.book.dao.ListToBookRepository;
import com.jdpj.book.models.Book;
import com.jdpj.book.models.BookList;
import com.jdpj.book.models.Friend;
import com.jdpj.book.models.ListToBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookListServiceImpl implements BookListService {
    private BookListRepository bookListRepository;
    private ListToBookRepository listToBookRepository;

    @Autowired
    public BookListServiceImpl(BookListRepository bookListRepository, ListToBookRepository listToBookRepository) {
        this.bookListRepository = bookListRepository;
        this.listToBookRepository = listToBookRepository;
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

    @Override
    public List<Book> getBooksByListId(int id) {
        List<Book> bookList = new ArrayList<>();

        // Get all book list relations
        List<ListToBook> allBookListRelations = listToBookRepository.findAll();

        // Loop through all relations
        for (ListToBook listToBook : allBookListRelations) {
            // If relation has a matching id add the books
            if (listToBook.getBookList().getId() == id) {
                 bookList.add(listToBook.getBook());
            }
        }

        return bookList;
    }

    @Override
    public ListToBook saveBookToList(Book book, int listId) {
        BookList bookList = findById(listId);

        // Create a new relation and fill it with data
        ListToBook newRelation = new ListToBook();
        newRelation.setBook(book);
        newRelation.setBookList(bookList);

        // Return the relation and save it to the database
        return listToBookRepository.save(newRelation);
    }
}
