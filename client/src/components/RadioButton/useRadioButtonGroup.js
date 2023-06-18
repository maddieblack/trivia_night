import { useState } from "react";

export const useRadioButtonGroup = (defaultValue) => {
  const [value, changeValue] = useState(defaultValue);

  return { value, changeValue };
};
