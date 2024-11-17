package com.undergraduate.server.util;

import com.undergraduate.server.bucket.BucketName;
import com.undergraduate.server.exception.FileException;
import com.undergraduate.server.exception.NotAnImageException;
import com.undergraduate.server.service.ImageStorageService;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.Normalizer;
import java.util.*;

@Service
public class ImageUtil {
    private final ImageStorageService imageStorageService;

    @Autowired
    public ImageUtil(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    private void isImage(MultipartFile file){
        if (!Arrays.asList(ContentType.IMAGE_PNG.getMimeType(), ContentType.IMAGE_JPEG.getMimeType()).contains(file.getContentType())){
            throw new NotAnImageException();
        }
    }

    private Map<String, String> extractMetadata(MultipartFile file){
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private String[] convertListToArray(String destination, List<String> urls){
        String[] arr = new String[urls.size()];
        for (int i = 0;i < arr.length; i++){
            arr[i] = String.format("%s/%s", destination, urls.get(i));
        }
        return arr;
    }

    private String normalizeFilename(String filename) {
        String normalizedFilename = Normalizer.normalize(filename, Normalizer.Form.NFD);
        return normalizedFilename.replaceAll("[^\\p{ASCII}]", "");
    }

    public String uploadFile(MultipartFile file, String destination) {
        isImage(file);
        Map<String, String> metadata = extractMetadata(file);
        String path = String.format("%s/%s", BucketName.STORAGE_BUCKET.getBucketName(), destination);
        String filename = String.format("%s-%s", UUID.randomUUID(), normalizeFilename(file.getOriginalFilename()));

        try {
            imageStorageService.upload(path, filename, Optional.of(metadata), file.getInputStream());
            return filename;
        }
        catch (IOException e) {
            throw new FileException("File upload failed!");
        }
    }

    public byte[] downloadFile(String destination, String filename) {
        return imageStorageService.download(String.format("%s/%s", BucketName.STORAGE_BUCKET.getBucketName(), destination), filename);
    }

    public void deleteFile(String destination, String filename) {
        imageStorageService.delete(BucketName.STORAGE_BUCKET.getBucketName(), String.format("%s/%s", destination, filename));
    }

    public void deleteMultipleFiles(String destination, List<String> urls) {
        String[] imageUrls = convertListToArray(destination, urls);
        imageStorageService.deleteMultipleImages(BucketName.STORAGE_BUCKET.getBucketName(), imageUrls);
    }
}
