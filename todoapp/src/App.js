import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  API_URL = "http://localhost:5038/";

  componentDidMount() {
    this.refereshNotes();
  }

  async refereshNotes() {
    fetch(this.API_URL + "api/todoapp/GetNotes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
      });
  }

  async addClick() {
    var newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes", newNotes);

    fetch(this.API_URL + "api/todoapp/AddNotes", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refereshNotes();
      });
  }

  async deleteClick(id) {
    fetch(this.API_URL + "api/todoapp/DeleteNotes?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refereshNotes();
      });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <h2>To-Do App</h2>
        <input id="newNotes" />
        &nbsp;
        <button onClick={() => this.addClick()}>✔️</button>
        {notes.map((note) => (
          <p key={note.id}>
            <b id="text">
              {note.id}. {note.description}
            </b>
            &nbsp;
            <button onClick={() => this.deleteClick(note.id)}>❌</button>
          </p>
        ))}
      </div>
    );
  }
}

export default App;
