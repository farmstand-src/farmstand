# farmstand

Built using ReactJS and [Firebase](http://firebase.com/). ReactJS has all the views and helper methods calling into Firebase.

## install
1. Install node.js and npm
2. Clone the repo
3. Run `npm install` to install all the node_modules
4. Run `npm start` which does compilation of the sources and watches for any changes for recompiles

## running
1. The sources are built into a 'build' directory
2. Start a HTTP server from the build directory (on Mac, `python -m SimpleHTTPServer` from inside the build directory
3. Use any browser and navigate to http://localhost:8000

## deploying
1. We use Firebase's hosting for running the application. Install [firebase-tools](https://www.firebase.com/docs/hosting/command-line-tool.html) to deploy the application
2. Initialize once by running `firebase init`
3. Everytime you want to deploy the application, run `firebase deploy`
