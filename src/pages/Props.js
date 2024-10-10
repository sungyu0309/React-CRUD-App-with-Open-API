import React, { createContext, useState } from "react";

export default function Props() {
  const [name, setName] = useState("sungyu");
  const UserContext = createContext();

  return (
    <UserContext.Provider value={name}>
      <div>Hello {name}</div>
      <UserContext />
    </UserContext.Provider>
  );
}
