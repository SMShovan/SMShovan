
const options = {
    method: 'POST',
    body: JSON.stringify(  )  
};
fetch( 'https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-researchapi-iwlau/service/ResearchAPI/incoming_webhook/API', options )
    .then( response => response.json() )
    .then( response => {
        console.log(response);
    } );