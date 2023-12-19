package com.exam.examserver.service;

import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {

    // Create User
    User createUser(User user, Set<UserRole> userRoles) throws Exception;

    // Get User by Username
    User getUserByUserName(String userName) throws Exception;

    List<User> getAll();

    User getUserById(long userId);
}
