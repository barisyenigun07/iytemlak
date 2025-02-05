import React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Stack,
  InputAdornment,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/authActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    
    onSubmit: async (values) => {
      try {
        dispatch(userLogin(values))
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          })
      }
      catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}             
          className="backgroundMain"
          sx={{            
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
         }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "44px",
                color: "#ffff",
              }}
            >
              WELCOME TO{<br />} İYTEMLAK!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ textAlign: "center", mt: 14 }}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "30px",
                    color: "#000",
                  }}
                >
                  Giriş Yap
                </Typography>
                <br /> <br />
                <br /> <br />
              </Box>
              <form onSubmit={formik.handleSubmit}>
              <Box sx={{ px: 8 }}>
                <TextField
                  id="username-textfield"
                  label="Kullanıcı Adı"
                  variant="outlined"
                  size="small"
                  name="username"
                  type={"text"}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  sx={{ width: 1, maxWidth: "540px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ px: 8, mt: 2, mb: 5 }}>
                <TextField
                  id="password-textfield"
                  label="Şifre"
                  variant="outlined"
                  size="small"
                  name="password"
                  type={"password"}
                  sx={{ width: 1, maxWidth: "540px" }}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ px: 8 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    bgcolor: "#8E1904",
                    p: 1,
                    width: 1,
                    "&:hover": {
                      bgcolor: "#571104",
                    },
                  }}
                >
                  Giriş Yap
                </Button>
              </Box>  
              </form>
              
  
              <Divider>Ya da</Divider>

              <Box sx={{ px: 8 }}>
                <Button
                  href="/register"
                  variant="contained"
                  sx={{
                    color: "#3949AB",
                    borderRadius: 5,
                    border: 1,
                    borderColor: "#3949AB",
                    bgcolor: "#fff",
                    p: 1,
                    width: 1,
                    "&:hover": {
                      bgcolor: "#3949AB",
                      color: "#ffff"
                    },
                  }}
                >
                  Kayıt Ol
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/*
       
        <Button href="#" variant="contained" sx={{ ml: 1 }}>
          Ara
        </Button>
        */}
    </>
  );
};

export default Login;
