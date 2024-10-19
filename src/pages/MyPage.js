import React, { useEffect, useState } from "react";
import axios from "axios"; // axios로 API 호출
import "./Mypage.css";

export default function Mypage() {
  const [flights, setFlights] = useState([]);
  const [flippedCards, setFlippedCards] = useState({}); // 카드 뒤집힘 상태
  const [editFlight, setEditFlight] = useState(null); // 수정할 항목을 저장할 상태
  const [editData, setEditData] = useState({ title: '', memo: '', pic: '' }); // 수정할 데이터 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [menuOpen, setMenuOpen] = useState({}); // 점세개 메뉴 상태

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

  // 카드 뒤집기 토글 함수
  const toggleFlip = (id) => {
    setFlippedCards((prevFlipped) => ({
      ...prevFlipped,
      [id]: !prevFlipped[id], // 해당 id의 카드 뒤집기 상태 반전
    }));
  };

  // 점 세 개 메뉴 열기/닫기 함수
  const toggleMenu = (id) => {
    setMenuOpen((prevMenu) => ({
      ...prevMenu,
      [id]: !prevMenu[id], // 해당 id의 메뉴 상태를 반전
    }));
  };

  // 항목 삭제 함수
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://670731a0a0e04071d2296047.mockapi.io/flight/wanderAir/${id}`
      );
      setFlights(flights.filter((flight) => flight.id !== id));
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  // 수정 모달 열기
  const handleEdit = (flight) => {
    setEditFlight(flight); // 수정할 항목을 설정
    setEditData({ title: flight.title, memo: flight.memo, pic: flight.pic });
    setModalOpen(true); // 모달 열기
  };

  // 수정 사항 저장 함수
  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `https://670731a0a0e04071d2296047.mockapi.io/flight/wanderAir/${editFlight.id}`,
        editData
      );
      // 서버에서 데이터 업데이트 후 다시 가져옴
      setFlights(flights.map((flight) =>
        flight.id === editFlight.id ? { ...flight, ...editData } : flight
      ));
      setModalOpen(false); // 모달 닫기
      setEditFlight(null); // 수정 상태 초기화
    } catch (error) {
      console.error("Error saving flight edit:", error);
    }
  };

  useEffect(() => {
    fetchFlightData();
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
            className={`card-container ${flippedCards[flight.id] ? 'flipped' : ''}`} // 카드가 뒤집힐 때 상태 적용
            onClick={() => toggleFlip(flight.id)} // 클릭 시 카드 뒤집기
          >
            <div className="card">
              {/* 카드 앞면 */}
              <div className="card-front" style={{ backgroundImage: `url(${flight.pic})` }}>
                <div className="card-content">
                  <h3 className="card-title">{flight.title}</h3>
                  <p className="card-info">출발지: {flight.Departure}</p>
                  <p className="card-info">도착지: {flight.Arrival}</p>
                  <p className="card-info">출발 시간: {flight.DepartureTime}</p>
                  <p className="card-info">도착 시간: {flight.ArrivalTime}</p>
                </div>
                <div className="card-menu">
                  {/* 점 세 개 아이콘 */}
                  <div className="menu-icon" onClick={(e) => {e.stopPropagation(); toggleMenu(flight.id);}}>
                    &#x22EE; {/* 점 세 개 아이콘 */}
                  </div>
                  {/* 메뉴가 열려있을 때 수정, 삭제 버튼 표시 */}
                  {menuOpen[flight.id] && (
                    <div className="menu-options">
                      <button className="button edit" onClick={() => handleEdit(flight)}>수정</button>
                      <button className="button delete" onClick={() => handleDelete(flight.id)}>삭제</button>
                    </div>
                  )}
                </div>
              </div>

              {/* 카드 뒷면 */}
              <div className="card-back">
                <div className="card-content">
                  <h3 className="card-title">Memo</h3>
                  <p className="card-description">{flight.memo}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 수정 모달 */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>수정하기</h3>
            <label>Title</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            <label>Memo</label>
            {/* 메모 입력을 위한 textarea */}
            <textarea
              value={editData.memo}
              onChange={(e) => setEditData({ ...editData, memo: e.target.value })}
              rows="5" /* 기본적으로 5줄을 보이도록 설정 */
              style={{ width: '100%' }} /* textarea의 너비를 100%로 설정 */
            />
            <label>Image URL</label>
            <input
              type="text"
              value={editData.pic}
              onChange={(e) => setEditData({ ...editData, pic: e.target.value })}
            />
            <button className="button save" onClick={handleSaveEdit}>저장</button>
            <button className="button cancel" onClick={() => setModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
