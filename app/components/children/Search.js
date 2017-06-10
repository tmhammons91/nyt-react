//Creating Search component, modeled after the Form file in the Address Geocoder Class Example
var React = require("react");

var Search = React.createClass({

    getInitialState: function () {
        return { searchTerm: "" };
    },

    handleChange: function (event) {
        this.setState({ searchTerm: event.target.value });
    },

    handleSubmit: function (event) {
        event.preventDefault();

        this.props.setTerm(this.state.searchTerm);
        this.setState({ searchTerm: "" })
    },

    render: function () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">NYTimes Search Query</h3>
                </div>
                <div className="panel-body text-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <h4 className="">
                                <strong>Search Term</strong>
                            </h4>

                            <input
                                value={this.state.searchTerm}
                                type="text"
                                className="form-control text-center"
                                id="term"
                                onChange={this.handleChange}
                                required
                            />
                            <br />
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = Search; 