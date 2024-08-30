# Signaturgruppen Age Verification demo

![](images/age_v_demo_1.PNG)

## Introduction
This example demonstrates a solution in pure vanilla JavaScript that integrates to Signaturgruppen Age Verification.

Setup for a predefined PP environment client, run the folder as a webapplication

See the sg-age-verify-config.js file for configuration parameters such as the age to verify and client id.

## Getting started
The example demonstrates how to setup a MitID age verification flow using only the included vanilla JavaScript to setup and verify the result. 
You need to serve the folder from a webserver in order to support the cross origin JavaScript (CORS) calls made from the example demo. 

### Quick testing on Windows
Windows has built-in support for Python, which is a very easy way to test the example. 
1. Clone or download to a folder
2. Open a prompt in the root of the example project (the one with index.html).
3. run 'python -m http.server 8000' (Windows will help the installation of Python)
4. open up http://localhost:8000

## MitID testusers. 
To test with MitID testusers in the PP environment, use the official MitID testtool: https://pp.mitid.dk/test-tool/frontend/#/create-identity.

## It works! Now what?
The example demo has demonstrated a full age verification flow and can be used as a template for the integration into your own service.

However, there a some things you need to consider:

### Nonce and ID token validation (you need a backend)
The example generates a random nonce and passes this to the included JavaScript for each flow. The nonce should be uniquely generated in your backend for each age verification flow as this is passed back in the returned signed ID token (JWT) received as the receipt for the MitID age verification flow.
In order to properly support a strong age verification mechanism, your integration should be protected from simple browser-tampering of HTML/JS at runtime. The provided example demo validates the age verification result received (ID token) directly in JavaScript.

**Your backend should**
* Generate a new unique nonce for each flow
* Validate the received ID token and match the ID token with the expected value.

See the technical documentation for more details and considerations. 

### We do not have a backend, what to do?
This example demo can be used as a template for a MitID age verification integration and works fully without a backend setup. 
If your service chooses to implement age verification this way without a backend, you must ensure that you have understood the implications and limitations of this approach.

In particular, the flow might be tampered in-browser by the end-user if you do not properly setup and validate the flows using a backend. JavaScript hardening might be required as a minimum effort to circumvent misuse.

## Documentation
https://signaturgruppen-a-s.github.io/signaturgruppen-broker-documentation/ageverification/age_verification.html
