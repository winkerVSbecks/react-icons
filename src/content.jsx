
var React = require('react');
var H2 = require('./h2.jsx');
var Highlight = require('./highlight.jsx');
var TetrahedronBuilder = require('./tetrahedron-builder.jsx');
var TweetButton = require('./tweet-button.jsx');

var Content = React.createClass({

  render: function() {
    return (
      <div className="prose">
        <p>Triangles are awesome and so are 3D shapes made out of triangles. Tetrahedron is an example of one such shape.</p>

        <blockquote className="italic"
          cite="http://mathworld.wolfram.com/Tetrahedron.html">
          <p>A tetrahedron is a <a href="https://en.wikipedia.org/wiki/Polyhedron">polyhedron</a> composed of four triangular faces, three of which meet at each corner or vertex. It has six edges and four vertices.</p>
          <footer>&mdash; <a href="https://en.wikipedia.org/wiki/Tetrahedron"> Tetrahedron (wikipedia)</a></footer>
        </blockquote>

        <p>This little tool is based on Brent Jackson's tutorial: <a href="http://jxnblk.com/react-icons/">Building SVG Icons with React</a>. It allows you to construct your own tetrahedron's and export them as SVG. The vertices are positioned using <a href="https://en.wikipedia.org/wiki/Polar_coordinate_system">polar coordinates</a>. You can modify their position, the colour of the segments/faces and even make the segments dashed.</p>
        <div className="py4">
          <TetrahedronBuilder />
        </div>
      </div>
    );
  }

});

module.exports = Content;
