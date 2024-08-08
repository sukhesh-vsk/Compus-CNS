package com.compus.cns.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.compus.cns.model.User;
import com.compus.cns.repository.UserRepository;

@Service
@EnableWebSecurity
public class UserService {

    @Autowired
    private UserRepository userrepo;

    PasswordEncoder encodePassword = new BCryptPasswordEncoder(12);
    
    public User addUser(User data) {
        data.setPassword(encodePassword.encode(data.getPassword()));
        return userrepo.save(data);
    }

    public List<User> findAllUsers() {
        return userrepo.findAll();
    }

    public Optional<User> findByName(String username) {
        return userrepo.findByName(username);
    }

    public String login(String mail, String pwd) {
        Optional<User> data = userrepo.findByEmail(mail);
        if (data.isPresent()) {
            User userData = data.get();
            if (encodePassword.matches(pwd, userData.getPassword())) {
                return "Login Successful";
            } else {
                return "Password mismatch";
            }
        }
        return "Mail does not exists";
    }
    
    public String[] hashPassword(String pwd) {
    	String hashedPassword = encodePassword.encode(pwd);
    	return new String[] {pwd, hashedPassword};
    }
}
