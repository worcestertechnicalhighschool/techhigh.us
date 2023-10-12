const menuButton = document.querySelector('.hamburger');
const menu = document.querySelector('.primary-nav');
const links = document.querySelectorAll('.primary-nav a');
const navBreakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-breakpoint'));

function menuButtonToggle(){
    menu.classList.toggle('open');
    menuButton.classList.toggle('open');
    let expanded = (this.attributes['aria-expanded'].value === 'true');
    this.attributes['aria-expanded'].value = !expanded;
}
menuButton.addEventListener('click', menuButtonToggle);

function closeMenu(){
    menuButton.attributes['aria-expanded'].value = false;
    menu.classList.remove('open');
    menuButton.classList.remove('open');
}

links.forEach(function(link){
    link.addEventListener('click', closeMenu);
});

window.onresize = function() {
  if(window.innerWidth >= navBreakpoint && menu.classList.contains('mobile')) {
    menu.classList.remove('mobile');
  }
  if (window.innerWidth < navBreakpoint && !menu.classList.contains('mobile')) {
    window.setTimeout(()=>{
      menu.classList.add('mobile');
    }, 250);
  }
  if(window.innerWidth > navBreakpoint && menuButton.attributes['aria-expanded'].value === 'true'){
    closeMenu();
  }
}