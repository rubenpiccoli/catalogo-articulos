<template>
<div class="container">
    <div class="row" id="nav">
      <div class="col-4">
         <img alt="Vue logo" src="../assets/logo.png">
      </div>
      <div id="link" class="col-4">
         <router-link to="/">Home</router-link> |
         <router-link to="/about">About</router-link>|
          </div>
         <div class="col-4">
         <Login/>
        </div>
   
   </div>
 </div>   
</template>
<script>
import Login from './Login.vue'
export default {
  components: { Login },
   
}
</script>
<style scoped>

img{
    
    align-content: left;
    width: 60%;
}
#link{
  padding-top: 10%; 
  
}
#nav{
  height: 50%;
  margin-bottom: 10px;
  margin-top: 10px;
 
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
}
#nav a.router-link-exact-active {
  
  color: #42b983;
}
</style>