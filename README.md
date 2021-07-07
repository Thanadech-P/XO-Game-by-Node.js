# XO-Game-by-Node.js
XO-Game for 1 Player and 2 Player

## Install (Node.js)
```
npm install express ejs method-override mongoose
```

## How to Run XO-Game (Node.js)
```
node index.js
```

## Start Game
![Start-Game](startgame.png)

## Use MongoDB 
** Start MongoDB for Recording Games **

## Design
- XO-Game for 1 Player and 2 Player
- Size Game 3x3, 4x4, 5x5, 6x6, 7x7, 8x8, 9x9, 10x10 (where you have to place your size consecutive to win)
- Every time you play Playback will also be recorded.
- Every click will check the winning pattern.
- Can view play History

## Algorithm
1. winning pattern. 
  - Every click will Check the winning pattern .
  - Every click will Check is Draw from value.
  - Is Winner or Uses an array to store playback position information.
  - Send Post for save to MongoDB.

2. AI
  - Check Position is "" save in Array
  - Use Array and Random Number in Position
  
3. Swap X & O
  - Start Player is X.
  - When Click Change X to O use innerText.

4. Show Replay
  - get data from Database
  - use Array for position by for of
  - check if X , O , "" for display

## How to Win
### 3x3
![3x3](3x3.png)
