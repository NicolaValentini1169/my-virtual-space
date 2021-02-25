package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.entities.User;
import com.myvirtualspace.myvirtualspaceapplication.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.save(user));
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.update(user));
    }

    @DeleteMapping
    public ResponseEntity<User> deleteUserById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return userService.findById(id).map(user -> {
            userService.deleteById(user.getId());

            return ResponseEntity.ok(user);
        }).orElseThrow(() -> new NotFoundException("Utente non trovato."));
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET)
    public ResponseEntity<List<User>> findAllUser() {
        return ResponseEntity.ok(userService.findAll());
    }

    @RequestMapping(value = "findById", method = RequestMethod.GET)
    public ResponseEntity<User> findUserById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return userService.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new NotFoundException("Utente non trovato."));
    }
}
