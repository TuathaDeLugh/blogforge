'use client'
// UserData.tsx
import { RootState } from '@/Redux/store';
import { setError, setUser } from '@/Redux/userSlice';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserData: React.FC = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId= session?.user?.id || ''
  const user = useSelector((state: RootState) => state.user.data);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const emptydata = {
    username: '',
    name: '',
    provider: '',
    email: '',
    avatar: '',
    role: ''
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          cache: 'no-store',
        });
        const userData = await response.json();
        dispatch(setUser(userData.data));
      } catch (err: any) {
        dispatch(setError(err.message));
      }
    };

    // Add a conditional check for session existence

    if (session && userId) {
      fetchData();
    } else {
      dispatch(setUser(emptydata));
    }
  }, [dispatch, userId]);

  if (status === 'idle' || status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{user?.username}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.avatar}</h1>
      <h1>{user?.role}</h1>
      <h1>{user?.provider}</h1>
    </div>
  );
};

export default UserData;
