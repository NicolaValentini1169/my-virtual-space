package com.myvirtualspace.myvirtualspaceapplication.secutity.utils;

import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collection;

public class AuthenticationUtils {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationUtils.class);

    private static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static String getUserName() {
        try {
            Authentication auth = getAuthentication();

            if (auth.getDetails() instanceof JWTUserDetails) {
                return ((JWTUserDetails) auth.getDetails()).getUsername();
            } else {
                return auth.getCredentials().toString();
            }
        } catch (Exception e) {
            log.error("Error getting username", e);
        }

        return "UNKNOWN";
    }

    public static Collection<? extends GrantedAuthority> getUserAuthorities() {
        return getAuthentication().getAuthorities();
    }
}
