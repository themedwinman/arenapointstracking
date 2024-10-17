import React from "react";
import Login from "@/components/login/Login";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link"; // import Link from next/link
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  backgroundImage: "url('/path/to/your/background/image.jpg')", // optional background image
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const SignInPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  maxWidth: "100%", // Ensure it doesn't overflow
  margin: theme.spacing(2), // Add some margin
  flexGrow: 0, // Prevent it from growing too much
}));

const SignIn = () => {
  const { data: session } = useSession();

  return (
    <BackgroundBox>
      <Container maxWidth="sm">
        <SignInPaper>
          <Typography variant="h4" component="h1" gutterBottom>
            {session ? `Welcome ${session?.user?.name}!` : "Sign In"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {session ? "Thank you for logging in" : "Please log in to continue"}
          </Typography>
          {session && (
            <Link href="/dashboard" passHref>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2, marginTop: 2 }} // add some margin for spacing
              >
                Go to Dashboard
              </Button>
            </Link>
          )}
          <Login />
        </SignInPaper>
      </Container>
    </BackgroundBox>
  );
};

export default SignIn;