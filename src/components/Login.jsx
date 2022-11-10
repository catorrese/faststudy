import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Key } from "@mui/icons-material";
import { getDatabase, ref, child, get, update } from "firebase/database";

const Login = ({ userInfo, triggerSessionValidation }) => {
  const [login, setLogin] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirm: "",
    university: "",
    name: "",
  });

  const handleAttributeChange = (name, value) => {
    setData((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
  };

  const signUp = () => {
    if (data["email"] !== "" && data["password"] !== "" && data["name"] !== "" && data["confirm"] !== "" && data["university"] !== "" && data["password"] === data['confirm']){
      const db = getDatabase();
      const updates = {};
        let postData = data;
        updates["/users/" + postData['email'].replaceAll('.', '-')] = postData;
        update(ref(db), updates)
        .then(() => {
          setLogin(true)
        })
        .catch((err) => console.log(err));
    }
  }

  const ingresar = () => {
    if (data["email"] !== "" && data["password"] !== "") {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${data['email'].replaceAll('.', '-')}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const response = snapshot.val()
            if(response.password === data['password']){
              window.localStorage.setItem(
                "user-info",
                JSON.stringify(response)
              );
              triggerSessionValidation();
            }else {
              console.log('Wrong password!')
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "auto",
        p: { xs: "1em", sm: "2em", md: "1em 4em" },
        minWidth: { xs: "300px", sm: "500px", md: "700px" },
        maxWidth: "900px",
        borderRadius: "15px",
        justifyContent: "center",
        m: "0 1em",
      }}
    >
      <Typography
        sx={{
          color: "#E14D2A",
          mt: login ? "1em" : 0,
          fontSize: { xs: 25, md: 35 },
          fontFamily: "Montserrat Bold",
        }}
      >
        User {login ? "Login" : "Sign Up"}
      </Typography>
      {!login && (
        <>
          <TextField
            type="text"
            sx={{
              m: "2em 0 0em 0",
              backgroundColor: "lightgray",
              color: "white",
            }}
            fullWidth
            variant="outlined"
            margin="normal"
            label="Name"
            name="name"
            autoComplete="name"
            value={data.name}
            required
            onChange={(event) =>
              handleAttributeChange(event.target.name, event.target.value)
            }
          />
          <TextField
            type="text"
            sx={{
              m: "1em 0 0em 0",
              backgroundColor: "lightgray",
              color: "white",
            }}
            fullWidth
            variant="outlined"
            margin="normal"
            label="University"
            name="university"
            autoComplete="university"
            value={data.university}
            required
            onChange={(event) =>
              handleAttributeChange(event.target.name, event.target.value)
            }
          />
        </>
      )}
      <TextField
        sx={{
          m: login ? "2em 0 1em 0" : "1em 0 1em 0",
          backgroundColor: "lightgray",
          color: "white",
        }}
        fullWidth
        type="email"
        variant="outlined"
        margin="normal"
        label="Email"
        name="email"
        autoComplete="email"
        required
        value={data.email}
        onChange={(event) =>
          handleAttributeChange(event.target.name, event.target.value)
        }
       
      />
      <TextField
        type="password"
        sx={{ m: "0", backgroundColor: "lightgray", color: "white" }}
        fullWidth
        variant="outlined"
        margin="normal"
        label="Password"
        name="password"
        autoComplete="password"
        value={data.password}
        required
        onChange={(event) =>
          handleAttributeChange(event.target.name, event.target.value)
        }
       
      />
      {!login && (
        <>
          <TextField
            type="password"
            sx={{
              m: "1em 0 0em 0",
              backgroundColor: "lightgray",
              color: "white",
            }}
            fullWidth
            variant="outlined"
            margin="normal"
            label="Confirm Password"
            name="confirm"
            autoComplete="confirm"
            value={data.confirm}
            required
            onChange={(event) =>
              handleAttributeChange(event.target.name, event.target.value)
            }
          />
        </>
      )}
      {login ? (
        <Button
          variant="contained"
          sx={{
            margin: "1.3em 0 0 0",
            fontSize: 15,
            width: "100%",
            height: 40,
            borderRadius: 22,
            fontFamily: "Montserrat Bold",
            bgcolor: "#E14D2A",
          }}
          onClick={() => {
            ingresar();
          }}
          id="logInButton"
        >
          Login
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            margin: "1.3em 0 0 0",
            fontSize: 15,
            width: "100%",
            height: 40,
            borderRadius: 22,
            fontFamily: "Montserrat Bold",
            bgcolor: "#E14D2A",
          }}
          onClick={() => {
            signUp();
          }}
          id="logInButton"
        >
          Sign Up
        </Button>
      )}
      <Grid container sx={{ m: login ? "1em 0" : "1em 0 0 0 " }}>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            color="primary"
            sx={{
              textAlign: "right",
              fontSize: { xs: 11, md: 14 },
              fontFamily: "Montserrat Light",
              color: "#E14D2A",
            }}
            //onClick={() => setAuthState('FORGOT_PASSWORD')}
            id="forgotPasswordButton"
          >
            <strong>Forgot Password?</strong>
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          {login ? (
            <Button
              fullWidth
              sx={{
                textAlign: "right",
                fontSize: { xs: 11, md: 14 },
                fontFamily: "Montserrat Light",
                color: "#E14D2A",
              }}
              onClick={() => setLogin(!login)}
              id="forgotPasswordButton"
            >
              <strong>Create Account</strong>
            </Button>
          ) : (
            <Button
              fullWidth
              sx={{
                textAlign: "right",
                fontSize: { xs: 11, md: 14 },
                fontFamily: "Montserrat Light",
                color: "#E14D2A",
              }}
              onClick={() => setLogin(!login)}
              id="forgotPasswordButton"
            >
              <strong>Login</strong>
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
