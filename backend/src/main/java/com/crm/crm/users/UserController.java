package com.crm.crm.users;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crm.crm.helpers.ApiResponse;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> index() {
        ApiResponse<List<User>> response = userService.index();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> show(@PathVariable Long id) {
        ApiResponse<User> response = userService.show(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<User>> store(@RequestBody UserDTO userDTO) {
        ApiResponse<User> response = userService.store(userDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> update(
        @PathVariable Long id,
        @RequestBody UserDTO userDTO
    ) {
        ApiResponse<User> response = userService.update(id, userDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> response = userService.destroy(id);
        return ResponseEntity.ok(response);
    }
}
