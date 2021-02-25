package com.myvirtualspace.myvirtualspaceapplication.services;

import com.myvirtualspace.myvirtualspaceapplication.entities.Season;
import com.myvirtualspace.myvirtualspaceapplication.repositories.SeasonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SeasonService {
    private static final Logger log = LoggerFactory.getLogger(SeasonService.class);

    @Autowired
    private SeasonRepository seasonRepository;

    public Season save(Season season) {
        return seasonRepository.save(season);
    }

    public Season update(Season season) {
        return seasonRepository.save(season);
    }

    public void deleteById(UUID id) {
        seasonRepository.deleteById(id);
    }

    public List<Season> findAll() {
        return seasonRepository.findAll();
    }

    public Optional<Season> findById(UUID id) {
        return seasonRepository.findById(id);
    }
}
