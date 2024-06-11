import React, { useState, useEffect } from "react";
import Dropdown from "../Components/Dropdown";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import "../App.css";

function Level1() {
  const [diseases, setDiseases] = useState([]);
  const [genders, setGenders] = useState([]);
  const [diseaseName, setDiseaseName] = useState("");
  const [feverChoice, setFeverChoice] = useState("");
  const [coughChoice, setCoughChoice] = useState("");
  const [fatigueChoice, setFatigueChoice] = useState("");
  const [breathingChoice, setBreathingChoice] = useState("");
  const [bloodpressureChoice, setBloodPressureChoice] = useState("");
  const [cholesterolChoice, setCholesterolChoice] = useState("");
  const [genderName, setGenderName] = useState("");
  const [age, setAge] = useState("");
  const [prediction, setPrediction] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Options For Disease Dropdown
  useEffect(() => {
    axios
      .get("/diseases/list")
      .then((response) => {
        const updatedData = response.data.map((item) => {
          return {
            label: item.diseaseName,
            value: item.diseaseName,
          };
        });
        setDiseases(updatedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Options for Fever,Cough,Fatigue,Difficult Breathing dropdown
  const choiceOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  // Options for Blood Pressure, Cholestrol Level dropdown
  const levelOptions = [
    { label: "Low", value: "Low" },
    { label: "Normal", value: "Normal" },
    { label: "High", value: "High" },
  ];

  // Options For Gender Dropdown
  useEffect(() => {
    axios
      .get("/patient/gender")
      .then((response) => {
        const updatedData = response.data.map((item) => {
          return {
            label: item.genderName,
            value: item.genderName,
          };
        });
        setGenders(updatedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Options For Age
  const handleAge = (event) => {
    setAge(parseInt(event.target.value, 10));
  };

  // POST request to the server when submit button is clicked

  const handleSubmit = () => {
    const formData = {
      disease: diseaseName,
      fever: feverChoice,
      cough: coughChoice,
      fatigue: fatigueChoice,
      difficulty_breathing: breathingChoice,
      age: age,
      gender: genderName,
      bloodpressure: bloodpressureChoice,
      cholesterolLevel: cholesterolChoice,
    };

    axios
      .post("/disease/predict", formData)
      .then((response) => {
        setPrediction(response.data.prediction[0]);
        setShowResult(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="dropdown-container">
        <Dropdown
          className="firstdropdown"
          labelText="Disease"
          data={diseases}
          setValue={setDiseaseName}
        />
        <Dropdown
          className="seconddropdown"
          labelText="Fever"
          data={choiceOptions}
          setValue={setFeverChoice}
        />
        <Dropdown
          className="thirddropdown"
          labelText="Cough"
          data={choiceOptions}
          setValue={setCoughChoice}
        />
        <Dropdown
          className="fourthdropdown"
          labelText="Fatigue"
          data={choiceOptions}
          setValue={setFatigueChoice}
        />
        <Dropdown
          className="fifthdropdown"
          labelText="Difficulty Breathing"
          data={choiceOptions}
          setValue={setBreathingChoice}
        />
        <Dropdown
          className="sixthdropdown"
          labelText="Blood Pressure"
          data={levelOptions}
          setValue={setBloodPressureChoice}
        />
        <Dropdown
          className="seventhdropdown"
          labelText="Cholesterol Level"
          data={levelOptions}
          setValue={setCholesterolChoice}
        />
        <Dropdown
          className="eigthdropdown"
          labelText="Gender"
          data={genders}
          setValue={setGenderName}
        />
        <TextField
          className="agefield"
          label="Age"
          variant="outlined"
          onChange={handleAge}
          value={age}
          type="number"
        ></TextField>
      </div>
      <div className="buttoncontainer">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      {showResult && (
        <div className="result">
          <Typography variant="h4" component="div">
            Prediction For {diseaseName} : {prediction}
          </Typography>
        </div>
      )}
    </>
  );
}

export default Level1;
