# CFB's Twitch Chatbot

A basic chatbot written in TypeScript for Node.js that uses WebSockets to receive IRC messages sent from Twitch. Message string is parsed to check for possible command headers and make appropriate responses, including some external API calls.

### Prerequisites

[ws: a Node.js WebSocket library](github.com/websockets/ws)
```
npm install ws
```

[node-XMLHttpRequest](https://github.com/driverdan/node-XMLHttpRequest)
```
npm install xmlhttprequest
```

## Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [Visual Studio](https://visualstudio.microsoft.com/)


## Acknowledgments

* Twitch user domfx for assistance in IRC parsing.
* BeansAcquired for input on code structure and debugging.
