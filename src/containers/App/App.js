import React, { Component } from 'react';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import styled from 'styled-components'

const AppWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    const match = await(await window.fetch('http://localhost:3000/current')).json();

    console.log(match);

    this.setState((prevState) => ({
      match,
      loading: !prevState.loading
    }));
  }

  render() {
    return (
      <AppWrapper>
        {this.state.loading ? '' : <Scoreboard match={this.state.match}></Scoreboard>}
      </AppWrapper>
    );
  }
}

export default App;
