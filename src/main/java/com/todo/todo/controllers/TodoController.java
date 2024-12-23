package com.todo.todo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.todo.todo.repositories.TodoRepository;

@Controller("webTodoController")
@RequestMapping("/todos")
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("todos", this.todoRepository.findAll());
        model.addAttribute("canShowHeader", true);

        return "todos/index";
    }
}
