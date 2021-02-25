package com.myvirtualspace.myvirtualspaceapplication.services;

import com.myvirtualspace.myvirtualspaceapplication.entities.Genre;
import com.myvirtualspace.myvirtualspaceapplication.repositories.GenreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GenreService {
    private static final Logger log = LoggerFactory.getLogger(GenreService.class);

    @Autowired
    private GenreRepository genreRepository;

    public Genre save(Genre genre) {
        return genreRepository.save(genre);
    }

    public Genre update(Genre genre) {
        return genreRepository.save(genre);
    }

    public void deleteById(UUID id) {
        genreRepository.deleteById(id);
    }

    public List<Genre> findAll() {
        return genreRepository.findAll();
    }

    public Optional<Genre> findById(UUID id) {
        return genreRepository.findById(id);
    }
}
