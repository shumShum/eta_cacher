/** @jsx React.DOM **/

var Car = React.createClass({
  render: function() {
    return (
      <tr className="car">
        <td>
          {this.props.lat}
        </td>
        <td>
          {this.props.lng}
        </td>
        <td>
          {this.props.state}
        </td>
      </tr>
    );
  }
});

var CarForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var lat = this.refs.lat.getDOMNode().value.trim();
    var lng = this.refs.lng.getDOMNode().value.trim();
    var position = {
      lat: lat,
      lng: lng
    }
    if (!lat || !lng) {
      return;
    }
    this.props.onCarSubmit({position: position});
    this.refs.lat.getDOMNode().value = '';
    this.refs.lng.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="carForm form-inline" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="lat" ref="lat" className="form-control input-sm" />
        <input type="text" placeholder="lng" ref="lng" className="form-control input-sm" />
        <input type="submit" value="Create" className="btn btn-default" />
      </form>
    );
  }
});