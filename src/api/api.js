import axios from "axios";

export const getAirportCode = async (pageNo) => {
  try {
    const serviceKey = process.env.REACT_APP_API_KEY;
    const url = "service/rest/AirportCodeList/getAirportCodeList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}`;

    const response = await axios.get(fullUrl);
    if (response.data.response.body.items) {
      const items = response.data.response.body.items.item;
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
