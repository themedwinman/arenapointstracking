import React, { useState, useEffect } from 'react';
import { Paper, Typography, FormControl, TextField, Button, Alert, List, ListItem, ListItemText, IconButton, useTheme } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import  handler from '../../api/getStudents';
import getStudents from '../../api/getStudents';
import { addStudent } from '@/db/actions';
import { handleRemoveStudent } from '@/db/actions';
import { get } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';


interface Student {
  id: string;
  studentName: string;
  surname: string;
  studentId: string;
  house: string;
}


const Settings: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [house, setHouse] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStudent({
        studentName, surname, studentId, house,
        id: ''
      });
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

 // api.ts

const removeStudentHandler = async (req: { method: string; body: { studentId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: string; }): void; new(): any; }; }; }) => {
  if (req.method === 'DELETE') {
    try {
      const { studentId } = req.body;
      await handleRemoveStudent(studentId);
      res.status(200).json({ message: 'Student removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove student' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
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
            <ListItemText primary={`${student.studentName} ${student.surname}`} secondary={`ID: ${student.studentId}, House: ${student.house}`} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveStudent(student.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Settings;