package com.todo.todo.services;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.todo.todo.models.Todo;
import com.todo.todo.models.User;
import com.todo.todo.repositories.TodoRepository;
import com.todo.todo.repositories.UserRepository;

@Component
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    public HashMap<String, Object> getTodos() {
        HashMap<String, Object> response = new HashMap<>();

        response.put("message", "Hello World");
        
        response.put("todos", todoRepository.findAll());

        return response;
    }

    public HashMap<String, Object> store(Todo todo) {
        HashMap<String, Object> response = new HashMap<>();

        Optional<User> userOptional = this.userRepository.findById(1);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            todo.setUser(user);
            Todo savedTodo = todoRepository.save(todo);

            response.put("message", "Todo is created successfully");
            response.put("todo", savedTodo);
        } else {
            response.put("message", "User not found");
        }

        return response;
    }

    public HashMap<String, Object> update(Todo todo, Integer id) {
        HashMap<String, Object> response = new HashMap<>();

        Optional<Todo> existingTodo = todoRepository.findById(id);

        if (existingTodo.isPresent()) {
            Todo todoToUpdate = existingTodo.get();
            todoToUpdate.setTitle(todo.getTitle());
            todoToUpdate.setDescription(todo.getDescription());
            todoToUpdate.setCompleted(todo.isCompleted());

            Todo updatedTodo = todoRepository.save(todoToUpdate);

            response.put("message", "Todo is updated successfully");
            response.put("todo", updatedTodo);
        } else {
            response.put("message", "Todo not found");
        }

        return response;
    }

    public HashMap<String, Object> destroy(Integer id) {
        HashMap<String, Object> response = new HashMap<>();

        Optional<Todo> existingTodo = todoRepository.findById(id);

        if (existingTodo.isPresent()) {
            todoRepository.deleteById(id);

            response.put("message", "Todo is deleted successfully");
        } else {
            response.put("message", "Todo not found");
        }

        return response;
    }
}
