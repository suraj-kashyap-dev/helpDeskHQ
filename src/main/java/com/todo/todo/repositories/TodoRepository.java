package com.todo.todo.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.todo.todo.models.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findByTitleContaining(String title);
    List<Todo> findByCompleted(boolean completed);
    List<Todo> findByCompletedAndTitleContaining(boolean completed, String title);
}
