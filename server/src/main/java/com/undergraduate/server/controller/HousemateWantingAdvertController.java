package com.undergraduate.server.controller;

import com.undergraduate.server.model.request.HousemateWantingAdvertRequest;
import com.undergraduate.server.model.response.HousemateWantingAdvertResponse;
import com.undergraduate.server.service.HousemateWantingAdvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/housemate-wanting-advert")
public class HousemateWantingAdvertController {
    private final HousemateWantingAdvertService housemateWantingAdvertService;

    @Autowired
    public HousemateWantingAdvertController(HousemateWantingAdvertService housemateWantingAdvertService){
        this.housemateWantingAdvertService = housemateWantingAdvertService;
    }

    @PostMapping
    public void createHousemateWantingAdvert(@RequestBody HousemateWantingAdvertRequest body){
        housemateWantingAdvertService.createHousemateWantingAdvert(body);
    }

    @GetMapping("/{id}")
    public HousemateWantingAdvertResponse getHousemateWantingAdvert(@PathVariable Long id){
        return housemateWantingAdvertService.getHousemateWantingAdvert(id);
    }

    @GetMapping("/user")
    public List<HousemateWantingAdvertResponse> getHousemateWantingAdvertsByUser(@RequestParam("user_id") Long userId) {
        return housemateWantingAdvertService.getHousemateWantingAdvertsByUser(userId);
    }

    @GetMapping
    public List<HousemateWantingAdvertResponse> getHousemateWantingAdverts(){
        return housemateWantingAdvertService.getHousemateWantingAdverts();
    }

    @GetMapping("/page")
    public Page<HousemateWantingAdvertResponse> getHousemateWantingAdvertPage(@RequestParam("page_no") int pageNo, @RequestParam("size") int size){
        return housemateWantingAdvertService.getHousemateWantingAdvertPage(pageNo, size);
    }

    @PutMapping("/{id}")
    public void updateHousemateWantingAdvert(@PathVariable Long id, @RequestBody HousemateWantingAdvertRequest body){
        housemateWantingAdvertService.updateHousemateWantingAdvert(id,body);
    }

    @DeleteMapping("/{id}")
    public void deleteHousemateWantingAdvert(@PathVariable Long id){
        housemateWantingAdvertService.deleteHousemateWantingAdvert(id);
    }

}
