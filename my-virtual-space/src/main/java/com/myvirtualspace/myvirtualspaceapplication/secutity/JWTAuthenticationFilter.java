package com.myvirtualspace.myvirtualspaceapplication.secutity;

import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTUserDetails;
import com.myvirtualspace.myvirtualspaceapplication.secutity.services.JWTUserDetailsService;
import com.myvirtualspace.myvirtualspaceapplication.secutity.utils.JWTUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger log = LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    @Autowired
    JWTUserDetailsService jwtUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String jwt = JWTUtils.getJWTFromRequest(request);

            if (StringUtils.hasText(jwt) && JWTUtils.validateToken(jwt)) {
                JWTUserDetails jwtUserDetails = JWTUtils.parseToken(jwt);

                UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(jwtUserDetails.getUsername());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (Exception e) {
            log.error("Could not set user authentication in com.myvirtualspace.myvirtualspaceapplication.secutity context", e);
        }

        filterChain.doFilter(request, response);
    }
}