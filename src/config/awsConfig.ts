import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-southeast-1_ckva42EEf",
      userPoolClientId: "udp52khuict957upk89nvsm24",
      loginWith: {
        oauth: {
          domain: "hrnova.auth.ap-southeast-1.amazoncognito.com",
          scopes: ["openid"],
          redirectSignIn: [
            "http://localhost:8080/",
            "https://main.d1nv6c1g73n3ic.amplifyapp.com/",
          ],
          redirectSignOut: [
            "http://localhost:8080/",
            "https://main.d1nv6c1g73n3ic.amplifyapp.com/",
          ],
          responseType: "code",
          providers: ["Google"],
        },
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: "https://qpxtbjchxfgdzlux6lj4m3x6pa.appsync-api.ap-southeast-1.amazonaws.com/graphql",
      region: "ap-southeast-1",
      defaultAuthMode: "userPool",
    },
  },
});