$.when(pgReady, jqmReady).then(function() {

    function takePhoto() {

        console.log("app :: camera bottom pressed");
        var cameraOptions = {
            //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 290,
            targetHeight: 500,
        }
        navigator.camera.getPicture(gotPicture, onError, cameraOptions);
    }
   
    // called after using the camera 
    function gotPicture(imageURI) {
        $("#image").attr("src", imageURI);  
        imageLoadedURI = imageURI; 

        // update canvas element
        var ctx = document.getElementById("photo").getContext("2d");
        var img = new Image();
        img.src = imageURI;
        img.onload = function() {
            ctx.drawImage(img,0,0);
            console.log("app :: updated canvas");
        }
    }

    function onError(error) {
        console.log(error);
    }

    $("#take-photo-button").tap(takePhoto);

});
