import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { getAirportCodeList } from "../../api/api";
import axios from "axios";

export default function SearchInputComponent() {
  const [codeList, setCodeList] = useState(null);

  const getApi = () => {
    const url =
      "https://6707c25d8e86a8d9e42ccc3b.mockapi.io/api/airportCodeList";
    axios
      .get(url)
      .then((res) => {
        const seenLabels = new Set();

        const newArr = res.data[0].codes
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

        setCodeList(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <>
      {codeList && (
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={codeList}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                {option.label} ({option.code})
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Airport"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                },
              }}
            />
          )}
        />
      )}
    </>
  );
}
