$.when(pgReady, jqmReady).then(function() {

    var imageLoadedURI = null;

    function takePhoto() {

        console.log("app :: camera bottom pressed");
        var cameraOptions = {
            //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 290,
            targetHeight: 500,
        }

        navigator.camera.getPicture(
            function(imageURI) {
                imageLoadedURI = imageURI;
                loadPhotoInCanvas();
            }, 
            function(error) {
                console.log(error);
            }, 
            cameraOptions);
    }
   
    function loadPhotoInCanvas() {
        
        var ctx = document.getElementById("photo").getContext("2d");
        var img = new Image();
        img.src = imageLoadedURI;
        img.onload = function() {
            ctx.drawImage(img,0,0);
            console.log("app :: updated canvas");
        }
    }

    function applyEffect(event) {

        effect = event.data.effect;
        elementId = event.data.elementId;

        var ctx = document.getElementById(elementId).getContext("2d");
        var imageData = ctx.getImageData(0,0,290,500);
        newImageData = effect(imageData);
        ctx.putImageData(newImageData, 0, 0);
    }

    function writerCreated(writer) {

        var newData = $("#photo").get(0).toDataURL("image/png");
        writer.write(newData);

        var uploadOptions = new FileUploadOptions();
        uploadOptions.fileKey = "file";
        uploadOptions.mimeType = "image/png";
        uploadOptions.chunkedMode = false;

        var fileTransfer = new FileTransfer();

        //fileTransfer.upload(imageLoadedURI, "http://instaphonegap.appspot.com/upload",
        //         fileUploaded, onError, options);
        
        fileTransfer.upload(imageLoadedURI, "http://instaphonegap.appspot.com/upload",
            function() {
                $("#indicator").attr("style", "display:none");     
            },
            fail,
            uploadOptions);
    }

    function uploadPhoto() {
        
        $("#indicator").attr("style", "display:block");

        window.resolveLocalFileSystemURI(imageLoadedURI,
                function(file) {
                    file.createWriter(writerCreated, fail);
                }, fail);
    }

    function fail(error) {
        console.log(error);
    }

    // take a photo from the camera
    $("#take-photo-button").tap(takePhoto);

    // apply several effects

    $("#gray-button").on("tap",
            {
                "effect": grayScale,
                "elementId": "photo"
            }, applyEffect);

    $("#sepia-button").on("tap",
            {
                "effect": sepia,
                "elementId": "photo"
            }, applyEffect);

    $("#reset-button").on("tap", loadPhotoInCanvas);

    $("#main").on("pagebeforehide", function() {
        data = $("#photo").get(0).toDataURL("image/png");
        $("#photo-2").attr("src", data);
    });

    $("#upload-button").on("tap", uploadPhoto);

});
