var lastImageHTML = "";
var currentId = "";

var toRed = function() {
	$("#bacon").animate({"color": "#820D0D",
						 "borderTopColor":"#820D0D",
						 "borderLeftColor":"#820D0D",
						 "borderBottomColor":"#820D0D",
						 "borderRightColor":"#820D0D"}, 1000, toBlack);
};
var toBlack = function() {
	$("#bacon").animate({"color": "white",
						 "borderTopColor":"#ffaf0f",
						 "borderLeftColor":"#ffaf0f",
						 "borderBottomColor":"#ffaf0f",
						 "borderRightColor":"#ffaf0f"}, 1000, toRed);
};

var installListener = function() {
    $(".thumbnail").click(function(event) {
        var thumbnailImage = $(this);
        var videoId = thumbnailImage.attr("id");
        
        if (currentId != "")
            $("#" + currentId).html(lastImageHTML);

        $.get("add_score.php?add_score=" + videoId);

        lastImageHTML = thumbnailImage.html();
        currentId = videoId;

        thumbnailImage.html("<object id=\"" + videoId +"\"><param name=\"movie\" value=\"https://www.youtube.com/v/" + videoId + "?version=3\"><embed src=\"https://www.youtube.com/v/" + videoId + "?version=3&autoplay=1&vq=large\" type=\"application/x-shockwave-flash\" allowfullscreen=\"true\" allowScriptAccess=\"always\" width=\"200\" height=\"150\"></object>");
    });
    
	$("#add_video_form").submit(function() {
		var field = $(this).find("#searchfield");
    	var id = field.val();
    	var thumbnail;
    	
    	$("html").css("cursor", "progress");
    	
		$.get("add_video.php", {add: id}, function(data) {
			$("html").css("cursor", "default");
			field.val("");

			if (data == "") {
				$("html").css("cursor", "default");
				$("#dialog-modal").dialog('open');
			}
			else {
				thumbnail = $(data);
				
				thumbnail.hide();
	    		$("#thumbnails").prepend(thumbnail);
				thumbnail.fadeIn(2000);
			};
		})

		return false;
	});
};

$(document).ready(installListener);

$(function() {
	$("#dialog-modal").dialog({
		height: 140,
		modal: true,
		autoOpen: false,
		draggable: false,
		resizable: false,
	});
	
    $(".edit-bar > textarea").focus(function() {
        return false;
    });

    $(".edit-bar > textarea").mousedown(function() {
        return false;
    });
    
    $(".remove").click( function() {
        $(getItem(this)).fadeOut(800, "linear");
    });
    
    toRed();

    var scrolling = false;
    var scrollTimer = null;
    
    $(".edit-bar > textarea").mouseover(function() {
        if (!scrolling) {
            scrolling = true;
            willScrollLeft(this);
        }
    });

    $(".edit-bar > textarea").mouseout(function() {
        scrolling = false;
        stopScroll();
        $(this).scrollLeft(0);
    });

    var scrollElement = function(element, offset) {
        var t = $(element);
        var s = t.scrollLeft();
        
        t.scrollLeft(s + offset);
        
        if (scrolling) {
            var newS = t.scrollLeft();
        
            if (newS == s) {
                stopScroll();
                
                if (offset > 0)
                    setTimeout(function() {
                        willScrollRight(element);
                    }, 1000);
                else
                    setTimeout(function() {
                        willScrollLeft(element);
                    }, 1000);
            }
        }"".sub
    };

    var stopScroll = function() {
        if (scrollTimer != null) {
            (scrollTimer);
            scrollTimer = null;
        }
    };

    var willScrollLeft = function(element) {
        if (scrolling)
            scrollTimer = setInterval(function() {
                scrollElement(element, 1);
            }, 25);
    };
    
    var willScrollRight = function(element) {
        if (scrolling)
            scrollTimer = setInterval(function() {
                scrollElement(element, -1);
            }, 25);
    };
    
    function getItem(el) {
        return findAncestorByClass(el, 'thumbnail-container');
    }
    
    function findAncestorByClass(el, className) {
    	return findAncestor(el, function(el) {
    		if (el.classList)
    			return el.classList.contains(className);
    		return null;
    	});
    }
    
    function findAncestor(node, predicate) {
    	var last = false;
    	
    	
    	while (node != null && !(last = predicate(node))) {
    		node = node.parentNode;
    	}
    	return last ? node : null;
    }
});
