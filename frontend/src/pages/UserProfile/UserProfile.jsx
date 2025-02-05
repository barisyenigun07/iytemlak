import { Avatar, Box, Divider, Stack, Typography, Tabs, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../api/user.api';

import bg from '../../assets/bg-logo.jpg'
import { Email, Phone } from '@mui/icons-material';
import { getHouseAdvertsByUser } from '../../api/houseAdvert.api';
import { getHousemateSearchingAdvertsByUser } from '../../api/housemateSearchingAdvert.api';
import { getHousemateWantingAdvertsByUser } from '../../api/housemateWantingAdvert.api';
import { getBelongingsAdvertsByUser } from '../../api/belongingsAdvert.api';
import HouseAdvertCard from '../../components/Card/HouseAdvertCard';
import BelongingsAdvertCard from '../../components/Card/BelongingsAdvertCard';
import HousemateSearchingAdvertCard from '../../components/Card/HousemateSearchingAdvertCard';
import HousemateWantingAdvertCard from '../../components/Card/HousemateWantingAdvertCard';
import AppBar3 from '../../components/Navbar/AppBar3';

const UserProfile = () => {

  const { id } = useParams();

  const [user, setUser] = useState({id: 0, name: "", username: "", email: "", contactInfo: "", profilePhotoUrl: ""});
  const [houseAdverts, setHouseAdverts] = useState([]);
  const [housemateSearchingAdverts, setHousemateSearchingAdverts] = useState([]);
  const [housemateWantingAdverts, setHousemateWantingAdverts] = useState([]);
  const [belongingsAdverts, setBelongingsAdverts] = useState([]); 
  
  const [value, setValue] = useState(0);
  
  const navigate = useNavigate();


  
  const handleTabs = (event, value) => {
    setValue(value);
  }

  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUser(id);
      setUser(userDetails);
    }
    catch (err) {
      console.log("Error!");
    }
  }

  const getHouseAdverts = async () => {
    if (user && user?.role?.name === "HOUSE_OWNER") {
      try {
        const houseAds = await getHouseAdvertsByUser(user?.id);
        setHouseAdverts(houseAds);
      }
      catch (err) {

      } 
    }
  }

  const getHousemateSearchingAdverts = async () => {
    if (user && user.role?.name === "STUDENT") {
      try {
        const housemateSearchingAds = await getHousemateSearchingAdvertsByUser(user?.id);
        setHousemateSearchingAdverts(housemateSearchingAds);
      } catch (error) {
        
      }
    }
  }

  const getHousemateWantingAdverts = async () => {
    if (user && user.role?.name === "STUDENT") {
      try {
        const housemateWantingAds = await getHousemateWantingAdvertsByUser(user?.id);
        setHousemateWantingAdverts(housemateWantingAds);
      } catch (error) {
        
      }
    }
  }

  const getBelongingsAdverts = async () => {
    if (user && user.role?.name === "STUDENT") {
      try {
        const belongingsAds = await getBelongingsAdvertsByUser(user?.id);
        setBelongingsAdverts(belongingsAds);
      }
      catch (error) {

      }
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  useEffect(() => {
    if (user?.id) {
      getHouseAdverts();
      getBelongingsAdverts();
      getHousemateSearchingAdverts();
      getHousemateWantingAdverts();
    }
  }, [user])


  return (
    <Box>
      <Box sx={{width: "100%", height: "400px", backgroundImage: `url(${bg})`}}>
        <AppBar3/>
        <Box 
          sx={{
            display: "flex",
            justifyContent: "center"
            }}
        >
          {user?.profilePhotoUrl == null ? <Avatar sx={{width: 70, height: 70, mt: 2}}>{user?.username[0]}</Avatar> : <Avatar src={`http://localhost:8080/user/${user?.id}/image/download`} alt={`${user?.username}`} sx={{width: 150, height: 150, mt: 2}}/>}
        </Box>
        <Box mt={3} textAlign={"center"} sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <Typography variant='h4' color={"white"}>{user?.name} - @{user?.username}</Typography>
          {user?.role?.name === "HOUSE_OWNER" ? <Typography variant='h6' color={"white"}>Ev Sahibi</Typography> : <Typography variant='h6' color={"white"}>Öğrenci</Typography>}
          <Box sx={{display: "flex", justifyContent: "space-around", gap: 2}}>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              <Email sx={{color: "white"}}/>
              <Typography variant='h6' color={"white"}>{user?.email}</Typography> 
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              <Phone sx={{color: "white"}}/>
              <Typography variant='h6' color={"white"}>{user?.contactInfo}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{width: "100%"}}>
          {user?.role?.name === "HOUSE_OWNER" ? 
            <Box sx={{mt: 5}}>
              <Typography variant='h4' ml={3}>
                House Adverts of User
                
              </Typography>
              <Divider></Divider>
              <Stack sx={{display: "flex", justifyContent: "center"}} mt={2} ml={2} spacing={2}>
                {houseAdverts.map(houseAdvert => <HouseAdvertCard item={houseAdvert}/>)}
              </Stack>
            </Box>
            :
            <Box>
              <Tabs variant='contained' value={value} onChange={handleTabs} centered>
                <Tab label="Eşya İlanları"/>
                <Tab label="Ev Arkadaşı Arama İlanları"/>
                <Tab label="Ev Arkadaşı Olma İlanları"/>
              </Tabs>
              <TabPanel value={value} index={0}>
                {(belongingsAdverts.length === 0) ? <Typography>Eşya ilanı bulunamadı</Typography> : belongingsAdverts.map(belongingsAdvert => <BelongingsAdvertCard item={belongingsAdvert}/>)}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {(housemateSearchingAdverts.length === 0) ? <Typography>Ev arkadaşı arama ilanı bulunamadı</Typography> : housemateSearchingAdverts.map(housemateSearchingAdvert => <HousemateSearchingAdvertCard item={housemateSearchingAdvert}/>)}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {(housemateWantingAdverts.length === 0) ? <Typography>Ev arkadaşı olma ilanı bulunamadı</Typography> : housemateWantingAdverts.map(housemateWantingAdvert => <HousemateWantingAdvertCard item={housemateWantingAdvert}/>)}
              </TabPanel>
            </Box>
          }
      </Box>
      
    </Box>
  )
}

function TabPanel(props) {
  const {children, value, index} = props;
  return (
    <div hidden={value !== index}>
      {
        value === index && (
          <div>
            {children}
          </div>
        )
      }
    </div>
  );
}

export default UserProfile