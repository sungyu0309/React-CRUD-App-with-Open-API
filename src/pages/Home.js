import React, { useEffect, useState } from "react";
import {
  getAirportCode,
  getAirportCodeList,
  getInternationalAirline,
  getRealtimeAirline,
} from "../api/api";

export default function Home() {
  const [user, setUser] = useState({
    name: "",
    age: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("your name is " + user.name + ", your age is " + user.age);
  };

  const getApi = () => {
    getRealtimeAirline(1);
  };

  useEffect(() => {
    getApi();
  }, []);

  return <div>hello world</div>;
}
