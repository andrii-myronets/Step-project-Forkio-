"use strict";

document.addEventListener('DOMContentLoaded', (event) =>{
    // document.getElementById('burger').addEventListener('click',(event)=>{
    //     document.getElementById('menu').classList.toggle('header_menu_links_enable');
    // });
    // document.body.addEventListener('click',(event))
    document.body.addEventListener('click',(event)=>{
        if (event.target.id === 'burger')
            document.getElementById('menu').classList.toggle('header_menu_links_enable');
        else
            document.getElementById('menu').classList.remove('header_menu_links_enable');
        if (event.target.classList.contains('header_menu_links_item'))
            event.preventDefault();
    })
});

