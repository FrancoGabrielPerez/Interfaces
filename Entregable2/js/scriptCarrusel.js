document.addEventListener("DOMContentLoaded", currentSlide(1));
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {

    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let fade = document.getElementsByClassName("fade");/**1 imagen no va */
   
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    fade[slideIndex-1].style.animation = "fade 5s"; /**1 imagen no va */
    slides[slideIndex-1].style.display = "flex";  /*1 imagen block*/
    /*dots[slideIndex-1].className += "active";*/
    
  }
