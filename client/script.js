/** Results **/

function drawResults(searchResults){

    var $inputs = $('#userForm :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });

    alert(values);



    var results = '<table class="table table-striped">'+
        '<thead>'+
          '<tr class="row">'+
            '<th scope="col" class="col-md-3">Name</th>'+
            '<th scope="col" class="col-md-1">From</th>'+
            '<th scope="col" class="col-md-1">To</th>'+
            '<th scope="col" class="col-md-2">Price</th>'+
            '<th class="col-md-2"></th>'+
            '<th class="col-md-3"></th>'+
          '</tr>'+
        '</thead>'+
        '<tbody>';


    for(var i=0;i<searchResults.length;i++) {
        results += '<tr class="row">'+
            '<th class="col-md-3">Vivian Aranha</th>'+
            '<td class="col-md-1">BCN</td>'+
            '<td class="col-md-1">ATL</td>'+
            '<td class="col-md-2">$290</td>'+
            '<td class="col-md-2"><input type="button" class="buy btn btn-info btn-small" value="Buy" /></td>'+
            '<td class="col-md-3"><input type="button" class="send btn btn-info btn-small" value="Send to Friend" /></td>'+
          '</tr>';
    }

    results +='</tbody></table>';
    $("#resultsTable").html(results);
}

/** Results **/


/** AddRow code **/

$(document).ready(function () {
    var counter = 0;

    $("#addrow").on("click", function () {
        var newRow = $("<tr class='row'>");
        var cols = "";

        cols += '<td class="col-md-5"><input type="text" class="form-control" name="name' + counter + '"  placeholder="Full Name"/></td>';
        cols += '<td class="col-md-5"><input type="text" class="form-control" name="airport' + counter + '" placeholder="Airport Code" /></td>';
        cols += '<td class="col-md-2"><input type="button" class="ibtnDel btn btn-md btn-danger" value="Delete"></td>';
        newRow.append(cols);
        $("table.order-list").append(newRow);
        counter++;
    });



    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });

    $("#getFlights").on("click", function () {
        drawResults(['BCN']);


    });

});


function calculateRow(row) {
    var price = +row.find('input[name^="price"]').val();

}

function calculateGrandTotal() {
    var grandTotal = 0;
    $("table.order-list").find('input[name^="price"]').each(function () {
        grandTotal += +$(this).val();
    });
    $("#grandtotal").text(grandTotal.toFixed(2));
}

/** AddRow code **/
