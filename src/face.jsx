
var React = require('react');

var Face = React.createClass({

  render: function() {

    function getPath(pts) {
      return [
        'M', pts[0][0], pts[0][1],
        'L', pts[1][0], pts[1][1],
        'L', pts[2][0], pts[2][1],
        'Z'
      ].join(' ');
    };

    return (
      <path d={ getPath(this.props.pts) }
        fill={ this.props.styles.fill }
        fillOpacity={ this.props.styles.opacity }/>
    );
  }

});

module.exports = Face;
