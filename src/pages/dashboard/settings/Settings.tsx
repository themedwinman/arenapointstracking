import React, { useState, useEffect, Key } from 'react';
import { Paper, Typography, TextField, Button, Alert, List, ListItem, ToggleButton, ToggleButtonGroup, ListItemText, ListItemSecondaryAction, IconButton, useTheme, Fade, AppBar, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Settings.module.scss';
import { Modal, Box } from '@mui/material';



const Settings = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'students' | 'houses'>('students');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [house, setHouse] = useState('');
  const [error, setError] = useState<string | null>('');
  const [newHouseName, setNewHouseName] = useState('');
  const [newHouseColor, setNewHouseColor] = useState('#000000'); // Default color
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<{ id: string, name: string } | null>(null);
  
  // Function to handle opening the student deletion modal
  const handleOpenStudentModal = (student: { id: string, name: string }) => {
    setStudentToDelete(student);
    setIsStudentModalOpen(true);
  };
  
  // Function to handle closing the student deletion modal
  const handleCloseStudentModal = () => {
    setStudentToDelete(null);
    setIsStudentModalOpen(false);
  };
  
  // Function to handle confirming student deletion
  const handleConfirmStudentDelete = async () => {
    if (studentToDelete) {
      try {
        const response = await fetch(`/api/deleteStudents`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.TURSO_AUTH_TOKEN}`,
          },
          body: JSON.stringify({ studentId: studentToDelete.id }), // Send studentId in the body
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          setError(`Failed to delete student: ${errorText}`);
          console.error(`Failed to delete student: ${errorText}`);
          return;
        }
  
        const updatedStudents: Student[] = await fetch('/api/getStudents').then(res => res.json());
        setStudents(updatedStudents); // Refresh the list
      } catch (error) {
        setError('Failed to delete student');
        console.error('Error deleting student:', error);
      }
      console.log(`Deleting student with ID: ${studentToDelete.id}`);
    }
    handleCloseStudentModal();
  };

  const handleAddHouse = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check if house name is empty
    if (!newHouseName.trim()) {
      setError('House name cannot be empty');
      return;
    }
  
    // Check if house color is unique
    const houseColors: string[] = houses.map(h => h.houseColour);
    if (houseColors.includes(newHouseColor)) {
      setError('House color must be unique');
      return;
    }
    if (houses.some(house => house.houseName === newHouseName)) {
      setError('House name must be unique');
      return;
    }
  
    try {
      const response = await fetch('/api/addHouses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          houseName: newHouseName, 
          houseColour: newHouseColor, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Fetch the updated houses list
      const updatedHouses = await fetch('/api/getHouses').then(res => res.json());
      setHouses(updatedHouses); // Refresh the list
      setNewHouseName('');
      setNewHouseColor('#000000'); // Reset to default color
      setError(null);
    } catch (error) {
      setError('Failed to add house');
      console.error('Error adding house:', error);
    }
  };
  interface Student {
      id: string;
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

  const handleDelete = async (studentId: string) => {
    
  };


// Add these state variables
const [isModalOpen, setIsModalOpen] = useState(false);
const [houseToDelete, setHouseToDelete] = useState<string | null>(null);

const handleOpenModal = (houseName: string) => {
  setHouseToDelete(houseName);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setHouseToDelete(null);
};

const handleConfirmDelete = async () => {
  if (houseToDelete) {
    try {
      const response = await fetch(`/api/deleteHouses`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TURSO_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ houseName: houseToDelete }), // Send houseName in the body
      });

      if (!response.ok) {
        setError(`Failed to delete house: ${response.statusText}`);
        return;
      }

      const updatedHouses: House[] = await fetch('/api/getHouses').then(res => res.json());
      setHouses(updatedHouses); // Refresh the list

      const updatedStudents: Student[] = await fetch('/api/getStudents').then(res => res.json());
      setStudents(updatedStudents); // Refresh the list of students

      handleCloseModal();
    } catch (error) {
      setError('Failed to delete house');
      console.error('Error deleting house:', error);
    }
  }
};

// Update the handleDeleteHouse function to open the modal
const handleDeleteHouse = (houseName: string) => {
  handleOpenModal(houseName);
};

// Add the Modal component
return (
  <>
    <Paper elevation={3} className={styles.paper}>
      <div className={styles.settingsContainer}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" sx={{marginLeft: "auto", marginRight: "auto"}}>
            Configuration Page
          </Typography>
        </Toolbar>
      </AppBar>
      {error && <Alert severity="error">{error}</Alert>}

      <div style={{marginTop: "20px"}}>
        <Button
          onClick={() => setActiveTab('students')}
          className={styles.tabButton}
          sx={{
            backgroundColor: activeTab === 'students' ? theme.palette.secondary.main : theme.palette.secondary.main + '33',
            color: activeTab === 'students' ? theme.palette.getContrastText(theme.palette.secondary.main) : theme.palette.text.primary,
            transition: 'background-color 0.3s, color 0.3s',
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
              transform: "0.3s",
              color: theme.palette.getContrastText(theme.palette.secondary.main),
            },
          }}
        >
          Students
        </Button>
        <Button
          onClick={() => setActiveTab('houses')}
          className={styles.tabButton}
          sx={{
            backgroundColor: activeTab === 'houses' ? theme.palette.secondary.main : theme.palette.secondary.main + '33',
            color: activeTab === 'houses' ? theme.palette.getContrastText(theme.palette.secondary.main) : theme.palette.text.primary,
            transition: 'background-color 0.3s, color 0.3s',
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
              transform: "0.3s",
              color: theme.palette.getContrastText(theme.palette.secondary.main),
            },
          }}
        >
          Houses
        </Button>
      </div>
      
      <Fade in={activeTab === 'students'} timeout={500}>
        <div style={{ display: activeTab === 'students' ? 'block' : 'none' }}>
        {activeTab === 'students' && (
          <>
            <Typography variant="h6" gutterBottom>
              Manage Students
              </Typography>
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
        <div className={styles.formGroupToggle}>
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
                aria-label={house.houseName}
                style={{ backgroundColor: house.houseColour, color: theme.palette.getContrastText(house.houseColour) }}
                className={styles.toggleButton} sx={{ 
                '&.Mui-selected': {
                  transform: 'translateY(-5px)'
                 },
                 transition: "transform 0.3s",
                 padding: "0.5rem",
                 }}
              >
                {house.houseName}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <Button type="submit" variant="contained" color="primary" className={styles.formButton} fullWidth sx={{color: theme.palette.getContrastText(theme.palette.primary.main)}}>
          Add Student
        </Button>
      </form>
            <div className={styles.studentList}>
            <Typography variant="h6" gutterBottom>
          Current Students
        </Typography>
        <Paper>
        <List>
          {students.filter(student => student.studentId !== "None").map(student => (
            <ListItem key={student.id}>
              <div style={{ width: '20px', height: '20px', backgroundColor: houses.find(h => h.houseName === student.house)?.houseColour || '#000', marginRight: '10px' }}></div>
              <ListItemText
                primary={`${student.name} ${student.surname}`}
                secondary={`ID: ${student.studentId} | House: ${student.house}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleOpenStudentModal({ id: student.id, name: `${student.name} ${student.surname}` })}>
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
        </div>
        </Fade>
        <Fade in={activeTab === 'houses'} timeout={500}>
        <div style={{ display: activeTab === 'houses' ? 'block' : 'none' }}>
        {activeTab === 'houses' && (
          <>
            <Typography variant="h6" gutterBottom>
              Manage Houses
              </Typography>
            <form onSubmit={handleAddHouse}>
            <div className={styles.formGroupHouse}>
              <TextField
                label="House Name"
                value={newHouseName}
                onChange={(e) => setNewHouseName(e.target.value)}                
                fullWidth
                variant="outlined"
                margin="normal"
                />
            </div>
            <div className={styles.formGroupHouseColour}>
              <TextField
                label="House Color"
                type="color"
                className={styles.colorInput}
                value={newHouseColor}
                onChange={(e) => setNewHouseColor(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              </div>
              <Button type="submit" variant="contained" color="primary" className={styles.addHouseButton} sx={{color: theme.palette.getContrastText(theme.palette.primary.main)}}>
                Add House
              </Button>
            </form>
            <div className={styles.studentList}>
            <Typography variant="h6" gutterBottom>
              Current Houses:
            </Typography>
            <Paper>
              <List>
                {houses.map(house => (
                  <ListItem key={house.id}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: house.houseColour, marginRight: '10px' }}></div>
                    <ListItemText
                      primary={`${house.houseName}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteHouse(house.houseName)}>
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
        </div>
        </Fade>
      </div>
    </Paper>

    <Modal     //confirmation for deleting houses which also deletes students

  open={isModalOpen}
  onClose={handleCloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  className="modal"
  sx={{
    display: 'flex',
    alignItems: 'center', // Centers vertically
    justifyContent: 'center', // Centers horizontally
  }}
>
  <Box className="modal-box" sx={{ backgroundColor: theme.palette.background.default, padding: "16px", borderRadius: "8px"}}>
    <Typography id="modal-title" variant="h6" component="h2">
      Confirm Delete
    </Typography>
    <Typography id="modal-description" sx={{ mt: 2 }}>
      Are you sure you want to delete {houseToDelete}? This will also delete all students in this house.
    </Typography>
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={handleCloseModal} sx={{ mr: 2 }}>Cancel</Button>
      <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
    </Box>
  </Box>
</Modal>

<Modal //confirmation for deleing students

  open={isStudentModalOpen}
  onClose={handleCloseStudentModal}
  aria-labelledby="student-modal-title"
  aria-describedby="student-modal-description"
  className="modal"
  sx={{
    display: 'flex',
    alignItems: 'center', // Centers vertically
    justifyContent: 'center', // Centers horizontally
  }}
>
  <Box className="modal-box" sx={{ backgroundColor: theme.palette.background.default, padding: "16px", borderRadius: "8px"}}>
    <Typography id="student-modal-title" variant="h6" component="h2">
      Confirm Delete
    </Typography>
    <Typography id="student-modal-description" sx={{ mt: 2 }}>
      Are you sure you want to delete {studentToDelete?.name}?
    </Typography>
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={handleCloseStudentModal} sx={{ mr: 2 }}>Cancel</Button>
      <Button onClick={handleConfirmStudentDelete} variant="contained" color="error">Delete</Button>
    </Box>
  </Box>
</Modal>

  </>
);
};

export default Settings;



// <TextField
// label="House Name"
// InputLabelProps={{  }}
// className={styles.houseNameInput}
// value={newHouseName}
// onChange={(e) => setNewHouseName(e.target.value)}
// fullWidth
// />