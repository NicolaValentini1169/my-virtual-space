package com.myvirtualspace.myvirtualspaceapplication.context.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Bruni Luca
 */
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class UnexpectedException extends RuntimeException {
    public UnexpectedException() {
    }

    public UnexpectedException(String message) {
        super(message);
    }

    public UnexpectedException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnexpectedException(Throwable cause) {
        super(cause);
    }
}
