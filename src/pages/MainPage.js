import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AirlineSearchComponent from "../components/Main/AirlineSearchComponent";
import AirlineListsComponent from "../components/Main/AirlineListsComponent";

export default function MainPage() {
  return (
    <div>
      <AirlineSearchComponent />
      <AirlineListsComponent />
      
      {/* Button to navigate to MyPage */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/mypage">
          <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to MyPage</button>
        </Link>
      </div>
    </div>
  );
}
