import React from "react";
import AirlineSearchComponent from "../components/Main/AirlineSearchComponent";
import AirlineListsComponent from "../components/Main/AirlineListsComponent";

export default function Home() {
  return (
    <div>
      <AirlineSearchComponent />
      <AirlineListsComponent />
    </div>
  );
}
