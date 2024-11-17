import { Avatar, Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getHousemateSeachingAdvert } from '../../api/housemateSearchingAdvert.api';

const HousemateSearchingAdvertDetail = () => {
  const [housemateSearchingAdvert, setHousemateSearchingAdvert] 
  = useState(
    {
      id: 0,
      title: "",
      detail: "",
      publishedDate: "",
      monthlyRentFee: "",
      houseType: "",
      roomCount: "",
      area: 0.0,
      warmingType: "",
      feePerPerson: "",
      livingPeopleCount: 0,
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
      onSite: false
    }
    );
  const { id } = useParams();

  useEffect(() => {
    const getHousemateSearchingAd = async () => {
      const housemateSearchingAd = await getHousemateSeachingAdvert(id);
      setHousemateSearchingAdvert(housemateSearchingAd);
    }
    getHousemateSearchingAd();
  }, [id]);
  return (
    <>
      <Typography variant='h3'>{housemateSearchingAdvert?.title}</Typography>
      <Divider/>
      <Grid container spacing={5} sx={{display: "flex", justifyContent: "center"}}>
        <Grid item xs={3} sx={{marginTop: 2.5, marginLeft: 1.5}}>
          <Box sx={{boxShadow: 5}}>
            <Stack spacing={1} sx={{padding: 1}}>
              <Typography>Aylık Kira Ücreti: {housemateSearchingAdvert.monthlyRentFee}₺</Typography>
              <Typography>Ev Tipi: {housemateSearchingAdvert.houseType}</Typography>
              <Typography>Oda Sayısı: {housemateSearchingAdvert.roomCount}</Typography>
              <Typography>Alan: {housemateSearchingAdvert.area}m²</Typography>
              <Typography>Isınma Tipi: {housemateSearchingAdvert.warmingType}</Typography>
              <Typography>Kişi Başı Ücret: {housemateSearchingAdvert.feePerPerson}₺</Typography>
              {housemateSearchingAdvert.onSite ? <Typography>Site İçi Mi?: Evet</Typography> : <Typography>Site İçi Mi?: Hayır</Typography>}
              <Typography>Yaşayan İnsan Sayısı: {housemateSearchingAdvert.livingPeopleCount}</Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{marginTop: 2.5, marginLeft: 1.5}}>
          <Box sx={{boxShadow: 5, display: "flex", flexDirection: "column", gap: 1, justifyContent: "center", alignItems: "center", padding: 1.5}}>
            {housemateSearchingAdvert.userResponse.profilePhotoUrl ? <Avatar src={`http://localhost:8080/user/${housemateSearchingAdvert.userResponse.id}/image/download`}/> : <Avatar>{housemateSearchingAdvert.userResponse.username.charAt(0)}</Avatar>}
            <Typography>{housemateSearchingAdvert.userResponse.name}</Typography>
            <Typography>{housemateSearchingAdvert.userResponse.contactInfo}</Typography>
          </Box> 
        </Grid>
      </Grid>
    </>
  )
}

export default HousemateSearchingAdvertDetail