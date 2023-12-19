package com.exam.examserver.controller;

import com.exam.examserver.entity.Role;
import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.service.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200/")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Create | Register User
    @PostMapping
    public User createUser(@RequestBody User user) throws Exception {
        user.setProfile("user.jpg");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<UserRole> userRoles = new HashSet<>();
        Role role = new Role();
        role.setRoleId(102L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        userRoles.add(userRole);

        User cretaedUser = userService.createUser(user, userRoles);
        return cretaedUser;
    }

    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    // Get User By Username
    @GetMapping("/{userName}")
    public User getUserByUserName(@PathVariable String userName) throws Exception {
        return userService.getUserByUserName(userName);
    }
}
