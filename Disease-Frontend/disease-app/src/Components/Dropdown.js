import * as React from "react";
import { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

function Dropdown({ labelText, data, setValue, defaultValue }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  useEffect(() => {
    setSelectedValue(defaultValue || "");
  }, [defaultValue]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" style={{ minWidth: 190 }}>
        <InputLabel>{labelText}</InputLabel>
        <Select
          value={selectedValue}
          onChange={handleChange}
          disabled={!!defaultValue} // Disable the dropdown if a default value is provided
          displayEmpty
          renderValue={selectedValue !== "" ? undefined : () => labelText}
          label={labelText}
        >
          {data.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label.replace(/_/g, " ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;
