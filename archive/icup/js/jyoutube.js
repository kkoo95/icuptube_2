(function(d){d.extend({jYoutube:function(a,b){if(a===null)return"";b=b===null?"big":b;var c;c=a.match("[\\?&]v=([^&#]*)");a=c===null?a:c[1];return b=="small"?"http://img.youtube.com/vi/"+a+"/2.jpg":"http://img.youtube.com/vi/"+a+"/0.jpg"}})})(jQuery);