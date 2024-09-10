import { Grid, Paper, Typography, FormControl, TextField, Button, useTheme, Alert } from "@mui/material";
import axios from 'axios';
import Head from "next/head";
import React, { useState } from "react";
import withAuthorization from "@/components/hoc/withAuthorization";

interface Student {
  id: string;
  name: string;
}

const AddStudent: React.FC<{}> = () => {
  const theme = useTheme(); // Access the theme
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleStudentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate form
    if (!studentName) {
      setError("Please enter a student name.");
      return;
    }
    // Logic to add student to the database
    try {
      const response = await axios.post('/api/addStudent', {
        name: studentName,
      });
      if (response.status === 200) {
        // Handle successful response
        console.log('Student added successfully');
        // Reset form
        setStudentName("");
        setError(null);
      }
    } catch (error) {
      setError('Failed to add student');
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
          <Button type="submit" style={{ marginTop: '20px', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Add Student</Button>
        </FormControl>
      </form>
    </Paper>
  );
};

const Settings: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Settings</title>
      </Head>
      <AddStudent />
    </div>
  );
};

export default withAuthorization(Settings);