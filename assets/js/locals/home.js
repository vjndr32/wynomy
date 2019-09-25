$(document).ready(function () {
  function dispMsg(msg,errBool=false){
    $('#message').html(msg);
    if(errBool){
      $('#message').removeClass('d-none text-success');
      $('#message').addClass('text-danger d-block');
    }
    else {
      $('#message').removeClass('d-none text-danger');
      $('#message').addClass('text-success d-block');
    }
  }
  $("#primaryTextButton").kendoButton();
  $("#addShowButton").kendoButton({
    click:function(ev){
      var showName1 =  $('#showNameInput').val();
      var showName = encodeURIComponent(showName1);
      let showStartTime = encodeURIComponent($('#showStartTime').val());
      let showDescription = encodeURIComponent($('#showDescription').val());
      if(!showName || !showStartTime || !showDescription || showStartTime == "hours:minutes AM/PM"){
        dispMsg('Some form data is missing. Please fill the complete form.',true);
      }
      else{
        let show = `?showName=${showName}&showDescription=${showDescription}&showStartTime=${showStartTime}`;
        fetch('/add.show'+show)
        .then(()=>{
          $('#showNameInput').val('');
          $('#showStartTime').val('10:00 AM');
          $('#showDescription').val('');
          dispMsg(`${showName1} succesfully added to your list`);
        }).catch(err=>{
          console.log(err);
          dispMsg(`Some error occured while adding ${show} to your list`,true);
        });
      }
    }
  });
  $('#showStartTime').kendoTimePicker({
    dateInput: true
  });

});
