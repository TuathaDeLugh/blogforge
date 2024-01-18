'use client'
// UserData.tsx
import { RootState } from '@/Redux/store';
import { setUser } from '@/Redux/userSlice';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserData: React.FC = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId= session?.user?.dbid || null
  const user = useSelector((state: RootState) => state.user.data);


  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch(`/api/user/${userId}`, {
          cache: 'no-store',
        });
        const userData = await response.json();
        dispatch(setUser({
          username: userData.data.username,
          name: userData.data.name,
          provider: userData.data.provider,
          email: userData.data.email,
          avatar: userData.data.avatar,
          role: userData.data.role
        }));
      } catch (err: any) {
        console.log(err);
        
      }
    };

    if (session && userId) {
      fetchData();
    } else {
      dispatch(setUser(null));
    }
  }, [dispatch, userId]);
  return null
};

export default UserData;
