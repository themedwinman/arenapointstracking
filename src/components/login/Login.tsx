import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Button } from "@mui/material";

const Login = () => {
    const { data: session } = useSession();

    if(session) {
        return <>
            <Button onClick={() => signOut()} variant={'contained'} color={'error'}>Sign out</Button>
        </>
    }
    return <>
        <h2>Please Log In</h2> <br />
        <Button onClick={() => signIn()} variant={'contained'} color={'success'}>Sign in</Button>

        
    </>

}

export default Login;