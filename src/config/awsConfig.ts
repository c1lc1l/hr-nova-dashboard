import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-southeast-1_Ny5wE5wFR",
      userPoolClientId: "51t1jofcvd2pe965112eeq3vqp",
      loginWith: {
        oauth: {
          domain: "ap-southeast-1ny5we5wfr.auth.ap-southeast-1.amazoncognito.com",
          scopes: ["openid"],
          redirectSignIn: [
            "http://localhost:8080/",
            "https://demo.dllbbopag3snj.amplifyapp.com/",
          ],
          redirectSignOut: [
            "http://localhost:8080/",
            "https://demo.dllbbopag3snj.amplifyapp.com/",
          ],
          responseType: "code",
          providers: ["Google"],
        },
      },
    },
  },
});