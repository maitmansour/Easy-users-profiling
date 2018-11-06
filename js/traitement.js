//Variables declaration
var clicks = 0;
var clicked_items = [];
var choosen_products = [];

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


// Update weights when user click
function updateWeights(user_id, product_id, is_done) {

  if (is_done) {
    $('#suggested_product').html('');
    $('.weights_area').html('');
    clicks++;
    $('#clicks').html(clicks);
    //alert(product_id);
    clicked_items.push(product_id);

  } else {
    if (clicks==0) {
      alert("Please click on some products before asking for new one !");
    }else{
       clicked_items = clicked_items.filter((v, i, a) => a.indexOf(v) === i);
    for (var i = 0; i < clicked_items.length; i++) {
      choosen_products.push(data[clicked_items[i] - 1].weights);
    }
    var points = [];
    for (var i = 0; i < choosen_products.length; i++) {
      points.push([choosen_products[i].male, choosen_products[i].male,
        choosen_products[i].female, choosen_products[i].female,
        choosen_products[i].child, choosen_products[i].child,
        choosen_products[i].teen, choosen_products[i].teen,
        choosen_products[i].adult, choosen_products[i].adult,
        choosen_products[i].old, choosen_products[i].old
      ]);
    }

    // get new weight, based on barycenter 
    var new_weight = getCentroid(points);
    suggestProduct(new_weight);
    console.log(getCentroid(points));
    clicks = 0;
    clicked_items = [];
    choosen_products = [];
    }
  }
}


// Suggest a product based on weights
function suggestProduct(weights) {
  // TOODO compare weight with existing weights and siggest one product
  var suggested_product = calculateMansourWeight(weights, data);
  console.log(JSON.stringify(suggested_product));
  var finded_product = '<h2>Suggested Product : </h2>' +
    '             <div>         <div class="grid">            <div class="portfolio app mix_all">             <div class="portfolio-wrapper">                   <a data-toggle="modal" data-target="#modal_' + suggested_product.id + '" href="#" class="b-link-stripe b-animate-go  thickbox" style="border-style: solid;">                   <img src="images/produits/' + suggested_product.id + '.png" style="height:186"><div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 "><img src="images/link-ico.png" alt=""></h2></div>                  </a>                      </div>              </div>                <p class="text-center">' + suggested_product.title + '</p>                    </div>        </div>';
  $('.weights_area').append(' <h2>Calculated weights </h2><ul>' +
    '  <li>Male : ' + weights[0] + '</li>' +
    '  <li>Female : ' + weights[1] + '</li>' +
    '  <li>Child : ' + weights[2] + '</li>' +
    '  <li>Teen : ' + weights[3] + '</li>' +
    '  <li>Adult : ' + weights[4] + '</li>' +
    '  <li>Old : ' + weights[5] + '</li>' +
    '</ul> </div>')
  $('#suggested_product').html(finded_product);
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

// Euclidean distance and return product
function calculateMansourWeight(new_weight, data) {
  var sommes = [];
  var ids = [];
  $.each(data, function (i, val) {
    var somme = 0;
    if (val.weights.is_done) {
      ids.push(i);
      sommes.push(euclideanDistance(val.weights, new_weight));
    }
  });
  var min = Math.min.apply(Math, sommes);
  for (var i = 0; i < sommes.length; i++)
    if (sommes[i] === min) {
      return data[ids[i]];
    }
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