package com.jdpj.book.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userid")
    private int id;

    @Nullable
    @Column(name="username")
    private String userName;

    @Column(name="password")
    private String password;

    @Column(name="email")
    private String email;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Friend> listFriends = new ArrayList<>();

    // define getter/setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Friend> getFriends() {
        return  this.listFriends;
    }

    public void setFriends(List<Friend> friends) {
        this.listFriends = friends;
    }

    // define constructors
    public User() {
    }

    public User(String userName, String password, String email, List<Friend> friends) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.listFriends = friends;
    }

    // define toString
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
