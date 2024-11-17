package com.undergraduate.server.controller;

import com.undergraduate.server.model.request.HousemateSearchingAdvertRequest;
import com.undergraduate.server.model.response.HousemateSearchingAdvertResponse;
import com.undergraduate.server.service.HousemateSearchingAdvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/housemate-searching-advert")
public class HousemateSearchingAdvertController {
    private final HousemateSearchingAdvertService housemateSearchingAdvertService;

    @Autowired
    public HousemateSearchingAdvertController(HousemateSearchingAdvertService housemateSearchingAdvertService){
        this.housemateSearchingAdvertService = housemateSearchingAdvertService;
    }

    @PostMapping
    public void createHousemateSearchingAdvert(@RequestBody HousemateSearchingAdvertRequest body){
        housemateSearchingAdvertService.createHousemateSearchingAdvert(body);
    }

    @GetMapping("/{id}")
    public HousemateSearchingAdvertResponse getHousemateSearchingAdvert(@PathVariable Long id){
        return housemateSearchingAdvertService.getHousemateSearchingAdvert(id);
    }

    @GetMapping("/user")
    public List<HousemateSearchingAdvertResponse> getHousemateSearchingAdvertsByUser(@RequestParam("user_id") Long userId){
        return housemateSearchingAdvertService.getHousemateSearchingAdvertsByUser(userId);
    }

    @GetMapping
    public List<HousemateSearchingAdvertResponse> getHousemateSearchingAdverts(){
        return housemateSearchingAdvertService.getHousemateSearchingAdverts();
    }

    @GetMapping("/page")
    public Page<HousemateSearchingAdvertResponse> getHousemateSearchingAdvertPage(@RequestParam(value = "page_no") int pageNo, @RequestParam("size") int size){
        return housemateSearchingAdvertService.getHousemateSearchingAdvertPage(pageNo, size);
    }

    @PutMapping("/{id}")
    public void updateHousemateSearchingAdvert(@PathVariable Long id, @RequestBody HousemateSearchingAdvertRequest body){
        housemateSearchingAdvertService.updateHousemateSearchingAdvert(id, body);
    }

    @DeleteMapping("/{id}")
    public void deleteHousemateSearchingAdvert(@PathVariable Long id){
        housemateSearchingAdvertService.deleteHousemateSearchingAdvert(id);
    }

}
