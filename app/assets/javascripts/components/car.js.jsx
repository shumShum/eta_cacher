/** @jsx React.DOM **/
var Car = React.createClass({
  onChange : function(e) {
    var $el = $(e.currentTarget);
    var data = {
      index: this.props.index
    };
    if ($el.parent().hasClass("lat")) {
      data = $.extend(data, {lat: $el.val()});
    }
    if ($el.parent().hasClass("lng")) {
      data = $.extend(data, {lng: $el.val()});
    }
    this.publish();
  },

  onEdit : function() {
    var lat = this.refs.lat.getDOMNode().value.trim();
    var lng = this.refs.lng.getDOMNode().value.trim();
    var data = {
      id: this.props.id,
      position: {
        lat: lat,
        lng: lng
      }
    };
    console.log(data);
    var index = this._mountIndex;
    this.props.onEdit(data, index);
  },

  onSwitchState : function() {
    var state = this.refs.state.getDOMNode().value.trim();
    var car = {
      id: this.props.id,
      state: state
    };
    var index = this._mountIndex;
    this.props.onSwitchState(car, index);
  },

  render: function() {
    return (
      <tr className="car">
        <td className="lat">
          <input type="text" ref="lat" value={ this.props.position.lat } onChange={ this.onEdit }/>
        </td>
        <td className="lng">
          <input type="text" ref="lng" value={ this.props.position.lng } onChange={ this.onEdit }/>
        </td>
        <td className="state">
          <select defaultValue={this.props.state} ref="state" onChange={ this.onSwitchState }>
            <option value="free">free</option>
            <option value="busy">busy</option>
          </select>
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