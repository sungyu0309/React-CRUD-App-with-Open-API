import React, { useEffect, useState } from "react";
import { getAirportCode } from "../api/api";
import axios from "axios";

export default function Home() {
  const [airportCodes, setAirportCodes] = useState("");

  const getApi = async () => {
    for (let pageNo = 1; pageNo <= 1; pageNo++) {
      //136
      const newArr = await getAirportCode(pageNo);
      if (newArr) {
        setAirportCodes((prev) => [...prev, ...newArr]);
      }
    }

    axios
      .get("https://6707c25d8e86a8d9e42ccc3b.mockapi.io/api/airportCode")
      .then((res) => {
        console.log(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getApi();
  }, []);

  return <div></div>;
}
