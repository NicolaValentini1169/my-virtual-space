package com.myvirtualspace.myvirtualspaceapplication.enumeration;

public enum ResponseMessageEnum {

    INVALID_JWT("Effettua il Login"),
    INTERNAL_SERVER_ERROR_MESSAGE("Errore interno del Server!"),
    ENTITY_NOT_FOUND("Entity non trovata!"),
    NO_AUTHORIZATION("Non sei autorizzato"),
    FORCE_OPERATION("FORCE_OPERATION");

    private String value;

    ResponseMessageEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
