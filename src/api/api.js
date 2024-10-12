import axios from "axios";

export const getAirportCode = async (pageNo) => {
  try {
    const serviceKey = process.env.REACT_APP_API_KEY;
    const url = "service/rest/AirportCodeList/getAirportCodeList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}`;

    const response = await axios.get(fullUrl);
    if (response.data.response.body.items) {
      console.log("response", response);
      const items = response.data.response.body.items.item;
      console.log("Items", items);
      const newArr = items.map((itm) => ({
        code: itm.cityCode,
        kor: itm.cityKor,
      }));
      return newArr;
    }
    return undefined;
  } catch (err) {
    console.log("ERROR : getAirportCode", err);
    throw err;
  }
};

export const getDomesticAirline = async (pageNo) => {
  try {
    const serviceKey = process.env.REACT_APP_API_KEY;
    const url = "service/rest/FlightScheduleList/getDflightScheduleList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}`;

    const response = await axios.get(fullUrl);
    if (response.data.response.body.items) {
      const items = response.data.response.body.items.item;
      const newArr = items.map((itm) => ({
        domesticStartTime: itm.domesticStartTime,
        domesticArrivalTime: itm.domesticArrivalTime,
        domesticNum: itm.domesticNum,
        startcity: itm.startcity,
        arrivalcity: itm.arrivalcity,
        airlineKorean: itm.airlineKorean,
      }));
      console.log(newArr);
    }
    return undefined;
  } catch (err) {
    console.log("ERROR : getDomesticInformation", err);
    throw err;
  }
};

export const getInternationalAirline = async (pageNo) => {
  try {
    const serviceKey = process.env.REACT_APP_API_KEY;
    const url = "service/rest/FlightScheduleList/getIflightScheduleList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}`;

    const response = await axios.get(fullUrl);
    if (response.data.response.body.items) {
      const items = response.data.response.body.items.item;
      console.log(items);
      const newArr = items.map((itm) => ({
        internationalTime: itm.internationalTime,
        internationalNum: itm.internationalNum,
        startcity: itm.airport,
        arrivalcity: itm.city,
        airlineKorean: itm.airlineKorean,
      })); // 국제선인경우 도착 시간 X
      console.log(newArr);
    }
    return undefined;
  } catch (err) {
    console.log("ERROR : getInternationalInformation", err);
    throw err;
  }
};

export const getRealtimeAirline = async (pageNo) => {
  try {
    const serviceKey = process.env.REACT_APP_API_KEY;
    const url = "service/rest/FlightStatusList/getFlightStatusList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}&schAirCode=GMP&schStTime=1400&schEdTime=1600&schLineType=I`;

    const response = await axios.get(fullUrl);
    console.log(response);
    if (response.data.response.body.items) {
      const items = response.data.response.body.items.item;
    }
    return undefined;
  } catch (err) {
    console.log("ERROR : getInternationalInformation", err);
    throw err;
  }
};

export const getAirportCodeList = async () => {
  try {
    const url = "https://6707c25d8e86a8d9e42ccc3b.mockapi.io/api/airportCode";
    const response = await axios.get(url);
    if (response) {
      console.log(response.data[0]);
    }
  } catch (err) {
    console.log("ERROR : get code list from mockapi");
    throw err;
  }
};
