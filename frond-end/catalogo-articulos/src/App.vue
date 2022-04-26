<template>
 <div class="container">
    <Encabezado/>
    
     <router-view/>     
    <!--<router-link @click="modal = true" to="/">Login</router-link>-->
    <!--<button @click="modal = true" type="button" class="btn btn-primary" >Login</button>-->
 <div id="piepagina">
  <Piepagina/>
  </div>
  
  </div>
  
</template>
<script>

import Encabezado from './components/Encabezado.vue'
import Piepagina from './components/Piepagina.vue'

export default {
components:{
    
Encabezado,
Piepagina
    
  },
 data(){
   return{
     modal:false,
     
   }
 },
   methods:{
      
       
   }

 }
 
 
</script>
<style>
#piepagina{
  margin-top: 10px;
  margin-bottom: 10px;
}
#login{
  
  text-align:right;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
