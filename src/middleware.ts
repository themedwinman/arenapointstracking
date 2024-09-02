import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", //tells the app to show the sign-in page when the user is not authenticated
    // signOut: "/auth/signout", //ditto for sign-out
    error: "/auth/error", // Error code passed in query string as ?error=
  },
});