package com.jdpj.book.models;

import jakarta.persistence.*;

@Entity
@Table(name="booklists")
public class BookList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booklistid")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private User user;

    @Column(name="name")
    private String name;

    // Null -> Private | 0 -> Friends | 1 -> Public
    @Column(name="visibility")
    private boolean visibility;


}
