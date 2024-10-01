function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

function sgBrokerParseIdTokenResponse(idToken, resolve)
{
    var parsed = parseJwt(idToken);
    var verifiedClaimValues = parsed.idbrokerdk_age_verified.split(':');
    var ageVerified = verifiedClaimValues[0] == this.sg_broker_demo_age_to_verify && verifiedClaimValues[1] == 'true';
    resolve({ id_token: idToken, age_verified: ageVerified });
}

function sgBrokerHandleResponse(event, resolve){
    var result = JSON.parse(event.data.result);
    
    if(typeof result.id_token !== 'undefined'){
        sgBrokerParseIdTokenResponse(result.id_token, resolve);
    }else{
        resolve({ age_to_verify: this.sg_broker_demo_age_to_verify, age_verified: false, error_description : result.error_description });
    }
}

function sgBrokerIsAgeEvent(event){
    return  event.origin == this.sg_broker_origin && event.data.command === 'webmessage_flow_response';
}

function sgBrokerStartAgeVerify(nonce) {
    var windowRef;
    
    function popupWindow(n, t, i, r){
        let u = window.outerHeight / 2 + window.screenY - r / 2
        let f = window.outerWidth / 2 + window.screenX - i / 2
        windowRef = window.open(n, t, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + i + ', height=' + r + ', top=' + u + ', left=' + f)
        
        windowRef.focus()
    }
    
    function ShowPopup() {
        var url = `${sg_broker_authorize_endpoint}?client_id=${sg_broker_clientId}&redirect_uri=${sg_broker_redirect_uri}&response_type=id_token&scope=openid%20age_verify:${sg_broker_demo_age_to_verify}&idp_values=idbrokerdk&prompt=login&nonce=${nonce}`;
        var title = 'Verificer Alder';
        var width = '452';
        var height = '640';
        popupWindow(url, title, width, height);
    }
    
    ShowPopup();

    return new Promise((resolve, reject) => {
        function receiveEvent(event) {
            console.log("Received message from origin " + event.origin);
            
            if (sgBrokerIsAgeEvent(event)) {
                windowRef.close();
                sgBrokerHandleResponse(event, resolve);
            }
        }
        
        window.addEventListener("message", receiveEvent, false);
        
    });
}