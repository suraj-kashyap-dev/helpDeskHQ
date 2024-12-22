package com.todo.todo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.todo.todo.repositories.UserRepository;
import com.todo.todo.models.User;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String index(Model model) {
        Iterable<User> users = userRepository.findAll();

        model.addAttribute("users", users);

        return "home";
    }
}
