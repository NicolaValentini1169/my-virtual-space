package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.entities.Image;
import com.myvirtualspace.myvirtualspaceapplication.services.ImageService;
import com.myvirtualspace.myvirtualspaceapplication.utils.ErrorsConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> deleteImageById(@RequestParam(value = "id", defaultValue = "") UUID id) {
        try {
            return ResponseEntity.ok(imageService.deleteById(id));
        } catch (NotFoundException e) {
            return new ResponseEntity<>(ErrorsConstants.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET)
    public ResponseEntity<List<String>> findAllImage() {
        return ResponseEntity.ok(imageService.findAll());
    }

    @RequestMapping(value = "findById", method = RequestMethod.GET)
    public ResponseEntity<?> findImageById(@RequestParam(value = "id", defaultValue = "") UUID id) {
        String image = imageService.findById(id);

        return image != null
                ? ResponseEntity.ok(image)
                : new ResponseEntity<>(ErrorsConstants.IMAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "findByUserId", method = RequestMethod.GET)
    public ResponseEntity<List<String>> findImageByUserId(@RequestParam(value = "id", defaultValue = "") UUID id) {
        return ResponseEntity.ok(imageService.findByUserId(id));
    }
}
