import React from "react";
import AirlineSearchComponent from "../components/MainPage/AirlineSearchComponent";
import AirlineListsComponent from "../components/MainPage/AirlineListsComponent";

export default function Home() {
  return (
    <div>
      <AirlineSearchComponent />
      <AirlineListsComponent />
    </div>
  );
}
