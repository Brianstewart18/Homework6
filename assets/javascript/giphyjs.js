const limitVar = 10;
const apiKeyVar = "Y4VvZdXz1Xwg1GUxo5YVI9V14gMUOdNp";
var topics = ["Volleyball", "Basketball", "Baseball", "Footvolley", "Cricket", "Gymnastics", "Skateboarding", "Surfing", "Rock climbing", "Hiking", "Boxing", "Golf", "Sailing", "Football", "Soccer"];
//------------------------------------------------------------------------------
$(document).on("click", ".border", static2animate); //  pausing and un-pausing animation
function static2animate() {
    var currentFlag = $(this).attr("data-flag");
    console.log(currentFlag);
    if (currentFlag === "static") {
        $(this).attr("src", $(this).attr("url-animate"));
        $(this).attr("data-flag", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("url-static"));
        $(this).attr("data-flag", "static");
    }
}
//-----------------------------------------------------------------------
var apiCall = function () {
    var myKeyword = $(this).data("keyword");
    console.log("data: " + myKeyword);
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKeyVar + "&limit=" + limitVar + "&q=" + myKeyword;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.data.length);
        var count=response.data.length;
        //display received data(response).
        var giphyPlaceholder = $("#responseHolder-col");
        giphyPlaceholder.empty();
        var lblHeader = $("#headerHolder");
        if(count>0){
        lblHeader.html(myKeyword.toUpperCase()); // header for the result
        }
        else{
            lblHeader.html("No Result for "+myKeyword.toUpperCase());
        }
        for (var i = 0; i < count; i++) {
            var imageTag = $("<img>");
            var ratingTag = $("<h4>");
            ratingTag.html("<code>Rating:</code><span class='badge'>" + response.data[i].rating + "</span>");
            imageTag.attr("src", response.data[i].images["fixed_height_still"].url);
            imageTag.attr("url-animate", response.data[i].images["original"].url);
            imageTag.attr("url-static", response.data[i].images["fixed_height_still"].url);
            imageTag.attr("data-flag", "static")
            imageTag.addClass("border");
            giphyPlaceholder.append(imageTag);
            giphyPlaceholder.append(ratingTag);
            giphyPlaceholder.append("<hr>");
        }
    });
}
//-----------------------------------------------------------------
var initialButtonList = function () {
   // create a list of buttons for topics array
    var buttonsList = $("#buttonsHolder");
    buttonsList.empty();
    for (var i = 0; i < topics.length; i++) {
        buttonsList.append(createButton(topics[i]));
    }
}
// create a single button with input string for button label
var createButton = function (myKeyword) {
    var newButton = $("<button>");
    newButton.text(myKeyword);
    newButton.addClass("btn btn-default giphyTopics");
    newButton.attr("data-keyword", myKeyword);
    return newButton;
}
// -------------------------------------------------------------
$("#btnKeyword").on("click", function (event) {
    //  button listener
    event.preventDefault();
    var myKeyword = $("#txtKeyword").val().trim();
    console.log(myKeyword);
    if (myKeyword != "") {
        topics.push(myKeyword);
    }
    initialButtonList();
    $("#txtKeyword").val(""); 
    // clearing the text box content after submittingt.
    $("#txtKeyword").focus();
});
$(document).on("click", ".giphyTopics", apiCall); // when click on a sport button calling api function to request data.
//-------------------------------------------------------------------------------
initialButtonList(); // first time loading the page.
$("#txtKeyword").focus(); //first time loading input text box to get focus
