import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api.js";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
