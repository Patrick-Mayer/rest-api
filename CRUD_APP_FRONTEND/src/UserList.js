// UserList.js
import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import DeleteByID from './DeleteByID';

const UserList = ({deleteCallback}) => {
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
              <DeleteByID userId={user.ID}></DeleteByID>
              {/*<button onClick={() => {deleteCallback(user.ID)}}>Delete</button>*/}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
