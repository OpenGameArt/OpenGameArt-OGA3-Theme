function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

(function() {
  // Slide In Panel - by CodyHouse.co
  var panelTriggers = document.getElementsByClassName("js-cd-panel-trigger");
  if (panelTriggers.length > 0) {
    for (var i = 0; i < panelTriggers.length; i++) {
      (function(i) {
        var panelClass =
            "js-cd-panel-" + panelTriggers[i].getAttribute("data-panel"),
          panel = document.getElementsByClassName(panelClass)[0];
        // open panel when clicking on trigger btn
        panelTriggers[i].addEventListener("click", function(event) {
          event.preventDefault();
          addClass(panel, "cd-panel--is-visible");
        });
        //close panel when clicking on 'x' or outside the panel
        panel.addEventListener("click", function(event) {
          if (
            hasClass(event.target, "js-cd-close") ||
            hasClass(event.target, panelClass)
          ) {
            event.preventDefault();
            removeClass(panel, "cd-panel--is-visible");
          }
        });
        document.addEventListener("DOMContentLoaded", function(event) {
          var x = document.cookie; 
          var news = document.getElementById("model-id").innerHTML;
          var now = new Date();
          current = new Date(now.getFullYear(), now.getMonth()+1, 1);
          var oldnews = getCookie("lastnews");
if (oldnews != news) {
          document.cookie = "lastnews="+news+"; path=/; expires="+current;
          event.preventDefault();
          addClass(panel, "cd-panel--is-visible");
}

        });
		
      })(i);
    }
  }

  //class manipulations - needed if classList is not supported
  //https://jaketrent.com/post/addremove-classes-raw-javascript/
  function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else
      return !!el.className.match(
        new RegExp("(\\s|^)" + className + "(\\s|$)")
      );
  }
  function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
  }
  function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else if (hasClass(el, className)) {
      var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
      el.className = el.className.replace(reg, " ");
    }
  }
})();

