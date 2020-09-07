$(document).ready(function(){
    bannertoptext = $('#bannertoptext');
    abouttext = $('#abouttext');
    movietext = $('#movietext');
    getalltext();
    console.log("read");

})

function getalltext(){
    $.ajax('./ressources/text.json')
    .done(function(resp){
        console.log(resp)
        bannertoptext.text(resp.intro);
        abouttext.text(resp.synopsis);
        movietext.text(resp.movie);
    })
}