// main flow
document.addEventListener("DOMContentLoaded", function(event) {


    // viewport for this layout
    var layoutContext = document.getElementById("layout1");
    var c = document.getElementById("layout1Canvas");
    var canvasCtx = c.getContext("2d");
    // mirror the layout's dimensions
    c.width =layoutContext.offsetWidth;
    c.height =layoutContext.offsetHeight;


    // get spider object
    var spiderObject = document.getElementsByClassName("spiderObject", layoutContext).item(0);
    // spider's mass point
    var spiderCenterOfMassReference = document.getElementsByClassName("spiderCenterOfMassReference", layoutContext).item(0);
    // where does thread start at
    var spiderThreadPointStartElement = document.getElementsByClassName("spiderThreadStartPoint", layoutContext).item(0);


    drawSpiderThread ();
    listenToMouseEvents();

    // =======================

    // draw accurate thread
    function drawSpiderThread() {

        canvasCtx.beginPath();

        // where the thread is in the black web
        canvasCtx.moveTo( spiderThreadPointStartElement.offsetLeft, spiderThreadPointStartElement.offsetTop );

        // to the spider's body shape container
        var spiderThreadPointEndElement = spiderCenterOfMassReference;

        // create coordinates that externally understood by CANVAS
        canvasCtx.lineTo(
            spiderObject.offsetLeft + spiderThreadPointEndElement.offsetLeft,
            spiderObject.offsetTop + spiderThreadPointEndElement.offsetTop );


        canvasCtx.strokeStyle="rgba(0,0,0,.4)"; // thin thread
        canvasCtx.lineWidth = 3;
        canvasCtx.stroke( );

    }

    function redrawSpiderThread() {

        // for animating, have to clear the layer
        canvasCtx.clearRect(0, 0, c.width, c.height);
        drawSpiderThread();
    }


    // react to mouse
    function listenToMouseEvents() {

        // reposition friendly spider
        layoutContext.addEventListener("mousemove", function(event) {

            // check if mouse is down ( dragging )
            if ( event.buttons === 0 ) { return };


            var translatedPositionX = event.clientX - layoutContext.getBoundingClientRect().left;
            translatedPositionX -= spiderCenterOfMassReference.offsetLeft;
            var translatedPositionY = event.clientY - layoutContext.getBoundingClientRect().top;
            translatedPositionY -= spiderCenterOfMassReference.offsetTop;


            // make sure spider not dragged outside of container either ( 4 sides )
            if  ( translatedPositionX <0 || translatedPositionY < 0 || translatedPositionX > layoutContext.offsetWidth || translatedPositionY > layoutContext.offsetHeight) {
                return;
            }


            spiderObject.style.left = translatedPositionX + "px";
            spiderObject.style.top = translatedPositionY + "px";

           // console.log(spiderObject, translatedPositionX, translatedPositionY);
            redrawSpiderThread ();

        });

    }



});



