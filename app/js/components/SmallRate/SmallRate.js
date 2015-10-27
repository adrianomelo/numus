import 'style!css!./SmallRate.css';
import React from 'react';

let months = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outrubro", "novembro", "dezembro"
]

export default class SmallRate extends React.Component {
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
    let barClass = this.difference() > 0 ? 'bar green' : 'bar red';
    return <div className='SmallRate'>
      <div className='data'>{this.date()}</div>
      <h1>R$ {this.state.value.toFixed(4)}</h1>
      <div className='difference'>{this.difference().toFixed(3)} ({this.percentage().toFixed(3)}%)</div>
      <div className={barClass}></div>
    </div>;
  }
}
