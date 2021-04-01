package com.myvirtualspace.myvirtualspaceapplication.secutity.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.myvirtualspace.myvirtualspaceapplication.secutity.constants.SecurityConstants;
import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTUserDetails;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.DateTimeException;
import java.time.Instant;
import java.util.Base64;

@Component
public class JWTUtils {
    private static final Logger log = LoggerFactory.getLogger(JWTUtils.class);

    private ObjectMapper mapper;

    @PostConstruct
    public void initialize() {
        this.mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public String generateTokenFromAuthentication(Authentication authentication) {
        JWTUserDetails jwtUserDetail = (JWTUserDetails) authentication.getPrincipal();

        return generateTokenFromJWTUserDetails(jwtUserDetail);
    }

    public String generateTokenFromJWTUserDetails(JWTUserDetails jwtUserDetail) {
        String payload;

        try {
            payload = mapper.writeValueAsString(jwtUserDetail);
        } catch (JsonProcessingException e) {
            return null;
        }

        return Jwts
                .builder()
                .setPayload(payload)
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
                .compact();
    }

    public String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(SecurityConstants.HEADER_STRING);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            return bearerToken.substring(SecurityConstants.TOKEN_PREFIX.length());
        } else if (StringUtils.hasText(bearerToken)) {
            return bearerToken;
        }

        return null;
    }

    public JWTUserDetails parseToken(String authToken) throws IOException {
        try {
            return mapper.readValue(new String(Base64.getDecoder().decode(authToken.split("\\.")[1]), StandardCharsets.UTF_8),
                    JWTUserDetails.class);
        } catch (IOException e) {
            log.error("Failed jwt parsing. Original header value: {}", authToken, e);
            throw e;
        }
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(authToken);

            JWTUserDetails jwtUserDetail = parseToken(authToken);

            if (isTokenAhead(jwtUserDetail)) {
                log.warn("Ahead JWT Token");
                return false;
            }

            if (isTokenExpired(jwtUserDetail)) {
                log.warn("Expired JWT Token");
                return false;
            }

            return true;
        } catch (SignatureException e) {
            log.warn("Invalid JWT Signature");
        } catch (MalformedJwtException e) {
            log.warn("Invalid JWT Token");
        } catch (ExpiredJwtException e) {
            log.warn("Expired JWT Token");
        } catch (UnsupportedJwtException e) {
            log.warn("Unsupported JWT Token");
        } catch (IllegalArgumentException e) {
            log.warn("JWT claims string is empty.");
        } catch (IOException e) {
            log.warn("Invalid JWT Token - {}", e.getMessage());
        }

        return false;
    }

    private boolean isTokenAhead(JWTUserDetails token) {
        Long tokenIat = token.getIat();

        if (tokenIat == null) {
            log.warn("Missing iat field in token: {}", token);
            return false;
        }

        try {
            Instant iat = Instant.ofEpochMilli(tokenIat);
            return Instant.now().isBefore(iat);
        } catch (DateTimeException | ArithmeticException e) {
            log.warn("Unparsable iat field", e);
            return false;
        }
    }

    private boolean isTokenExpired(JWTUserDetails token) {
        Long tokenExp = token.getExp();

        if (tokenExp == null) {
            log.warn("Missing exp field in token: {}", token);
            return true;
        }

        try {
            Instant exp = Instant.ofEpochMilli(tokenExp);
            return Instant.now().isAfter(exp);
        } catch (DateTimeException | ArithmeticException e) {
            log.warn("Unparsable exp field", e);
            return true;
        }
    }
}
