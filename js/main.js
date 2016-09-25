/* Global vars */
var api_key = "RGAPI-D8DF6459-E751-4C65-A84D-970183617834";
var request_url;

$(function(){
  /* hide error msg */
  $(".errormsg").hide();
  /* EmailJS report bug */
  emailjs.init("user_eL77breGlka8Ihde56BXT");
  $("#bugreport").click(function(){

    emailjs.send("default_service","summoner_name", {}).then(function(){
        $("reportmsg").text("Reported. Thank you.");
    }, function(){
        $(".reportmsg").text("Unable to send. :( Please try again later.");
    });
  })


  $("#name").keyup(function(e){
    if(e.keyCode == 13){
      //pressed enter and not empty
      if($("#name").val() == ""){
        $("#name").addClass("error");
      } else {
        $("#name").removeClass("error");
        var summoner_name = $("#name").val();
        request_url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summoner_name +"?api_key="+api_key;
        // make get request
        $.get(request_url, function(data){
          var summoner = data[Object.keys(data)[0]];
          request_url = "https://na.api.pvp.net/championmastery/location/NA1/player/" + summoner.id + "/champions?api_key=" + api_key;
          $.get(request_url, function(data){
            console.log(data);
          }).fail(function(){
            $(".errormsg").show();
            console.log("woops");
          })

        }).fail(function(){
          $(".errormsg").show();
        })
      }
    }
  })
});
