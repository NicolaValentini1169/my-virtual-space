package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.entities.Image;
import com.myvirtualspace.myvirtualspaceapplication.services.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    private static final Logger log = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    private ImageService imageService;

    @PostMapping
    public ResponseEntity<Image> saveImage(@RequestBody Image image) {
        return ResponseEntity.ok(imageService.save(image));
    }

    @PutMapping
    public ResponseEntity<Image> updateImage(@RequestBody Image image) {
        return ResponseEntity.ok(imageService.update(image));
    }

    @DeleteMapping
    public ResponseEntity<Image> deleteImageById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return imageService.findById(id).map(image -> {
            imageService.deleteById(image.getId());

            return ResponseEntity.ok(image);
        }).orElseThrow(() -> new NotFoundException("Immagine non trovata."));
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET)
    public ResponseEntity<List<?>> findAllImage() {
        return ResponseEntity.ok(imageService.findAll());
    }

    @RequestMapping(value = "findById", method = RequestMethod.GET)
    public ResponseEntity<Image> findImageById(@RequestParam(value = "id", required = true, defaultValue = "") UUID id) {
        return imageService.findById(id).map(ResponseEntity::ok).orElseThrow(() -> new NotFoundException("Immagine non trovata."));
    }
}
