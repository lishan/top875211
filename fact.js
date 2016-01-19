var mongoose = require('mongoose');

var Fact = mongoose.model('Fact',{
     id : String,
     game_id : String,
     away_score : String,
     home_score : String,
     status : String,
     timer_running : String,
     direction : String,
     direction_of_play_x : String,
     direction_of_play_y : String,
     event_id : String,
     event_type_id : String,
     event_type_name : String,
     last_modified : String,
     outcome : String,
     period : String,
     period_id : String,
     period_minute : String,
     period_second : String,
     player_id : String,
     team_id : String,
     timestamp : String,
     timestamp_milliseconds : String,
     x : String,
     y : String,
     qualifier_1 : String,
     qualifier_2 : String,
     qualifier_3 : String,
     qualifier_4 : String,
     qualifier_5 : String
});

module.exports = Fact;