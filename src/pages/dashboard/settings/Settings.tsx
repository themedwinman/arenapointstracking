import React, { useEffect, useState } from 'react';
import { handleRemoveStudent } from '@/db/actions';
import { houses, houseColours } from '@/helper/Util';
import styles from './Settings.module.scss';
import { TextField, Button, ToggleButton, ToggleButtonGroup, Typography, useTheme, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, styled, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import addStudent from '@/pages/api/addStudents';
interface Student {
  id: string;
  name: string;
  surname: string;
  studentId: string;
  house: string;
}

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: '1rem',
}));

const Settings: React.FC = () => {
  const { data: session } = useSession();
  const theme = useTheme();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [house, setHouse] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/getStudents'); // Ensure the correct API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const student_list: Student[] = await response.json();
        setStudents(student_list);
        console.log('Students:', student_list);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to fetch students');
      }
    };

    fetchStudents();
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
      setHouse('');
      setError(null);
    } catch (error) {
      setError('Failed to add student');
      console.error('Error adding student:', error);
    }
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
    <>
    <Paper elevation={3} className={styles.paper}>
    <div className={styles.settingsContainer}>
    <Typography variant="h4" gutterBottom>
            Student Configuration Page
          </Typography>
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
            variant="outlined"
            margin="normal"
          />
        </div>
        <div className={styles.formGroup}>
          <TextField
            label="Surname"
            value={surname}
            onChange={handleSurnameChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </div>
        <div className={styles.formGroup}>
          <TextField
            label="Student ID"
            value={studentId}
            onChange={handleStudentIdChange}
            fullWidth
            variant="outlined"
            margin="normal"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                key={house}
                value={house}
                aria-label={house}
                style={{ backgroundColor: houseColours[index], color: theme.palette.getContrastText(houseColours[index]) }}
                className={styles.toggleButton} sx={{ 
                '&.Mui-selected': {
                  transform: 'translateY(-5px)'
                 },
                 transition: "transform 0.3s",
                 padding: "0.5rem",
                 }}
              >
                {house}
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
    </div>
    </Paper>
    </>
  );
};

export default Settings;