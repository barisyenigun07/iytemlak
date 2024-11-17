package com.undergraduate.server.service;


import com.undergraduate.server.entity.HouseAdvert;
import com.undergraduate.server.entity.User;
import com.undergraduate.server.exception.*;
import com.undergraduate.server.model.request.HouseAdvertRequest;
import com.undergraduate.server.model.response.HouseAdvertResponse;
import com.undergraduate.server.repository.HouseAdvertRepository;
import com.undergraduate.server.repository.UserRepository;
import com.undergraduate.server.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class HouseAdvertService {
    private final HouseAdvertRepository houseAdvertRepository;
    private final ImageUtil imageUtil;
    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public HouseAdvertService(HouseAdvertRepository houseAdvertRepository, ImageUtil imageUtil, UserService userService, UserRepository userRepository){
        this.houseAdvertRepository = houseAdvertRepository;
        this.imageUtil = imageUtil;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public void createHouseAdvert(HouseAdvertRequest body){
        User user = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        HouseAdvert houseAdvert = new HouseAdvert();

        houseAdvert.setTitle(body.getTitle());
        houseAdvert.setDetail(body.getDetail());
        houseAdvert.setPrice(body.getPrice());
        houseAdvert.setRoomCount(body.getRoomCount());
        houseAdvert.setArea(body.getArea());
        houseAdvert.setWarmingType(body.getWarmingType());
        houseAdvert.setHouseType(body.getHouseType());
        houseAdvert.setPropertyType(body.getPropertyType());
        houseAdvert.setAddress(body.getAddress());
        houseAdvert.setHasFurniture(body.isHasFurniture());
        houseAdvert.setOnSite(body.isOnSite());
        houseAdvert.setDues(body.getDues());

        if (body.getPhotos().size() > 0){
            List<String> imageUrls = new ArrayList<>();
            for (MultipartFile file : body.getPhotos()){
                String imageUrl = imageUtil.uploadFile(file, "house-advert");
                imageUrls.add(imageUrl);
            }
            houseAdvert.setImageUrls(imageUrls);
        }

        houseAdvert.setUser(user);
        houseAdvertRepository.save(houseAdvert);
    }

    public HouseAdvertResponse getHouseAdvert(Long id){
        HouseAdvert houseAdvert = houseAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));
        return HouseAdvertResponse.fromEntity(houseAdvert);
    }

    public List<HouseAdvertResponse> getHouseAdverts(){
        List<HouseAdvert> houseAdverts = houseAdvertRepository.findAll();
        return houseAdverts.stream().map(houseAdvert -> HouseAdvertResponse.fromEntity(houseAdvert)).collect(Collectors.toList());
    }

    public Page<HouseAdvertResponse> getHouseAdvertsPage(int pageNo, int size){
        Pageable pageable = PageRequest.of(pageNo, size, Sort.by("publishedDate").descending());
        Page<HouseAdvert> houseAdvertPage = houseAdvertRepository.findAll(pageable);
        return houseAdvertPage.map(houseAdvert -> HouseAdvertResponse.fromEntity(houseAdvert));
    }

    public List<HouseAdvertResponse> getHouseAdvertsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        List<HouseAdvert> houseAdvertsByUser = houseAdvertRepository.findAllByUser(user);
        return houseAdvertsByUser.stream().map(houseAdvert -> HouseAdvertResponse.fromEntity(houseAdvert)).collect(Collectors.toList());
    }

    public byte[] getImageOfHouseAdvert(Long id, String filename){
        HouseAdvert houseAdvert = houseAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));
        if (!houseAdvert.getImageUrls().contains(filename)){
            throw new ResourceNotFoundException(ResourceType.IMAGE);
        }
        return imageUtil.downloadFile("house-advert", filename);
    }

    public void updateHouseAdvert(Long id, HouseAdvertRequest body){
        User user = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        HouseAdvert houseAdvert = houseAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));

        if (!houseAdvert.getUser().equals(user)){
            throw new UnauthorizedException();
        }

        houseAdvert.setTitle(body.getTitle());
        houseAdvert.setDetail(body.getDetail());
        houseAdvert.setPrice(body.getPrice());
        houseAdvert.setRoomCount(body.getRoomCount());
        houseAdvert.setArea(body.getArea());
        houseAdvert.setWarmingType(body.getWarmingType());
        houseAdvert.setHouseType(body.getHouseType());
        houseAdvert.setPropertyType(body.getPropertyType());
        houseAdvert.setAddress(body.getAddress());
        houseAdvert.setHasFurniture(body.isHasFurniture());
        houseAdvert.setOnSite(body.isOnSite());
        houseAdvert.setDues(body.getDues());

        if (body.getPhotos().size() > 0){
            for (MultipartFile file : body.getPhotos()){
                String imageUrl = imageUtil.uploadFile(file, "house-advert");
                houseAdvert.getImageUrls().add(imageUrl);
            }
        }

        houseAdvertRepository.save(houseAdvert);
    }

    public void deleteHouseAdvertImage(Long id, String filename){
        User user = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        HouseAdvert houseAdvert = houseAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));

        if (!houseAdvert.getUser().equals(user)) {
            throw new UnauthorizedException();
        }

        if (!houseAdvert.getImageUrls().contains(filename)) {
            throw new ResourceNotFoundException(ResourceType.IMAGE);
        }

        imageUtil.deleteFile("house-advert", filename);
        houseAdvert.getImageUrls().remove(filename);
        houseAdvertRepository.save(houseAdvert);
    }

    public void deleteHouseAdvert(Long id){
        User user = userService.getAuthenticatedUser().orElseThrow(() -> new ResourceNotFoundException(ResourceType.USER));
        HouseAdvert houseAdvert = houseAdvertRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(ResourceType.ADVERT));
        if (!houseAdvert.getUser().equals(user)){
            throw new UnauthorizedException();
        }
        if (!houseAdvert.getImageUrls().isEmpty()) {
            imageUtil.deleteMultipleFiles("house-advert", houseAdvert.getImageUrls());
        }
        houseAdvertRepository.deleteById(id);
    }
}