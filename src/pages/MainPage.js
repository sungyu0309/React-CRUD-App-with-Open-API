import React from "react";
import AirlineSearchComponent from "../components/MainPage/AirlineSearchComponent";
import AirlineListsComponent from "../components/MainPage/AirlineListsComponent";
import { Vertical } from "../styles/CommunalStyle";

export default function Home() {
  return (
    <Vertical>
      <AirlineSearchComponent />
      <AirlineListsComponent />
    </Vertical>
  );
}
