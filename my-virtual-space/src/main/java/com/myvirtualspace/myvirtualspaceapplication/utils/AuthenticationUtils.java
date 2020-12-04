package com.myvirtualspace.myvirtualspaceapplication.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

public class AuthenticationUtils {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationUtils.class);

    public static String getUserPrincipal() {
        String userId = "UNKNOWN";

        try {
            Authentication auth = getAuthentication();
            if (auth.getPrincipal() instanceof User) {
                userId = ((User) auth.getPrincipal()).getUsername();
            } else {
                userId = auth.getPrincipal().toString();
            }
        } catch (Exception e) {
            log.error("Error getting principal", e);
        }

        return userId;
    }

    private static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
