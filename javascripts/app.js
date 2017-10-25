var rover = {
  direction: 'N',
  x: 0,
  y: 0,
  travelLog: [],
};

// Obstacles [9, 1], [2, 2], [6, 3], [3, 4], [2, 6], [7, 7], [3, 8], [2, 9]
var grid = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, 'O'],
  [null, null, 'O', null, null, null, null, null, null, null],
  [null, null, null, null, null, null, 'O', null, null, null],
  [null, null, null, 'O', null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, 'O', null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, 'O', null, null],
  [null, null, null, 'O', null, null, null, null, null, null],
  [null, null, 'O', null, null, null, null, null, null, null],
];

console.table(grid);

function turnLeft(rover) {

  console.log('Current direction: ' + rover.direction);
  console.log('Current position: ' + '[' + rover.x + ', ' + rover.y + ']');
  console.log('<<== Rover turning left');

  switch (rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'W':
      rover.direction = 'S';
  }

  console.log('Rover is now facing ' + rover.direction);
}

function turnRight(rover) {

  console.log('Current direction: ' + rover.direction);
  console.log('Current position: ' + '[' + rover.x + ', ' + rover.y + ']');
  console.log('Rover turning right ==>>');

  switch (rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'W':
      rover.direction = 'N';
  }

  console.log('Rover is now facing ' + rover.direction);
}

function moveForward(rover) {
  console.log('Current direction: ' + rover.direction);
  console.log('Current position: ' + '[' + rover.x + ', ' + rover.y + ']');

  var x = rover.x;
  var y = rover.y;
  switch (rover.direction) {
    case 'N':
      y -= 1;
      break;
    case 'S':
      y += 1;
      break;
    case 'E':
      x += 1;
      break;
    case 'W':
      x -= 1;
  }

  if (y >= 0 && y <= 9 && x >= 0 && x <= 9) {

    if (grid[x][y] !== 'O') {
      console.log('✓ Rover within the grid, moving forward _-_-_-');
      rover.x = x;
      rover.y = y;
    } else { console.log('✗ Rover cant move forward due to obstacle'); }

  } else { console.log('✗ Rover cant operate outside of the grid'); }

  console.log('Position after command: ' + '[' + rover.x + ', ' + rover.y + ']');
  saveCoordinates(rover.x, rover.y);
}

function moveBackward(rover) {
  console.log('Current direction: ' + rover.direction);
  console.log('Current position: ' + '[' + rover.x + ', ' + rover.y + ']');

  var x = rover.x;
  var y = rover.y;
  switch (rover.direction) {
    case 'N':
      y += 1;
      break;
    case 'S':
      y -= 1;
      break;
    case 'E':
      x -= 1;
      break;
    case 'W':
      x += 1;
  }

  if (y >= 0 && y <= 9 && x >= 0 && x <= 9) {

    if (grid[x][y] !== 'O') {
      console.log('✓ Rover within the grid, moving backwards _-_-_-');
      rover.x = x;
      rover.y = y;
    } else { console.log('✗ Rover cant move backwards due to obstacle'); }

  } else { console.log('✗ Rover cant operate outside of the grid'); }

  console.log('Position after command: ' + '[' + rover.x + ', ' + rover.y + ']');
  saveCoordinates(rover.x, rover.y);
}

var commands = [
  'r', 'f', 'f', 'r', 'f', 'f', 'l', 'f', 'r', 'f', 'f',
  'f', 'f', 'f', 'f', 'f', 'f', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'z', 'b', 'b', 'b', 'z',
];

function roverCommands(commands) {

  console.log('Commands: ' + commands + ' [' + commands.length + ']');
  console.log('Pos X: [' + rover.x + ']' + '\n' + 'Pos Y: [' + rover.y + ']' + '\n' + '\n');

  for (i = 0; i <= commands.length - 1; i++) {
    switch (commands[i]) {
      case 'f':
        moveForward(rover);
        break;
      case 'b':
        moveBackward(rover);
        break;
      case 'r':
        turnRight(rover);
        break;
      case 'l':
        turnLeft(rover);
        break;
      default:
        console.log('✗ Unknown command, allowed: "f", "b", "r", "l"');
    }
    console.log('[' + i + ']' + 'Command entered' +  ': "' + commands[i] + '"');
    console.log('\n');
  }
}

function saveCoordinates(x, y) {
  rover.travelLog.push([x, y]);
}

roverCommands(commands);

console.log('... Last direction detected: ' + rover.direction);
console.log('... Last position detected: ' + '[' + rover.x + ', ' + rover.y + ']');
console.log('... Position log: ' + rover.travelLog);
