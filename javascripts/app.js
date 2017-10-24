// Rover Object Goes Here
var rover = {
  direction: 'N',
  x: 0,
  y: 0,
  travelLog: [],
};

// Grid
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
    case 'W':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'N';
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
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
  }

  console.log('Rover is now facing ' + rover.direction);
}

// TODO: Prevent the Rover from colliding with obstacles

function isObstacle(x, y) {
  for (j = 0; j < grid.length; j++) {
    row = grid[j];

    for (w = 0; w < row.length; w++) {
      column = row[w];

      if (column === 'O') {
        for (z = 0; z < column.length; z++) {
          axisX = w;
          axisY = j;
          if (axisX == x && axisY == y) {
            console.log('✗ Caution! Obstacle found ' + '[' + axisX + ', ' + axisY + ']');
          }
        }
      }
    }
  }
}

function moveForward(rover) {
  console.log('Current direction: ' + rover.direction);
  console.log('Current position: ' + '[' + rover.x + ', ' + rover.y + ']');

  if (!isObstacle(rover.x, rover.y)) {
    switch (rover.direction) {
      case 'N':
        if (rover.y > 0) {
          rover.y -= 1;
        } else {
          console.log('✗ Rover cant move outside of the grid');
        }

        break;
      case 'S':
        if (rover.y < 9) {
          rover.y += 1;
        } else {
          console.log('✗ Rover cant move outside of the grid');
        }

        break;
      case 'E':
        if (rover.x < 9) {
          rover.x += 1;
        } else {
          console.log('✗ Rover cant move outside of the grid');
        }

        break;
      case 'W':
        if (rover.x > 0) {
          rover.x -= 1;
        } else {
          console.log('✗ Rover cant move outside of the grid');
        }
    }
    console.log('Position after command: ' + '[' + rover.x + ', ' + rover.y + ']');
    saveCoordinates(rover.x, rover.y);
  }
}

function moveBackward(rover) {
  console.log('Current direction: ' + rover.direction);
  console.log('Current position: ' + '[' + rover.x + ', ' + rover.y + ']');

  if (!isObstacle(rover.x, rover.y)) {
    switch (rover.direction) {
      case 'N':
        if (rover.y < 9) {
          rover.y += 1;
        } else {
          console.log('✗ Rover cant move outside of the grid');
        }

        break;
      case 'S':
        if (rover.y > 0) {
          rover.y -= 1;
        } else {
          console.log('✗ Rover cant move outside of the grid');
        }

        break;
      case 'E':
        if (rover.x > 0) {
          rover.x -= 1;
        } else {
          console.log('✗ Rover cant move outside of the grid');
        }

        break;
      case 'W':
        if (rover.x < 9) {
          rover.x += 1;
        } else {
          console.log('✗ Rover cant move outside of the grid');
        }
    }
  }

  console.log('Position after command: ' + '[' + rover.x + ', ' + rover.y + ']');
  saveCoordinates(rover.x, rover.y);
}

var commands = [
  'r', 'f', 'f', 'r', 'f', 'f', 'l', 'f', 'r', 'f', 'f',
  'f', 'f', 'f', 'f', 'f', 'f', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'z',
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
    console.log('[' + i + ']' + 'Command executed' +  ': "' + commands[i] + '"');
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
console.log('\n');
