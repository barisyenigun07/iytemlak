import React from 'react'
import { Box, Typography, Avatar } from "@mui/material"
import { Phone } from "@mui/icons-material"

const PublisherInfo = ({user}) => {
  return (
    <Box width={350} height={350} m={2}>
        <Box component={"a"} href={`/user/${user.id}`} sx={{boxShadow: 12, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "black"}}>
            <Typography variant='h5'>İlan Sahibi Bilgileri</Typography> <br/>
            {user.profilePhotoUrl == null ? <Avatar sx={{width: "100px", height: "100px"}}>{user.username[0]}</Avatar> : <Avatar src={`http://localhost:8080/user/${user.id}/image/download`} sx={{width: "100px", height: "100px"}}/>}
            <Typography>{user.name}</Typography>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <Phone/>
              <Typography>İletişim Bilgisi: {user.contactInfo}</Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default PublisherInfo