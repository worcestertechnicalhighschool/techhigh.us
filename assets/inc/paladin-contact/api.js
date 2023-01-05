const api_endpoint = '/assets/inc/paladin-contact/api.php';

async function get_csrf() {
    return await fetch( `${api_endpoint}?csrf`, {
            method:'GET',
        })
        .then( response => response.json() )
        .catch( err => console.error(err) );
}
    
async function submit_contact(data) {
    return await fetch( api_endpoint, {
            method:'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: data 
        })
        .then( response => response.json() )
        .catch( err => console.error(err) );

}

export { get_csrf, submit_contact };
