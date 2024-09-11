import React, { useState, useEffect } from 'react';
import { Paper, Typography, FormControl, TextField, Button, Alert, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { getStudents, addStudent, removeStudent } from './api'; // Ensure these API functions are implemented
import { useTheme } from '@mui/material/styles'; // Ensure you have the correct import for useTheme
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import HouseToggleButton from './HouseToggleButton'; // Ensure you have this component implemented

interface Student {
  id: string;
  name: string;
  surname: string;
  studentId: string;
  house: string;
}

const Data: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [house, setHouse] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [houses, setHouses] = useState<string[]>(['House1', 'House2', 'House3', 'House4']);
  const [houseColours, setHouseColours] = useState<string[]>(['#FF0000', '#00FF00', '#0000FF', '#FFFF00']);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await getStudents();
        setStudents(students);
      } catch (error) {
        setError('Failed to fetch students');
      }
    };

    fetchData();
  }, []);

  const handleStudentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setStudentName(e.target.value);
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value);
  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => setStudentId(e.target.value);
  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => setHouse(e.target.value);
  const handleStudentChange = (event: any, newValue: Student | null) => setSelectedStudent(newValue);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStudent({ studentName, surname, studentId, house });
      setStudents(await getStudents()); // Refresh the list
      setStudentName('');
      setSurname('');
      setStudentId('');
      setHouse('');
      setError(null);
    } catch (error) {
      setError('Failed to add student');
    }
  };

  const handleRemoveStudent = async (id: string) => {
    try {
      await removeStudent(id);
      setStudents(await getStudents()); // Refresh the list
    } catch (error) {
      setError('Failed to remove student');
    }
  };

  return (
    <Paper style={{ padding: '20px', backgroundColor: theme.palette.background.paper }}>
      <Typography style={{ fontSize: '24px', fontWeight: 'bold', color: theme.palette.text.primary }}>Add Student</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <FormControl style={{ margin: '10px 0' }}>
          <TextField
            label="Student Name"
            value={studentName}
            onChange={handleStudentNameChange}
            style={{ color: theme.palette.text.primary }}
          />
          <TextField
            label="Surname"
            value={surname}
            onChange={handleSurnameChange}
            style={{ color: theme.palette.text.primary }}
          />
          <TextField
            label="Student ID"
            value={studentId}
            onChange={handleStudentIdChange}
            style={{ color: theme.palette.text.primary }}
          />
          <TextField
            label="House"
            value={house}
            onChange={handleHouseChange}
            style={{ color: theme.palette.text.primary }}
          />
          <Button type="submit" style={{ marginTop: '20px', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Add Student</Button>
        </FormControl>
      </form>
      <Typography style={{ fontSize: '24px', fontWeight: 'bold', color: theme.palette.text.primary, marginTop: '20px' }}>Current Students</Typography>
      <List>
        {students.map((student: any) => (
          <ListItem key={student.id}>
            <ListItemText primary={`${student.name} ${student.surname}`} secondary={`ID: ${student.studentId}, House: ${student.house}`} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveStudent(student.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <FormControl fullWidth margin="normal">
        <ToggleButtonGroup>
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
        {/* Additional form controls can go here */}
      </FormControl>
    </Paper>
  );
};

export default Data;