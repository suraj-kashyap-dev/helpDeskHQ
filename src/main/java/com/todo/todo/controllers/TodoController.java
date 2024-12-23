package com.todo.todo.controllers;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todo.models.Todo;
import com.todo.todo.services.TodoService;

@RestController
@RequestMapping("/todos")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping
    public HashMap<String, Object> index() {
        return todoService.getTodos();
    }

    @PostMapping
    public HashMap<String, Object> store(@RequestBody Todo todo) {
        return todoService.store(todo);
    }

    @PutMapping("/{id}")
    public HashMap<String, Object> update(@RequestBody Todo todo, @PathVariable Integer id) {
        return todoService.update(todo, id);
    }

    @DeleteMapping("/{id}")
    public HashMap<String, Object> destroy(@PathVariable Integer id) {
        return todoService.destroy(id);
    }
}
