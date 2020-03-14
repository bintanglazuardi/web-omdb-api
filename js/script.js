
function searchMovie(){
     // $.getJSON('http://omdbapi.com?apikey=q3lasdadsk&')
     $('#movie-list').html('');
     $.ajax({
         url:'http://omdbapi.com',
         type: 'get',
         dataType: 'json',
         data: {
             'apikey' : 'f1f6c12b',
             's': $('#search-input').val()
         },
         success: function(result){
             // console.log(result);
             if(result.Response == "True"){
                 let movies = result.Search;
                 // console.log(movies);
                 $.each(movies, function(i, data){
                     $('#movie-list').append(`
                         <div class="col-md-4">
                             <div class="card mb-3">
                                 <img src=`+ data.Poster +` class="card-img-top" alt="...">
                                 <div class="card-body">
                                     <h5 class="card-title">`+ data.Title +`</h5>
                                     <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                     <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
                                 </div>
                             </div>
                         </div>
                     `);
                 });
 
                 $('#search-input').val('');
 
             }else{
                 // $('#movie-list').html('<h1 class="text-center">Movie Not Found!</h1>')
                 $('#movie-list').html(`
                     <div class="col">
                         <h1 class="text-center">`+ result.Error +`</h1>
                     </div>
                 `)
             }
         }
     });
}


$('#search-button').on('click', function(){
   searchMovie();
});

//jika di tekan Enter langsung search
$('#search-input').on('keyup', function(event){
    //13 == keycode untuk tombol Enter
    if(event.which === 13){
        searchMovie();
    }
});

//event binding / event delegation?
//jQuery cari elemen movie-list, lalu ketika diklik sebuah elemen yang classnya see-detail di dalamnya baik itu munculnya dari awal ataupun nanti ketika dipanggil ajaxnya, jalankan fungsi ini
$('#movie-list').on('click','.see-detail', function(){
    // console.log($(this).data('id'));
    $.ajax({
        url:'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'f1f6c12b',
            'i': $(this).data('id')
        },
        success: function(movie){
            if(movie.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                    <li class="list-group-item">Released : `+ movie.Genre +`</li>
                                    <li class="list-group-item">Genre : `+ movie.Released +`</li>
                                    <li class="list-group-item">Director : `+ movie.Director +`</li>
                                    <li class="list-group-item">Actors : `+ movie.Actors +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }

    });


});


