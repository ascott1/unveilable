/**
 * jQuery Unveilable
 * A very lightweight jQuery plugin to lazy load images
 * http://github.com/ascott1/unveilable
 *
 * Licensed under the MIT license.
 * Based on the work of Luis Almeida
 * https://github.com/luis-almeida
 * Published  by Adam Scott
 * https://github.com/ascott1
 */

 ;(function($) {

   $.fn.unveil = function(threshold, callback) {

     var $w = $(window),
         th = threshold || 0,
         retina = window.devicePixelRatio > 1,
         attrib = retina? "data-src-retina" : "data-src",
         images = this,
         loaded;

     this.one("unveil", function() {
       var source = this.getAttribute(attrib);
       source = source || this.getAttribute("data-src");
       if (source) {
         this.setAttribute("src", source);
         if (typeof callback === "function") callback.call(this);
       }
     });

     function unveil() {
       var inview = images.filter(function() {
         var $e = $(this);
         if ($e.is(":hidden")) return;

         var wt = $w.scrollTop(),
             wb = wt + $w.height(),
             et = $e.offset().top,
             eb = et + $e.height();

         return eb >= wt - th && et <= wb + th;
       });

       loaded = inview.trigger("unveil");
       images = images.not(loaded);
     }

     $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

     unveil();

     return this;

   };

 })(window.jQuery || window.Zepto);