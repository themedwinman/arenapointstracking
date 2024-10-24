import { Grid, Paper, Typography, FormControl, TextField, Button, ToggleButtonGroup, useTheme, Autocomplete, Alert, AppBar, Toolbar } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import scss from "./Data.module.scss"; 
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import Head from "next/head";
import withAuthorizationAdmin from "@/components/hoc/withAuthorizationAdmin";
import DataRibbon from "@/components/Dashboard/DataRibbon";
import { useUser } from "@/context/UserContext";
import Login from "@/components/login/Login";




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
  border: 'none', 
  borderRadius: '4px',
  transition: 'transform 0.3s',
  padding: '0.75rem',
  '&.Mui-selected': {
    transform: 'translateY(-5px)', 
  },
}));

// Styled ToggleButton for add/remove points
const ActionToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  margin: '0px',
  border: `1px solid ${theme.palette.text.primary}`, 
  borderRadius: '4px', 
  color: theme.palette.text.primary, 
  padding: '0.75rem',
  '&:hover': {
    backgroundColor: theme.palette.text.primary + '90',
  },
  '&.Mui-selected': {
    borderColor: theme.palette.text.primary, 
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.getContrastText(theme.palette.text.primary),
    '&:hover': {
      backgroundColor: theme.palette.text.primary,
    }
  },
}));
interface DataProps {
  userRole: string;
}


const Data: React.FC<DataProps> = ({ userRole }) => {
  const theme = useTheme();
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [action, setAction] = useState("add");
  const [pointsValue, setPoints] = useState(0);
  const [eventDescription, setEventDescription] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger DataRibbon refresh
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }
  
  const isInitialMount = useRef(true); // Ref to track the initial mount

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
    if (pointsValue <= 0) {
      setError("Please enter a valid amount of points.");
      return;
    } else if (selectedHouse === null) {
      setError("Please select a house.");
      return;
    }
    if (action === null) {
      setError("Please select a points action.");
      return;
    }
    if (selectedStudent === null) {
      setError("Please select a student.");
      return;
    }
    if (eventDescription === "") {
      setError("Please enter an event description.");
      return;
    }

    try {
      const response = await fetch('/api/addPoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: selectedStudent?.studentId,
          houseId: selectedHouse,
          points: pointsValue,
          action: action,
          eventDescription,
        }),
      });
      if (response.status === 200) {
        console.log('Data added successfully');
        // Reset form
        setSelectedHouse(null);
        setSelectedStudent(null);
        setAction("add");
        setPointsValue(0);
        setEventDescription("");
        setError(null);
        setRefreshKey(prevKey => prevKey + 1); // Trigger DataRibbon refresh
      }
    } catch (error) {
      setError('Failed to add data');
    }
  };

  // Only trigger graph refresh if not initial mount
  useEffect(() => {
    if (!isInitialMount.current) {
      // Logic to refresh the graph goes here
      console.log('Graph refresh logic');
    } else {
      isInitialMount.current = false;
    }
  }, [theme]); // or any relevant state

  return (
    <>
    {/* DataRibbon component */}
    <DataRibbon key={refreshKey} />
    
    <div style={{ marginTop: '40px' }}>
      
      {/* Page Title */}
      <Head> 
        <title>Points Editor</title>
      </Head>
      
      {/* Main Grid Layout */}
      <Grid container spacing={3}>
        <Grid item xs={12}>       
          <Paper className={scss.paper}>
          
            {/* AppBar with Title */}
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h4" sx={{marginLeft: "auto", marginRight: "auto"}}>
                  Points Editor
                </Typography>
              </Toolbar>
            </AppBar>

            {/* Error Alert */}
            {error && <Alert severity="error">{error}</Alert>}
            
            {/* House Selection */}
            <FormControl fullWidth margin="normal">
              <ToggleButtonGroup
                value={selectedHouse}
                exclusive
                onChange={(event, newHouse) => setSelectedHouse(newHouse)}
                aria-label="house selection"
              >
                {houses.map((house) => (
                  <HouseToggleButton key={house.id} value={house.houseName} style={{ backgroundColor: house.houseColour,
                    color: theme.palette.getContrastText(house.houseColour),
                  }}>
                    {house.houseName}
                  </HouseToggleButton>
                ))}
              </ToggleButtonGroup>
            </FormControl>
            
            {/* Student Selection */}
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={students}
                value={selectedStudent}
                getOptionLabel={(option) => option.studentId !== "None" ? `${option.name} ${option.surname} | ID: ${option.studentId} | ${option.house}` : `${option.name} ${option.surname}`}
                isOptionEqualToValue={(option, value) => option.studentId === value?.studentId}
                renderInput={(params) => <TextField {...params} label="Select Student*" variant="outlined" />}
                onChange={(event, newValue) => setSelectedStudent(newValue)}
                clearOnEscape
              />
            </FormControl>
            
            {/* Action Selection */}
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
            
            {/* Points Input */}
            <FormControl fullWidth margin="normal">
              <TextField
                label="Points*"
                type="number"
                value={pointsValue}
                onChange={(e) => setPointsValue(parseInt(e.target.value))}
                variant="outlined"
              />
            </FormControl>
            
            {/* Event Description Input */}
            <FormControl fullWidth margin="normal">
              <TextField
                label="Description*"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                variant="outlined"
              />
            </FormControl>
            
            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" onClick={(event) => handleSubmit(event)} fullWidth className={scss.submitButton} disabled={!action}>
              {!action ? "Select an Action" : action === "add" ? "Add Points" : "Remove Points"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
    </>
  );
};


export default withAuthorizationAdmin(Data);
