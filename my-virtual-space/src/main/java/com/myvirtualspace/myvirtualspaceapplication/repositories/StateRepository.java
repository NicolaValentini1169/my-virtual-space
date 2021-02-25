package com.myvirtualspace.myvirtualspaceapplication.repositories;

import com.myvirtualspace.myvirtualspaceapplication.entities.State;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StateRepository extends JpaRepository<State, UUID> {
}
