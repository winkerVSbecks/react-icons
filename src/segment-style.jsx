
var React = require('react/addons');
var R = require('ramda');
var clrs = require('colors.css');

var SegmentStyle = React.createClass({

  render: function() {

    var optionsObj = R.mapObjIndexed(function(colour, name) {
      return (
        <option value={ colour }>{ name }</option>
      );
    }, clrs);

    var options = React.addons.createFragment(optionsObj);

    return (
      <div className="mb2">

        <select className="inline-block col-6 field-light"
          name={ this.props.id + '.stroke' }
          value={ this.props.stroke }
          onChange={ this.props.onChange }>
          { options }
        </select>

        <label className="inline-block col-6 right-align"
          htmlFor={this.props.id  + '.dashed' }>

          <input type="checkbox"
            name={ this.props.id + '.dashed' }
            checked={ this.props.dashed }
            onChange={ this.props.onChange } />
          Dashed

        </label>

      </div>
    );
  }

});

module.exports = SegmentStyle;
