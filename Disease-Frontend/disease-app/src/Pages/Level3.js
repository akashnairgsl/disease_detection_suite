import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Button, Typography, Alert, CircularProgress } from "@mui/material";

function Level3() {
  const [pdf, setPdf] = useState("");
  const [prediction, setPrediction] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [invalidExtension, setInvalidExtension] = useState(false);
  const [nofile, setNoFile] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file && isValidPdf(file)) {
      setPdf(file);
    } else {
      setPdf(null);
      setInvalidExtension(true);
    }
  };

  const isValidPdf = (file) => {
    const allowedExtensions = ["pdf"];
    const extension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleFileUpload = () => {
    if (pdf) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", pdf);
      axios
        .post("/disease/bloodreport/summary", formData)
        .then((response) => {
          setShowResult(true);
          setPrediction(response.data.summary);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    } else {
      setNoFile(true);
    }
  };

  return (
    <>
      {invalidExtension && (
        <Alert severity="error" onClose={() => setInvalidExtension(false)}>
          Please upload a valid PDF file.
        </Alert>
      )}
      {nofile && (
        <Alert severity="error" onClose={() => setNoFile(false)}>
          Please upload a file first.
        </Alert>
      )}
      <Typography variant="h4" component="div" marginTop="100px">
        Upload Blood Report In Pdf To Get Summary
      </Typography>
      <div className="upload-container">
        <input type="file" name="file" onChange={handleFile} />
      </div>
      <div className="uploadbtncontainer">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleFileUpload}
        >
          Submit
        </Button>
      </div>
      <div className="loading">
        {isloading && <CircularProgress color="success" />}
      </div>
      {showResult && (
        <div className="result">
          <Typography variant="h5" component="div">
            {prediction}
          </Typography>
        </div>
      )}
    </>
  );
}

export default Level3;
