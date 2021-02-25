package com.myvirtualspace.myvirtualspaceapplication.repositories;

import com.myvirtualspace.myvirtualspaceapplication.entities.Season;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SeasonRepository extends JpaRepository<Season, UUID> {
}
