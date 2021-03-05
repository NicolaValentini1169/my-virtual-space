package com.myvirtualspace.myvirtualspaceapplication.secutity.constants;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class SecurityConstants {

    /*-- JWT Constants --*/
    public static final String SECRET = UUID.randomUUID().toString();
    public static final long EXIPIRATION_TIME = 43_200_000; //12 ore
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    /*-- Roles Constants --*/
    public static final String USER = "ROLE_USER";
    public static final String MODERATOR = "ROLE_MODERATOR";
    public static final String ADMIN = "ROLE_ADMIN";

    /*-- Error Messages Constants --*/
    public static final String errorMessageWrongUsername = "Username già in uso";
    public static final String errorMessageWrongPassword = "Password non valida";
    public static final String errorMessageNotLogged = "Effettuare il login";
    public static final String errorMessageInternalServerError = "Internal server error";

    public static final Map<String, Integer> MAP_ROLES_TO_NUMBER = new HashMap<String, Integer>() {{
        put(USER, 1);
        put(MODERATOR, 2);
        put(ADMIN, 3);
    }};
}
