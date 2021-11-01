console.log(`It's ALIVE!!!`);
$(function () {
  var swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        480: {
          slidesPerView: "auto",
          spaceBetween: 20
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
  });

  $('.dropdown-toggle').dropdown();
  $('#myModal').on('show.bs.modal', function (e) {
    if (!data) return e.preventDefault() // stops modal from being shown
  })
});
