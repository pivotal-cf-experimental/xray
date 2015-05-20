require('../spec_helper');

describe('Portals', function() {
  var PortalSource, PortalDestination, Potato;
  beforeEach(function() {
    PortalSource = require('../../../app/components/portals').PortalSource;
    PortalDestination = require('../../../app/components/portals').PortalDestination;
    Potato = React.createClass({
      getInitialState() { return {}; },
      render() {
        var {cake} = this.state;
        return (<div className="potato">{cake ? 'cake is a lie' : 'Potato'}</div>);
      }
    });
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('when the portals are rendered source first then destination', function() {
    var potato;
    beforeEach(function() {
      var Context = React.createClass({
        render() {
          return (
            <div>
              <div className="blue">
                <PortalSource name="chell">
                  <Potato ref="potato"/>
                </PortalSource>
              </div>
              <div className="orange">
                <PortalDestination name="chell"/>
              </div>
            </div>
          );
        }
      });
      var context = React.render(<Context/>, root);
      potato = context.refs.potato;
    });

    it('does not render the source portal content', function() {
      expect('.blue').not.toHaveText('Potato');
    });

    it('renders the source portal into the destination portal', function() {
      expect('.orange').toHaveText('Potato');
    });

    describe('when the blue contents change', function() {
      beforeEach(function() {
        potato.setState({cake: true});
      });

      it('updates in the destination portal', function() {
        expect('.orange').not.toHaveText('Potato');
        expect('.orange').toHaveText('cake is a lie');
      });
    });
  });

  describe('when the portals are rendered destination first then source', function() {
    beforeEach(function() {
      React.render(
        <div>
          <div className="orange">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue">
            <PortalSource name="chell">
              <Potato/>
            </PortalSource>
          </div>
        </div>,
        root);
    });

    it('does not render the source portal content', function() {
      expect('.blue').not.toHaveText('Potato');
    });

    it('renders the source portal into the destination portal', function() {
      expect('.orange').toHaveText('Potato');
    });
  });

  describe('with multiple portal pairs', function() {
    beforeEach(function() {
      React.render(
        <div>
          <div className="orange-chell">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue-chell">
            <PortalSource name="chell">
              <Potato/>
            </PortalSource>
          </div>
          <div className="orange-wheatley">
            <PortalDestination name="wheatley"/>
          </div>
          <div className="blue-wheatley">
            <PortalSource name="wheatley">
              <div>Okay don't panic! Alright? Stop panicking! I can still stop this. Ahh. Oh there's a password. It's fine. I'll just hack it. Not a problem... umm...</div>
            </PortalSource>
          </div>
        </div>,
        root);
    });


    it('renders the source portal contents in the correct destination portals', function() {
      expect('.orange-chell').toHaveText('Potato');
      expect('.orange-wheatley').toContainText('Stop panicking!');
    });
  });
});