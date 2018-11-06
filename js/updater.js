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
      alert("Please click on some products before asking for updating weights !");
    }else{
       clicked_items = clicked_items.filter((v, i, a) => a.indexOf(v) === i);
    for (var i = 0; i < clicked_items.length; i++) {
      choosen_products.push(data[clicked_items[i] - 1].weights);
    }
    var points = [];
    var new_product_done=true;
    for (var i = 0; i < choosen_products.length; i++) {
      if (new_product_done) {
                  if (new_product_clicks[product_id-1].length>0) {
                 points.push([
        new_product_clicks[product_id-1][0], new_product_clicks[product_id-1][0],
        new_product_clicks[product_id-1][1], new_product_clicks[product_id-1][1],
        new_product_clicks[product_id-1][2], new_product_clicks[product_id-1][2],
        new_product_clicks[product_id-1][3], new_product_clicks[product_id-1][3],
        new_product_clicks[product_id-1][4], new_product_clicks[product_id-1][4],
        new_product_clicks[product_id-1][5], new_product_clicks[product_id-1][5]
      ]);
        }
        new_product_done=false;
      }

      points.push([choosen_products[i].male, choosen_products[i].male,
        choosen_products[i].female, choosen_products[i].female,
        choosen_products[i].child, choosen_products[i].child,
        choosen_products[i].teen, choosen_products[i].teen,
        choosen_products[i].adult, choosen_products[i].adult,
        choosen_products[i].old, choosen_products[i].old
      ]);
    }
    console.log("OK POINTS : "+JSON.stringify(points))
    // get new weight, based on barycenter 
    var new_weight = getCentroid(points);
    updateCurrentProduct(new_weight,product_id);
      new_product_clicks[product_id-1]=new_weight;
        console.log(getCentroid(points));
    clicks = 0;
    clicked_items = [];
    choosen_products = [];
    }
  }
}



// Suggest a product based on weights
function updateCurrentProduct(weights,product_id) {
  // TOODO compare weight with existing weights and siggest one product
  var finded_product = '<h2>Updated Product : </h2>' +
    '             <div>         <div class="grid">            <div class="portfolio app mix_all">             <div class="portfolio-wrapper">                   <a data-toggle="modal" data-target="#modal_' + product_id + '" href="#" class="b-link-stripe b-animate-go  thickbox" style="border-style: solid;">                   <img src="images/produits/' + product_id + '.png" style="height:186"><div class="b-wrapper"><h2 class="b-animate b-from-left    b-delay03 "><img src="images/link-ico.png" alt=""></h2></div>                  </a>                      </div>              </div>   </div>        </div>';
  $('.weights_area').append(' <h2>New weights </h2><ul>' +
    '  <li>Male : ' + weights[0] + '</li>' +
    '  <li>Female : ' + weights[1] + '</li>' +
    '  <li>Child : ' + weights[2] + '</li>' +
    '  <li>Teen : ' + weights[3] + '</li>' +
    '  <li>Adult : ' + weights[4] + '</li>' +
    '  <li>Old : ' + weights[5] + '</li>' +
    '</ul> </div>')
  $('#suggested_product').html(finded_product);
}