import { makeStyles, Theme, createStyles } from "@material-ui/core";

const SharedStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      backgroundColor: "#1C2636",
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);
export default SharedStyles;
