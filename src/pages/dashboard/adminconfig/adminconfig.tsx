import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from '@/context/UserContext';
import { getSession } from 'next-auth/react';
import withAuthorizationSuperAdmin from '@/components/hoc/withAuthorizationSuperAdmin';

const AdminConfig: React.FC = () => {
  const { user, loading } = useUser();
  interface User {
    email: string;
    role: string;
    admin: boolean;
    adminrequest: boolean;
  }

  const [users, setUsers] = useState<User[]>([]);
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
      body: JSON.stringify({ email, admin: true, adminrequest: false }),
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
      body: JSON.stringify({ email, admin: false }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUsers(users.map(user => user.email === updatedUser.email ? updatedUser : user));
    }
  };

  const handleApproveRequest = async (email: string) => {
    const response = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, admin: true, adminrequest: false }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUsers(users.map(user => user.email === updatedUser.email ? updatedUser : user));
    }
  };

  const handleDenyRequest = async (email: string) => {
    const response = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, adminrequest: false }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUsers(users.map(user => user.email === updatedUser.email ? updatedUser : user));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'superadmin') {
    return <div>You are not authorized to view this page.</div>;
  }

  const adminRequests = users.filter(user => user.adminrequest);
  const currentAdmins = users.filter(user => user.admin);

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
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Admin Requests
          </Typography>
          <List>
            {adminRequests.map((user) => (
              <ListItem key={user.email}>
                <ListItemText primary={user.email} />
                <Button variant="contained" color="primary" onClick={() => handleApproveRequest(user.email)}>
                  Approve
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDenyRequest(user.email)}>
                  Deny
                </Button>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Current Admins
          </Typography>
          <List>
            {currentAdmins.map((user) => (
              <ListItem key={user.email} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAdmin(user.email)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText primary={user.email} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            All Users
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem key={user.email}>
                <ListItemText primary={`${user.email} (${user.role})`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuthorizationSuperAdmin(AdminConfig);