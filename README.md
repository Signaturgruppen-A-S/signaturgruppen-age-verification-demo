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
To test with MitID testusers in the PP environment, you can use one of our [prebuilt MitID testusers](https://signaturgruppen-a-s.github.io/signaturgruppen-broker-documentation/ageverification/age_verification.html#getting-started--open-quick-testing) or other any available MitID testuser.

## It works! Now what?
The example demo has demonstrated a full age verification flow and can be used as a template for the integration into your own service.

Please fully read and understand the [technical documentation](https://signaturgruppen-a-s.github.io/signaturgruppen-broker-documentation/ageverification/age_verification.html), which adresses the things you should consider before you can wrap up your integration.

## Documentation
https://signaturgruppen-a-s.github.io/signaturgruppen-broker-documentation/ageverification/age_verification.html
