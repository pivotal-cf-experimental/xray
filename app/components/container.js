var FastMixin = require('../mixins/fast_mixin');
var HoverLrpMixin = require('../mixins/hover_lrp_mixin');
var ActualLrpModal = require('./actual_lrp_modal');
var React = require('react/addons');
var {pickColor} = require('../helpers/application_helper');

var types = React.PropTypes;
var cx = React.addons.classSet;

var Container = React.createClass({
  mixins: [FastMixin, HoverLrpMixin],

  propTypes: {
    actualLrp: types.object.isRequired,
    desiredLrp: types.object,
    denominator: types.number.isRequired,
    isSelected: types.bool.isRequired
  },

  contextTypes: {
    colors: types.array.isRequired,
    scaling: types.string.isRequired,
    modal: types.object
  },

  ignoreFastProps: ['$selectedLrp'],

  click() {
    var {modal} = this.context;
    if (modal) modal.open(<ActualLrpModal actualLrp={this.props.actualLrp}/>);
  },

  render() {
    var {state, instance_guid: key, process_guid: processGuid} = this.props.actualLrp;
    var {denominator, desiredLrp, isSelected: selected} = this.props;
    var {scaling} = this.context;

    var flex;
    var undesired;
    var percentWidth = 1.0 / 50.0;
    var backgroundColor = pickColor(this.context.colors, processGuid);

    if (!desiredLrp) {
      undesired = true;
      backgroundColor = null;
    } else {
      if (scaling !== 'containers') {
        var numerator = desiredLrp[scaling];
        percentWidth = numerator/denominator;
        flex = numerator === 0;
      }
    }
    var style = {width: `${percentWidth*100}%`, backgroundColor: backgroundColor};
    var className = cx({container: true, claimed: state === 'CLAIMED', flex, undesired, selected});
    var props = {className, role: 'button', title: processGuid, style, key, 'data-instance-guid': key, onClick: this.click, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave};
    return (<a {...props}/>);
  }
});

module.exports = Container;