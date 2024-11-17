import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import { getBelongingsAdvert } from '../../api/belongingsAdvert.api';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import AdvertImage from '../../components/AdvertImage';
import PublisherInfo from '../../components/PublisherInfoBox/PublisherInfo';


const BelongingsAdvertDetail = () => {

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

  const [belongingsAdvert, setBelongingsAdvert]
   = useState(
      {
        id: 0, 
        title: "", 
        detail: "", 
        publishedDate: "", 
        price: 0.0, 
        type: "", 
        status: "", 
        imageUrls: [], 
        userResponse: 
          {
            id: 0, 
            name: "", 
            username: "", 
            email: "", 
            contactInfo: "", 
            profilePhotoUrl: null, 
            role: 
              {
                id: 0, 
                name: ""
              }
          }, 
        shippable: false, 
        exchangeable: false});
  
  const { id } = useParams();
  
  useEffect(() => {
    const getBelongingsAd = async () => {
        const belongingsAd = await getBelongingsAdvert(id);
        setBelongingsAdvert(belongingsAd);
    }

    getBelongingsAd();
  }, [id]);
  return (
    <Box sx={{height: "101vh"}}>
        <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisbile={false}
            dotListClass='custom-dot-list-style'
        >
            {(belongingsAdvert?.imageUrls || []).map((imageUrl, index) => {
                return (
                    <div className='slider' key={index}>
                      <AdvertImage
                        imageUrl={`/belongings-advert/${belongingsAdvert.id}/image/download?filename=${imageUrl}`}
                        altText={`Belongings Image ${index + 1}`}
                        width={550}
                        height={350}
                      />
                    </div>
                );
            })}
          </Carousel>
        <Box mt={3} sx={{display: "flex", justifyContent: "center"}}>
            <Box m={2} p={2} sx={{boxShadow: 12}}>
                <Typography variant='h4'>{belongingsAdvert.title}</Typography>
                <br/> <br/>
                <Typography variant='h6'>Detay <br/> {belongingsAdvert.detail}</Typography>
                <br/> <br/>
                <Typography>Fiyat: {belongingsAdvert.price}₺</Typography>
                <Typography>Tip: {belongingsAdvert.type}</Typography>
                <Typography>Durum: {belongingsAdvert.status}</Typography>
                {belongingsAdvert.shippable ? <Typography>Kargolanabilir mi?: Evet</Typography> : <Typography>Kargolanabilir mi?: Hayır</Typography>}
                {belongingsAdvert.exchangeable ? <Typography>Takas edilebilir mi?: Evet</Typography> : <Typography>Takas edilebilir mi?: Hayır</Typography>}
                
              </Box>
              <PublisherInfo user={belongingsAdvert?.userResponse}/>
        </Box>
    </Box>
    
  )
}

export default BelongingsAdvertDetail