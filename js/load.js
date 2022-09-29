//評論區
$(document).ready(function () {
    var cards = $("#article4_card-slider .slider-item").toArray();

    startAnim(cards);

    function startAnim(array) {
        if (array.length >= 4) {
            TweenMax.to(array[0], 1, {
                bezier: [
                    { x: 400, y: 0 },
                    { x: -400, y: 0 },
                    { x: 0, y: 100 }
                ],

                zIndex: 2,
                opacity: 1,
                ease: Cubic.easeInOut
            });
            TweenMax.fromTo(
                array[1],
                1,
                { x: 0, y: 100, opacity: 1 },
                {x: 400, y: 0, opacity: 0, zIndex: 0,
                    delay: 0.03,
                    ease: Cubic.easeInOut,
                    onComplete: sortArray(array)
                }
            );

            TweenMax.fromTo(
                array[2],
                1,
                { x: -400, y: 0, opacity: 1, zIndex: 0 },
                { x: -400, y: 0, opacity: 0.5, zIndex: 0, ease: Cubic.easeInOut }
            );



            TweenMax.fromTo(
                array[3],
                1,
                { x: 400, y: 0, opacity: 0.5, zIndex: 1 },
                { x: 400, y: 0, opacity: 0.5, zIndex: 1, ease: Cubic.easeInOut }
            );



        } else {
            $("#card-slider").append(
                "<p>Sorry, carousel should contain more than 3 slides</p>"
            );
        }
    }

    function sortArray(array) {
        clearTimeout(delay);
        var delay = setTimeout(function () {
            var firstElem = array.shift();
            array.push(firstElem);
            return startAnim(array);
        }, 3000);
    }
})

