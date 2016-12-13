var img = new Image()


$('.file-input').change(function(){
  var file = this.files[0];
  var reader = new FileReader();
  var canvas = $('#file-preview')[0];
  var ctx = canvas.getContext('2d');
  reader.onload = function () {
    img.src = reader.result;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    var imageArray = new Array(img.height);
    for (var i = 0; i < imageArray.length; i++) {
      imageArray[i] = new Array(img.width);
      for (var j = 0; j < imageArray[i].length; j++) {
        imageArray[i][j] = {};
      }
    }

    imageArray.map(function(array, i) {
      return array.map(function(pixelData, j) {
        var pixelPos = (i * img.width * 4) + (j * 4);
        pixelData.red = data[pixelPos];
        pixelData.green = data[pixelPos+1];
        pixelData.blue = data[pixelPos+2];
        pixelData.alpha = data[pixelPos+3];
        return pixelData;
      });
    })

    for(var i = 0; i < img.height; i++){
      for(var j = 0; j < img.width; j++){
        var pixelPos = (i * img.width * 4) + (j * 4);
        data[pixelPos] = imageArray[i][j].red;
        data[pixelPos + 1] = imageArray[i][j].green;
        data[pixelPos + 2] = imageArray[i][j].blue;
        data[pixelPos + 3] = imageArray[i][j].alpha;
      }
    }
    imageData.data = data;
    ctx.putImageData(imageData, 0, 0);
  }
  reader.readAsDataURL(file);
});
