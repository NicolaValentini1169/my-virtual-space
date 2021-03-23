package com.myvirtualspace.myvirtualspaceapplication.secutity.services;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.BadRequestException;
import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NoAuthorizationException;
import com.myvirtualspace.myvirtualspaceapplication.dto.UserCredentials;
import com.myvirtualspace.myvirtualspaceapplication.entities.User;
import com.myvirtualspace.myvirtualspaceapplication.secutity.constants.SecurityConstants;
import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTUserDetails;
import com.myvirtualspace.myvirtualspaceapplication.secutity.utils.JWTUtils;
import com.myvirtualspace.myvirtualspaceapplication.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public String signIn(UserCredentials loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return JWTUtils.generateJwtToken(authentication);
    }

    public String signUp(UserCredentials registrationRequest) {
        if (userService.getUserRepository().existsByUsername(registrationRequest.getUsername())) {
            throw new BadRequestException(SecurityConstants.errorMessageWrongUsername);
        }

        if (registrationRequest.getPassword() == null || registrationRequest.getPassword().replaceAll(" ", "").length() <= 0) {
            throw new BadRequestException(SecurityConstants.errorMessageWrongPassword);
        }

        User user = new User(registrationRequest.getUsername(), bCryptPasswordEncoder.encode(registrationRequest.getPassword()));

        // TODO Settare il ruolo con valore ROLE_USER e le immagini di default

        userService.save(user);

        return signIn(registrationRequest);
    }

    public String checkToken(String jwt) {
        if (!Boolean.TRUE.equals(JWTUtils.validateToken(jwt))) {
            throw new NoAuthorizationException(SecurityConstants.errorMessageNotLogged);
        } else return jwt;
    }
}
