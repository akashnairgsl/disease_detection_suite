import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Button, Typography, Alert } from "@mui/material";

function Level2() {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [prediction, setPrediction] = useState("");
  const [preview, setPreview] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [invalidExtension, setInvalidExtension] = useState(false);
  const [nofile, setNoFile] = useState(false);

  const handleImage = (event) => {
    // setImage(event.target.files[0]);
    // setPreviewImage(URL.createObjectURL(event.target.files[0]));
    // setPreview(true);
    const file = event.target.files[0];
    if (file && isValidFile(file)) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setPreview(true);
    } else {
      // Reset state and show an error message
      setImage(null);
      setPreviewImage(null);
      setPreview(false);
      // alert("Please upload a valid JPG, JPEG, PNG, or WEBP file.");
      setInvalidExtension(true);
    }
  };

  const isValidFile = (file) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const extension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleUpload = () => {
    // const formData = new FormData();
    // formData.append("image", image);

    // console.log(formData);

    // axios
    //   .post("/disease/image/predict", formData)
    //   .then((response) => {
    //     setShowOutcome(true);
    //     setPredictionTwo(response.data.prediction);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      axios
        .post("/disease/image/predict", formData)
        .then((response) => {
          setShowResult(true);
          setPrediction(response.data.prediction);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // alert("Please upload an image first.");
      setNoFile(true);
    }
  };

  return (
    <>
      {invalidExtension && (
        <Alert severity="error" onClose={() => setInvalidExtension(false)}>
          Please upload a valid JPG, JPEG, PNG, or WEBP file.
        </Alert>
      )}
      {nofile && (
        <Alert severity="error" onClose={() => setNoFile(false)}>
          Please upload an image first.
        </Alert>
      )}
      <Typography variant="h4" component="div" marginTop="100px">
        Upload Images In JPG/JPEG/PNG/WEBP To Get Prediction For Skin-Cancer
      </Typography>
      <div className="upload-container">
        <input type="file" name="file" onChange={handleImage} />
        {/* <span >Allowed formats: jpg, jpeg, png, webp</span> */}
        {preview && (
          <img
            src={previewImage}
            style={{ width: "200px", height: "200px" }}
          ></img>
        )}
      </div>
      <div className="uploadbtncontainer">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleUpload}
        >
          Submit
        </Button>
      </div>
      {showResult && (
        <div className="result">
          <Typography variant="h4" component="div">
            Prediction : {prediction}
          </Typography>
        </div>
      )}
    </>
  );
}

export default Level2;
