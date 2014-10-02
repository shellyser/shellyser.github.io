$(function() {
  $(".blog h3").click(function(){
    console.log("I was clicked!");
    $(this).parent().children(".post").toggle(500);
  });
});