import React, { useEffect, useState } from "react";
import { getAirportCode } from "../api/api";

export default function Home() {
  const [airportCodes, setAiportCodes] = useState("");

  const getApi = async () => {
    for (let pageNo = 1; pageNo <= 136; pageNo++) {
      const newArr = await getAirportCode(pageNo);
      if (newArr) {
        setAiportCodes((prev) => [...prev, ...newArr]);
      }
    }
  };
  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    console.log(airportCodes);
  }, [airportCodes]);
  return <div>hello world</div>;
}
