import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Mypage.css";

export default function Mypage() {
  const [flights, setFlights] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [editFlight, setEditFlight] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    memo: "",
    pic: "",
    Departure: "",
    Arrival: "",
    DepartureTime: "",
    ArrivalTime: "",
    DepartureCode: "",
    ArrivalCode: "",
    AirlineName: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState({});

  const fetchFlightData = async () => {
    try {
      const response = await axios.get(
        "https://670731a0a0e04071d2296047.mockapi.io/flight/wanderAir"
      );
      if (response.data) {
        setFlights(response.data);
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  const toggleFlip = (id) => {
    setFlippedCards((prevFlipped) => ({
      ...prevFlipped,
      [id]: !prevFlipped[id],
    }));
  };

  const toggleMenu = (id) => {
    setMenuOpen((prevMenu) => ({
      ...prevMenu,
      [id]: !prevMenu[id],
    }));
  };

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

  const handleEdit = (flight) => {
    setEditFlight(flight);
    setEditData({
      title: flight.title,
      memo: flight.memo,
      pic: flight.pic,
      Departure: flight.Departure,
      Arrival: flight.Arrival,
      DepartureTime: flight.DepartureTime,
      ArrivalTime: flight.ArrivalTime,
      DepartureCode: flight.DepartureCode,
      ArrivalCode: flight.ArrivalCode,
      AirlineName: flight.AirlineName,
    });
    setModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `https://670731a0a0e04071d2296047.mockapi.io/flight/wanderAir/${editFlight.id}`,
        editData
      );
      setFlights(
        flights.map((flight) =>
          flight.id === editFlight.id ? { ...flight, ...editData } : flight
        )
      );
      setModalOpen(false);
      setEditFlight(null);
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
        <h1>WanderAir</h1>
        <p>Explore your upcoming trips.</p>
        <h2>MyTrip</h2>
      </header>

      <div className="card-scroll-area">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className={`card-container ${
              flippedCards[flight.id] ? "flipped" : ""
            }`}
            onClick={() => toggleFlip(flight.id)}
          >
            <div className="card">
              <div
                className="card-front"
                style={{ backgroundImage: `url(${flight.pic})` }}
              >
                <div className="flight-codes">
                  {flight.DepartureCode} {flight.ArrivalCode}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{flight.title}</h3>
                  <p className="card-info">출발지: {flight.Departure}</p>
                  <p className="card-info">도착지: {flight.Arrival}</p>
                  <p className="card-info">출발 시간: {flight.DepartureTime}</p>
                  <p className="card-info">도착 시간: {flight.ArrivalTime}</p>
                  <p className="airline-name">{flight.AirlineName}</p>
                </div>
                <div className="card-menu">
                  <div
                    className="menu-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(flight.id);
                    }}
                  >
                    &#x22EE;
                  </div>
                  {menuOpen[flight.id] && (
                    <div className="menu-options">
                      <button
                        className="button edit"
                        onClick={() => handleEdit(flight)}
                      >
                        수정
                      </button>
                      <button
                        className="button delete"
                        onClick={() => handleDelete(flight.id)}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>

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

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>수정하기</h3>
            <label>Title</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <label>Memo</label>
            <textarea
              value={editData.memo}
              onChange={(e) =>
                setEditData({ ...editData, memo: e.target.value })
              }
              rows="5"
              style={{ width: "100%" }}
            />
            <label>Image URL</label>
            <input
              type="text"
              value={editData.pic}
              onChange={(e) =>
                setEditData({ ...editData, pic: e.target.value })
              }
            />
            <label>Departure</label>
            <input
              type="text"
              value={editData.Departure}
              onChange={(e) =>
                setEditData({ ...editData, Departure: e.target.value })
              }
            />
            <label>Arrival</label>
            <input
              type="text"
              value={editData.Arrival}
              onChange={(e) =>
                setEditData({ ...editData, Arrival: e.target.value })
              }
            />
            <label>Departure Time</label>
            <input
              type="text"
              value={editData.DepartureTime}
              onChange={(e) =>
                setEditData({ ...editData, DepartureTime: e.target.value })
              }
            />
            <label>Arrival Time</label>
            <input
              type="text"
              value={editData.ArrivalTime}
              onChange={(e) =>
                setEditData({ ...editData, ArrivalTime: e.target.value })
              }
            />
            <label>Departure Code</label>
            <input
              type="text"
              value={editData.DepartureCode}
              onChange={(e) =>
                setEditData({ ...editData, DepartureCode: e.target.value })
              }
            />
            <label>Arrival Code</label>
            <input
              type="text"
              value={editData.ArrivalCode}
              onChange={(e) =>
                setEditData({ ...editData, ArrivalCode: e.target.value })
              }
            />
            <label>Airline Name</label>
            <input
              type="text"
              value={editData.AirlineName}
              onChange={(e) =>
                setEditData({ ...editData, AirlineName: e.target.value })
              }
            />
            <button className="button save" onClick={handleSaveEdit}>
              저장
            </button>
            <button
              className="button cancel"
              onClick={() => setModalOpen(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
