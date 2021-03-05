package com.myvirtualspace.myvirtualspaceapplication.secutity.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.myvirtualspace.myvirtualspaceapplication.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;
import java.util.UUID;

public class JWTUserDetails implements UserDetails, Serializable {

    private static final long serialVersionUID = 1L;
    private final UUID id;
    private final String username;
    @JsonIgnore
    private final String password;
    private final Collection<? extends GrantedAuthority> roles;

    public JWTUserDetails(UUID id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = authorities;
    }

    public static JWTUserDetails build(User user) {
//        List<GrantedAuthority> authorities = user.getRoles().stream()
//                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
//                .collect(Collectors.toList());

        // TODO Aggiungere roles

        return new JWTUserDetails(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>());
    }

    public UUID getId() {
        return id;
    }

    public Object getIat() { return this.getIat(); }

    public Object getExp() { return this.getExp(); }

    @Override
    public String getUsername() { return username; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return roles; }

    @Override
    public String getPassword() { return password; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JWTUserDetails that = (JWTUserDetails) o;
        return Objects.equals(id, that.id);
    }
}
