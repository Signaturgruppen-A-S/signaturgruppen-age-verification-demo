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
            var url = `https://localhost:5001/connect/authorize?client_id=${sg_broker_clientId}&redirect_uri=https://localhost:5001/WebMessagingCallback/ImplicitCallback&response_type=id_token&scope=openid%20age_verify:${ageToVerify}&idp_values=idbrokerdk&prompt=login&nonce=nonce1`;
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
                //resolve(event.data.eventData); TODO call broker verify idtoken, parse response and return
                resolve({ age_to_verify: ageToVerify, age_verified: true});
            }
        }
        
        window.addEventListener("message", receiveEvent, false);
        
        showPopup();
        
    });
}