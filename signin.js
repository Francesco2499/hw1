
const menu = document.querySelector('#menu');
menu.addEventListener('click', showMenu)

function showMenu(event){
    const menu= event.currentTarget;
    console.log(menu);
const nav1 = document.getElementById('first');
    menu.classList.add('hidden');
    menu.classList.remove('showmenu');
    const cont = document.createElement('div');
    const div1 = document.createElement('div');
    div1.setAttribute('data-index', '1'); 
    const div2 = document.createElement('div')
    div2.setAttribute('data-index', '2');
   ;
    cont.appendChild(div1);
    cont.appendChild(div2);
    cont.classList.add('aprimenu');
    nav1.appendChild(cont);
    const nav= document.getElementById('second');
    nav.classList.add('scrolling');
    const aprimenu = document.querySelector('.aprimenu');
    aprimenu.addEventListener('click', closeMenu);
}
function closeMenu(event){
    event.currentTarget.remove();
    menu.classList.remove('hidden');
    menu.classList.add('showmenu');
    const nav= document.getElementById('second');
    nav.classList.remove('scrolling');
}