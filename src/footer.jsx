
var React = require('react');
var Avatar = require('jxnblk-avatar');

var Footer = React.createClass({

  render: function() {
    return (
      <footer className="center mt3 py3">
        <a href="http://jxnblk.com/react-icons" className="h5 bold black">
          <Avatar size={48} />
          <div>A Fork of Jxnblk's React Icons</div>
        </a>
      </footer>
    );
  }

});

module.exports = Footer;
