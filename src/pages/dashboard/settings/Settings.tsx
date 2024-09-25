import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, Alert, List, ListItem, ToggleButton, ToggleButtonGroup, ListItemText, ListItemSecondaryAction, IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import getHouses from '../../api/getHouses';
import addHouse from '../../api/addHouses';
import styles from './Settings.module.scss';
import { houseColours } from '@/helper/Util';

const Settings = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'students' | 'houses'>('students');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [house, setHouse] = useState('');
  const [error, setError] = useState<string | null>('');
  interface Student {
    id: Key | null | undefined;
    name: string;
    surname: string;
    studentId: string;
    house: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  interface House {
    id: string;
    houseName: string;
    houseColour: string;
    houseTotalPoints: number;
  }
  
  const [houses, setHouses] = useState<House[]>([]); // Initialize as empty array

  useEffect(() => {
    // Fetch students from the API when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/getStudents');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    // Fetch houses from the API when the component mounts
    const fetchHouses = async () => {
      try {
        const response = await fetch('/api/getHouses');
        const data = response.json()
        console.log(data)
        setHouses(await data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value);
  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setStudentId(value);
    }
  };
  const handleHouseChange = (event: React.MouseEvent<HTMLElement>, newHouse: string) => {
    if (newHouse !== null) {
      setHouse(newHouse);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !surname || !studentId || !house) {
      setError('All fields are required');
      return;
    }

    if (students.some(student => student.studentId === studentId)) {
      setError('Student ID must be unique');
      return;
    }

    try {
      // Make a POST request to the backend to add the student
      const response = await fetch('/api/addStudents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, 
          surname, 
          studentId, 
          house
        }),
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      // Fetch the updated students list
      const updatedStudents: Student[] = await fetch('/api/getStudents').then(res => res.json());
      setStudents(updatedStudents); // Refresh the list
    
      // Reset form fields
      setName('');
      setSurname('');
      setStudentId('');

      setError('');
    } catch (error) {
      setError('Failed to add student');
      console.error('Error adding student:', error);
    }
  };

  const handleAddHouse = async (e: React.FormEvent) => {
      e.preventDefault();
      const newHouse = prompt('Enter new house name:');
      if (newHouse && !houses.some(h => h.houseName === newHouse)) {
        try {
          setHouses([...houses, { id: `${houses.length + 1}`, houseName: newHouse, houseColour: '#000000', houseTotalPoints: 0 }]); // Example default values
        } catch (error) {
          console.error('Error adding house:', error);
        }
      }
    };

  const handleRemoveHouse = (houseToRemove: string) => {
    setHouses(houses.filter(h => h.houseName !== houseToRemove));
  };

  const handleDelete = async (studentId: string) => {
    try {
      const response = await fetch(`/api/deleteStudents`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TURSO_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ studentId }), // Send studentId in the body
      });
  
      if (!response.ok) {
        setError(`Failed to delete student: ${response.statusText}`);
      }
  
      const updatedStudents: Student[] = await fetch('/api/getStudents').then(res => res.json());
      setStudents(updatedStudents); // Refresh the list
    } catch (error) {
      setError('Failed to delete student');
      console.error('Error deleting student:', error);
    }
  };

  return (
    <Paper elevation={3} className={styles.paper}>
      <div className={styles.settingsContainer}>
        <Typography variant="h4" gutterBottom>
          Configuration Page
        </Typography>
        <div>
          <Button  onClick={() => setActiveTab('students')} className={styles.tabButton} sx={{
              '&.Mui-selected': {
              backgroundColor: theme.palette.secondary.main, 
              color: theme.palette.secondary.contrastText
              },
            }}>
              Students
              </Button>
          <Button onClick={() => setActiveTab('houses')} className={styles.tabButton} sx={{
             '&.Mui-selected': {
              backgroundColor: theme.palette.secondary.main, 
              color: theme.palette.secondary.contrastText
             },
             }}>
              Houses
              </Button>
        </div>

        {activeTab === 'students' && (
          <>
            <Typography variant="h6" gutterBottom>
              This is where you can edit the students stored in the database.
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={handleNameChange}
                  fullWidth
                />
              </div>
              <div className={styles.formGroup}>
                <TextField
                  label="Surname"
                  value={surname}
                  onChange={handleSurnameChange}
                  fullWidth
                />
              </div>
              <div className={styles.formGroup}>
                <TextField
                  label="Student ID"
                  value={studentId}
                  onChange={handleStudentIdChange}
                  fullWidth
                />
              </div>
              <div className={styles.formGroup}>
                <ToggleButtonGroup
                  value={house}
                  exclusive
                  onChange={handleHouseChange}
                  aria-label="house"
                  fullWidth
                >
                  {houses.map((house, index) => (
                    <ToggleButton
                      key={house.id}
                      value={house.houseName}
                      style={{ backgroundColor: house.houseColour, color: theme.palette.getContrastText(house.houseColour) }}
                      className={styles.toggleButton}
                      sx={{
                        '&.Mui-selected': {
                          transform: 'translateY(-5px)'
                        },
                        transition: "transform 0.3s",
                        padding: "0.5rem",
                        flex: 1,
                        
                      }}
                    >
                      {house.houseName}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
              <Button type="submit" variant="contained" color="primary" className={styles.formButton} fullWidth>
                Add Student
              </Button>
            </form>
            <div className={styles.studentList}>
            <Typography variant="h6" gutterBottom>
          Current Students
        </Typography>
        <Paper>
          <List>
            {students.map(student => (
              <ListItem key={student.id}>
                <ListItemText
                  primary={`${student.name} ${student.surname}`}
                  secondary={`ID: ${student.studentId} | House: ${student.house}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(student.studentId)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
            </div>
          </>
        )}

        {activeTab === 'houses' && (
          <>
            <Typography variant="h6" gutterBottom>
              This is where you can manage the houses.
            </Typography>
            <Button onClick={handleAddHouse} variant="contained" color="primary">
              Add House
            </Button>
            <ul>
              {houses.map(h => (
                <li key={h.id}>
                  {h.houseName} <Button onClick={() => handleRemoveHouse(h.houseName)}>Remove</Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Paper>
  );
};

export default Settings;