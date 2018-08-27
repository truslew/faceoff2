// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyBAxbibd1n0y1LP7q41fJ37FJ-0FxXTZbg',
        authDomain: 'faceoff-1b3f7.firebaseapp.com',
        databaseURL: 'https://faceoff-1b3f7.firebaseio.com',
        projectId: 'faceoff-1b3f7',
        storageBucket: 'faceoff-1b3f7.appspot.com',
        messagingSenderId: '651962176548'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
