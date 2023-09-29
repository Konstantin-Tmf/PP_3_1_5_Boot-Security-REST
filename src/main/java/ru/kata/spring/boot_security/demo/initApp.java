package ru.kata.spring.boot_security.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import java.util.*;

@Component
public class initApp {
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    private final Role roleAdmin = new Role("ROLE_ADMIN");
    private final Role roleUser = new Role("ROLE_USER");

    @Autowired
    public initApp(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Bean
    public void init() {

        roleService.save(roleAdmin);
        roleService.save(roleUser);

        User admin = new User("Admin", "Petrov", 26, "petrov@gmail.com", "petrov@gmail.com", passwordEncoder.encode("100"));
        User user = new User("User", "Ivanov", 31, "ivanov@gmail.com", "ivanov@gmail.com", passwordEncoder.encode("100"));

        List<Role> adminRoles = new ArrayList<>();
        adminRoles.add(roleAdmin);

        List<Role> userRoles = new ArrayList<>();
        userRoles.add(roleUser);

        admin.setRoles(adminRoles);
        user.setRoles(userRoles);

        userService.save(admin);
        userService.save(user);

    }

}


