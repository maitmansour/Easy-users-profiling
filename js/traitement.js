//Variables declaration
var clicks = 0;
var clicked_items = [];
var choosen_products = [];
var new_product_clicks=[];

function loadProductsAndUsers(isUpdater=false) {
    var items = "";
  var users_html = "";
  var url_string = window.location.href;
  var url = new URL(url_string);
  var user_id = url.searchParams.get("user_id");
  if (user_id == null) {
    user_id = 1;
  }
  $('#choosen_user').html('Switch users ( Current user ' + user_id + ' )');

 /* Itération sur les produits et génération des div qui contiens les informations des produits*/
  $.each(data, function (key, val) {
    var done_style = "";
    if (val.weights.is_done || isUpdater) {
      done_style = "";
      if (val.weights.is_done) {
        done_style="border-style: solid;";
      }else{
      var json_str = localStorage.getItem("new_product_"+val.id);
        if (json_str!="" && json_str!=null) {
             var new_product_clicks = JSON.parse(json_str);
val.weights.male=new_product_clicks[0];
val.weights.female=new_product_clicks[1];
val.weights.child=new_product_clicks[2];
val.weights.teen=new_product_clicks[3];
val.weights.adult=new_product_clicks[4];
val.weights.old=new_product_clicks[5];
           }
      }

      var category = '<div class="col-md-2">' +
        '         <div class="grid">' +
        '           <div class="portfolio app mix_all" >' +
        '             <div class="portfolio-wrapper">   ' +
        '               <a data-toggle="modal" data-target="#modal_' + val.id + '" href="#" class="b-link-stripe b-animate-go  thickbox" onclick="updateWeights(' + user_id + ',' + val.id + ',' + val.weights.is_done + ')" style="' + done_style + '">' +
        '                  <img src="images/produits/' + val.id + '.png" style="height:186"><div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 "><img src="images/link-ico.png" alt=""/></h2></div>' +
        '                 </a>' +
        '                     </div>' +
        '             </div>    ' +
        '           <p class="text-center">' + val.title + '</p>' +
        '                    </div>' +
        '       </div>' +
        '<!----start-model-box-' + val.id + '---->' +
        '           <div class="modal fade bs-example-modal-md light-box" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="modal_' + val.id + '">' +
        '             <div class="modal-dialog modal-md">' +
        '               <div class="modal-content light-box-info">' +
        '               <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img src="images/close.png" title="close" /></button>' +
        '                <h3 id="modal_title">' + val.title + '</h3>' +
        '                <p id="modal_details">' + val.description + '</p>' +
        ' <div class="weights_area"> </div> <h2>Real weights</h2> <ul id="product_' + val.id + '_data">' +
        '  <li>Male : ' + val.weights.male + '</li>' +
        '  <li>Female : ' + val.weights.female + '</li>' +
        '  <li>Child : ' + val.weights.child + '</li>' +
        '  <li>Teen : ' + val.weights.teen + '</li>' +
        '  <li>Adult : ' + val.weights.adult + '</li>' +
        '  <li>Old : ' + val.weights.old + '</li>' +
        '</ul>' +
        '               </div>' +
        '             </div>' +
        '           </div>' +
        '           <!----start-model-box---->';

      items += category;
    }
  });
  $('#produits').append(items);


  $.each(users, function (key, val) {

    var user = '<li><a href="?user_id=' + val.id + '">' + val.username + '</a></li>';
    users_html += user;
  });
  $('#users').append(users_html);

}


// Barycenter calculator
var getCentroid = function (coord) {
  var center = coord.reduce(function (x, y) {
    var res = [Math.round((x[0] + y[0] / coord.length) * 1000) / 1000,
      Math.round((x[1] + y[1] / coord.length) * 1000) / 1000,
      Math.round((x[2] + y[2] / coord.length) * 1000) / 1000,
      Math.round((x[3] + y[3] / coord.length) * 1000) / 1000,
      Math.round((x[4] + y[4] / coord.length) * 1000) / 1000,
      Math.round((x[5] + y[5] / coord.length) * 1000) / 1000
    ];
    return res;
  }, [0, 0, 0, 0, 0, 0])
  return center;
}

// Euclidean distance calcul
function euclideanDistance(p1, p2) {

  maleDiff = Math.pow((p1.male - p2[0]), 2);
  femaleDiff = Math.pow((p1.female - p2[1]), 2);
  childDiff = Math.pow((p1.child - p2[2]), 2);
  teenDiff = Math.pow((p1.teen - p2[3]), 2);
  adultDiff = Math.pow((p1.adult - p2[4]), 2);
  oldDiff = Math.pow((p1.old - p2[5]), 2);

  return Math.round(Math.sqrt(maleDiff + femaleDiff + childDiff + teenDiff + adultDiff + oldDiff) * 1000) / 1000;
}