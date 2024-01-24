'use client'
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const UpdateSession = () => {
    const { data: session,update } = useSession();
  
    useEffect(() => {
      const updateToken = async () => {
        // Check ere is an active session
        if (session) {
          await update();
          console.log('Update callback triggered successfully');
        }
      };
  
      // Call the updateToken function
      updateToken();
    }, [session]);
    return null
}
export default UpdateSession