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