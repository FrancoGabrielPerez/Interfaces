"use strict";
document.addEventListener("DOMContentLoaded", (function($) {

    console.clear();
  
    ScrollOut({
      cssProps: {
        visibleY: true,
        viewportY: true,
        scrollPercentY: true
      },
      threshold:0.2
    });
  
  }));  