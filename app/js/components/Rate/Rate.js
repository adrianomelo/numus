import 'style!css!./Rate.css';
import React from 'react';

let months = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outrubro", "novembro", "dezembro"
]

export default class Rate extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      lastValue: 0,
      date: new Date(1444442411000)
    }
  }
  componentWillMount() {
    this.props.currency.subscribe(this.setState.bind(this));
  }
  difference() {
    return this.state.value - this.state.lastValue;
  }
  percentage() {
    return 100 * this.difference() / this.state.lastValue;
  }
  date() {
    let date = this.state.date;
    return date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear();
  }
  render() {
    let rateClass = this.difference() > 0 ? 'Rate green' : 'Rate red';
    return <div className={rateClass}>
      <div className='title'>{this.date()}</div>
      <div className='value'>R$ {this.state.value.toFixed(4)}</div>
      <div className='difference'>{this.difference().toFixed(3)} ({this.percentage().toFixed(3)}%)</div>
    </div>;
  }
}
