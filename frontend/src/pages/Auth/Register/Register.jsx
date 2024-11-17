import React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Stack,
  Divider,
  Link,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";

import { useFormik } from "formik";
import validationSchema from "./validations";

import { register } from "../../../api/auth.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      contactInfo: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        await register(values);
        navigate("/login");
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={7}
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
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "30px",
                    color: "#000",
                  }}
                >
                  Kayıt Ol
                </Typography>
                <br /> <br />
              </Box>
              <Box>
                {formik.errors.general && (
                  <Alert status="error">{formik.errors.general}</Alert>
                )}
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ px: 8 }}>
                  <TextField
                    id="name"
                    label="İsim"
                    variant="outlined"
                    size="small"
                    sx={{ width: 1, maxWidth: "540px" }}
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Box>
                <Box sx={{ px: 8, mt: 2 }}>
                  <TextField
                    id="username"
                    label="Kullanıcı Adı"
                    variant="outlined"
                    size="small"
                    sx={{ width: 1, maxWidth: "540px" }}
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                </Box>
                <Box sx={{ px: 8, mt: 2 }}>
                  <TextField
                    id="phone-number"
                    label="Telefon Numarası"
                    variant="outlined"
                    size="small"
                    sx={{ width: 1, maxWidth: "540px" }}
                    name="contactInfo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Box>
                <Box sx={{ px: 8, mt: 2 }}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    sx={{ width: 1, maxWidth: "540px" }}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Box>
                <Box sx={{ px: 8, mt: 2 }}>
                  <TextField
                    id="password"
                    label="Şifre"
                    variant="outlined"
                    size="small"
                    sx={{ width: 1, maxWidth: "540px" }}
                    name="password"
                    type={"password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Box>
                <Box sx={{ px: 8, mt: 2 }}>
                  <TextField
                    id="password-again"
                    label="Tekrar Şifre"
                    variant="outlined"
                    size="small"
                    sx={{ width: 1, maxWidth: "540px" }}
                    name="passwordRepeat"
                    type={"password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                    helperText={
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                    }
                  />
                </Box>

                <Box sx={{ px: 8, textAlign: "left", mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Kullanıcı tipi seçin</InputLabel>
                    <Select
                      id="role"
                      name="role"
                      defaultValue={"Student"}
                      label="Select the type of user"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                    >
                      <MenuItem value={"Student"}>Öğrenci</MenuItem>
                      <MenuItem value={"House Owner"}>Ev Sahibi</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    px: 8,

                    mt: 2,
                  }}
                >
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
                      maxWidth: "540px",
                    }}
                  >
                    Kayıt Ol
                  </Button>
                </Box>
              </form>

              <Divider>Ya da</Divider>

              <Box sx={{ px: 8 }}>
                <Button
                  href="/login"
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
                      color: "#ffff",
                    },
                    maxWidth: "540px",
                  }}
                >
                  Giriş Yap
                </Button>
              </Box>
              <Link style={{textDecoration: "none", color: "#8E1904"}} href="/">Kayıt olmadan devam et</Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
