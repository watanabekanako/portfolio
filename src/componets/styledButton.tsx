import { Button, ButtonProps } from "@mui/material";
import { yellow } from "@mui/material/colors";
import React from "react";


const StyledButton: React.FC<ButtonProps> = (props) => {
  console.log(props);
  return (
    <Button
      {...props}
      sx={{  backgroundColor: "#fedcac", color: "#fff", ...props.sx }}
    />
  );
};

export default StyledButton;
