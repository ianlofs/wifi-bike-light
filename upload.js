var fileReader = new FileReader()

$('.file-input').change(function(){
  var file = this.files[0];
  var name = file.name;
  var size = file.size;
  var type = file.type;
  console.log(file);
  previewFile(file)
});

function previewFile(file) {
  var preview = document.querySelector('#file-preview');
  console.log()
  var reader = new FileReader();

  reader.onload = function () {
    preview.src  = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  }
}
