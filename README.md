# top875211

## Guidance

Use node.js + mongodb as technical stack.

+   Prerequisite, install node@0.10.36, npm@1.4.28, mongodb@3.2.1
+   npm install to install dev dependencies.
+   Change config.js to do config, like mongodb address.
+   Run `node converter.js <XML FILE>` to do convert operation, for example `node converter.js sample/RU50-209-2013-913051-1739672.xml`, support multi games in one event feed. See sample/RU50-209-2013-913051-1739672.xml for details.
+   Run `node app.js` to start rest server. Get http://localhost:3000/api/match/913051 will return json. See Restapi.PNG.