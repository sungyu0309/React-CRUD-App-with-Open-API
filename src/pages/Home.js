import React, { useEffect, useState } from "react";
import { getAirportCode, getKoreaAir } from "../api/api";
import SwitchButton from "../components/Main/SwitchButton";
import PaginationButtons from "../components/Main/PaginationButtons";
import Props from "./Props";

const airport = [
  {
    code: "AAA",
    kor: "인천국제공항",
  },
  {
    code: "BBB",
    kor: "김포공항",
  },
];

export default function Home() {
  const [airportCodes, setAiportCodes] = useState("");
  const [switchCheck, setSwitchCheck] = useState(true);

  const getApi = async () => {
    // for (let pageNo = 1; pageNo <= 3; pageNo++) {
    //   const newArr = await getAirportCode(pageNo);
    //   if (newArr) {
    //     setAiportCodes((prev) => [...prev, ...newArr]);
    //   }
    // }

    const response = await getKoreaAir(1);
    console.log(response);
  };
  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <SwitchButton checked={switchCheck} setChecked={setSwitchCheck} />
      <div style={{ display: "none" }}>
        <PaginationButtons />
      </div>
    </div>
  );
}
