package com.myvirtualspace.myvirtualspaceapplication.services;

import com.myvirtualspace.myvirtualspaceapplication.entities.State;
import com.myvirtualspace.myvirtualspaceapplication.repositories.StateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StateService {
    private static final Logger log = LoggerFactory.getLogger(StateService.class);

    @Autowired
    private StateRepository stateRepository;

    public State save(State state) {
        return stateRepository.save(state);
    }

    public State update(State state) {
        return stateRepository.save(state);
    }

    public void deleteById(UUID id) {
        stateRepository.deleteById(id);
    }

    public List<State> findAll() {
        return stateRepository.findAll();
    }

    public Optional<State> findById(UUID id) {
        return stateRepository.findById(id);
    }
}
