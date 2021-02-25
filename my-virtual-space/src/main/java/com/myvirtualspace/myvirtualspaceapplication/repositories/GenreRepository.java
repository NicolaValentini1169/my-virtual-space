package com.myvirtualspace.myvirtualspaceapplication.repositories;

import com.myvirtualspace.myvirtualspaceapplication.entities.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GenreRepository extends JpaRepository<Genre, UUID> {
}
