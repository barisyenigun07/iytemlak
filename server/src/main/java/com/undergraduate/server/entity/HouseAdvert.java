package com.undergraduate.server.entity;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "house_advert")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HouseAdvert extends Advert {
    @NotNull
    @Column(name = "price")
    private double price;
    @NotNull
    @Column(name = "room_count")
    private String roomCount;
    @NotNull
    @Column(name = "area")
    private double area;
    @NotNull
    @Column(name = "warming_type")
    private String warmingType;
    @NotNull
    @Column(name = "house_type")
    private String houseType;
    @NotNull
    @Column(name = "property_type")
    private String propertyType;
    @Column(name = "address")
    private String address;
    @Column(name = "has_furniture")
    private boolean hasFurniture;
    @Column(name = "is_on_site")
    private boolean isOnSite;
    @Column(name = "dues")
    private double dues;
    @ElementCollection
    @CollectionTable(name = "house_image", joinColumns = @JoinColumn(name = "advert_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;
}
