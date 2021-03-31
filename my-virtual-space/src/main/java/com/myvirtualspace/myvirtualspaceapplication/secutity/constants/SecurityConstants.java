package com.myvirtualspace.myvirtualspaceapplication.secutity.constants;

import java.util.UUID;

public class SecurityConstants {

    /*-- JWT Constants --*/
    public static final String SECRET = UUID.randomUUID().toString();
    public static final long EXIPIRATION_TIME = 43_200_000; //12 ore
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    /*-- Roles Constants --*/
    public static final String ROLE_USER_VALUE = "ROLE_USER";
    public static final String ROLE_MODERATOR_VALUE = "ROLE_MODERATOR";
    public static final String ROLE_ADMIN_VALUE = "ROLE_ADMIN";

    public static final String ROLE_USER_ID = "2fdc5b4b-dbe1-4770-9465-5ab9bf959c88";
    public static final String ROLE_MODERATOR_ID = "5086fd32-bb06-44b1-9882-1dd32ce4f671";
    public static final String ROLE_ADMIN_ID = "e723d610-6bdc-423d-b88b-0b9b2fafe486";

    /*-- Error Messages Constants --*/
    public static final String ERROR_MESSAGE_WRONG_USERNAME = "Username già in uso";
    public static final String ERROR_MESSAGE_WRONG_PASSWORD = "Password non valida";
    public static final String ERROR_MESSAGE_NOT_LOGGED = "Effettuare il login";
    public static final String ERROR_MESSAGE_INTERNAL_SERVER_ERROR = "Internal server error";
}
