package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.entities.Genre;
import com.myvirtualspace.myvirtualspaceapplication.services.GenreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/genre")
public class GenreController {
    private static final Logger log = LoggerFactory.getLogger(GenreController.class);

    @Autowired
    private GenreService genreService;

    @PostMapping
    public ResponseEntity<Genre> saveGenre(@RequestBody Genre genre) {
        return ResponseEntity.ok(genreService.save(genre));
    }

    @PutMapping
    public ResponseEntity<Genre> updateGenre(@RequestBody Genre genre) {
        return ResponseEntity.ok(genreService.update(genre));
    }

    @DeleteMapping
    public ResponseEntity<Genre> deleteGenreById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return genreService.findById(id).map(genre -> {
            genreService.deleteById(genre.getId());

            return ResponseEntity.ok(genre);
        }).orElseThrow(() -> new NotFoundException("Genere non trovato."));
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET)
    public ResponseEntity<List<Genre>> findAllGenre() {
        return ResponseEntity.ok(genreService.findAll());
    }

    @RequestMapping(value = "findById", method = RequestMethod.GET)
    public ResponseEntity<Genre> findGenreById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return genreService.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new NotFoundException("Genere non trovato."));
    }
}
