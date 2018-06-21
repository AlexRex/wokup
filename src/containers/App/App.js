import React, { Component } from 'react';
import Scoreboard from '../../components/Scoreboard';
import Events from '../../components/Events';
import styled, { keyframes } from 'styled-components';
import icons from '../../styles/icons';
import config from '../../config.json';

import ua from 'universal-analytics';

const AppWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
`;

const MatchWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderImg = styled.img`
  width: 80px;
  opacity: 0.8;
  animation: ${rotate360} 4s linear infinite;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  background: #f7f7f7;
`;


const getConfig = (env) => {
  if (env === 'development') {
    return Object.assign({}, config.default, config.development);
  } else {
    return config.default;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };

    const visitor = ua('UA-80488337-3');
    visitor.pageview('/').send();
  }

  clearInterval() {
    if (this.matchInterval) {
      clearInterval(this.matchInterval);
    }
  }

  async reloadMatch() {
    console.log('Reloading match');

    await this.setState((prevState) => ({
      loading: true
    }));

    const match = await (await window.fetch(getConfig(process.env.NODE_ENV).apiUrl)).json();

    await this.setState((prevState) => ({
      match,
      loading: false
    }));

    if (!this.matchInterval) {
      this.matchInterval = setInterval(() => {
        this.reloadMatch();
      }, 60000);
    }
  }

  async componentDidMount() {
    this.reloadMatch();
  }

  render() {
    return (
      <AppWrapper>
        {this.state.loading ?
          <LoaderWrapper>
            <LoaderImg src={icons.ballBase64}/>
          </LoaderWrapper>
          : 
          (
            <MatchWrapper>
              <Scoreboard match={this.state.match}></Scoreboard>
              <Events match={this.state.match}></Events>
            </MatchWrapper>
          )
        }
      </AppWrapper>
    );
  }
}

export default App;
