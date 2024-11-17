package com.undergraduate.server.controller;

import com.undergraduate.server.model.request.HouseAdvertRequest;
import com.undergraduate.server.model.response.HouseAdvertResponse;
import com.undergraduate.server.service.HouseAdvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/house-advert")
public class HouseAdvertController {
    private final HouseAdvertService houseAdvertService;

    @Autowired
    public HouseAdvertController(HouseAdvertService houseAdvertService){
        this.houseAdvertService = houseAdvertService;
    }

    @PostMapping
    public void createHouseAdvert(@ModelAttribute HouseAdvertRequest body){
        houseAdvertService.createHouseAdvert(body);
    }

    @GetMapping("/{id}")
    public HouseAdvertResponse getHouseAdvert(@PathVariable Long id){
        return houseAdvertService.getHouseAdvert(id);
    }

    @GetMapping("/user")
    public List<HouseAdvertResponse> getHouseAdvertsByUser(@RequestParam("user_id") Long userId) {
        return houseAdvertService.getHouseAdvertsByUser(userId);
    }

    @GetMapping
    public List<HouseAdvertResponse> getHouseAdverts(){
        return houseAdvertService.getHouseAdverts();
    }

    @GetMapping("/page")
    public Page<HouseAdvertResponse> getHouseAdvertPage(@RequestParam("page_no") int pageNo, @RequestParam("size") int size){
        return houseAdvertService.getHouseAdvertsPage(pageNo, size);
    }
    @GetMapping("/{id}/image/download")
    @Cacheable(value = "house_images", key = "#id + '_' + #filename")
    public byte[] getImageOfHouseAdvert(@PathVariable Long id, @RequestParam("filename") String filename){
        return houseAdvertService.getImageOfHouseAdvert(id, filename);
    }

    @PutMapping("/{id}")
    public void updateHouseAdvert(@PathVariable Long id, @ModelAttribute HouseAdvertRequest newBody){
        houseAdvertService.updateHouseAdvert(id, newBody);
    }

    @PutMapping("/{id}/image/delete")
    public void deleteHouseAdvertImage(@PathVariable Long id, @RequestParam("filename") String filename){
        houseAdvertService.deleteHouseAdvertImage(id, filename);
    }

    @DeleteMapping("/{id}")
    public void deleteHouseAdvert(@PathVariable Long id){
        houseAdvertService.deleteHouseAdvert(id);
    }
}
