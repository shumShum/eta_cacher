/** @jsx React.DOM **/

var CarBox = React.createClass({
  loadCarsFromServer: function() {
    $.ajax({
      url: Routes.api_cars_path(),
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleNewCarSubmit: function(car) {
    var cars = this.state.data;
    cars.push($.extend(car, {state: 'free'}));
    this.setState({data: cars}, function() {
      $.ajax({
        url: Routes.api_cars_path(),
        dataType: 'json',
        type: 'POST',
        data: {car: car},
        success: function(data) {
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },

  onEditCar : function(car, index) {
    var cars = this.state.data;
    cars[index] = ($.extend(car, {state: 'free'}));

    this.setState({data: cars}, function() {
      $.ajax({
        url: Routes.api_car_path(car.id),
        dataType: 'json',
        type: 'PUT',
        data: {car: car},
        success: function(data) {
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },

  onSwitchState : function(car, index) {
    var cars = this.state.data;
    this.setState({data: cars}, function() {
      $.ajax({
        url: Routes.switch_state_api_car_path(car.id),
        dataType: 'json',
        type: 'PUT',
        data: {state: car.state},
        success: function(data) {
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },

  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCarsFromServer();
  },

  render: function() {
    return (
      <div className="carBox">
        <h3>Car list</h3>
        <CarList data={this.state.data} onEditCar={this.onEditCar} onSwitchState={this.onSwitchState}/>
        <CarForm onCarSubmit={this.handleNewCarSubmit} />
      </div>
    );
  }
});

var CarList = React.createClass({
  render: function() {
    var onEditCar = this.props.onEditCar;
    var onSwitchState = this.props.onSwitchState;
    var carNodes = this.props.data.map(function(car, index) {
      return (
        <Car id={car.id} state={car.state} position={car.position} key={index} onEdit={onEditCar} onSwitchState={onSwitchState}>
          {car.index}
        </Car>
      );
    });
    return (
      <div className="carList">
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='col-md-1'>lat</th>
              <th className='col-md-1'>lng</th>
              <th className='col-md-1'>state</th>
            </tr>
          </thead>
          <tbody>
            {carNodes}
          </tbody>
        </table>
      </div>
    );
  }
});

React.render(
  <CarBox pollInterval={4000} />,
  document.getElementById('carlist')
);