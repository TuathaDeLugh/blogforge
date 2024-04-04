"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function SessionUpdate() {
    const { data: session, update } = useSession();
    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        const updateSession = async () => {
            try {
                if (!session) return;
                const userId = session?.user?.dbid || null;
                const response = await fetch(`/api/user/${userId}`, {
                    cache: 'no-store',
                });
                const userData = await response.json();
                await update({
                    ...session,
                    user: {
                        username: userData.data.username,
                        name: userData.data.name,
                        email: userData.data.email,
                        avatar : userData.data.avatar,
                        isVerified : userData.data.isVerified,
                        isAdmin : userData.data.isAdmin
                    }
                });
                setReloadCount(prevCount => prevCount + 1);
            } catch (error) {
                console.error('Error updating session:', error);
            }
        };
        if (reloadCount < 2) {
            updateSession();
        }
    }, [session, reloadCount]); 

    return null;
}

export default SessionUpdate;
