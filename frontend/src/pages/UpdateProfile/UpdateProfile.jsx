import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../api/user.api';
import { useSelector } from 'react-redux';

const UpdateProfile = () => {
  const { authUser } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contactInfo", contactInfo);
    formData.append("profilePhoto", profilePhoto);

    await updateUser(formData);
  }

  
  return (
    <>
       <Box>
        <form onSubmit={handleUpdateProfile}>
          <Box sx={{display: "flex", flexDirection: "column", gap: 3, alignItems: "center", justifyContent: "center"}}>
            <TextField type="text" label="İsim" value={authUser?.name} onChange={(e) => setName(e.target.value)}/>
            <TextField type="text" label="Kullanıcı Adı" value={authUser?.username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField type='email' label="Email" value={authUser?.email} onChange={(e) => setEmail(e.target.value)}/>
            <TextField type='text' label="İletişim Bilgileri" value={authUser?.contactInfo} onChange={(e) => setContactInfo(e.target.value)}/>
            <Button type="submit" variant="contained">Güncelle</Button>
          </Box>
        </form>
       </Box>
    </>
  )
}

export default UpdateProfile