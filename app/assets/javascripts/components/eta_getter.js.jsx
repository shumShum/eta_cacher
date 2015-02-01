/** @jsx React.DOM **/

var EtaGetter = React.createClass({
  handleEtaGetter: function(client) {
    this.setState({data: []}, function() {
      $.ajax({
        url: Routes.api_eta_path(),
        dataType: 'json',
        data: client,
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

  render: function() {
    return (
      <div className="etaGetter">
        <h3>Get ETA</h3>
        <EtaForm onEtaGetter={this.handleEtaGetter} />
        <EtaShow eta={this.state.data} />
      </div>
    );
  }
});

React.render(
  <EtaGetter />,
  document.getElementById('etagetter')
);