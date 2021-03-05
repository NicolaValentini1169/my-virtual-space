package com.myvirtualspace.myvirtualspaceapplication.repositories;

import com.myvirtualspace.myvirtualspaceapplication.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Boolean existsByUsername(String username);
}
