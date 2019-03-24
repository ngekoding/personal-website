const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

$(function() {
  new Typed('.typed', {
    strings: ['easier.', 'comfortable.','productive.'],
    typeSpeed: 70,
    backSpeed: 20,
    backDelay: 2000,
    loop: true,
    startDelay: 200,
    preStringTyped: function(arrayPos, self) {
      $('.typed').removeClass('selection');
    },
    onStringTyped: function(arrayPos, self) {
      setTimeout(function() {
        $('.typed').addClass('selection');
      }, 1900);
    },
  });
});
