package com.undergraduate.server.service;

import com.undergraduate.server.bucket.BucketName;
import com.undergraduate.server.entity.BelongingsAdvert;
import com.undergraduate.server.entity.User;
import com.undergraduate.server.exception.*;
import com.undergraduate.server.model.request.BelongingsAdvertRequest;
import com.undergraduate.server.model.response.BelongingsAdvertResponse;
import com.undergraduate.server.repository.BelongingsAdvertRepository;
import com.undergraduate.server.repository.UserRepository;
import com.undergraduate.server.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class BelongingsAdvertService {
    private final BelongingsAdvertRepository belongingsAdvertRepository;
    private final ImageUtil imageUtil;
    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public BelongingsAdvertService(BelongingsAdvertRepository belongingsAdvertRepository, ImageUtil imageUtil, UserService userService, UserRepository userRepository){
        this.belongingsAdvertRepository = belongingsAdvertRepository;
        this.imageUtil = imageUtil;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public void createBelongingsAdvert(BelongingsAdvertRequest body){
        User user = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        BelongingsAdvert belongingsAdvert = new BelongingsAdvert();
        belongingsAdvert.setTitle(body.getTitle());
        belongingsAdvert.setDetail(body.getDetail());
        belongingsAdvert.setPrice(body.getPrice());
        belongingsAdvert.setType(body.getType());
        belongingsAdvert.setStatus(body.getStatus());
        belongingsAdvert.setShippable(body.isShippable());
        belongingsAdvert.setExchangeable(body.isExchangeable());
        belongingsAdvert.setUser(user);

        if (body.getPhotos().size() > 0){
            List<String> imageUrls = new ArrayList<>();
            for (MultipartFile file : body.getPhotos()){
                String imageUrl = imageUtil.uploadFile(file, "belongings-advert");
                imageUrls.add(imageUrl);
            }
            belongingsAdvert.setImageUrls(imageUrls);
        }

        belongingsAdvertRepository.save(belongingsAdvert);
    }

    public BelongingsAdvertResponse getBelongingsAdvert(Long id){
        BelongingsAdvert belongingsAdvert = belongingsAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));
        return BelongingsAdvertResponse.fromEntity(belongingsAdvert);
    }

    public List<BelongingsAdvertResponse> getBelongingsAdverts(){
        List<BelongingsAdvert> belongingsAdverts = belongingsAdvertRepository.findAll();
        return belongingsAdverts.stream().map(belongingsAdvert -> BelongingsAdvertResponse.fromEntity(belongingsAdvert)).collect(Collectors.toList());
    }

    public List<BelongingsAdvertResponse> getBelongingsAdvertsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        List<BelongingsAdvert> belongingsAdvertsByUser = belongingsAdvertRepository.findAllByUser(user);
        return belongingsAdvertsByUser.stream().map(belongingsAdvert -> BelongingsAdvertResponse.fromEntity(belongingsAdvert)).collect(Collectors.toList());
    }

    public Page<BelongingsAdvertResponse> getBelongingsAdvertPage(int pageNo, int size){
        Pageable pageable = PageRequest.of(pageNo, size, Sort.by("publishedDate").descending());
        Page<BelongingsAdvert> belongingsAdvertPage = belongingsAdvertRepository.findAll(pageable);
        return belongingsAdvertPage.map(belongingsAdvert -> BelongingsAdvertResponse.fromEntity(belongingsAdvert));
    }

    public byte[] getImageOfBelongingsAdvert(Long id, String filename){
        BelongingsAdvert belongingsAdvert = belongingsAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));
        if (!belongingsAdvert.getImageUrls().contains(filename)){
            throw new ResourceNotFoundException(ResourceType.IMAGE);
        }
        return imageUtil.downloadFile("belongings-advert", filename);
    }

    public void updateBelongingsAdvert(Long id, BelongingsAdvertRequest body){
        User user = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        BelongingsAdvert belongingsAdvert = belongingsAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));
        if (!belongingsAdvert.getUser().equals(user)){
            throw new UnauthorizedException();
        }

        belongingsAdvert.setTitle(body.getTitle());
        belongingsAdvert.setDetail(body.getDetail());
        belongingsAdvert.setPrice(body.getPrice());
        belongingsAdvert.setType(body.getType());
        belongingsAdvert.setStatus(body.getStatus());
        belongingsAdvert.setShippable(body.isShippable());
        belongingsAdvert.setExchangeable(body.isExchangeable());


        if (body.getPhotos().size() > 0){
            for (MultipartFile file : body.getPhotos()){
                String imageUrl = imageUtil.uploadFile(file, "belongings-advert");
                belongingsAdvert.getImageUrls().add(imageUrl);
            }
        }

        belongingsAdvertRepository.save(belongingsAdvert);
    }

    public void deleteBelongingsAdvertImage(Long id, String filename){
        User user = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        BelongingsAdvert belongingsAdvert = belongingsAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));
        if (!belongingsAdvert.getUser().equals(user)){
            throw new UnauthorizedException();
        }

        if (!belongingsAdvert.getImageUrls().contains(filename)){
            throw new ResourceNotFoundException(ResourceType.IMAGE);
        }

        imageUtil.deleteFile("belongings-advert", filename);
        belongingsAdvert.getImageUrls().remove(filename);
        belongingsAdvertRepository.save(belongingsAdvert);
    }

    public void deleteBelongingsAdvert(Long id){
        User user = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        BelongingsAdvert belongingsAdvert = belongingsAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));
        if (!belongingsAdvert.getUser().equals(user)){
            throw new UnauthorizedException();
        }

        if (!belongingsAdvert.getImageUrls().isEmpty()){
            imageUtil.deleteMultipleFiles("belongings-advert", belongingsAdvert.getImageUrls());
        }

        belongingsAdvertRepository.deleteById(id);
    }
}