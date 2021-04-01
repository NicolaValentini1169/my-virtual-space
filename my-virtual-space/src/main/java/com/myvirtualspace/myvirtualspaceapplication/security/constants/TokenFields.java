package com.myvirtualspace.myvirtualspaceapplication.security.constants;

public enum TokenFields {

    IAT("iat"),
    EXP("exp"),
    USERNAME("sub");

    private String value;

    TokenFields(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
