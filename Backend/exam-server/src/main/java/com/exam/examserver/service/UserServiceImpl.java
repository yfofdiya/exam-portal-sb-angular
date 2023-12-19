package com.exam.examserver.service;

import com.exam.examserver.entity.User;
import com.exam.examserver.entity.UserRole;
import com.exam.examserver.repository.RoleRepository;
import com.exam.examserver.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        // Check if user is already exists
        User localUser = userRepository.findByUserName(user.getUsername());
        if (localUser != null) {
            log.error("User already present");
            throw new Exception("User exists with user name " + localUser.getUsername());
        } else {
            // Create new User
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }
            user.setUserRoles(userRoles);
            User createdUser = userRepository.save(user);
            return createdUser;
        }
    }

    @Override
    public User getUserByUserName(String userName) throws Exception {
        User user = userRepository.findByUserName(userName);
        if (user == null) {
            log.error("No User found with username " + userName);
            throw new Exception("No User found with username " + userName);
        } else {
            return user;
        }
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(long userId) {
        return userRepository.findById(userId).get();
    }
}
