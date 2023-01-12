import styled from "@emotion/styled";

export const PageWrapperStyles = styled.div({
  ".root": {
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    overflowY: "auto",
  },
  ".pageHeader": {
    paddingTop: 10,
    paddingBottom: 10,
    height: 64,
  },
  ".pageTitle": {
    fontSize: 22,
    fontWeight: "bold",
  },
  ".wrapper": {
    padding: "10px !important",
    boxShadow: "none !important",
    position: "relative",
    overflow: "auto",
    height: "calc(100vh - 65px)",
  },
});
