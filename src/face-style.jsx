
var R = require('ramda');
var React = require('react/addons');
var clrs = require('colors.css');
var Range = require('./range.jsx');

var SegmentStyle = React.createClass({

  render: function() {

    var optionsObj = R.mapObjIndexed(function(colour, name) {
      return (
        <option value={ colour }>{ name }</option>
      );
    }, clrs);

    optionsObj.none = (<option value="none">none</option>);

    var options = React.addons.createFragment(optionsObj);

    return (
      <div className="mb2">

        <select className="inline-block col-5 field-light"
          name={ this.props.id + '.fill' }
          value={ this.props.fill }
          onChange={ this.props.onChange }>
          { options }
        </select>

        <div className="inline-block col-6 px1">
          <Range id={ this.props.id + '.opacity' }
            label="Opacity"
            min={ 0 }
            max={ 1 }
            step={ 0.01 }
            value={ this.props.opacity }
            onChange={ this.props.onChange } />
        </div>

      </div>
    );
  }

});

module.exports = SegmentStyle;
