package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entities.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    void save(User user);

    void deleteUser(Long id);

    User findByUsername(String username);

    void updateUser(Long id, User user);

    User getOneUser(Long id);

    void createUser(User user);
}
