import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { getAirportCodeList } from "../../api/api";

export default function SearchInputComponent() {
  const [codeList, setCodeList] = useState(null);

  const getApi = async () => {
    const list = await getAirportCodeList();
    setCodeList(list);
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
