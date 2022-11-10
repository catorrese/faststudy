import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getDatabase, ref, child, push, update, get } from "firebase/database";
import { Stack } from "@mui/system";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadBytes,
} from "firebase/storage";

const MyNotes = ({ userInfo }) => {
  const [refresh, setRefresh] = useState(false);
  const [myNotes, setMyNotes] = useState([]);
  const [noteEditor, setNoteEditor] = useState(false);
  const [newNote, setNewNote] = useState({
    name: "",
    course: "",
    university: "",
    career: "",
  });
  const [path, setPath] = useState("");
  const [pdf, setPdf] = useState(null);

  const handleAttributeChange = (name, value) => {
    setNewNote((previous) => {
      const newObject = { ...previous };
      newObject[name] = value;
      return newObject;
    });
  };

  useEffect(() => {
    const getNotes = async () => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `user-posts/${userInfo["email"].replaceAll(".", "-")}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const response = snapshot.val();
            console.log(Object.values(response));
            setMyNotes(Object.values(response));
          } else {
            console.log("No data available");
            setMyNotes([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    userInfo && getNotes();
  }, [refresh, userInfo]);

  const uploadNote = () => {
    let error = false;
    Object.values(newNote).forEach((value) => {
      if (value === "" || value === null) {
        error = true;
      }
    });
    if (!error && pdf != null) {
      const db = getDatabase();
      const newPostKey = push(child(ref(db), "notes")).key;
      const storage = getStorage();
      const storageRef = refStorage(storage, "notes/" + newPostKey);
      uploadBytes(storageRef, pdf).then((snapshot) => {
        console.log("Uploaded file!");

        const updates = {};
        let postData = newNote;
        postData["path"] = newPostKey;
        updates["/notes/" + newPostKey] = postData;
        updates[
          "/user-posts/" +
            userInfo["email"].replaceAll(".", "-") +
            "/" +
            newPostKey
        ] = postData;

        update(ref(db), updates)
          .then(() => {
            setNoteEditor(false);
            setRefresh(!refresh);
          })
          .catch((err) => console.log(err));
      });
    }
  };

  const openNotes = (paths) => {
    const storage = getStorage();
    getDownloadURL(refStorage(storage, "notes/" + paths))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        window.open(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  };

  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <Paper
      sx={{
        width: "100%",
        padding: isMobile ? "1em" : "2em 1em",
        borderRadius: "15px",
        mt: "4em",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{ fontFamily: "Montserrat Bold", mb: "1em" }}
      >
        {!noteEditor ? "My Notes" : "Create Notes"}
      </Typography>
      {!noteEditor && myNotes.length === 0 && (
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontFamily: "Montserrat Bold", mb: "1em" }}
        >
          You don't have any notes uploaded.
        </Typography>
      )}
      {!noteEditor && (
        <>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#E14D2A" }}
            onClick={() => {
              setNoteEditor(true);
            }}
          >
            Create Notes
          </Button>
          <Grid container width="100%" justifyContent="center">
            {myNotes.map((note, index) => {
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
      )}
      {noteEditor && (
        <>
          <TextField
            sx={{
              m: "0 0 0.5em 0",
              backgroundColor: "lightgray",
              color: "white",
            }}
            fullWidth
            type="text"
            variant="outlined"
            margin="normal"
            label="Name"
            name="name"
            autoComplete="name"
            required
            value={newNote.name}
            onChange={(event) =>
              handleAttributeChange(event.target.name, event.target.value)
            }
          />
          <TextField
            sx={{
              m: "0.5em 0 0.5em 0",
              backgroundColor: "lightgray",
              color: "white",
            }}
            fullWidth
            type="text"
            variant="outlined"
            margin="normal"
            label="University"
            name="university"
            autoComplete="university"
            required
            value={newNote.university}
            onChange={(event) =>
              handleAttributeChange(event.target.name, event.target.value)
            }
          />
          <TextField
            sx={{
              m: "0.5em 0 0.5em 0",
              backgroundColor: "lightgray",
              color: "white",
            }}
            fullWidth
            type="text"
            variant="outlined"
            margin="normal"
            label="Career"
            name="career"
            autoComplete="career"
            required
            value={newNote.career}
            onChange={(event) =>
              handleAttributeChange(event.target.name, event.target.value)
            }
          />
          <TextField
            sx={{
              m: "0.5em 0 1em 0",
              backgroundColor: "lightgray",
              color: "white",
            }}
            fullWidth
            type="text"
            variant="outlined"
            margin="normal"
            label="Course"
            name="course"
            autoComplete="course"
            required
            value={newNote.course}
            onChange={(event) =>
              handleAttributeChange(event.target.name, event.target.value)
            }
          />
          {pdf === null ? (
            <Button
              fullWidth
              component="label"
              sx={{ color: "#E14D2A", border: "solid #E14D2A", mb: "1em" }}
            >
              Upload file
              <input
                hidden
                accept="application/pdf"
                type="file"
                multiple={false}
                onChange={(event) => {
                  setPdf(event.target.files[0]);
                }}
              />
            </Button>
          ) : (
            <Typography sx={{ color: "#E14D2A", mb: "1em" }}>
              {pdf.name}
            </Typography>
          )}
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#E14D2A" }}
              onClick={() => {
                uploadNote();
              }}
            >
              Create Notes
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "lightgrey" }}
              onClick={() => {
                setPdf(null);
                setNewNote({
                  name: "",
                  course: "",
                  university: "",
                  career: "",
                  path: "",
                });
                setNoteEditor(false);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default MyNotes;
