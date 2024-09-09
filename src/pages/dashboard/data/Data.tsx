import { Grid, Paper, Typography, FormControl, TextField, Button, ToggleButtonGroup, useTheme, Autocomplete, Alert } from "@mui/material";
import axios from 'axios';
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { houses, houseColours } from "@/helper/Util"; // Assuming houses is an array of house names and houseColors is an array of corresponding colors
import scss from "./Data.module.scss"; // Assuming you have a CSS module for styling
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import withAuthorization from "@/components/hoc/withAuthorization";

interface Student {
  id: string;
  name: string;
}

// Styled ToggleButton for house selector
const HouseToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  margin: '0.5rem',
  border: 'none', // No border for the house toggle buttons
  borderRadius: '4px', // Rounded corners
  transition: 'transform 0.3s', // Smooth transition for transform
  color: theme.palette.getContrastText(theme.palette.background.paper), // Contrast text color
  '&.Mui-selected': {
    transform: 'translateY(-3px)', // Lift the button slightly when selected
  },
}));

// Styled ToggleButton for add/remove points
const ActionToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  margin: '0.5rem',
  border: `1px solid ${theme.palette.text.primary}`, // Light outline for the toggle buttons
  borderRadius: '4px', // Rounded corners
  color: theme.palette.text.primary, // Text color matching the theme
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
  const [error, setError] = useState<string | null>(null);

  const setPointsValue = (value: number) => {
    setPoints(value);
  };

  // Fetch students from the database
  useEffect(() => {
    // Replace with your actual data fetching logic
    const fetchStudents = async () => {
      const response = await fetch('/api/students'); // Example API endpoint
      const data = await response.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  const handleHouseChange = (event: React.MouseEvent<HTMLElement>, newHouse: string | null) => {
    setSelectedHouse(newHouse);
  };

  const handleStudentChange = (event: React.ChangeEvent<{}>, value: Student | null) => {
    setSelectedStudent(value);
  };

  const handleActionChange = (event: React.MouseEvent<HTMLElement>, newAction: string | null) => {
    setAction(newAction || "add");
  };

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPointsValue(Number(event.target.value));
  };

  const handleEventDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate form
    if (pointsValue <= 0) { // Use pointsValue consistently
      setError("Please enter a valid amount of points.");
      return;
    }
    // Logic to add or remove points from the selected house and student
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
  
  console.log(`House: ${selectedHouse}, Student: ${selectedStudent?.name}, Action: ${action}, Points: ${pointsValue}, Event: ${eventDescription}`);

  return (
    <>
      <Head>
        <title>Edit Points</title>
        <meta name="description" content="Data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container justifyContent="flex-start" alignItems="flex-start" className={scss.container}>
        <Paper className={scss.paper} style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Points Editor
          </Typography>
          <Typography variant="h6" gutterBottom>
            Manage house points efficiently
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <ToggleButtonGroup
                value={selectedHouse}
                exclusive
                onChange={handleHouseChange}
                aria-label="house"
                fullWidth
                className={scss.toggleButtonGroup}
              >
                {houses.map((house, index) => (
                  <HouseToggleButton
                    key={house}
                    value={house}
                    style={{
                      backgroundColor: houseColours[index],
                      color: theme.palette.getContrastText(houseColours[index]),
                    }}
                  >
                    {house}
                  </HouseToggleButton>
                ))}
              </ToggleButtonGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={students}
                getOptionLabel={(option) => option.name}
                value={selectedStudent}
                onChange={handleStudentChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Student (Optional)"
                    variant="outlined"
                    style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <ToggleButtonGroup
                value={action}
                exclusive
                onChange={handleActionChange}
                aria-label="action"
                fullWidth
                className={scss.actionButtonGroup}
              >
                <ActionToggleButton value="add" aria-label="add">
                  Add Points
                </ActionToggleButton>
                <ActionToggleButton value="remove" aria-label="remove">
                  Remove Points
                </ActionToggleButton>
              </ToggleButtonGroup>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Points"
              type="number"
              value={pointsValue}
              onChange={handlePointsChange}
              required
              className={scss.textField}
              style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Event Description (Optional)"
              type="text"
              value={eventDescription}
              onChange={handleEventDescriptionChange}
              className={scss.textField}
              style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth className={scss.submitButton}>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Data;



