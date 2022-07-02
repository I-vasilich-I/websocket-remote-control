# websocket-remote-control
NodeJS websocket remote control

## How to run project

1. Clone repository with command `git clone https://github.com/I-vasilich-I/websocket-remote-control.git`
2. Open project in VSCode (for example)
3. Run command `npm i` in terminal (console) for installing all required packages (Node.js is required: <https://nodejs.org/en/>)
4. For running project you can use the following commands:
   - `npm run start` - run development hot-reloaded version with nodemon
   - `npm run lint` - run linters

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Use 16 LTS version of Node.js
- Only [ws](https://www.npmjs.com/package/ws), [robotjs](https://www.npmjs.com/package/robotjs), [jimp](https://www.npmjs.com/package/jimp), `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `nodemon`, `dotenv`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*` and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer) are allowed
- The program is started by npm script `start` in following way:
```bash
npm run start 
```
- After starting the program displays websocket parameters
- After program work finished the program should end websocket work correctly  
- After each received command program should display the command and result
- All commands should be ended with **\0**

List of websocket commands and their syntax (<- - cmd from frontend, -> - answer):
- Navigation over the x and y axis
    - Move mouse up
    ```bash
    <- mouse_up {y px}
    ```
    - Move mouse down
    ```bash
    <- mouse_down {y px}
    ```
    - Move mouse left
    ```bash
    <- mouse_left {x px}
    ```
    - Move mouse right
    ```bash
    <- mouse_right {x px}
    ```
    - Send mouse coordinates
    ```bash
    <- mouse_position
    -> mouse_position {x px},{y px}
    ```
- Drawing
    - Draw circle with pushed left button: 
    ```bash
    <- draw_circle {px}
    ```
    - Draw rectangle with pushed left button: 
    ```bash
    <- draw_rectangle {px} {px}
    ```
    - Draw square with pushed left button: 
    ```bash
    <- draw_square {px}
    ```
- Print screen
    - Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position):
    ```bash
    <- prnt_scrn
    -> prnt_scrn {base64 string (png buf)}
    ```
    
