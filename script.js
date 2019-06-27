function getJSON(key, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://google-photos-album-demo.glitch.me/'+key, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
}
async function getPhotoJSON(elm) {
  try {
    await getJSON(elm.dataset.fetch, 
      function(err, data) {
        if (err !== null ) { 
          alert('Cannot fetch album:' + err); 
        } else { displayPhotos(data, elm); }});
  } catch(err) {
    alert('Cannot fetch album:' + err);
  }
}
function insertPhoto(url,elm) {
  var photoNode = document.createElement('div');
  photoNode.className = 'gallery';
  photoNode.innerHTML = 
    '<a target="_blank" href="'+url+'">'+
    '<img src="'+url+'" width="100%" height="400"> </a>'
  elm.appendChild(photoNode);
}
function displayPhotos(data, elm) {
  data.map( url => insertPhoto(url,elm));
}

document.addEventListener('DOMContentLoaded', function(ev) {
  var photoYearList = document.getElementsByClassName('photoYear');
  for (var i=0; i < photoYearList.length; i++) {
    var elm = photoYearList[i];
    getPhotoJSON(elm);
  }
});
