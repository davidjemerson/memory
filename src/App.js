import React, { Component } from "react";
import Doctors from "./components/Doctors";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./components/Grid/Container";
import Row from "./components/Grid/Row";
import Column from "./components/Grid/Column";
import "./App.css";
import doctors from "./doctors.json";

function shuffleDoctors(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    doctors,
    currentScore: 0,
    topScore: 0,
    message: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } 
    else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      message: ""
    });
    if (newScore > this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    if (newScore === 12) {
      this.setState({ message: "Time Lord Victorious" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    if (this.state.currentScore === 12) {
      this.setState({
        topScore: this.state.topScore,
        message: "Round 2, Keep Going!",
        clicked: []
      });
    }
    else {
      this.setState({
        currentScore: 0,
        topScore: this.state.topScore,
        message: "Regeneration!",
        clicked: []
      });
    } 
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledDoctors = shuffleDoctors(doctors);
    this.setState({ doctors: shuffledDoctors });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="Doctor Who Memory Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          message={this.state.message}
        />

        <Title>
          Click Each Doctor, but only once!
        </Title>

        <Container>
          <Row>
            {this.state.doctors.map(doctor => (
              <Column size="md-3 sm-6">
                <Doctors
                  key={doctor.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={doctor.id}
                  image={doctor.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
