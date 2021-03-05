package com.myvirtualspace.myvirtualspaceapplication.secutity.services;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.BadRequestException;
import com.myvirtualspace.myvirtualspaceapplication.entities.User;
import com.myvirtualspace.myvirtualspaceapplication.repositories.UserRepository;
import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JWTUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException("Username " + username + " non trovato"));

        return JWTUserDetails.build(user);
    }

}
