$(document).ready(function(){
    bannertoptext = $('#bannertoptext');
    abouttext = $('#abouttext');
    movietext = $('#movietext');
    content_episode = $('#content_episode');
    episode_name = $('#episode_name');
    current_season = $('#current_season');
    iframe_src = $('#youtube_iframe');

    var alltext;
    var allseason ;
    getallseason();
    getalltext();

    console.log("read");

    $('#content_stream').on('click', 'button' , function(){
        let id = $(this).val();
        getoneepisode(id)
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
                    html += "<button value="+oneepisode.id+"> <strong> Ep " + oneepisode.num +" : </strong> "+ oneepisode.title + "</button>";
                    // console.log(html);
                } )
            html += "</div>" ;
            content_episode.html(html);

            content_episode.children('.content_saison').first().addClass('show');

            // console.log("==============")
            // console.log(oneseason.season)
        });
    })
}

function getoneepisode(id){
    $.ajax('./ressources/episode.json')
    .done(function(resp){
        let saison = "" ;
        resp.forEach(oneseason => {
            saison = oneseason.num ;
            oneseason.episodes.forEach(oneepisode => {
                if (oneepisode.id == id ){
                    current_season.text("saison " + saison );
                    episode_name.text('Episode ' + oneepisode.num + ' : ' + oneepisode.title);
                    iframe_src.src = oneepisode.url;
                    iframe_src.attr("src",oneepisode.url + ";rel=0;modestbranding=1;showinfo=0");
                    console.log(iframe_src.attr("src"))

                }
            })
        })
    })
}