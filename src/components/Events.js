import React from 'react';
import styled from 'styled-components'
import { Line } from 'rc-progress';
import format from 'date-fns/format';

const EventsWrapper = styled.div`
  flex: 2.6;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  color: #7c7a8b;
  font-weight: 400;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const StatWrapper = styled.div`
  width: 95%;
`;

const StatTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 4px 0 2px 0;
  font-weight: 400;
  font-size: 11px;
`;

const LinesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LineWrapper = styled.div`
  width: 100%;
  padding: 0 2px;
`;

const StatNumber = styled.p`
  padding: 0 2px;
  font-size: 12px;
  font-weight: 700;
`;

const FutureEventWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FutureEventItem = styled.div`
  padding: 5px 0;
`;

const STATS_TO_SHOW = [
  'ball_possession',
  'attempts_on_goal',
  'on_target',
  'corners',
  'num_passes',
  'distance_covered',
  'yellow_cards',
  'red_cards',
  'fouls_committed'
];

class Events extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.match);

    if (this.props.match.status === 'future') {
      return;
    }

    const stats = STATS_TO_SHOW.reduce((accum, key) => Object.assign({},
        accum,
        {
          [key]: {
            home: this.props.match.home_team_statistics[key],
            away: this.props.match.away_team_statistics[key],
            total: this.props.match.home_team_statistics[key] + this.props.match.away_team_statistics[key]
          }
        }
      ), {});

    this.setState((prevState) => ({
      stats
    }));
  }

  renderStat(stat, statTitle) {
    const STROKE_WIDTH = 7;
    const TRAIL_WIDTH = 7;
    const TRAIL_COLOR = '#d6d6d6';

    const homePerc = Math.floor(((stat.home * 100) / stat.total) || 0);
    const awayPerc = Math.floor(((stat.away * 100) / stat.total) || 0);

    return (<StatWrapper key={statTitle}>
      <StatTitle>
        <StatNumber>{stat.home}</StatNumber>
        <span>{statTitle.split('_').join(' ')}</span>
        <StatNumber>{stat.away}</StatNumber>
      </StatTitle>
      <LinesWrapper>
        <LineWrapper>
          <Line strokeLinecap="square" style={{
            transform: 'scaleX(-1)'
          }} trailWidth={TRAIL_WIDTH} trailColor={TRAIL_COLOR} percent={homePerc} strokeWidth={STROKE_WIDTH} strokeColor="#66b384" />
        </LineWrapper>
        <LineWrapper>
          <Line strokeLinecap="square" trailWidth={TRAIL_WIDTH} trailColor={TRAIL_COLOR} percent={awayPerc} strokeWidth={STROKE_WIDTH} strokeColor="#66b384" />
        </LineWrapper>
      </LinesWrapper>
    </StatWrapper>);
  }

  render() {
    return (
      <EventsWrapper>
        {
          this.state.stats ?
            Object.keys(this.state.stats).map(statTitle => (this.renderStat(this.state.stats[statTitle], statTitle))) :
            <FutureEventWrapper>
              <FutureEventItem>
                <h2>Not started yet</h2>
              </FutureEventItem>
              <FutureEventItem>
                Starting at {format(
                  new Date(this.props.match.datetime),
                  'HH:mm'
                )}
              </FutureEventItem>
              <FutureEventItem>
                {this.props.match.location} - {this.props.match.venue}
              </FutureEventItem>
            </FutureEventWrapper>
        }
      </EventsWrapper>
    )
  }
}

export default Events;
