var WIDTH = 600;
var HEIGHT = 300;
var ALPHA = .3;
var EPSILON = 1;
const RRTDemo = React.createClass({
  getInitialState() {
    return {
      nodes: [[WIDTH/2, HEIGHT/2]],
      edges: []
    }
  },

  // Linear interpolate between two points in R
  linInt(a, b, alpha) {
    return a + alpha * (b-a);
  },

  expandRRT() {
    var x_rand = [Math.random() * WIDTH, Math.random() * HEIGHT];
    var x_near = this.state.nodes[0];
    var min_square_distance = Math.pow(x_near[0] - x_rand[0], 2) + Math.pow(x_near[1] - x_rand[1], 2);
    this.state.nodes.forEach(function(x) {
      var this_square_distance = Math.pow(x[0] - x_rand[0], 2) + Math.pow(x[1] - x_rand[1], 2);
      if (this_square_distance < min_square_distance) {
        x_near = x;
        min_square_distance = this_square_distance;
      }
    });
    var x_new = [this.linInt(x_near[0], x_rand[0], ALPHA), this.linInt(x_near[1], x_rand[1], ALPHA)];
    this.state.nodes.push(x_new);
    this.state.edges.push([x_near, x_new]);
    this.setState({
      nodes: this.state.nodes,
      edges: this.state.edges
    });
  },

  expandRRTANN() {
    var x_rand = [Math.random() * WIDTH, Math.random() * HEIGHT];
    var true_nn = this.state.nodes[0];
    var min_square_distance = Math.pow(true_nn[0] - x_rand[0], 2) + Math.pow(true_nn[1] - x_rand[1], 2);
    this.state.nodes.forEach(function(x) {
      var this_square_distance = Math.pow(x[0] - x_rand[0], 2) + Math.pow(x[1] - x_rand[1], 2);
      if (this_square_distance < min_square_distance) {
        true_nn = x;
        min_square_distance = this_square_distance;
      }
    });

    var possible_ann = [];
    this.state.nodes.forEach(function(x) {
      var this_square_distance = Math.pow(x[0] - x_rand[0], 2) + Math.pow(x[1] - x_rand[1], 2);
      if (this_square_distance < min_square_distance * (1 + EPSILON)) {
        possible_ann.push(x);
      }
    });

    var x_near = possible_ann[Math.floor(Math.random()*possible_ann.length)];
    var x_new = [this.linInt(x_near[0], x_rand[0], ALPHA), this.linInt(x_near[1], x_rand[1], ALPHA)];
    this.state.nodes.push(x_new);
    this.state.edges.push([x_near, x_new]);
    this.setState({
      nodes: this.state.nodes,
      edges: this.state.edges
    });
  },

  expandRandom() {
    var x_rand = [Math.random() * WIDTH, Math.random() * HEIGHT];
    var x_near = this.state.nodes[Math.floor(Math.random()*this.state.nodes.length)];
    var x_new = [this.linInt(x_near[0], x_rand[0], ALPHA), this.linInt(x_near[1], x_rand[1], ALPHA)];
    this.state.nodes.push(x_new);
    this.state.edges.push([x_near, x_new]);
    this.setState({
      nodes: this.state.nodes,
      edges: this.state.edges
    });
  },

  componentDidMount() {
    this.interval = setInterval(this[this.props.expansionAlgo], 500);
  },

  render() {
    var rendered_nodes = this.state.nodes.map(node => 
      <circle r="5" fill="black" cx={node[0]} cy={node[1]}
        key={"node " + node[0].toString() + " " + node[1].toString()} />
    );
    var rendered_edges = this.state.edges.map(edge => 
      <line stroke="black" x1={edge[0][0]} y1={edge[0][1]} x2={edge[1][0]} y2={edge[1][1]}
        key={"edge " + edge[0][0].toString() + " " + edge[0][1].toString() + " " + edge[1][0].toString() + " " + edge[1][1].toString()} />
    );
    return <svg className="rrt_svg" width={WIDTH} height={HEIGHT}>{rendered_nodes}{rendered_edges}</svg>;
  }
});

ReactDOM.render(<RRTDemo expansionAlgo="expandRRT"/>, document.getElementById("expandRRT"));
ReactDOM.render(<RRTDemo expansionAlgo="expandRRTANN"/>, document.getElementById("expandRRTANN"));
ReactDOM.render(<RRTDemo expansionAlgo="expandRandom"/>, document.getElementById("expandRandom"));