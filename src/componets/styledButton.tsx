import { Button, ButtonProps, SxProps } from "@mui/material";
type Props = {
  sx?: SxProps;
  children: string;
  event: () => void;
};
const StylePinkButton = ({ children, event, sx, ...props }: Props) => {
  return (
    <Button
      variant={"contained"}
      onClick={event}
      {...props}
      // disabled={true}
      sx={{
        background: "#e58e99",
        fontWeight: "bold",
        ":hover": {
          background: "#e58e99",
          opacity: 0.7,
          cursor: "pointer",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};
export default StylePinkButton;
