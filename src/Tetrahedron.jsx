
var React = require('react');
var R = require('ramda');
var Line = require('./line.jsx');
var Face = require('./face.jsx');
var clrs = require('colors.css');


var Tetrahedron = React.createClass({

  getDefaultProps: function() {
    return {
      size: 64,
      rotation: 0,
      showGuidelines: false,
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
        fill: 'none',
        opacity: 0.25,
      }, {
        fill: 'none',
        opacity: 0.25,
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
      }],
      vertices: [{
        r: 64,
        a: 90
      }, {
        r: 64,
        a: 210
      }, {
        r: 64,
        a: 330
      }, {
        r: 0,
        a: 0
      }]
    }
  },

  render: function() {

    var size = this.props.size;
    var viewBox = [0, 0, size, size].join(' ');
    var rotation = this.props.rotation;
    var v = this.props.vertices;
    var c = size / 2;
    var guidelines;

    // The vertices are generated through
    // radial coordinates (r and θ)
    var pts = [
      [rx(v[0].r, v[0].a, c), ry(v[0].r, v[0].a, c)],
      [rx(v[1].r, v[1].a, c), ry(v[1].r, v[1].a, c)],
      [rx(v[2].r, v[2].a, c), ry(v[2].r, v[2].a, c)],
      [rx(v[3].r, v[3].a, c), ry(v[3].r, v[3].a, c)]
    ];

    // The line segments
    var segments = [{
      pts: [pts[0], pts[1]],
      styles: this.props.segmentStyles[0]
    },{
      pts: [pts[1], pts[2]],
      styles: this.props.segmentStyles[1]
    },{
      pts: [pts[2], pts[0]],
      styles: this.props.segmentStyles[2]
    },{
      pts: [pts[3], pts[0]],
      styles: this.props.segmentStyles[3]
    },{
      pts: [pts[3], pts[1]],
      styles: this.props.segmentStyles[4]
    },{
      pts: [pts[3], pts[2]],
      styles: this.props.segmentStyles[5]
    }];

    // Utility method to generate line segments
    var getSegments = R.mapIndexed(function(seg, idx) {
      return (
        <Line key={ idx }
          pts={ seg.pts }
          styles={ seg.styles } />
      );
    });

    // The triangle
    var visibleSegments = getSegments(R.slice(0, 3, segments));

    // Connectors from the triangle to
    // the depth vertex
    var hiddenSegments = getSegments(R.slice(3, 6, segments));

    // Generate the faces
    var faceDefs = [{
      pts: [pts[0], pts[1], pts[2]],
      styles: this.props.faceStyles[0]
    }, {
      pts: [pts[0], pts[1], pts[3]],
      styles: this.props.faceStyles[1]
    }, {
      pts: [pts[0], pts[2], pts[3]],
      styles: this.props.faceStyles[2]
    }, {
      pts: [pts[3], pts[1], pts[2]],
      styles: this.props.faceStyles[3]
    }];

    var faces = R.mapIndexed(function(def, idx) {
      return (
        <Face key={ idx }
          pts={ def.pts }
          styles={ def.styles } />
      );
    }, faceDefs);

    // Rotation for the entire object
    function getRotation() {
      return 'rotate(' + rotation +', ' + c + ', ' + c + ')';
    }

    if (this.props.showGuidelines) {
      this.guidelinesProps = {
        size: this.props.size,
        c1: pts[0],
        c2: pts[1],
        c3: pts[2]
      };

      guidelines = <Guidelines {...this.guidelinesProps} />;
    }

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
        viewBox={ viewBox }
        width={ size }
        height={ size }>
        { guidelines }
        <g className="tetrahedron"
          transform={ getRotation() }>
          { faces }
          { hiddenSegments }
          { visibleSegments }
        </g>
      </svg>
    );

  }

});


// Guidelines for the tetrahedron
var Guidelines = React.createClass({

  render: function() {
    var size = this.props.size * 0.95;
    var c = this.props.size / 2;
    var r = this.props.size / 2;
    var rads = [1 * r, 0.6875 * r, 0.375 * r];
    var styles = {
      fill: 'none',
      stroke: clrs.red,
      strokeWidth: 1,
      opacity: 0.25
    };

    var angles = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];

    var pts = R.map(function(angle) {
      return [rx(r, angle, c), ry(r, angle, c)];
    }, angles);

    var lines = R.mapIndexed(function(pt, idx) {
      return (
        <Line key={ idx }
          pts={ [ [c, c], pt] } />
      );
    }, pts);

    var circles = R.mapIndexed(function(rad, idx) {
      return (
        <circle cx={ c } cy={ c } r={ rad } key={ idx } />
      );
    }, rads);

    return (
      <g className="guidelines" style={ styles }>
        { circles }
        { lines }
      </g>
    );
  }
});


/**
 * Utilities
 */
function rad(a) {
  return Math.PI * a / 180;
};

function rx(r, a, c) {
  return c - r * Math.cos(rad(a));
};

function ry(r, a, c) {
  return c - r * Math.sin(rad(a));
};

module.exports = Tetrahedron;
