const React = require("react");


class ErrorPage extends React.Component {
    render() {
        return (

            <div className="error-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 error-message">
                            <div className=" error-message-container container">
                                <span>404 </span>
                                <p>Page Not Found.</p>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 error-body">
                            <script type="text/javascript">
                                var GOOG_FIXURL_LANG = 'en';
             var GOOG_FIXURL_SITE = 'https://babeljs.io/'
        </script>
                            <script type="text/javascript" src="https://linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js"></script>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


module.exports = ErrorPage;