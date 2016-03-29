app.service('savePdf', function(){

  // Example from http://jsfiddle.net/xzz7n/1/
  this.createPdf = function() {

    var pdf = new jsPDF('p', 'pt', 'a4');

    source = document.getElementById('printed');

    parameters = {
      top: 40,
      bottom: 40,
      left: 40,
      width: 800
    };

    pdf.fromHTML(
      source,
      parameters.left,
      parameters.top, {
        'width': parameters.width
      },
      function (dispose) {
        pdf.save('order.pdf');
      },
      parameters
    );
  }
});