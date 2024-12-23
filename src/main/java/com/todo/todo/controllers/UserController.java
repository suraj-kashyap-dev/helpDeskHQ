package com.todo.todo.controllers;

import com.todo.todo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public String index(Model model) {
        model.addAttribute("users", userRepository.findAll());

        return "users/index";
    }

    @GetMapping("/create")
    public String create() {
        return "users/create";
    }

    @PostMapping("/store")
    public String store() {
        return "redirect:/users";
    }
}
