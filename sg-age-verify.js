function sgBrokerOnlineValidateIdToken(idToken, resolve)
{
    //sg_broker_id_token_endpoint -> see swagger endpoint at: https://pp.netseidbroker.dk/op/swagger/index.html
    //sg_broker_id_token_endpoint validates Signaturgruppen ID token. It is recommended to call this from your backend. 
    //if invoked from the browser, as from this demo, end-users might be able to circumvent the JS code and affect the result.
    var bodyData = { idToken : idToken };
    fetch(this.sg_broker_id_token_endpoint, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
    }).then(res => res.json())
    .then(jsonResponse => {
        resolve({ age_to_verify: this.sg_broker_demo_age_to_verify, age_verified: jsonResponse.validated, claims : jsonResponse.claims });
    });
}

function sgBrokerHandleResponse(event, resolve){
    var result = JSON.parse(event.data.result);

    if(typeof result.id_token !== 'undefined'){
        sgBrokerOnlineValidateIdToken(result.id_token, resolve);
    }else{
        resolve({ age_to_verify: this.sg_broker_demo_age_to_verify, age_verified: false, error_description : result.error_description });
    }
}

function sgBrokerIsAgeEvent(event){
    return  event.origin == this.sg_broker_origin && event.data.command === 'webmessage_flow_response';
}

function sgBrokerStartAgeVerify(nonce) {
    return new Promise((resolve, reject) => {
        var windowRef;
        var nonceVerifyResolve = function (result) 
        {
            if(result.age_verified == true){
                if(nonce !== result.claims.nonce){
                    resolve({ age_to_verify: this.sg_broker_demo_age_to_verify, age_verified: false, error_description : 'nonce validation error' });
                    return;
                }
                resolve(result);
            }
            if(result.age_verified == false){
                resolve(result);
            }
        };
        
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
        
        function receiveEvent(event) {
            console.log("Received message from origin " + event.origin);

            if (sgBrokerIsAgeEvent(event)) {
                windowRef.close();
                sgBrokerHandleResponse(event, nonceVerifyResolve);
            }
        }
        
        window.addEventListener("message", receiveEvent, false);
        
        ShowPopup();
        
    });
}

