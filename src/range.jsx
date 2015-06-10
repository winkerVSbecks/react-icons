
var React = require('react');

var Range = React.createClass({

  render: function() {
    return (
      <div>
        <label
          htmlFor={this.props.id}
          className="h6 bold block">
          {this.props.label} ({this.props.value})
        </label>

        <input type="range"
          className="col-12 range-light mb2"
          id={ this.props.id }
          name={ this.props.id }
          min={ this.props.min || 0 }
          max={ this.props.max || 1 }
          step={ this.props.step || 0.001 }
          value={ this.props.value }
          onChange={ this.props.onChange }
          />
      </div>
    );
  }

});

module.exports = Range;
