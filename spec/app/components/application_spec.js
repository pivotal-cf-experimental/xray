require('../spec_helper');

describe('Application', function() {
  const RECEPTOR_URL = 'http://example.com';
  var Application, Cells, subject, request;
  beforeEach(function() {
    Cells = require('../../../app/components/cells');
    spyOn(Cells.type.prototype, 'render').and.callThrough();
    Application = require('../../../app/components/application');
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('when a receptor url is provided in configuration', function() {
    var cells, actualLrps;

    beforeEach(function() {
      var props = {config: {receptorUrl: RECEPTOR_URL}};
      var Promise = require('../../../lib/promise');
      cells = Factory.buildList('cell', 2);
      var CellsApi = require('../../../app/api/cells_api');
      var promise = new Promise(resolve => resolve({cells}));
      spyOn(CellsApi, 'fetch').and.returnValue(promise);
      subject = React.render(<Application {...props}/>, root);
      mockPromises.executeForPromise(promise);
    });

    it('renders cells', function() {
      expect(Cells.type.prototype.render).toHaveBeenCalled();
    });

    it('sets the cells', function() {
      expect(subject.state.cells).toEqual(cells);
    });
  });

  describe('when no receptor url is provided in configuration', function() {
    var Modal;
    beforeEach(function() {
      Modal = require('../../../app/components/modal');
      jasmineReact.spyOnClass(Modal, 'open').and.callThrough();
      var props = {config: {}};
      subject = React.render(<Application {...props}/>, root);
      request = jasmine.Ajax.requests.mostRecent();
    });

    it('launches a modal asking for the url', function() {
      var {type} = require('../../../app/components/receptor_url_modal');
      expect(Modal.type.prototype.open).toHaveBeenCalledWith(jasmine.objectContaining({type}));
    });

    describe('when the user submits a receptor url', function() {
      const NEW_RECEPTOR_URL = 'http://foo.com';
      beforeEach(function() {
        $('.receptor-url-modal :text').val(NEW_RECEPTOR_URL).simulate('change');
        $('form.receptor-url-modal').simulate('submit');
        request = jasmine.Ajax.requests.mostRecent();
      });

      it('makes an ajax request with the right url', function() {
        expect(jasmine.Ajax.requests.filter(`${NEW_RECEPTOR_URL}/v1/cells`)[0]).toBeDefined();
        expect(jasmine.Ajax.requests.filter(`${NEW_RECEPTOR_URL}/v1/actual_lrps`)[0]).toBeDefined();
      });
    });
  });
});