package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.entities.State;
import com.myvirtualspace.myvirtualspaceapplication.services.StateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/state")
public class StateController {
    private static final Logger log = LoggerFactory.getLogger(StateController.class);

    @Autowired
    private StateService stateService;

    @PostMapping
    public ResponseEntity<State> saveState(@RequestBody State state) {
        return ResponseEntity.ok(stateService.save(state));
    }

    @PutMapping
    public ResponseEntity<State> updateState(@RequestBody State state) {
        return ResponseEntity.ok(stateService.update(state));
    }

    @DeleteMapping
    public ResponseEntity<State> deleteStateById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return stateService.findById(id).map(state -> {
            stateService.deleteById(state.getId());

            return ResponseEntity.ok(state);
        }).orElseThrow(() -> new NotFoundException("Stato non trovato."));
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET)
    public ResponseEntity<List<State>> findAllState() {
        return ResponseEntity.ok(stateService.findAll());
    }

    @RequestMapping(value = "findById", method = RequestMethod.GET)
    public ResponseEntity<State> findStateById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return stateService.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new NotFoundException("Stato non trovato."));
    }
}
