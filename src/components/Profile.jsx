import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const Profile = ({ userInfo }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    
      <Paper
        sx={{
          width: "100%",
          padding: isMobile ? "1em" : "2em 1em",
          display: "flex",
          flexDirection: "column",

          borderRadius: '15px',
        }}
      >
        <Typography variant={isMobile? "h5" : "h4"} sx={{fontFamily: "Montserrat Bold", mb: '1em'}}>Profile</Typography>
        <Grid container sx={{ }}>
          <Grid item xs={12} sx={{mb: '0.5em'}} >
            <Typography variant={isMobile? "h7":"h6"} sx={{fontFamily: "Montserrat Light",}}>Name: {userInfo.name}</Typography>
          </Grid>
          <Grid item xs={12} sx={{mb: '0.5em'}}>
            <Typography variant={isMobile? "h7":"h6"} sx={{fontFamily: "Montserrat Light",}}>Email: {userInfo.email}</Typography>
          </Grid>
          <Grid item xs={12} sx={{mb: '0.5em'}}>
            <Typography variant={isMobile? "h7":"h6"} sx={{fontFamily: "Montserrat Light",}}>University: {userInfo.university}</Typography>
          </Grid>
         
        </Grid>
      </Paper>
  );
};

export default Profile;
