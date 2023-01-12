import { CircularProgress, Grid } from "@mui/material";
import { LoaderStyles } from "./Loader.Styles";

interface Props {
  size?: "small" | "medium" | "large";
  value: boolean;
}

const Loader: React.FC<Props> = (props) => {
  const { size, value } = props;

  const sizeProps = (): number => {
    switch (size) {
      case "small":
        return 40;
      case "medium":
        return 50;
      case "large":
        return 70;
      default:
        return 50;
    }
  };
  return value ? (
    <LoaderStyles>
      <Grid item xs={12} className="root">
        <CircularProgress size={sizeProps()} className="circle" />
      </Grid>
    </LoaderStyles>
  ) : null;
};

export default Loader;
