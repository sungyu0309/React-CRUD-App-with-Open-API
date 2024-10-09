import axios from "axios";

const serviceKey =
  "%2BQie7YaDECquGlEggvCv8FJKVQ%2Fyc%2FdeK%2Fvr%2Bm%2F%2Flp%2Bj9jPnG8hDtOTgXyn3H9XzeAFc24CI1S4pjqnXGXBWtQ%3D%3D";

export const getAirportCode = async (pageNo) => {
  try {
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
