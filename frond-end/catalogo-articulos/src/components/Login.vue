<template>
<div>
  <!--<div v-show="modal" class="modal.open" >-->
<!-- Button trigger modal -->
<button id="modal" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
  Login
</button>

 
<div class="modal fade"  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
     <button  type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
     </div>
    </div>
  </div>
</div>



</div>
</template>
<script>

export default {
 name: 'Login',

 mounted(){

   this. showModal() 

    
 },
  props:{
      modal: {
       type:Boolean,
       default:false
      } ,
  },
 
   methods: {
     
     
   /* showModal() {
      var button=document.getElementById('modal')
       button.click()
   },*/
   
  
 }
}
</script>

<style>
/*.modal {
     align-items: flex-start;
    background-color: rgba(0,0,0,.75);
    display: flex;
    height: 100vh;
    justify-content: center;
    opacity: 0;
   
  transition: visibility 250ms, opacity 250ms;
    width: 100%;
    z-index: -1;
  }
  .modal.open {
    position: fixed;
    opacity: 1;
    visibility: visible;
    z-index: -2;
  }
  .modal.open .modal-content {
    transform: translateY(100px);
  }*/
  .modal-content {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,.25);
    display: inline-block;
    min-width: 320px;
    max-width: 480px;
    transition: transform 450ms ease;
    width: 100%;
  }
  .modal-header {
    border-bottom: 1px solid #eee;
    padding: 20px;
    position: relative;
    text-align: center;
  }
  .modal-header h3 {
    color: #444;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .modal-header span {
    cursor: pointer;
    font-weight: bolder;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
  .modal-body {
    padding: 40px;
  }
  .modal-footer {
    background-color: #f8f8f8;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }

</style>
