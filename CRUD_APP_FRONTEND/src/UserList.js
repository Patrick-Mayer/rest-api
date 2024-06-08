// UserList.js
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const UserList = () => {
  const { users } = useContext(UserContext);

  return (
    <>
      <br />
      <br />
      <h2>User List</h2>
      <br />

      <table className="UserTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.ID}>
              <td>{user.ID}</td>
              <td>{user.Username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
