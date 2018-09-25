import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

export class Pagination extends Component {
  render() {
    const { onHandlePageFlip, currentPage, LastPage, classes } = this.props;
    return (
      <Typography>
        <Button className={classes.button} onClick={() => onHandlePageFlip(1)}>
          First
        </Button>
        <Button
          className={classes.button}
          disabled={currentPage === 1}
          onClick={() => onHandlePageFlip(currentPage - 1)}
        >
          Prev
        </Button>
        <Button
          className={classes.button}
          disabled={currentPage === (LastPage > 100 ? 100 : LastPage)}
          onClick={() => onHandlePageFlip(currentPage + 1)}
        >
          Next
        </Button>
        <Button
          className={classes.button}
          onClick={() => onHandlePageFlip(100)}
        >
          Last
        </Button>
      </Typography>
    );
  }
}

export default withStyles(styles)(Pagination);
