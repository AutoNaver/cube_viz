// Load the three graph images using JavaScript Image objects
var image1 = new Image();
image1.src = 'graph1.png';

var image2 = new Image();
image2.src = 'graph2.png';

var image3 = new Image();
image3.src = 'graph3.png';

// Define a variable to keep track of the current graph
var current_graph = 1;

// Set up a listener for user input
document.addEventListener( 'keydown', function ( event ) {
    if ( event.keyCode == 32 ) {
        current_graph++;
        if ( current_graph > 3 ) {
            current_graph = 1;
        }
        switch ( current_graph ) {
            case 1:
                document.getElementById('canvas').getContext('2d').drawImage(image1, 0, 0);
                break;
            case 2:
                document.getElementById('canvas').getContext('2d').drawImage(image2, 0, 0);
                break;
            case 3:
                document.getElementById('canvas').getContext('2d').drawImage(image3, 0, 0);
                break;
        }
    }
});