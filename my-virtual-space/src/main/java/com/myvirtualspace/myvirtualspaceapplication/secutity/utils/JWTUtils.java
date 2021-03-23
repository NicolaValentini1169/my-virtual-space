package com.myvirtualspace.myvirtualspaceapplication.secutity.utils;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.myvirtualspace.myvirtualspaceapplication.secutity.constants.SecurityConstants;
import com.myvirtualspace.myvirtualspaceapplication.secutity.constants.TokenFields;
import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTUserDetails;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.DateTimeException;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

public class JWTUtils {
    private static final Logger log = LoggerFactory.getLogger(JWTUtils.class);

    public static String generateJwtToken(Authentication authentication) {
        return Jwts
                .builder()
                .setSubject(((JWTUserDetails) authentication.getPrincipal()).getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXIPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
                .compact();
    }


    /**
     * Parses the authorization header into {@code JWTUserDetail} object.
     *
     * @param authToken the authorization token.
     * @return a {@link JWTUserDetails}.
     * @throws IOException if the reading fails.
     */
    public static String parseToken(String authToken, TokenFields field) throws IOException {
        try {
            return String.valueOf(new ObjectMapper()
                    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                    .readValue(
                            new String(Base64.getDecoder().decode(authToken.split("\\.")[1]), StandardCharsets.UTF_8),
                            Map.class)
                    .get(field.getValue()));
        } catch (IOException e) {
            log.error("Failed jwt parsing. Original header value: {}", authToken, e);
            throw e;
        }
    }

    public static String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(SecurityConstants.HEADER_STRING);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            return bearerToken.substring(SecurityConstants.TOKEN_PREFIX.length());
        } else if (StringUtils.hasText(bearerToken)) {
            return bearerToken;
        } else return null;
    }

    /**
     * Method that receive the token and checks if it is valid
     *
     * @param authToken the authorization token.
     * @return true if token is valid, false otherwise.
     */
    public static boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(SecurityConstants.SECRET).parseClaimsJws(authToken);

            if (isTokenAhead(parseToken(authToken, TokenFields.IAT))) {
                log.warn("Ahead JWT Token");
                return false;
            }

            if (isTokenExpired(parseToken(authToken, TokenFields.EXP))) {
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

    /**
     * Verifies if the token is ahead compared to the instant when arrived.
     *
     * @param tokenIat the token iat.
     * @return true if token is ahead, false otherwise.
     */
    public static boolean isTokenAhead(String tokenIat) {
        try {
            Instant iat = Instant.ofEpochMilli(Long.parseLong(tokenIat));
            return Instant.now().isBefore(iat);
        } catch (DateTimeException | ArithmeticException | NumberFormatException e) {
            log.warn("Unparsable iat field", e);
            return false;
        }
    }

    /**
     * Verifies if the token is expired.
     *
     * @param tokenExp the token exp.
     * @return true if the token is expired, false otherwise.
     */
    public static boolean isTokenExpired(String tokenExp) {
        try {
            Instant exp = Instant.ofEpochSecond(Long.parseLong(tokenExp));
            return Instant.now().isAfter(exp);
        } catch (DateTimeException | ArithmeticException | NumberFormatException e) {
            log.warn("Unparsable exp field", e);
            return true;
        }
    }
}
