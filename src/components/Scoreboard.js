import React from 'react';
import styled from 'styled-components'

const ScoreBoardWrapper = styled.div`
  display: flex;
  flex: 1;
  background: linear-gradient(to right, #a5d183, #66b384);
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const TeamFlag = styled.img`
  width: 60px;
  border-radius: 5px;
`;

const TeamTitle = styled.h1`
  margin: 10px;
  font-weight: 400;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const ScoreWrapper = styled.div`
  flex: 1;
  margin-top: 20px;
  font-family: 'Bitter';
`;

const TimerWrapper = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-top: 8px;
`;

const ScoreNumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const ScoreNum = styled.h2`
  font-size: 40px;
  font-weight: 700;
`;

const renderTeam = team =>
  <TeamWrapper>
    <TeamFlag src={team.flag}/>
    <TeamTitle>
      {team.country}
    </TeamTitle>
  </TeamWrapper>

const renderScore = match => 
  <ScoreWrapper>
    <ScoreNumWrapper>
      <ScoreNum>{match.home_team.goals}</ScoreNum>
      <ScoreNum>-</ScoreNum>
      <ScoreNum>{match.away_team.goals}</ScoreNum>
    </ScoreNumWrapper>
    <TimerWrapper>
      <div>{match.time}</div>
    </TimerWrapper>
  </ScoreWrapper>

class ScoreBoard extends React.Component {
  render() {
    return <ScoreBoardWrapper>
      {renderTeam(this.props.match.home_team)}
      {renderScore(this.props.match)}
      {renderTeam(this.props.match.away_team)}
    </ScoreBoardWrapper>;
  }
}

export default ScoreBoard;
