import React, { useEffect, useState } from "react";
import {
  getAirportCode,
  getAirportCodeList,
  getRealtimeAirline,
} from "../api/api";
import AirlineSearchComponent from "../components/Main/AirlineSearchComponent";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    getAirportCodeList();
  }, []);
  return (
    <div>
      <AirlineSearchComponent />
    </div>
  );
}
