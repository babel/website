/* global jQuery*/

(function($){
    var githubIssuesEndpoint = 'https://api.github.com/repos/babel/babel/issues';

    $.ajax(githubIssuesEndpoint, {
            data : {
                labels : 'beginner-friendly'
            },
            success : function(data){
                for(var i = 0; i < data.length; i++){
                    $('.beginnerFriendlyIssues').append('<li><a href="' + data[i].html_url + '"><span class="issueNumber">#' + data[i].number +'</span></a><span>' + data[i].title + '</span></li>');
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
                    $('.helpWantedIssues').append('<li><a href="' + data[i].html_url + '"><span class="issueNumber">#' + data[i].number +'</span></a><span>' + data[i].title + '</span></li>');
                }
            },
            error : function(xhr, status, error){
                throw error;
            }
        }
    );

})(jQuery);