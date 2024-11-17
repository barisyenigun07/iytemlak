import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHouseAdvert } from '../../api/houseAdvert.api';
import { Box, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import AdvertImage from '../../components/AdvertImage';
import PublisherInfo from '../../components/PublisherInfoBox/PublisherInfo';

const HouseAdvertDetail = () => {
  
    const responsive = {
        desktop: {
          breakpoint: {max: 3000, min: 1024},
          items: 3,
          
        },
        tablet: {
          breakpoint: {max: 1024, min: 464},
          items: 2,
          
        },
        mobile: {
          breakpoint: {max: 464, min: 0},
          items: 1,
          
        }
      };
      

  const [houseAdvert, setHouseAdvert] = 
  useState(
    {
      id: 0,
      title: "",
      detail: "",
      publishedDate: "",
      price: 0.0,
      roomCount: "",
      area: 0.0,
      warmingType: "",
      houseType: "",
      propertyType: "",
      address: "",
      hasFurniture: false,
      dues: 0.0,
      imageUrls: [],
      userResponse: 
      {
        id: 0,
        name: "",
        username: "",
        email: "",
        contactInfo: "",
        profilePhotoUrl: "",
        role: 
        {
          id: 0,
          name: ""
        }
      },
      onSite: false
    }
  );  
  const { id } = useParams();
  
  useEffect(() => {
    const getHouseAd = async () => {
        const houseAd = await getHouseAdvert(id);
        console.log(houseAd);
        setHouseAdvert(houseAd);
    }
    getHouseAd();
  }, [id]);
  
  return (
    <Box sx={{height: "101vh"}}>
        <Carousel
            responsive={responsive}
            autoPlay={false}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisbile={false}
            dotListClass='custom-dot-list-style'
        >
            {(houseAdvert?.imageUrls || []).map((imageUrl, index) => {
                return (
                  <div key={index}>
                    <AdvertImage
                      imageUrl={`/house-advert/${houseAdvert?.id}/image/download?filename=${imageUrl}`}
                      altText={`House Image ${index + 1}`}
                      width={550}
                      height={350}
                    />
                  </div>
                );
            })}
          </Carousel>
        <Box mt={3} sx={{display: "flex", justifyContent: "center"}}>
              <Box m={2} p={2} sx={{boxShadow: 12}}>
                <Typography variant='h4'>{houseAdvert.title}</Typography>
                <br/> <br/>
                <Typography variant='h6'>Detay <br/> {houseAdvert.detail}</Typography>
                <br/> <br/>
                <Typography>Fiyat: {houseAdvert.price}₺</Typography>
                <Typography>Oda Sayısı: {houseAdvert.roomCount}</Typography>
                <Typography>Alan: {houseAdvert.area} m²</Typography>
                <Typography>Isınma Tipi: {houseAdvert.warmingType}</Typography>
                <Typography>Ev Tipi: {houseAdvert.houseType}</Typography>
                <Typography>Mülk Tipi: {houseAdvert.propertyType}</Typography>
                <Typography>Adres: {houseAdvert.address}</Typography>
                {houseAdvert.hasFurniture ? <Typography>Eşyalı Mı?: Evet</Typography> : <Typography>Eşyalı Mı?: Hayır</Typography>}
                {houseAdvert.onSite ? <Typography>Site İçi Mi?: Evet</Typography> : <Typography>Site İçi Mi?: Hayır</Typography>}
                <Typography>Aidat: {houseAdvert.dues}₺</Typography>
              </Box>
              <PublisherInfo user={houseAdvert.userResponse}/>
        </Box>
    </Box>
  )
}

export default HouseAdvertDetail