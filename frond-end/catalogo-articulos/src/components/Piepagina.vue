<template>
    <footer class="text-center footer-style">
    <div class="container">
        <div class="row">
            <div class="col-md-4 footer-col">
                <h3>Dirección</h3>
                <p>
                    CABA - Argentina <br />
                    carrasco 400
                </p>
            </div>
            <div class="col-md-4 footer-col">
                <h3>Mis redes</h3>
                <ul class="list-inline">
                    <li>
                        
                        <font-Awesome-Icon :icon={faGithub} />
                        
                        
                    </li>
                    <li>
                        <a  target="_blank" href="#" class="btn-social btn-outline"><i class="fa fa-fw fa-google-plus"></i></a>
                    </li>
                    <li>
                        <a  target="_blank" href="#" class="btn-social btn-outline"><i class="fa fa-fw fa-twitter"></i></a>
                    </li>
                    <li>
                        <a  target="_blank" href="#" class="btn-social btn-outline"><i class="fa fa-fw fa-linkedin"></i></a>
                    </li>
                    <li>
                        <a  target="_blank" href="#" class="btn-social btn-outline"><i class="fa fa-fw fa-dribbble"></i></a>
                    </li>
                </ul>
            </div>
            <div class="col-md-4 footer-col">
                <h3>Trabajo FreeLancer</h3>
                <p>Tengo más de X años de experiencia en maquetación web y me apasiona lo que hago!</p>
            </div>
        </div>
    </div>
</footer>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.footer-style {
    padding-top: 50px;
    background-color: #797b7e;
     box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
}
footer {
  color: white;
}
footer h3 {
  margin-bottom: 30px;
    font-weight: 800;
}
footer .footer-above {
  padding-top: 50px;
  background-color: #2C3E50;
}
footer .footer-col {
  margin-bottom: 50px;
}
footer .footer-below {
  padding: 25px 0;
  background-color: #233140;
}
</style>
