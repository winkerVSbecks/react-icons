
var React = require('react');
var clrs = require('colors.css');
var Tetrahedron = require('../src/tetrahedron.jsx');
var TweetButton = require('./tweet-button.jsx');

var Header = React.createClass({

  render: function() {
    var created = new Date(this.props.created).toDateString();
    var modified = new Date(this.props.modified).toDateString();

    var tetrahedronProps = {
      size: 240,
      rotation: 131,
      vertices: [{
        r: 88,
        a: 90
      }, {
        r: 105,
        a: 210
      }, {
        r: 95,
        a: 330
      }, {
        r: 34,
        a: 0
      }],
      segmentStyles: [{
        stroke: clrs.navy,
        dashed: false,
      }, {
        stroke: clrs.navy,
        dashed: false,
      }, {
        stroke: clrs.navy,
        dashed: false,
      }, {
        stroke: clrs.navy,
        dashed: true
      }, {
        stroke: clrs.navy,
        dashed: true
      }, {
        stroke: clrs.navy,
        dashed: true
      }],
      faceStyles: [{
        fill: clrs.black,
        opacity: 0.05,
      }, {
        fill: clrs.silver,
        opacity: 0.5,
      }, {
        fill: 'none',
        opacity: 0.25,
      }, {
        fill: 'none',
        opacity: 0.25
      }, {
        fill: 'none',
        opacity: 0.25
      }, {
        fill: 'none',
        opacity: 0.25
      }]
    };

    return (
      <header className="mb3 py3">
        <div className="mb2 center">
          <Tetrahedron { ...tetrahedronProps }/>
        </div>
        <h3 className="h5 mt0 mb1">
          <a href="http://triangle.life" className="black">triangle.life</a>
        </h3>
        <h1 className="m0">{ this.props.title }</h1>
        <h2 className="mt1">{ this.props.description }</h2>
        <div className="h6 mb3 gray">
          <b>{created}</b>
        </div>
        <div className="right-align mxn2">
          <a href="https://github.com/winkerVSbecks/react-tetrahedrons" className="btn mt1 mb1">GitHub</a>
          <div className="inline-block ml2 mr2 mt1 mb1">
            <TweetButton {...this.props} />
          </div>
        </div>
      </header>
    );
  }

});

module.exports = Header;
