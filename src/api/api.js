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

export const getKoreaAir = async (pageNo) => {
  try {
    const serviceKey = process.env.REACT_APP_API_KEY;
    const url = "service/rest/FlightScheduleList/getDflightScheduleList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}`;

    console.log(fullUrl);

    const response = await axios.get(fullUrl);
    if (response.data.response.body.items) {
      const items = response.data.response.body.items.item;
      console.log(items);
    }
    return undefined;
  } catch (err) {
    console.log("ERROR : getDomesticInformation", err);
    throw err;
  }
};
