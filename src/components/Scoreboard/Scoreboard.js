import React from 'react';
import styled from 'styled-components'

const ScoreBoardWrapper = styled.div`
  display: flex;
  height: 100%;
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
  font-weight: 200;
  font-size: 13px;
`;

const renderTeam = team => 
  <TeamWrapper>
    <TeamFlag src={team.flag}/>
    <TeamTitle>
      {team.country}
    </TeamTitle>
  </TeamWrapper>

class ScoreBoard extends React.Component {
  render() {
    return <ScoreBoardWrapper>
      {renderTeam(this.props.match.home_team)}
      <div>Score</div>
      {renderTeam(this.props.match.away_team)}
    </ScoreBoardWrapper>;
  }
}

export default ScoreBoard;
