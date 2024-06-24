import React from 'react';

interface User {
  username: string;
  name: string;
  avatar: string;
  email: string;
  score: number;
  totalBlogs: number;
  totalUsersave: number;
  totalShare: number;
}

interface UserListProps {
  users: User[];
}

interface UserCardProps {
    username: string;
    name: string;
    avatar: string;
    email: string;
    score: number;
  }


const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.email} {...user} />
      ))}
    </div>
  );
};

  
  const UserCard: React.FC<UserCardProps> = ({ username, name, avatar, email, score }) => {
    return (
        <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img className="h-32 w-full object-cover" src={avatar} alt={name} />
        <div className="p-6">
          <h3 className="text-lg leading-tight font-medium text-black">{name}</h3>
          <p className="text-gray-500">@{username}</p>
          <p className="text-gray-500">{email}</p>
          <p className="text-gray-500">Score: {score}</p>
        </div>
      </div>
    );
  };


export default UserList;
