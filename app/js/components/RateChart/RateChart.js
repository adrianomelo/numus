import 'style!css!./RateChart.css';
import React from 'react';
import { LineChart } from 'react-d3';

export default class RateChart extends React.Component {
  constructor() {
    super();
    this.state = {
      values: [{x: 1,y :1}, {x:1, y:1}],
      width: 0,
      height: 0
    }
  }
  componentWillMount() {
    this.props.lastThirty.subscribe(this.setState.bind(this));
    let chartSize = this.props.windowSize
      .map((size) => {
          if (size.width >= 1200)
            return { width: 1100, height: 400 };
          else if (size.width >= 992) /* 940px */
            return { width: 900, height: 400 };
          else if (size.width >= 768)
            return { width: 670, height: 400 };
          else
            return { width: Math.min(size.width * 0.9, 600), height: 400 };
      }) /* 1200px -> 1170px, 992px -> 970px, 768px -> 750px*/
    chartSize.subscribe(this.setState.bind(this));
  }
  render() {
    let values = this.state.values.map(function(z) {
      return { x: z.date, y: z.value }
    });
    let lineData = [ { values: values, strokeWidth: 1 } ];
    let viewBox = { x: 0, y: 0, width: this.state.width, height: this.state.height };
    let root = document.querySelector('.RateChart .rd3-basic-chart');

    if (root)
      root.style.width = this.state.width + 'px';

    return <div className='RateChart'>
      <h1>Histórico das últimas 120 cotações</h1>
      <LineChart className='LineChart'
        data={lineData}
        height={this.state.height}
        width={this.state.width}
        xAxisTickInterval={{unit: 'day', interval: 40}}
        viewBoxObject={viewBox}
        /*yAxisLabel="Valor do real comparado ao dólar"*/
        /*xAxisLabel="Data do fechamento"*/
        gridHorizontal={true}
      />
    </div>;
  }
}
