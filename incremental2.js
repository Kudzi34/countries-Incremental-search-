var jqXHR;
var results = $(".results");
var input = $("input");
var myHtml = [];
//var timer;

$("input").on("input", function(e) {
    console.log("working"); // function countries() {
    if (jqXHR) {
        jqXHR.abort();
    }

    jqXHR = $.ajax({
        url: "https://flame-egg.glitch.me/",
        data: {
            q: e.target.value
        },
        success: function(data) {
            console.log("data", data);
            data = data.slice(0, 4);

            for (var i = 0; i < data.length; i++) {
                myHtml += '<div class="results">' + data[i] + "</div>";
            }
        }
    });

    results.html(myHtml);
    if (!input.val()) {
        results.hide();
    } else {
        results.show();
        console.log(results);
    }
    results.on("mouseover", function(e) {
        // find elem with hover and rem
        if (results.children().hasClass("highlighted")) {
            results.children().removeClass("highlighted");
        }
        $(e.target).addClass("highlighted");
    });

    results.on("click", function(e) {
        console.log($(e.target).text());
        input.val($(e.target).text());
        results.hide();
    });
    var elem = $(".highlighted");

    if (elem.length) {
        elem.removeClass("highlighted")
            .prev()
            .addClass("highlighted");
    }

    $("input").on("keydown", function(e) {
        if (e.keyCode == 40) {
            results
                .children()
                .first()
                .addClass("highlighted");
        }
    });
});
