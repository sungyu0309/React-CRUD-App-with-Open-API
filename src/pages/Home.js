import React, { useEffect, useState } from "react";
import axios from "axios"; // axios로 API 호출
import "./Home.css";

export default function Home() {
  const [flights, setFlights] = useState([]);

  // API에서 데이터 가져오는 함수
  const fetchFlightData = async () => {
    try {
      const response = await axios.get(
        "https://670731a0a0e04071d2296047.mockapi.io/flight/wanderAir"
      );
      if (response.data) {
        setFlights(response.data); // API에서 받은 데이터를 상태로 설정
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  useEffect(() => {
    fetchFlightData(); // 컴포넌트가 렌더링될 때 데이터 가져오기
  }, []);

  return (
    <div className="scroll-container">
      <header className="header">
        <h1>WanderAir - My Trip</h1>
        <p>Explore your upcoming trips.</p>
      </header>

      <div className="card-scroll-area">
        {flights.map((flight) => (
          <div key={flight.id} className="card">
            <img src={flight.pic} alt={flight.title} className="card-image" />
            <h3 className="card-title">{flight.title}</h3>
            <p className="card-info">출발지: {flight.Departure}</p>
            <p className="card-info">도착지: {flight.Arrival}</p>
            <p className="card-info">출발 시간: {flight.DepartureTime}</p>
            <p className="card-info">도착 시간: {flight.ArrivalTime}</p>
            <p className="card-description">{flight.memo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
