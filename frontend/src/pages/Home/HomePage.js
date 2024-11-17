import React, { useState, useEffect } from "react";
import { Box, Typography, Divider,CircularProgress } from "@mui/material";


import { getHouseAdvertPage } from "../../api/houseAdvert.api";
import { getHousemateSearchingAdvertPage } from "../../api/housemateSearchingAdvert.api";
import { getHousemateWantingAdvertPage } from "../../api/housemateWantingAdvert.api";
import { getBelongingsAdvertPage } from '../../api/belongingsAdvert.api';
import HouseCard from "../../components/Card/HouseAdvertCard";
import BelongingsCard from "../../components/Card/BelongingsAdvertCard";
import HousemateSearchingAdvertCard from "../../components/Card/HousemateSearchingAdvertCard";
import HousemateWantingAdvertCard from "../../components/Card/HousemateWantingAdvertCard";
import SearchBox from "../../components/SearchBox/SearchBox";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [houseAdverts, setHouseAdverts] = useState([]);
  const [housemateSearchingAdverts, setHousemateSearchingAdverts] = useState([]);
  const [housemateWantingAdverts, setHousemateWantingAdverts] = useState([]);
  const [belongingsAdverts, setBelongingsAdverts] = useState([]);

  const getHouseAds = async () => {
    try {
      const houseAds = await getHouseAdvertPage(0, 5);
      setHouseAdverts(houseAds?.content);
    } catch (error) {
      alert(error);
    }
  }

  const getHousemateSearchingAds = async () => {
    try {
      const housemateSearchingAds = await getHousemateSearchingAdvertPage(0, 5);
      setHousemateSearchingAdverts(housemateSearchingAds?.content);
    }
    catch (error) {
      alert(error);
    }
  }

  const getHousemateWantingAds = async () => {
    try {
      const housemateWantingAds = await getHousemateWantingAdvertPage(0, 5);
      setHousemateWantingAdverts(housemateWantingAds?.content);
    }
    catch (error) {
      alert(error);
    }
  }

  const getBelongingsAds = async () => {
    try {
      const belongingsAds = await getBelongingsAdvertPage(0, 5);
      
      setBelongingsAdverts(belongingsAds?.content);
    }
    catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    getHouseAds();
    getHousemateSearchingAds();
    getHousemateWantingAds();
    getBelongingsAds();

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <CircularProgress/>
    )
  }
  return (
    <>
      <Box className="backgroundMain">
        <Box sx={{ textAlign: "center", color: "#ffff" }}>
          <Typography
            sx={{fontSize: "54px", fontWeight: "bold"}}
            variant="h1"
            component="h2"
          >
            Ev/Ev Arkadaşı/Eşya <br/>
            Aramak İstediğinizi Bulun
          </Typography>

        </Box>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <SearchBox/>
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          marginTop: 5
        }}
      >
        <Typography
          sx={{ fontSize: "24px", fontWeight: "bold" }}
          variant="h1"
          component="h2"
        >
          Öne Çıkanlar
        </Typography>
      </Box>
      <Box ml={2}>
        <Typography variant="h4" sx={{fontSize: "20px", fontWeight: "bold"}}>Ev İlanları</Typography>
        <Divider/>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 256,
          },
          p: 2,
        }}
      >
        
        {houseAdverts?.length === 0 ? <Typography>Ev ilanı bulunamadı</Typography> : houseAdverts.map(houseAdvert => <HouseCard item={houseAdvert}/>)}
      </Box>
      <Box ml={2}>
        <Typography variant="h4" sx={{fontSize: "20px", fontWeight: "bold"}}>Ev Arkadaşı Arama İlanları</Typography>
        <Divider></Divider>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 256,
          },
          p: 2,
        }}
      >
      {housemateSearchingAdverts?.length === 0 ? <Typography>Ev arkadaşı arama ilanı bulunamadı</Typography> : housemateSearchingAdverts?.map(housemateSearchingAdvert => <HousemateSearchingAdvertCard item={housemateSearchingAdvert}/>)}
      </Box>
      <Box ml={2}>
        <Typography variant="h4" sx={{fontSize: "20px", fontWeight: "bold"}}>Ev Arkadaşı Olma İlanları</Typography>
        <Divider></Divider>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 256,
          },
          p: 2,
        }}
      >
        {housemateWantingAdverts?.length === 0 ? <Typography>Ev arkadaşı olma ilanı bulunamadı</Typography> : housemateWantingAdverts?.map(housemateWantingAdvert => <HousemateWantingAdvertCard item={housemateWantingAdvert}/>)}
      </Box>
      <Box ml={2}>
        <Typography variant="h4" sx={{fontSize: "20px", fontWeight: "bold"}}>Eşya İlanları</Typography>
        <Divider></Divider>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 256,
          },
          p: 2,
        }}
      >
      {belongingsAdverts?.length === 0 ? <Typography>No Belongings Adverts Found</Typography> : belongingsAdverts?.map(belongingsAdvert => <BelongingsCard item={belongingsAdvert}/>)}
      </Box>
    </>
  );
}
export default HomePage;
