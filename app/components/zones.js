var React = require('react/addons');
var Cells = require('./cells');

var PUI = Object.assign({RadioGroup: require('../vendor/radio-group').RadioGroup, Radio: require('../vendor/radio').Radio});

var types = React.PropTypes;

var Zones = React.createClass({
  propTypes: {
    cells: types.array
  },

  childContextTypes: {
    scaling: types.string.isRequired
  },

  getChildContext: function() {
    return {scaling: this.state.scaling};
  },

  getInitialState() {
    return {scaling: 'containers'};
  },

  changeScale(scaling) {
    this.setState({scaling});
  },

  renderZones: function() {
    var {cells} = this.props;
    if (!cells) return null;

    var zones = cells.reduce(function(zones, cell){
      var zone = zones[cell.zone] || [];
      zone.push(cell);
      zones[cell.zone] = zone;
      return zones;
    }, {});

    return Object.keys(zones).sort().map(function(zone) {
      var cells = this[zone];
      return (
        <div className="zone" key={zone}>
          <header><h2>{`Zone ${zone} - ${cells.length} Cells`}</h2></header>
          <Cells {...{cells}}/>
        </div>
      );
    }, zones);
  },

  render() {
    var {scaling} = this.state;
    return (
      <div className="zones">
        <header>
          <PUI.RadioGroup name="scale_type" onChange={this.changeScale}>
            <div>Container Scaling:</div>
            <PUI.Radio value="containers" checked={scaling === 'containers'}>containers</PUI.Radio>
            <PUI.Radio value="memory_mb" checked={scaling === 'memory_mb'}>memory</PUI.Radio>
            <PUI.Radio value="disk_mb" checked={scaling === 'disk_mb'}>disk</PUI.Radio>
          </PUI.RadioGroup>
        </header>
        {this.renderZones()}
      </div>
    );
  }
});

module.exports = Zones;