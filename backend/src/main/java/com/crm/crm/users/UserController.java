package com.crm.crm.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.crm.helpers.ApiResponse;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ApiResponse<List<User>> index() {
        return this.userService.index();
    }

    @GetMapping("/{id}")
    public ApiResponse<User> show(@PathVariable Long id) {
        return this.userService.show(id);
    }

    @PostMapping
    public ApiResponse<User> store(@RequestBody UserDTO userDTO) {
        return this.userService.store(userDTO);
    }

    @PutMapping("/{id}")
    public ApiResponse<User> update(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return this.userService.update(id, userDTO);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> destroy(@PathVariable Long id) {
        return this.userService.destroy(id);
    }
}
