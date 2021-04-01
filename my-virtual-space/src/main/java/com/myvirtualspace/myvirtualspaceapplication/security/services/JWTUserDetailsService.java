package com.myvirtualspace.myvirtualspaceapplication.security.services;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.BadRequestException;
import com.myvirtualspace.myvirtualspaceapplication.entities.User;
import com.myvirtualspace.myvirtualspaceapplication.repositories.UserRepository;
import com.myvirtualspace.myvirtualspaceapplication.security.constants.SecurityConstants;
import com.myvirtualspace.myvirtualspaceapplication.security.entities.JWTUserDetails;
import com.myvirtualspace.myvirtualspaceapplication.utils.ErrorsConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class JWTUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ErrorsConstants.WRONG_USERNAME));

        List<? extends GrantedAuthority> roles = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getRole()));

        return new JWTUserDetails.Builder()
                .setId(user.getId())
                .setSub(user.getUsername())
                .setCn(user.getUsername())
                .setPassword(user.getPassword())
                .setRoles(roles)
                .setIat(System.currentTimeMillis())
                .setExp(System.currentTimeMillis() + SecurityConstants.EXIPIRATION_TIME)
                .build();
    }

}
