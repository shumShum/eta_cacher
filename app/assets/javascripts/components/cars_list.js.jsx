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
  handleCarSubmit: function(car) {
    var cars = this.state.data;
    var fake_car = car;
    cars.push(car);
    this.setState({data: cars}, function() {
      $.ajax({
        url: Routes.api_cars_path(),
        dataType: 'json',
        type: 'POST',
        data: {car: car},
        success: function(data) {
          this.setState({data: data});
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
    setInterval(this.loadCarsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="carBox">
        <h3>Car list</h3>
        <CarList data={this.state.data} />
        <CarForm onCarSubmit={this.handleCarSubmit} />
      </div>
    );
  }
});

var CarList = React.createClass({
  render: function() {
    var carNodes = this.props.data.map(function(car, index) {
      return (
        <Car state={car.state} lat={car.position.lat} lng={car.position.lng} key={index}>
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