const api_endpoint = '/assets/inc/paladin-contact/api.php';

function get_csrf() {

    return new Promise( resolve =>
        fetch( `${api_endpoint}?csrf`, {
            method:'GET',
        })
        .then( response => response.json() )
        .then( token => resolve(token) )
        .catch( err => console.log(err) )
    );
}
    
function submit_contact(data) {
    return new Promise( resolve =>
        fetch( api_endpoint, {
            method:'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: data 
        })
        .then( response => response.json() )
        .then( token => resolve(token) )
        .catch( err => console.log(err) )
    );
}

export { get_csrf, submit_contact };
