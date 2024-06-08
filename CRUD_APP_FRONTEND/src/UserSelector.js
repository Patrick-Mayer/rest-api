import React, { useState } from 'react';
import GetUserByID from './GetUserByID';

const UserSelector = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <h1>Select a User</h1>
      <button onClick={() => setSelectedId(1)}>User 1</button>
      <button onClick={() => setSelectedId(2)}>User 2</button>
      <button onClick={() => setSelectedId(3)}>User 3</button>

      <GetUserByID id={selectedId} />
    </div>
  );
};

export default UserSelector;