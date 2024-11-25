"use client";

import { SessionProvider } from "next-auth/react";
import { signIn, useSession } from "next-auth/react";



const AuthProvider = ({ children }: any) => {
  const { status, data:session } = useSession();
  const router = useRouter();

  const [accessToken, setAccessToken] = React.useState(null);
 
  React.useEffect(() => {
    if (session) {
      console.log(session)
    }
  }, [session]);

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
