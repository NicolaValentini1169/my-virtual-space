package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.entities.Anime;
import com.myvirtualspace.myvirtualspaceapplication.services.AnimeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/anime")
public class AnimeController {
    private static final Logger log = LoggerFactory.getLogger(AnimeController.class);

    @Autowired
    private AnimeService animeService;

    @PostMapping
    public ResponseEntity<Anime> saveAnime(@RequestBody Anime anime) {
        return ResponseEntity.ok(animeService.save(anime));
    }

    @PutMapping
    public ResponseEntity<Anime> updateAnime(@RequestBody Anime anime) {
        return ResponseEntity.ok(animeService.update(anime));
    }

    @DeleteMapping
    public ResponseEntity<Anime> deleteAnimeById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return animeService.findById(id).map(anime -> {
            animeService.deleteById(anime.getId());

            return ResponseEntity.ok(anime);
        }).orElseThrow(() -> new NotFoundException("Anime non trovato."));
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET)
    public ResponseEntity<List<Anime>> findAllAnime() {
        return ResponseEntity.ok(animeService.findAll());
    }

    @RequestMapping(value = "findById", method = RequestMethod.GET)
    public ResponseEntity<Anime> findAnimeById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return animeService.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new NotFoundException("Anime non trovato."));
    }
}
