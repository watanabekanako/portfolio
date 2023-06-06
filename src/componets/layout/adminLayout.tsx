import * as React from "react";
import Container from "@mui/material/Container";

function AdminLayout({ children }: { children: any }) {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ marginBottom: "100" }}>
        {children}
      </Container>
    </React.Fragment>
  );
}
export default AdminLayout;
