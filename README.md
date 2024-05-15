# omigame
 A multiplayer online card game has been crafted using React and Nodejs. The game accommodates four players simultaneously and incorporates various libraries and frameworks to enhance the gaming experience.

## Prerequisites
+ Git: https://git-scm.com
+ nodejs: https://nodejs.org/en/download
***

## Installation
**Step 1:** Open Git bash and clone the repository or use [github desktop](https://desktop.github.com/) to clone the repository.
```bash
gh repo clone nipun-dezoysa/omigame
```
***

**Step 2 :** open the terminal and change directory to server. Install express js and other packages and run the server.
```bash
cd server
npm install
npm start
```
***

**Step 3:** Open the project from code editor and change the socket variable value to io("http://localhost:3001/", {}) in src/GameContextProvider.js.
```js
const socket = io("http://localhost:3001/", {});
```
***

**Step 4 :** open another the terminal and change directory to client. Install npm packages and run the client.
```bash
cd client
npm install
npm start
```
***

**Step 5 :** Now the website should launch in the web browser.
***
