import React, { useEffect, useState } from "react";
import axios from "axios"; // axios로 API 호출
import "./Mypage.css";

export default function Mypage() {
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

  // 항목 삭제 함수
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://670731a0a0e04071d2296047.mockapi.io/flight/wanderAir/${id}`
      );
      // 삭제 후 남은 항목들을 다시 설정
      setFlights(flights.filter((flight) => flight.id !== id));
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  // 수정 버튼 클릭 시 (이 부분은 사용자 요구에 맞게 수정 가능)
  const handleEdit = (id) => {
    alert(`Edit flight with ID: ${id}`);
    // 이 부분에서 수정 로직을 추가하거나 수정 페이지로 이동
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
          <div
            key={flight.id}
            className="card"
            style={{ backgroundImage: `url(${flight.pic})` }}
          >
            <div className="card-content">
              <h3 className="card-title">{flight.title}</h3>
              <p className="card-info">출발지: {flight.Departure}</p>
              <p className="card-info">도착지: {flight.Arrival}</p>
              <p className="card-info">출발 시간: {flight.DepartureTime}</p>
              <p className="card-info">도착 시간: {flight.ArrivalTime}</p>
              <p className="card-description">{flight.memo}</p>
            </div>
            <div className="card-buttons">
              <button className="button edit" onClick={() => handleEdit(flight.id)}>수정</button>
              <button className="button delete" onClick={() => handleDelete(flight.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
