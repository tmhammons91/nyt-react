var React = require("react");

var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

var helpers = require("./utils/helpers");

var Main = React.createClass({
    getInitialState: function () {
        return { searchTerm: "", results: "", saved: [] };
    },

    componentDidMount: function () {
        helpers.getSaved().then(function (response) {
            console.log(response);
            if (response !== this.state.saved) {
                console.log("Saved", response.data);
                this.setState({ saved: response.data });
            }
        }.bind(this));
    },

    componentDidUpdate: function () {
        helpers.runQuery(this.state.searchTerm).then(function (data) {
            if (data !== this.state.results) {
                this.setState({ results: data });

                helpers.postSaved(this.state.searchTerm).then(function () {
                    helpers.getSaved().then(function (response) {
                        this.setState({ saved: response.data })
                    }.bind(this));
                }.bind(this));
            }
        }.bind(this));
    },
    setTerm: function (term) {
        this.setState({ searchTerm: term });
    },
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h2 className="text-center">NYTimes Article Search</h2>
                        <p className="text-center">
                            <em>Enter a search term to find articles.</em>
                        </p>
                    </div>

                    <div className="col-md-6">

                        <Search setTerm={this.setTerm} />

                    </div>

                    <div className="col-md-6">

                        <Results title={this.state.title} />

                    </div>

                </div>

                <div className="row">

                    <Saved history={this.state.saved} />

                </div>

            </div>
        );
    }
}); 

module.exports = Main; 
