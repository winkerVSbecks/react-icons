
var React = require('react');

var TweetButton = React.createClass({

  render: function() {
    var href = [
      'https://twitter.com/intent/tweet?text=',
      this.props.title,
      ': A Tetrahedron Generator Built With ReactJS',
      '&url=http://triangle.life/tetrahedrons',
      '&via=winkerVSbecks'
    ].join('');

    href = encodeURI(href);

    return (
      <a href={href} className="btn btn-primary">
        Tweet
      </a>
    );
  }

});

module.exports = TweetButton;
