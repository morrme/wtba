 

function getShows(){
    axios.get('https://api.songkick.com/api/3.0/artists/371884/calendar.json?apikey=io09K9l3ebJxmxe2')
        .then((response) => {
            console.log(response);
            let shows = response.data.resultsPage.results.event;
             let output = '';
            $.each(shows, (index, show) => {
                output += `
                <div class="col-md-3">
                    <div class = "well text-center">
                        <h7>${show.displayName}</h7><br>
                        <h7>${show.location.city}</h7><br>

                        <a onclick="showSelected('${show.id}')" class="btn btn-primary" href="#">More Info</a>
                    </div>
                </div>
                `;
                    });
        $('#shows').html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}


function showSelected(id){
    sessionStorage.setItem('showId', id)
    window.location = 'showdetail.html';
    return false;
}

function getShow() {
    let showId = sessionStorage.getItem('showId');
    axios.get('https://api.songkick.com/api/3.0/events/' + showId + '.json?apikey=io09K9l3ebJxmxe2')
    // axios.get('http://www.omdbapi.com?i='+movieId)
        .then((response) => {
            console.log(response);
            let show = response.data.resultsPage.results.event;
            
            let output = `
                <div class ="row">
                    <div class="col-md-4">
                        <a href="https://www.google.com/maps/place/40.0080079,-83.0249081/">
                        <img src="https://maps.googleapis.com/maps/api/staticmap?center=${show.venue.lat},${show.venue.lng}&zoom=13&scale=false&size=300x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0x5b3c6c%7Clabel:%7C${show.venue.lat},${show.venue.lng}" alt="Google Map of Venue Location"></a>

                
                    </div>
                    <div class = "col-md-8">
                        <h2>${show.displayName}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"> <strong> Date: </strong> ${show.start.date}</li>
                            <li class="list-group-item"> <strong> Time: </strong> ${show.start.time}</li>
                            <li class="list-group-item"> <strong> Location: </strong> ${show.venue.displayName}<br>
                            ${show.venue.street} <br>
                            ${show.venue.city.displayName}, ${show.venue.city.state.displayName} ${show.venue.zip}

                            
                            </li>
                        </ul>
                        <a href="${show.uri}" target="_blank" class="btn btn-primary">Buy Tickets</a>
                        <a href="index.html" class="btn btn-default">Back to Show Listing</a>
                    </div>
                </div>                   
            </div>

            
                `;
                    

                $('#show').html(output);
        })
        .catch((err) => {
            console.log(err);
        });

}
