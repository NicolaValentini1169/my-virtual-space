package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.entities.Season;
import com.myvirtualspace.myvirtualspaceapplication.services.SeasonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/season")
public class SeasonController {
    private static final Logger log = LoggerFactory.getLogger(SeasonController.class);

    @Autowired
    private SeasonService seasonService;

    @PostMapping
    public ResponseEntity<Season> saveSeason(@RequestBody Season season) {
        return ResponseEntity.ok(seasonService.save(season));
    }

    @PutMapping
    public ResponseEntity<Season> updateSeason(@RequestBody Season season) {
        return ResponseEntity.ok(seasonService.update(season));
    }

    @DeleteMapping
    public ResponseEntity<Season> deleteSeasonById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return seasonService.findById(id).map(season -> {
            seasonService.deleteById(season.getId());

            return ResponseEntity.ok(season);
        }).orElseThrow(() -> new NotFoundException("Stagione non trovata."));
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET)
    public ResponseEntity<List<Season>> findAllSeason() {
        return ResponseEntity.ok(seasonService.findAll());
    }

    @RequestMapping(value = "findById", method = RequestMethod.GET)
    public ResponseEntity<Season> findSeasonById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return seasonService.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new NotFoundException("Stagione non trovata."));
    }
}
