#XRAY
Peer into the Lattice 

[![Build Status](https://travis-ci.org/pivotal-cf-experimental/xray.svg?branch=master)](https://travis-ci.org/pivotal-cf-experimental/xray)

![X-ray](../master/lattice-xray.png?raw=true)
![screenshot](../master/screenshot.png?raw=true)

##Installation
To get started with xray:
```sh
git clone git@github.com:pivotal-cf-experimental/xray.git
cd xray
npm install
RECEPTOR_URL='http://receptor.example.com' node_modules/.bin/gulp s
```
There should now be a server listening on port 3000 that will visualize the state of the lattice instance at `RECEPTOR_URL`

If you would like basic auth, use
```sh
XRAY_USER='user' XRAY_PASSWORD='password' RECEPTOR_URL='http://receptor.example.com' node_modules/.bin/gulp s
```
where you are free to choose user and password.

##Deployment

To deploy to your own CF, follow the steps in `Installation`, make sure your cf cli is logged in, then:
```
NODE_ENV=production gulp assets
cf push
```

For a blue-green deployment, you can add an entry to `config/deploy.json` and use
```
ENV=KEY_IN_DEPLOY.JSON node_modules/.bin/gulp deploy
```

##Development

To run server:
```sh
gulp s
```

To run tests:
```sh
npm test
```

This assumes you have phantomjs installed in your environment.

(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.
