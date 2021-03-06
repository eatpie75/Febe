module.exports = {
  IMGUR_API_ID: 'a3550591bd9bd1b',
  imgurUpload: function(image) {
    $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      headers: {
        Authorization: 'Client-ID ' + this.IMGUR_API_ID,
        Accept: 'application/json'
      },
      data: {
        image: image,
        type: 'base64'
      }
    })
    .then(function(res) {
      console.log(res.data.link)
      return res.data.link
    });
  }
};