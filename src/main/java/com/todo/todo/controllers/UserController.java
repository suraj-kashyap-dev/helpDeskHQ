package com.todo.todo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {
    @RequestMapping("/")
    public String index() {
        return "home";
    }

    @RequestMapping("/contact")
    public String contact() {
        return "contact";
    }
}
