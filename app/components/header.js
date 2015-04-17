var React = require('react/addons');
var Canvas = require('./canvas');

var Header = React.createClass({
  render() {
    var {className} = this.props;
    return (
      <header className={className}>
        <h1 className="logo">
        <svg className="logo-mark" x="0px" y="0px" height="40px" viewBox="0 0 57.2 65" enable-background="new 0 0 57.2 65">
        <defs>
        </defs>
        <path fill="#FFFFFF" d="M55.2,14.8L30.5,0.5c-0.6-0.4-1.3-0.5-2-0.5c-0.7,0-1.4,0.2-2,0.5L2,14.8c-1.2,0.7-2,2-2,3.4v28.6
        c0,1.4,0.7,2.7,2,3.4l24.7,14.3c0.6,0.4,1.3,0.5,2,0.5c0.7,0,1.4-0.2,2-0.5l24.7-14.3c1.2-0.7,2-2,2-3.4V18.2
        C57.2,16.8,56.4,15.5,55.2,14.8z M40.3,14.9c0.4-0.4,1-0.1,1,0.4v7.2c0,0.6-0.2,1.1-0.6,1.6l-6.8,7.4l-3.8-5.4L40.3,14.9z
        M41.3,49.7c0,0.5-0.6,0.8-1,0.4L28.6,37.3v0L16.8,50.1c-0.4,0.4-1,0.1-1-0.4v-7.2c0-0.6,0.2-1.1,0.6-1.6l7.7-8.4l-7.7-8.4
        c-0.4-0.4-0.6-1-0.6-1.6v-7.2c0-0.5,0.6-0.8,1-0.4l11.5,12.5l0.1,0.1l0.1,0.1l4.4,4.8h0l7.7,8.4c0.4,0.4,0.6,1,0.6,1.6V49.7z"/>
        </svg>
          <span className="logo-type">X-Ray</span>
        </h1>
        <label className="receptor-change mvn" for="receptor">
          <p className="label-1 type-neutral-6 type-xs em-alt em-default mvn">Receptor URL</p>
          <p className="label-2 type-accent-3 type-xs em-alt em-default mvn">
            <i className="fa fa-pencil mrm"></i>
            Edit Receptor URL
          </p>
          <p className="type-neutral-11 mvn">
            <input type='text' placeholder='http://example.receptor.com' className="unstyled" name="receptor" id="receptor"></input>
          </p>
        </label>
      </header>
    );
  }
});

module.exports = Header;
