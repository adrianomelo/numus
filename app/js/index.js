import 'style!css!../../node_modules/normalize.css/normalize.css';
import Rate from './components/Rate/Rate';
import SmallRate from './components/SmallRate/SmallRate';
import RateChart from './components/RateChart/RateChart';

import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';
import Rx from 'rx';

let realtime = new Rx.Subject();
let lastFive = new Rx.Subject();
let lastThirty = new Rx.Subject();
let windowSize = Rx.Observable.fromEvent(window, 'resize')
  .startWith(true)
  .map(x => { return {
    width: window.innerWidth,
    height: window.innerHeight
}});

var Ref = new Firebase('https://vivid-heat-4688.firebaseio.com/');
Ref.child("currency/BRL/rates").limitToLast(1).on("value", function(value) {
  //console.log('Loaded: ' + JSON.stringify(value.val()));
  let data = value.val();
  let key = Object.keys(data)[0];
  realtime.onNext({
    date: new Date(parseInt(key, 10) * 1000),
    value: data[key]
  });
});

Ref.child("currency/BRL/daily").limitToLast(5).on("value", function(value) {
  //console.log('Loaded: ' + JSON.stringify(value.val()));
  let data = value.val();
  var last = 0;
  for (let key in data) {
    if (last != 0) {
      lastFive.onNext({
        date: new Date(data[key]['date']),
        value: data[key]['value'],
        lastValue: last
      });
    }
    last = data[key]['value'];
  }
});

function toArray(data) {
  var result = [];
  for (let key in data) {
    result.push({
      date: new Date(data[key]['date']),
      value: data[key]['value'],
    });
  }
  return result;
}

Ref.child("currency/BRL/daily").limitToLast(120).on("value", function(value) {
  lastThirty.onNext({ values: toArray(value.val()) });
});

let now = realtime.combineLatest(lastFive.elementAt(3), function(c,l) {
  c['lastValue'] = l.value;
  return c;
});

var Bootstrap = (props) => {
  return <div className="container-fluid">
    <div className="row">
      <div className='col-lg-12'>
        <Rate currency={props.now} />
      </div>
    </div>
    <div className="row">
      <div className='col-lg-3 col-md-6'><SmallRate currency={props.lastFive.elementAt(3)} /></div>
      <div className='col-lg-3 col-md-6'><SmallRate currency={props.lastFive.elementAt(2)} /></div>
      <div className='col-lg-3 col-md-6'><SmallRate currency={props.lastFive.elementAt(1)} /></div>
      <div className='col-lg-3 col-md-6'><SmallRate currency={props.lastFive.elementAt(0)} /></div>
    </div>
    <div className="row">
      <div className='col-lg-12'>
        <RateChart lastThirty={props.lastThirty} windowSize={windowSize} />
      </div>
    </div>
  </div>
}

ReactDOM.render(<Bootstrap
  now={now}
  lastFive={lastFive}
  lastThirty={lastThirty}
  windowSize={windowSize} />, document.querySelector('#main'));
