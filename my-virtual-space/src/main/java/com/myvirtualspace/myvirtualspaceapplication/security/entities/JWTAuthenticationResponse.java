package com.myvirtualspace.myvirtualspaceapplication.security.entities;

public class JWTAuthenticationResponse {

    private String accessToken;
    private String tokenType = "Bearer";
    private JWTUserDetails jwtUserDetail;

    public JWTAuthenticationResponse(String accessToken, JWTUserDetails jwtUserDetail) {
        this.accessToken = accessToken;
        this.jwtUserDetail = jwtUserDetail;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public JWTUserDetails getJwtUserDetail() {
        return jwtUserDetail;
    }

    public void setJwtUserDetail(JWTUserDetails jwtUserDetail) {
        this.jwtUserDetail = jwtUserDetail;
    }
}

