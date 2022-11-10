import { Button, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { child, get, getDatabase, ref } from 'firebase/database';
import { getDownloadURL, getStorage, ref as refStorage } from 'firebase/storage';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const SearchNotes = () => {

  const [notes, setNotes] = useState([])

  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  useEffect(() => {
    const getNotes = async () => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `notes`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const response = snapshot.val();
            console.log(Object.values(response));
            setNotes(Object.values(response));
          } else {
            console.log("No data available");
            setNotes([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getNotes();
  }, []);

  const openNotes = (paths) => {
    const storage = getStorage();
    var windowReference = window.open();

    getDownloadURL(refStorage(storage, "notes/" + paths))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        windowReference.location = url;
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  };
  return (
    <Paper
      sx={{
        width: "100%",
        padding: isMobile ? "1em" : "2em 1em",
        borderRadius: "15px",
        mt: "5.5em",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{ fontFamily: "Montserrat Bold", mb: "1em" }}
      >
        {"Notes"}
      </Typography>

        <>
          
          <Grid container width="100%" justifyContent="center">
            {notes.map((note, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{
                    minWidth: "300px",
                    heigth: "235px",
                    ml: !isMobile ? " 0.5em" : 0,
                  }}
                >
                  <Card
                    sx={{
                      margin: "1em",
                      borderRadius: "1em",
                      background: "white",
                      border: "solid #E14D2A",
                      minWidth: "300px",
                      minHeight: "235px",
                      p: "0 0.5em",
                    }}
                  >
                    <CardContent>
                      <Typography noWrap variant="h7" sx={{ mb: "0.5em" }}>
                        <strong>{note.name}</strong>
                      </Typography>
                      <Typography>University: {note.university}</Typography>
                      <Typography>Career: {note.career}</Typography>
                      <Typography>Course: {note.course}</Typography>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#E14D2A", m: "1.3em 0 0 0" }}
                        onClick={() => {
                          openNotes(note.path);
                        }}
                      >
                        View Notes
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
        </Paper>
  )
}

export default SearchNotes