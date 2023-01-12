import styled from "@emotion/styled";

export const ConfirmationModalStyles = styled.div({
  ".closeButton": {
    position: "absolute",
    right: 4,
    top: 4,
    color: "grey",
  },
  ".dialogTitle": {
    textAlign: "center",
  },
  ".dialog": {
    maxWidth: 600,
    minWidth: 250,
    margin: 10,
    top: "-20%",
  },
  ".title": {
    fontSize: 16,
  },
  ".subTitle": {
    fontSize: 16,
    marginTop: 10,
  },
  ".dialogContent": {
    padding: `10px 20px 0px 20px !important`,
  },
});
