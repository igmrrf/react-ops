import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import withStyles from "@material-ui/styles/withStyles";

const styles = ({ spacing: { unit } }) => ({
  root: { margin: unit, padding: unit * 3, maxWidth: 400 },
  form: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-evenly"
  }
});

class App extends Component {
  state = {
    exercises: [
      { id: 1, title: "Bench Press" },
      { id: 2, title: "Deadlift" },
      { id: 3, title: "Squats" }
    ],
    title: ""
  };
  handleDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }));
  };
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleCreate = e => {
    e.preventDefault();
    if (this.state.title) {
      this.setState(({ exercises, title }) => ({
        exercises: [...exercises, { title, id: Date.now() }],
        title: ""
      }));
    }
    console.log("Yamero");
  };

  render() {
    const { title, exercises } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Exercises
        </Typography>
        <form className={classes.form} onSubmit={this.handleCreate}>
          <TextField
            name="title"
            label="Exercises"
            onChange={this.handleChange}
            value={title}
            margin="normal"
          />
          <Button variant="contained" type="submit" color="primary">
            Create
          </Button>
        </form>
        <List>
          {exercises.map(({ id, title }) => (
            <ListItem key={id}>
              <ListItemText primary={title} />
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  onClick={() => this.handleDelete(id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}
export default withStyles(styles)(App);
