const React = require("react");

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="error-page">
        <div className="error-message">
          <div className=" error-message-container container">
            <span>404 </span>
            <p>Page Not Found.</p>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ErrorPage;
