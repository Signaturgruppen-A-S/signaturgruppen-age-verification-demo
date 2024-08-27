# Signaturgruppen Age Verification demo
This example demonstrates a solution in pure vanilla JavaScript that integrates to Signaturgruppen Age Verification.

Setup for a predefined PP environment client, run the folder as a webapplication

See the sg-age-verify-config.js file for configuration parameters such as the age to verify and client id.

## Demonstration
The example demonstrates how to setup a MitID age verification flow using only the included vanilla JavaScript to setup and verify the result. 

## MitID testusers. 
To test with MitID testusers in the PP environment, use the official MitID testtool: https://pp.mitid.dk/test-tool/frontend/#/create-identity.

## It works! Now what?
The example demo has demonstrated a full age verification flow and can be used as a template for the integration into your own service.

However, there a some things you need to consider:

### Strong Age Verification - you need a backend
In order to properly support a strong age verification mechanism, your integration should be protected from simple browser-tampering of HTML/JS at runtime. The provided example demo validates the age verification result received (ID token) directly in JavaScript. This last step, should be implemented in your backend. See the technical documentation for details and considerations. 

## Documentation
Signaturgruppen Broker supports MitID Age Verification for both OpenID Connect/OAuth clients as well as more custom integrations utilizing the JavaScript cross-document messaging API and REST as well as both full-fledged MitID flows and the specialized data-minimized and GDPR friendly Age Verification flows.
You need to consider what data, what flow and what integration that suits your service best. 
Consult the technical documentation found at: https://signaturgruppen-a-s.github.io/signaturgruppen-broker-documentation/, look for MitID and MitID Age Verification.