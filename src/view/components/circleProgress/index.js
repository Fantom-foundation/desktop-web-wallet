import React from 'react';
import { VictoryPie, VictoryLabel, VictoryAnimation } from 'victory';

const colors = ['#e1e3e7', '1965e9', '#7ed321', '#ff5600'];

export default class CircleProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      data: this.getData(0),
    };
  }

  componentDidMount() {
    let percent = 25;
    this.setStateInterval = window.setInterval(() => {
      percent += Math.random() * 25;
      percent = percent > 100 ? 0 : percent;
      this.setState({
        percent,
        data: this.getData(percent),
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  getColor(datum) {
    if (datum.y === 0) return colors[0];
    else if (datum.y <= 25) return colors[1];
    else if (datum.y <= 50) return colors[2];
    else if (datum.y > 50) return colors[3];
  }

  getPercentage({ percent }) {
    if (percent === 0) return '0%';
    else if (percent <= 25) return `${Math.round(percent * 10)}%`;
    else if (percent <= 50) return `${Math.round((50 - percent) * 4 + 150)}%`;
    else if (percent > 50) return `${Math.round(100 - percent + 100)}%`;
  }

  render() {
    const { data } = this.state;
    return (
      <div className="mx-auto" style={{ maxWidth: 139 }}>
        <svg viewBox="0 0 300 300" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={300}
            height={300}
            data={data}
            innerRadius={135}
            labels={() => null}
            style={{
              data: {
                fill: () => {
                  return '#e1e3e7';
                },
              },
            }}
          />
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={300}
            height={300}
            data={data}
            innerRadius={135}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({ datum }) => {
                  const color = this.getColor(datum);
                  return datum.x === 1 ? color : 'transparent';
                },
              },
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {newProps => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={150}
                  y={150}
                  text={this.getPercentage(newProps)}
                  style={{ fontSize: 45 }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
    );
  }
}
