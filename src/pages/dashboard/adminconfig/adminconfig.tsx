import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from '@/context/UserContext';
import { getSession } from 'next-auth/react';

const AdminConfig: React.FC = () => {
  const { user, loading } = useUser();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const session = await getSession();
      if (session?.user) {
        const response = await fetch('/api/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUsers(data.users);
      }
    };

    fetchUsers();
  }, []);

  const handleAddAdmin = async () => {
    const response = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, role: 'admin' }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUsers(users.map(user => user.email === updatedUser.email ? updatedUser : user));
      setEmail('');
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    const response = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, role: 'user' }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUsers(users.map(user => user.email === updatedUser.email ? updatedUser : user));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Configuration
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="User Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddAdmin}>
          Add Admin Role
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.email} secondaryAction={
            user.role === 'admin' ? (
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAdmin(user.email)}>
                <DeleteIcon />
              </IconButton>
            ) : null
          }>
            <ListItemText primary={`${user.email} (${user.role})`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminConfig;