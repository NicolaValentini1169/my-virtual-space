package com.myvirtualspace.myvirtualspaceapplication.services;

import com.google.common.io.ByteStreams;
import com.myvirtualspace.myvirtualspaceapplication.entities.Image;
import com.myvirtualspace.myvirtualspaceapplication.repositories.ImageRepository;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ImageService {
    private static final Logger log = LoggerFactory.getLogger(ImageService.class);

    @Autowired
    private ImageRepository imageRepository;
    @Value("#{'${resource.images.path}'}")
    private String imagesPath;

    @PostConstruct
    public void postConstruct() {}

    public Image save(Image image) { return imageRepository.save(image); }

    public Image update(Image image) { return imageRepository.save(image); }

    public void deleteById(UUID id) { imageRepository.deleteById(id); }

    public List<String> findAll() {
        return imageRepository.findAll()
                .parallelStream()
                .map(image -> {
//                    Resource resource = new FileSystemResource(imagesPath + image.getNome());
                    Resource resource = new ClassPathResource(imagesPath.concat(image.getNome()));
                    byte[] fileContent = null;

                    try {
//                        File file = ResourceUtils.getFile("/resources/static/images/" + image.getNome());
//                        File file = new File(resource.getURI());
                        fileContent = IOUtils.toByteArray(resource.getInputStream());
//                        fileContent = ByteStreams.toByteArray(resource.getInputStream());
//                        fileContent = FileCopyUtils.copyToByteArray(file);
//                        fileContent = FileUtils.readFileToByteArray(resource.getFile());
                    } catch (IOException e) {
                        log.error("Errore durante la ricerca dell'immagine {}", resource.getFilename(), e);
                    }

                    return fileContent != null
                            ? Base64.getEncoder().encodeToString(fileContent)
                            : null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public Optional<Image> findById(UUID id) { return imageRepository.findById(id); }
}
