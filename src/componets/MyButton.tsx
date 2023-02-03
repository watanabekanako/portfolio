import { Button, ButtonProps } from "@mui/material";
import { yellow } from "@mui/material/colors";
import React from "react";

const MyButton: FC<ButtonProps & { m: number }> = (props: any) => {
  return <Button {...props} {m:2} />;
};

export default MyButton;
