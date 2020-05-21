import React from "react";
import "./App.css";
// import the Container Component from the semantic-ui-react
import { Container } from "semantic-ui-react";
// import the ToDoList component
import Website from "./Website";

function App() {
  return (
    <div>
      <Container>
        <Website />
      </Container>
    </div>
  );
}

export default App;