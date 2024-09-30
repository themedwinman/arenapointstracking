import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Paper from "@mui/material/Paper";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const Profile = () => {
  const { data: session } = useSession();
  const names = session?.user?.name?.split(" ") || [];
  const firstName = names[0];
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: session?.user?.email,
    password: "",
    confirmPassword: "",
    receiveEmails: false,
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "receiveEmails" ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData); // Submit form data to server here
  };
  return (
    <>
      <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" sx={{marginLeft: "auto", marginRight: "auto"}}>
            Profile
          </Typography>
        </Toolbar>
        <Toolbar>
          <Typography variant="h6" sx={{marginLeft: "auto", marginRight: "auto"}}>
            Welcome to your profile {session?.user?.name}
          </Typography>
        </Toolbar>
      </AppBar>
        <Paper sx={{ padding: "1rem 2rem" }}>

          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  sx={{
                    height: 100,
                    width: 100,
                    marginBottom: 2,
                  }}
                  src={(session?.user as any)?.image}
                />
              </Box>
              <form
                onSubmit={handleSubmit}
                style={{ maxWidth: 600, margin: "0 auto" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="adminApplication"
                          checked={formData.receiveEmails}
                          onChange={handleFormChange}
                          color="primary"
                        />
                      }
                      label="Check this box to request admin access (teachers only)"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;