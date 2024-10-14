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

export const getDomesticAirline = async (pageNo, date, airlineInfo) => {
  try {
    const serviceKey = process.env.REACT_APP_API_KEY;
    const url = "service/rest/FlightScheduleList/getDflightScheduleList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}&schDate=${date}&schArrvCityCode=${airlineInfo.arriveCode}&schDeptCityCode=${airlineInfo.departCode}`;

    const response = await axios.get(fullUrl);
    console.log(response);
    if (response.data.response.body.items) {
      const items = response.data.response.body.items.item;
      const newArr = items.map((itm) => ({
        domesticStartTime: itm.domesticStartTime,
        domesticArrivalTime: itm.domesticArrivalTime,
        domesticNum: itm.domesticNum,
        startcity: itm.startcity,
        arrivalcity: itm.arrivalcity,
        airlineKorean: itm.airlineKorean,
        totalCount: response.data.response.body.totalCount,
      }));
      return newArr;
    }
    return undefined;
  } catch (err) {
    console.log("ERROR : getDomesticInformation", err);
    throw err;
  }
};

export const getInternationalAirline = async (pageNo, date, airlineInfo) => {
  try {
    const serviceKey = process.env.REACT_APP_API_KEY;
    const url = "service/rest/FlightScheduleList/getIflightScheduleList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}&schDate=${date}&schArrvCityCode=${airlineInfo.arriveCode}&schDeptCityCode=${airlineInfo.departCode}`;

    const response = await axios.get(fullUrl);
    if (response.data.response.body.items) {
      const items = response.data.response.body.items.item;
      const newArr = items.map((itm) => ({
        internationalTime: itm.internationalTime,
        internationalNum: itm.internationalNum,
        startcity: itm.airport,
        arrivalcity: itm.city,
        airlineKorean: itm.airlineKorean,
        totalCount: response.data.response.body.totalCount,
      })); // 국제선인경우 도착 시간 X
      return newArr;
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
      console.log(items);
    }
    return undefined;
  } catch (err) {
    console.log("ERROR : getInternationalInformation", err);
    throw err;
  }
};

export const getAirportCodeList = async () => {
  try {
    const url =
      "https://6707c25d8e86a8d9e42ccc3b.mockapi.io/api/airportCodeList";
    const response = await axios.get(url);
    if (response) {
      // 중복된 label (itm.kor)을 걸러내기 위한 Set 생성
      const seenLabels = new Set();

      const newArr = response.data[0].codes
        .filter((itm) => {
          // 이미 존재하는 label인지 확인
          if (seenLabels.has(itm.kor)) {
            return false; // 중복되면 false
          } else {
            seenLabels.add(itm.kor); // 중복이 아니면 Set에 추가
            return true;
          }
        })
        .map((itm) => ({
          label: itm.kor,
          code: itm.code,
        }));

      return newArr;
    }
  } catch (err) {
    console.log("ERROR : get code list from mockapi");
    throw err;
  }
};
