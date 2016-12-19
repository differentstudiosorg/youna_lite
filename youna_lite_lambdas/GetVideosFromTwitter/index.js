var Twitter = require('twitter');
var async = require('async');

var client = new Twitter({
  consumer_key: 'MCnZA1HxSj7PvBbKZf5pYEJyM',
  consumer_secret: 'hmKiImw5tR4y9kJqCGYOB7prRgykgR54lrBrzVcT6lbHLz3nJU',
  access_token_key: '751598845037916160-SaG3MKIfma7RayYivMZjr0RWqKSN1gL',
  access_token_secret: 'bniA1zD1QtPq1jEfP0pN7JmFzLqOivlShTU0Dp4Z3QYNk'
});


exports.handler = function(event, context, callback) {

    var username = event.query.username;
    if (username === undefined || username === "") return callback(new Error("Couldn't find user"));

    async.waterfall([
        async.apply(getLatestYounaTweet, username),
        getAllResponses,
        getVideoResponsesToYounaTweet
    ], function(err, done){
        if (err) {
            return callback(err);
        } else {
            return callback(null, done);
        }
    });

}

function getLatestYounaTweet(username, callback) {
    var query = 'from:' + username + ", #youna_" + username;

    var params = { q : query, result_type: 'recent', include_entities : true}

    client.get('/search/tweets', params, function(error, tweets, response) {
        if (!error) {
            var tweets = tweets.statuses;
            if (tweets.length != 0) {
                var tweet = tweets[0];
                return callback(null, username, tweet);
            } else {
                var error = new Error("No Tweets found");
                return callback(error);
            }
        } else {
            return callback(error)
        }
    });
}

function getAllResponses(username, tweet, callback) {
    var query = "to:" + username;
    var params = { q : query, result_type : 'recent', count: 100, include_entities : true};
    var num_results = 100;
    var tweets_array = [];
    var tweet_ids = [];
    async.whilst(
        function () { return num_results == 100; }, 
        function (callback2) {
            client.get('/search/tweets', params, function(error, tweets, response) {
                if (!error) {
                    num_results = tweets.statuses.length;
                    tweets.statuses.forEach(function(item) {
                        tweet_ids.push(item.id);
                        tweets_array.push(item);
                    });
                    tweet_ids.sort();
                    params.max_id = tweet_ids[0];
                    return callback2(null, "completed");
                } else {
                    return callback2(error);
                }
            });
        },
        function (err, done) {
            if (!err) {
                return callback(null, username, tweet, tweets_array);
            } else {
                return callback(err);
            }
        }
    );

}

function getVideoResponsesToYounaTweet(username, tweet, tweets, callback) {
    var filtered_tweets = [];
    var filtered_tweets_with_mp4 = [];
    var urls = [];
    var tweet_id = tweet.id; 

    tweets.forEach(function(item) {
        if (item.in_reply_to_status_id === tweet_id) {
          if (item.extended_entities){
            if (item.extended_entities.media) {
                if (item.extended_entities.media[0].video_info) {
                    filtered_tweets.push(item);
                }
            }
          }
        }
    });

    for( var i = 0; i < filtered_tweets.length; i++) {
        var variants = filtered_tweets[i].extended_entities.media[0].video_info.variants;
        for (var j = 0; j < variants.length; j++) {
            if (variants[j].content_type === "video/mp4") {
                filtered_tweets[i].url = variants[j].url;
                filtered_tweets[i].url
                filtered_tweets[i].thumbnail_url = filtered_tweets[i].extended_entities.media[0].media_url;
                filtered_tweets_with_mp4.push(filtered_tweets[i]);
                break;
            }
        }
    }

    var response = {
        tweet : tweet,
        questions : filtered_tweets_with_mp4
    }

    callback(null, response)
}
