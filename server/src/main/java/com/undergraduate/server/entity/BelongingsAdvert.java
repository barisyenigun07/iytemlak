package com.undergraduate.server.entity;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "belongings_advert")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BelongingsAdvert extends Advert{
    @NotNull
    @Column(name = "price")
    private double price;
    @NotNull
    @Column(name = "type")
    private String type;
    @NotNull
    @Column(name = "status")
    private String status;
    @NotNull
    @Column(name = "is_shippable")
    private boolean isShippable;
    @NotNull
    @Column(name = "is_exchangeable")
    private boolean isExchangeable;
    @ElementCollection
    @CollectionTable(name = "belongings_image", joinColumns = @JoinColumn(name = "advert_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;
}
