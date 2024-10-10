import axios from "axios";

// const serviceKey =
//   "Y39tRodvtsKfoRFJ8wqa8yuE5wJjTbDmOMNxQGDElzGcLd%2B%2BSob0U0scwH3C4kO5yO6JvcoP8mV1Gc44SU9IOw%3D%3D";

// const serviceKey =
//   "UurbbowROuq9OTKlvvbw2xIIlluYH8IEKt5J%2FXrLvn8Il4GPmsYbv4sEfJoswqv9cxxhnj%2BHn6aKqJxCzPrUuQ%3D%3D";

const serviceKey =
  "RPvte6BUUQcYUfdg1OlfZMJEmh0nAqXlSRhahPXC60outZySg4cewOug4QYKyXk8DwQBxPdzwGjGZiGZVwH4dQ%3D%3D";

export const getAirportCode = async (pageNo) => {
  try {
    console.log(serviceKey);
    const url = "service/rest/AirportCodeList/getAirportCodeList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}`;

    const response = await axios.get(fullUrl);
    console.log(response);
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
    const url = "service/rest/FlightScheduleList/getDflightScheduleList";
    const fullUrl = `${url}?ServiceKey=${serviceKey}&pageNo=${pageNo}`;

    console.log(fullUrl);

    const response = await axios.get(fullUrl);
    console.log(response);
  } catch (err) {
    console.log("ERROR : getAirportCode", err);
    throw err;
  }
};
