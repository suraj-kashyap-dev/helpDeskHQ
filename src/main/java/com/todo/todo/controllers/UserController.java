package com.todo.todo.controllers;

import com.todo.todo.models.User;
import com.todo.todo.repositories.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public Map<String, Object> index() {
        List<User> users = userRepository.findAll();

        Map<String, Object> responseMap = new HashMap<>();

        responseMap.put("message", "List of all users");
        responseMap.put("users", users);

        return responseMap;
    }

    @GetMapping("/store")
    public String store() {
        this.userRepository.deleteAll();

        User user1 = new User();
        user1.setUsername("admin");
        user1.setPassword("admin");
        user1.setEmail("admin@example.com");

        User user2 = new User();
        user2.setUsername("Suraj");
        user2.setPassword("suraj");
        user2.setEmail("suraj@example.com");

        User user3 = new User();
        user3.setUsername("JohnDoe");
        user3.setPassword("johndoe");
        user3.setEmail("john@example.com");

        User user4 = new User();
        user4.setUsername("JaneDoe");
        user4.setPassword("janedoe");
        user4.setEmail("jane@example.com");

        User user5 = new User();
        user5.setUsername("Robert");
        user5.setPassword("robert");
        user5.setEmail("robert@example.com");

        User user6 = new User();
        user6.setUsername("Emily");
        user6.setPassword("emily");
        user6.setEmail("emily@example.com");

        User user7 = new User();
        user7.setUsername("Michael");
        user7.setPassword("michael");
        user7.setEmail("michael@example.com");

        User user8 = new User();
        user8.setUsername("Sarah");
        user8.setPassword("sarah");
        user8.setEmail("sarah@example.com");

        User user9 = new User();
        user9.setUsername("David");
        user9.setPassword("david");
        user9.setEmail("david@example.com");

        User user10 = new User();
        user10.setUsername("Sophia");
        user10.setPassword("sophia");
        user10.setEmail("sophia@example.com");

        List<User> users = List.of(user1, user2, user3, user4, user5, user6, user7, user8, user9, user10);

        Iterable<User> allUsers = this.userRepository.saveAll(users);

        for(User user : allUsers) {
            System.out.println(user);
        }


        return "Users stored in the database";
    }
}
