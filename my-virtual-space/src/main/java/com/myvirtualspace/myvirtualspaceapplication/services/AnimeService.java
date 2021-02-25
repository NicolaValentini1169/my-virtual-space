package com.myvirtualspace.myvirtualspaceapplication.services;

import com.myvirtualspace.myvirtualspaceapplication.entities.Anime;
import com.myvirtualspace.myvirtualspaceapplication.repositories.AnimeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimeService {
    private static final Logger log = LoggerFactory.getLogger(AnimeService.class);

    @Autowired
    private AnimeRepository animeRepository;

    public Anime save(Anime anime) {
        return animeRepository.save(anime);
    }

    public Anime update(Anime anime) {
        return animeRepository.save(anime);
    }

    public void deleteById(UUID id) {
        animeRepository.deleteById(id);
    }

    public List<Anime> findAll() {
        return animeRepository.findAll();
    }

    public Optional<Anime> findById(UUID id) {
        return animeRepository.findById(id);
    }
}
