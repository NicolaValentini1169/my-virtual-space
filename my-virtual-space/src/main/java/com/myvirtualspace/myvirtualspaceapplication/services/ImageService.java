package com.myvirtualspace.myvirtualspaceapplication.services;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.entities.Image;
import com.myvirtualspace.myvirtualspaceapplication.entities.User;
import com.myvirtualspace.myvirtualspaceapplication.repositories.ImageRepository;
import com.myvirtualspace.myvirtualspaceapplication.utils.ErrorsConstants;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ImageService {
    private static final Logger log = LoggerFactory.getLogger(ImageService.class);

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UserService userService;


    @Value("#{'${resource.images.path}'}")
    private String imagesPath;

    @PostConstruct
    public void postConstruct() {
    }

    public Image save(Image image) {
        return imageRepository.save(image);
    }

    public Image update(Image image) {
        return imageRepository.save(image);
    }

    public String deleteById(UUID id) throws NotFoundException {
        return imageRepository.findById(id)
                .map(image -> {
                    imageRepository.deleteById(id);
                    return imageElaborator(image);
                })
                .orElseThrow(() -> new NotFoundException(ErrorsConstants.IMAGE_NOT_FOUND));
    }

    public List<String> findAll() {
        return imagesElaborator(imageRepository.findAll());
    }

    public String findById(UUID id) {
        return imageElaborator(imageRepository.findById(id).orElse(null));
    }

    public List<String> findByUserId(UUID userId) {
        return imagesElaborator(userService.findById(userId)
                .map(User::getImages)
                .orElse(new ArrayList<>()));
    }

    private List<String> imagesElaborator(List<Image> images) {
        return images
                .parallelStream()
                .map(this::imageElaborator)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private String imageElaborator(Image image) {
        if (image != null) {
            Resource resource = new ClassPathResource(imagesPath.concat(image.getNome()));

            try {
                byte[] fileContent = IOUtils.toByteArray(resource.getInputStream());

                return fileContent != null
                        ? Base64.getEncoder().encodeToString(fileContent)
                        : null;
            } catch (IOException e) {
                log.error("Errore durante la ricerca dell'immagine {}", resource.getFilename(), e);
            }

            return null;
        } else return null;
    }
}
