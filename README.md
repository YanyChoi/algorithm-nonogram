# **Algorithm Team 2 Project Descriptions**

**YOU MUST INSTALL NODE.JS BEFORE THIS PROCESS!!! <https://nodejs.org/en/>**

## **Structure**

This project is used by  `Create React App` , a framework for the  `React.js` library of  `JavaScript` . We’re using `TypeScript` as well, which strictly holds the types in  `JavaScript` .
```
build --> Build results 
node_modules --> Dependencies downloaded by npm install 
public 
    index.html --> Base HTML file including <head> options 
src 
    - components --> UI Components used in React.js 
    - context --> Global variables shared between components 
    - hooks --> React Hooks used in React.js 
    - types --> Types defined for TypeScript 
    - utils --> Actual logic used in the project 


package.json --> Includes configuration of project, automatically updates when dependency is changed.
```
`utils` folder includes all the logic included for automated nonogram

All the other UI-related code exists in `components`, `context`, `hooks`.

## **Initialization**

install node.js to test the react project.

Go to the designated directory and use command `npm install` to download the dependencies!

## **Usage**

if all the dependencies of the code are downloaded, the project is capable of testing/building/deployment.

Test: `npm run start` — It activates a temporary server in [http://localhost:3000, making](http://localhost:3000/) it capable for live testing, refreshing when files changed in the project.

Build: `npm run build` — Builds the whole project into a static page with webpack-based packaged JavaScript code.

Deployment: `npm run deploy` — automatically starts building, and deploys the build result to Github Pages; [https://yanychoi.github.io/algorithm-nonogram](https://yanychoi.github.io/algorithm-nonogram). The destination of deployment is stored in `homepage` section of `package.json`.

**Actual Page**

![Aspose Words 25c71a2b-a8a0-46c7-98d6-1353f22d3ea3 017](https://user-images.githubusercontent.com/51287461/229110393-bc89f3d4-7947-4630-8c9e-5e3cc1f53970.jpeg)


The progess bar (slider) on top determines the size of the table. **(n of the n\*n table)**

Pressing start, a random game is created, you can interact with the game board, and activates the two buttons on bottom; **AUTOMIZE, SUPPORT**. 

Clicking on each block, the content of the block changes between O, X, or blank in order. If you want to check if you got the answer correct, press **SUBMIT**, and it will show if the 

message is correct or not.

![Aspose Words 25c71a2b-a8a0-46c7-98d6-1353f22d3ea3 018](https://user-images.githubusercontent.com/51287461/229110425-ee9636f5-9957-4e90-a2d1-0e615aa599ad.jpeg)

Clicking **AUTOMIZE**, the board is automatically filled by the logic in `utils/auto-solve.ts`.

If you want to reset the game, press **RESET,** the whole board is wiped out, and the progress bar is reactivated, returning to the beginning state.
