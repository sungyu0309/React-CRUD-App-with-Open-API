import React, { useContext } from "react";

function UserContext() {
  const name = useContext(UserContext);
  return <div>my name is {name}</div>;
}

export default UserContext;
