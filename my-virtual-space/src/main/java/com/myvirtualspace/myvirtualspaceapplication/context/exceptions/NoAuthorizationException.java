package com.myvirtualspace.myvirtualspaceapplication.context.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Bruni Luca
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class NoAuthorizationException extends RuntimeException {
    public NoAuthorizationException(String message, Exception e) {
        super(message, e);
    }

    public NoAuthorizationException(String message) {
        super(message);
    }

    public NoAuthorizationException(Exception e) {
        super(e);
    }

    public NoAuthorizationException() {

    }
}
