import { Grid, Paper, Typography, FormControl, TextField, Button, ToggleButtonGroup, useTheme, Autocomplete, Alert } from "@mui/material";
import axios from 'axios';
import Head from "next/head";
import React, { useState, useEffect } from "react";
import scss from "./Data.module.scss"; 
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import withAuthorization from "@/components/hoc/withAuthorization";
import getStudents from "@/pages/api/getStudents";

interface Student {
  id: string;
  name: string;
  surname: string;
  studentId: string;
  house: string;
}

interface House {
  id: string;
  houseName: string;
  houseColour: string;
}

// Styled ToggleButton for house selector
const HouseToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  margin: '0.25rem',
  border: 'none', // No border for the house toggle buttons
  borderRadius: '4px', // Rounded corners
  transition: 'transform 0.3s', // Smooth transition for transform
  padding: '0.75rem',
  '&.Mui-selected': {
    transform: 'translateY(-5px)', // Lift the button slightly when selected
  },
}));

// Styled ToggleButton for add/remove points
const ActionToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  margin: '0px',
  border: `1px solid ${theme.palette.text.primary}`, // Light outline for the toggle buttons
  borderRadius: '4px', // Rounded corners
  color: theme.palette.text.primary, // Text color matching the theme
  padding: '0.75rem',
  '&.Mui-selected': {
    borderColor: theme.palette.text.primary, // Change border color when selected
  },
}));

const Data: React.FC<{ userRole: string }> = ({ userRole }) => {
  const theme = useTheme(); // Access the theme
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [action, setAction] = useState("add");
  const [pointsValue, setPoints] = useState(0);
  const [eventDescription, setEventDescription] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [error, setError] = useState<string | null>(null);

  const setPointsValue = (value: number) => {
    setPoints(value);
  };

  // Fetch students from the database
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/getStudents');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  // Fetch houses from the database
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('/api/getHouses');
        const data = await response.json();
        console.log("Fetched houses:", data); // Debug log
        setHouses(data);
      } catch (error) {
        setError("Failed to fetch houses");
      }
    };

    fetchHouses();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate form
    if (pointsValue <= 0) { // Use pointsValue consistently
      setError("Please enter a valid amount of points.");
      return;
    }
    else if (selectedHouse === null) {
      setError("Please select a house.");
      return;
    }
    if (action === null) {
      setError("Please select a points action.");
      return;
    }
    try {
      const response = await axios.post('/api/addPoints', {
        selectedHouse,
        selectedStudent,
        action,
        pointsValue, // Use pointsValue consistently
        eventDescription,
      });
      if (response.status === 200) {
        // Handle successful response
        console.log('Data added successfully');
        // Reset form
        setSelectedHouse(null);
        setSelectedStudent(null);
        setAction("add");
        setPointsValue(0);
        setEventDescription("");
        setError(null);
      }
    } catch (error) {
      setError('Failed to add data');
    }
  };

  return (
    <div>
      <Head>
        <title>Points Editor</title>
      </Head>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={scss.paper}>
            <Typography variant="h4" gutterBottom>
              Points Editor           
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <FormControl fullWidth margin="normal">
              <ToggleButtonGroup
                value={selectedHouse}
                exclusive
                onChange={(event, newHouse) => setSelectedHouse(newHouse)}
                aria-label="house selection"
              >
                {houses.map((house) => (
                  <HouseToggleButton key={house.id} value={house.houseName} style={{ backgroundColor: house.houseColour,
                    color: theme.palette.getContrastText(house.houseColour), // Contrast text color

                   }}>
                    {house.houseName}
                  </HouseToggleButton>
                ))}
              </ToggleButtonGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={students}
                getOptionLabel={(option) => `${option.name} ${option.surname} | ID: ${option.studentId} | ${option.house}`}
                renderInput={(params) => <TextField {...params} label="Select Student (Optional)" variant="outlined" />}
                onChange={(event, newValue) => setSelectedStudent(newValue)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <ToggleButtonGroup
                value={action}
                exclusive
                onChange={(event, newAction) => setAction(newAction)}
                aria-label="action selection"
              >
                <ActionToggleButton value="add">Add Points</ActionToggleButton>
                <ActionToggleButton value="remove">Remove Points</ActionToggleButton>
              </ToggleButtonGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Points"
                type="number"
                value={pointsValue}
                onChange={(e) => setPointsValue(parseInt(e.target.value))}
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Event Description (Optional)"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                variant="outlined"
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary" onClick={(event) => handleSubmit(event)} fullWidth className={scss.submitButton}>
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Data;