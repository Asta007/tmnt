$(document).ready(function(){
    bannertoptext = $('#bannertoptext');
    abouttext = $('#abouttext');
    movietext = $('#movietext');
    content_episode = $('#content_episode');
    episode_name = $('#episode_name');
    current_season = $('#current_season');
    current_season = $('#youtube_iframe');

    var alltext;
    var allseason ;
    getallseason();
    getalltext();

    console.log("read");

    $('#content_stream').on('click', 'button' , function(){
        console.log($(this).val());
    } )

})

function getalltext(){
    $.ajax('./ressources/text.json')
    .done(function(resp){
        bannertoptext.text(resp.intro);
        abouttext.text(resp.synopsis);
        movietext.text(resp.movie);
    })
}

function getallseason(){
    let html = "";
    $.ajax('./ressources/episode.json')
    .done(function(resp){
        allseason = resp;
        resp.forEach(oneseason => {
            html += "<a href='#saison" + oneseason.season + "' class='saison_title' role='button' data-toggle='collapse'> Saison "+ oneseason.season +"</a>" ;
            html += "<div id='saison" + oneseason.season + "' class='content_saison collapse' data-parent='#content_episode'>" ;
                oneseason.episodes.forEach(oneepisode => {
                    let value = [oneepisode.num,oneepisode.title,oneepisode.url];
                    html += "<button value="+oneepisode.num+"> <strong> Ep " + oneepisode.num +" : </strong> "+ oneepisode.title + "</button>";
                    // console.log(html);
                } )
            html += "</div>" ;
            content_episode.html(html);
            // console.log("==============")
            // console.log(oneseason.season)
        });
    })
}