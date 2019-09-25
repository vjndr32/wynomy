function deleteShow(name){
  fetch('/delete.show?show='+name)
  .then(()=>window.location.reload())
  .catch(err=>console.log(err));
}
function edit(id){
  let jId = '#'+id;
  $(jId+'  div.col-7').toggleClass('d-none');
  $(jId+'  .k-textbox').toggleClass('d-none');
  $(jId).siblings().children('div[name="main-actions"]').toggleClass('d-none');
  $(jId).siblings().children('div[name="supp-actions"]').toggleClass('d-none');
}
async function saveEdit(id){
  let jId = '#'+id;
  let showName = $(jId+'  input[name="name"]').val();
  let showDescription = $(jId+'  textarea[name="description"]').val();
  let showStartTime = $(jId+'  input[name="time"]').val();
  let res = await fetch('/edit.show', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id,showName,showDescription,showStartTime})
  });
  window.location.reload();
}
$(document).ready(()=>{
  $('input[name="time"]').kendoTimePicker({
    dateInput: true
  });
})
