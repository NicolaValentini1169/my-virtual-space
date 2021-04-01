package com.myvirtualspace.myvirtualspaceapplication.security.services;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.BadRequestException;
import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NoAuthorizationException;
import com.myvirtualspace.myvirtualspaceapplication.dto.UserCredentials;
import com.myvirtualspace.myvirtualspaceapplication.entities.Role;
import com.myvirtualspace.myvirtualspaceapplication.entities.User;
import com.myvirtualspace.myvirtualspaceapplication.security.constants.SecurityConstants;
import com.myvirtualspace.myvirtualspaceapplication.security.utils.JWTUtils;
import com.myvirtualspace.myvirtualspaceapplication.services.UserService;
import com.myvirtualspace.myvirtualspaceapplication.utils.ErrorsConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.rmi.UnexpectedException;
import java.util.UUID;

@Service
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JWTUtils jwtUtils;

    public String signIn(UserCredentials loginRequest) throws BadRequestException, UnexpectedException {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.info(String.format("User %s logged.", loginRequest.getUsername()));

            return jwtUtils.generateTokenFromAuthentication(authentication);

        } catch (InternalAuthenticationServiceException e) {
            throw new BadRequestException(ErrorsConstants.WRONG_USERNAME);
        } catch (BadCredentialsException e) {
            throw new BadRequestException(ErrorsConstants.WRONG_PASSWORD);
        } catch (Exception e) {
            throw new UnexpectedException(ErrorsConstants.INTERNAL_SERVER_ERROR);
        }
    }

    public String signUp(UserCredentials registrationRequest) throws BadRequestException, UnexpectedException {
        if (userService.getUserRepository().existsByUsername(registrationRequest.getUsername())) {
            throw new BadRequestException(ErrorsConstants.ALREADY_USE_USERNAME);
        }

        if (registrationRequest.getPassword() == null || registrationRequest.getPassword().replaceAll(" ", "").length() <= 0) {
            throw new BadRequestException(ErrorsConstants.NOT_VALID_PASSWORD);
        }

        User user = new User(
                registrationRequest.getUsername(),
                bCryptPasswordEncoder.encode(registrationRequest.getPassword()),
                new Role(UUID.fromString(SecurityConstants.ROLE_USER_ID), SecurityConstants.ROLE_USER_VALUE)
        );

        // TODO Settare le immagini di default

        userService.save(user);

        log.info(String.format("User %s registered.", registrationRequest.getUsername()));

        return signIn(registrationRequest);
    }

    public String checkToken(String jwt) throws NoAuthorizationException {
        if (!Boolean.TRUE.equals(jwtUtils.validateToken(jwt))) {
            throw new NoAuthorizationException(ErrorsConstants.DO_LOGIN);
        } else return jwt;
    }
}
