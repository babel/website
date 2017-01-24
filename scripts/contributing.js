/* global jQuery*/

(function($){
    var githubIssuesEndpoint;
    var githubHTMLBeginnerFriendlyURL;
    var githubHTMLHelpWantedURL;

    switch(window.location.pathname){
        case "/docs/contributing/babel":
            githubIssuesEndpoint = 'https://api.github.com/repos/babel/babel/issues';
            githubHTMLBeginnerFriendlyURL = "https://github.com/babel/babel/labels/beginner-friendly";
            githubHTMLHelpWantedURL = "https://github.com/babel/babel/labels/help%20wanted";
            break;
        case "/docs/contributing/babili":
            githubIssuesEndpoint = 'https://api.github.com/repos/babel/babili/issues';
            githubHTMLBeginnerFriendlyURL = "https://github.com/babel/babili/labels/beginner-friendly";
            githubHTMLHelpWantedURL = "https://github.com/babel/babili/labels/help%20wanted";
            break;
        case "/docs/contributing/babylon":
            githubIssuesEndpoint = 'https://api.github.com/repos/babel/babylon/issues';
            githubHTMLBeginnerFriendlyURL = "https://github.com/babel/babylon/labels/beginner-friendly";
            githubHTMLHelpWantedURL = "https://github.com/babel/babylon/labels/help%20wanted";
            break;
        case "/docs/contributing/babel-preset-env":
            githubIssuesEndpoint = 'https://api.github.com/repos/babel/babel-preset-env/issues';
            githubHTMLBeginnerFriendlyURL = "https://github.com/babel/babel-preset-env/labels/beginner-friendly";
            githubHTMLHelpWantedURL = "https://github.com/babel/babel-preset-env/labels/help%20wanted";
            break;
        default:
            throw "no github endpoint available for " + window.location.pathname;
            break;
    }

    $.ajax(githubIssuesEndpoint, {
            data : {
                labels : 'beginner-friendly'
            },
            success : function(data){
                for(var i = 0; i < data.length; i++){
                    $('.beginnerFriendlyIssues').append('<li><a href="' + data[i].html_url + '"><span class="issueNumber">#' + data[i].number +'</span><span>' + data[i].title + '</span></a></li>');
                }
            },
            error : function(xhr, status, error){
                $('.beginnerFriendlyIssues').append('<li><a href="' + githubHTMLBeginnerFriendlyURL + '"><span>Failed to load issues. View Beginner-Friendly issues on Github.</span></a></li>');
                throw error;
            }
        }
    );

    $.ajax(githubIssuesEndpoint, {
            data : {
                labels : 'help wanted'
            },
            success : function(data){
                for(var i = 0; i < data.length; i++){
                    $('.helpWantedIssues').append('<li><a href="' + data[i].html_url + '"><span class="issueNumber">#' + data[i].number +'</span><span>' + data[i].title + '</span></a></li>');
                }
            },
            error : function(xhr, status, error){
                $('.helpWantedIssues').append('<li><a href="' + githubHTMLHelpWantedURL + '"><span>Failed to load issues. View Help-Wanted issues on Github.</span></a></li>');
                throw error;
            }
        }
    );

})(jQuery);