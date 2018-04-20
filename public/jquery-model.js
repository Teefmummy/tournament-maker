const app = {
init() {
  $('p').on('click', () => {
    console.log('yo');
  })
}
}
$(document).ready(function(){
  app.init();
});
