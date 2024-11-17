package com.undergraduate.server.controller;

import com.undergraduate.server.model.request.BelongingsAdvertRequest;
import com.undergraduate.server.model.response.BelongingsAdvertResponse;
import com.undergraduate.server.service.BelongingsAdvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/belongings-advert")
public class BelongingsAdvertController {
    private final BelongingsAdvertService belongingsAdvertService;

    @Autowired
    public BelongingsAdvertController(BelongingsAdvertService belongingsAdvertService){
        this.belongingsAdvertService = belongingsAdvertService;
    }

    @PostMapping
    public void createBelongingsAdvert(@ModelAttribute BelongingsAdvertRequest body){
        belongingsAdvertService.createBelongingsAdvert(body);
    }

    @GetMapping("/{id}")
    public BelongingsAdvertResponse getBelongingsAdvert(@PathVariable Long id){
        return belongingsAdvertService.getBelongingsAdvert(id);
    }

    @GetMapping("/user")
    public List<BelongingsAdvertResponse> getBelongingsAdvertsByUser(@RequestParam("user_id") Long userId) {
        return belongingsAdvertService.getBelongingsAdvertsByUser(userId);
    }

    @GetMapping
    public List<BelongingsAdvertResponse> getBelongingsAdverts(){
        return belongingsAdvertService.getBelongingsAdverts();
    }

    @GetMapping("/page")
    public Page<BelongingsAdvertResponse> getBelongingsAdvertPage(@RequestParam("page_no") int pageNo, @RequestParam("size") int size){
        return belongingsAdvertService.getBelongingsAdvertPage(pageNo, size);
    }

    @GetMapping("/{id}/image/download")
    @Cacheable(value = "belongings_images", key = "#id + '_' + #filename")
    public byte[] getImageOfBelongingsAdvert(@PathVariable Long id, @RequestParam("filename") String filename){
        return belongingsAdvertService.getImageOfBelongingsAdvert(id, filename);
    }

    @PutMapping("/{id}")
    public void updateBelongingsAdvert(@PathVariable Long id, @ModelAttribute BelongingsAdvertRequest newBody){
        belongingsAdvertService.updateBelongingsAdvert(id, newBody);
    }

    @PutMapping("/{id}/image/delete")
    public void deleteBelongingsAdvertImage(@PathVariable Long id, @RequestParam("filename") String filename){
        belongingsAdvertService.deleteBelongingsAdvertImage(id, filename);
    }

    @DeleteMapping("/{id}")
    public void deleteBelongingsAdvert(@PathVariable Long id){
        belongingsAdvertService.deleteBelongingsAdvert(id);
    }
}
