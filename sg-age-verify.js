function sgBrokerAgeResultInlineWithoutOlineValidation(ageToVerify, result){
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    if(typeof result.id_token !== 'undefined'){
        var parsedToken = parseJwt(result.id_token);
        var ageClaim = parsedToken.idbrokerdk_age_verified;
        var ageSplitted = ageClaim.split(':');
        var ageVerified = ageSplitted[1] == 'true';
        var ageToVerifyFromClaim = parseInt(ageSplitted[0]);
       return { age_to_verify: ageToVerify, age_verified: ageVerified && ageToVerifyFromClaim == ageToVerify };
    }else{
        return { age_to_verify: ageToVerify, age_verified: false, error_description : result.error_description };
    }
}

function sgBrokerStartAgeVerify(ageToVerify) {
    return new Promise((resolve, reject) => {
        var windowRef;
        
        function popupWindow(n, t, i, r){
            let u = window.outerHeight / 2 + window.screenY - r / 2
            let f = window.outerWidth / 2 + window.screenX - i / 2
            windowRef = window.open(n, t, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + i + ', height=' + r + ', top=' + u + ', left=' + f)
            
            windowRef.focus()
        }
        
        function showPopup() {
            var url = `${sg_broker_authorize_endpoint}?client_id=${sg_broker_clientId}&redirect_uri=${sg_broker_redirect_uri}&response_type=id_token&scope=openid%20age_verify:${ageToVerify}&idp_values=idbrokerdk&prompt=login&nonce=nonce1`;
            var title = 'Verificer Alder';
            var width = '452';
            var height = '640';
            //popupWindow('https://pp.netseidbroker.dk/op/connect/authorize?client_id=aac81a04-6568-4912-be8b-00ccba7b8b39&redirect_uri=https://localhost:5001/WebMessagingCallback/ImplicitCallback&response_type=id_token&scope=openid%20age_verify:16&idp_values=idbrokerdk&prompt=login&nonce=nonce1', 'Verificer Alder', '452', '640');
            popupWindow(url, title, width, height);
        }

        function receiveEvent(event) {
            console.log("Received message from origin " + event.origin);
            
            if (event.origin == this.sg_broker_origin && event.data.command === 'webmessage_flow_response') {
                windowRef.close();
                var resultJson = JSON.parse(event.data.result);
                var inlineResult = sgBrokerAgeResultInlineWithoutOlineValidation(ageToVerify, resultJson);
                resolve(inlineResult);
            }
        }
        
        window.addEventListener("message", receiveEvent, false);
        
        showPopup();
        
    });
}

