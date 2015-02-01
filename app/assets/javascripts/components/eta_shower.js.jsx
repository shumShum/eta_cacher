/** @jsx React.DOM **/

var EtaShow = React.createClass({
  render: function() {
    return (
      <div className="show">
        <h4>ETA: {this.props.eta} min</h4>
      </div>
    );
  }
});

var EtaForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var lat = this.refs.lat.getDOMNode().value.trim();
    var lng = this.refs.lng.getDOMNode().value.trim();
    var client = {
      lat: lat,
      lng: lng
    }
    if (!lat || !lng) {
      return;
    }
    this.props.onEtaGetter({client: client});
    this.refs.lat.getDOMNode().value = '';
    this.refs.lng.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="etaForm form-inline" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="lat" ref="lat" className="form-control input-sm" />
        <input type="text" placeholder="lng" ref="lng" className="form-control input-sm" />
        <input type="submit" value="Get ETA" className="btn btn-default" />
      </form>
    );
  }
});