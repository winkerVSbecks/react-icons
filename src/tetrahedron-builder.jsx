
var React = require('react');
var R = require('ramda');
var highlight = require('highlight.js');
var Tetrahedron = require('./tetrahedron.jsx');
var Range = require('./range.jsx');
var clrs = require('colors.css');
var SegmentStyle = require('./segment-style.jsx');
var FaceStyle = require('./face-style.jsx');
var beautify = require('js-beautify').html;

var TetrahedronBuilder = React.createClass({

  getInitialState: function() {
    return {
      size: 320,
      rotation: 0,
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
      showGuidelines: true
    };
  },

  handleChange: function(e) {
    var name = e.target.name;
    var state = this.state;

    state[name] = e.target.value;

    this.setState(state);
  },

  handleNestedChange: function(e) {
    var name = e.target.name;
    var keys = name.split('.');
    var state = this.state;

    if (keys[2] === 'dashed') {
      state[keys[0]][keys[1]][keys[2]] = !state[keys[0]][keys[1]][keys[2]];
    } else {
      state[keys[0]][keys[1]][keys[2]] = e.target.value;
    }
    this.setState(state);
  },

  toggleGuidelines: function() {
    var showGuidelines = !this.state.showGuidelines;
    this.setState({ showGuidelines: showGuidelines });
  },

  render: function() {

    var svg = React.renderToStaticMarkup(<Tetrahedron { ...this.state } />);
        svg = beautify(svg, { indent_size: 2 });
    var code = highlight.highlight('xml', svg).value;
    var size = this.state.size;
    var handleNestedChange = this.handleNestedChange;


    // Generate the radius sliders
    var radiusSliders = R.mapIndexed(function(v, i) {
      return (
        <Range id={ 'vertices.' + i + '.r' }
          label={ '#' + (i + 1) }
          max={ size / 2 }
          step={ 1 }
          value={ v.r }
          key={ i }
          onChange={ handleNestedChange } />
      );
    }, this.state.vertices);


    // Generate the theta sliders
    var thetaSliders = R.mapIndexed(function(v, i) {
      return (
        <Range id={ 'vertices.' + i + '.a' }
          label={ '#' + (i + 1) }
          max={ 360 }
          step={ 1 }
          value={ v.a }
          key={ i }
          onChange={ handleNestedChange } />
      );
    }, this.state.vertices);


    // Segment colour selectors
    var segmentStyleSelectors = R.mapIndexed(function(s, i) {
      return (
        <SegmentStyle id={ 'segmentStyles.' + i }
          key={ i }
          stroke={ s.stroke }
          dashed={ s.dashed }
          onChange={ handleNestedChange } />
      );
    }, this.state.segmentStyles);


    // Face colour selectors
    var faceStyleSelectors = R.mapIndexed(function(s, i) {
      return (
        <FaceStyle id={ 'faceStyles.' + i }
          key={ i }
          fill={ s.fill }
          opacity={ s.opacity }
          onChange={ handleNestedChange } />
      );
    }, this.state.faceStyles);


    return (
      <div>

        { /* The actual tetrahedron */ }
        <div className="center mb2">
          <Tetrahedron { ...this.state } />
        </div>

        { /* Controls */ }
        <div className="md-flex mb2 mxn2">

          { /* Styles */ }
          <div className="md-col-4 px2">
            <h4 className="py2 mb2 border-bottom">Global</h4>

            <Range id="rotation"
              label="Rotation"
              min={ 0 }
              max={ 360 }
              step={ 1 }
              value={ this.state.rotation }
              onChange={ this.handleChange } />

            <button
              onClick={ this.toggleGuidelines }
              className="btn col-12 btn-outline blue mt1 mb3">
              { this.state.showGuidelines ? 'Hide Guidelines' : 'Show Guidelines' }
            </button>
          </div>

          { /* Radius Sliders */ }
          <div className="md-col-4 px2">
            <h4 className="py2 mb2 border-bottom">Vertex Radii (r)</h4>
            { radiusSliders }
          </div>

          { /* Theta Sliders */ }
          <div className="md-col-4 px2">
            <h4 className="py2 mb2 border-bottom">Vertex Thetas (&theta;)</h4>
            { thetaSliders }
          </div>

        </div>

        { /* Style Controls */ }
        <div className="md-flex mb2 mxn2">

          { /* Segment Styles */ }
          <div className="md-col-6 px2">
            <h4 className="py2 mb2 border-bottom">Segment Styles</h4>
            { segmentStyleSelectors }
          </div>

          { /* Face Styles */ }
          <div className="md-col-6 px2">
            <h4 className="py2 mb2 border-bottom">Face Styles</h4>
            { faceStyleSelectors }
          </div>

        </div>

        <div>
          <h3 className="h5">SVG Code</h3>
          <pre dangerouslySetInnerHTML={{ __html: code }} />
        </div>
      </div>
    );
  }

});

module.exports = TetrahedronBuilder;

