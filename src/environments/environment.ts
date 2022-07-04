// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase : {
    apiKey: "AIzaSyDZ_CjAMVMhwNuwLo0UcERyaQvo4AYjWB4",
    authDomain: "cargamesofkau.firebaseapp.com",
    projectId: "cargamesofkau",
    storageBucket: "cargamesofkau.appspot.com",
    messagingSenderId: "427001139833",
    appId: "1:427001139833:web:d924e1a90e051095b4faa8"
  },
  production: false,
  //apiUrl: 'https://cargamesofkau.herokuapp.com',
  apiUrl: 'http://localhost:8080',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
