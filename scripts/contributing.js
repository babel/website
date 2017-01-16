/* global jQuery*/

(function($){
    var githubIssuesEndpoint;

    switch(window.location.pathname){
        case "/docs/contributing/babel":
            githubIssuesEndpoint = 'https://api.github.com/repos/babel/babel/issues';
            break;
        case "/docs/contributing/babili":
            githubIssuesEndpoint = 'https://api.github.com/repos/babel/babili/issues';
            break;
        case "/docs/contributing/babylon":
            githubIssuesEndpoint = 'https://api.github.com/repos/babel/babylon/issues';
            break;
        case "/docs/contributing/babel-preset-env":
            githubIssuesEndpoint = 'https://api.github.com/repos/babel/babel-preset-env/issues';
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
                throw error;
            }
        }
    );

})(jQuery);