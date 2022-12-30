import { get_csrf, submit_contact } from './api.js';

const contact_modal = document.querySelector('#contact-modal');
const contact_modal_close = document.querySelector('#contact-modal-close');
contact_modal_close.addEventListener('click', closeContactModal);

const csrf = document.querySelector( '[name="csrf_token"]' );
csrf.value = await get_csrf();

const contact_form = document.querySelector( '#contact-form' );

contact_form.addEventListener( 'submit', submit_form );

async function submit_form(e) {
    
    e.preventDefault();
    showContactModal();
    
    const formData = new URLSearchParams( new FormData( this ) );
    await submit_contact(formData);
       
}

function showContactModal(){
    contact_modal.classList.toggle('show');
    contact_modal_close.focus();
}

function closeContactModal(){
    contact_modal.classList.toggle('show');
    contact_form.reset();
}