import 'style!css!./Converter.css';
import React from 'react';


export default className Converter extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      lastValue: 0,
      date: new Date(1444442411000)
    }
  }
  componentWillMount() {
  }
  render() {
    let rateclassName = this.difference() > 0 ? 'Rate green' : 'Rate red';
    return <div className="Converter">
      <h1>Converter dólar para real</h1>
      <div className="form-group">
        <label className="sr-only" for="exampleInputAmount">Valor em dólar</label>
        <div className="input-group">
          <div className="input-group-addon">$</div>
          <input type="text" className="form-control" id="exampleInputAmount" placeholder="Valor em dólar">
          <div className="input-group-addon">.00</div>
        </div>
      </div>
    </div>;
  }
}
