function runMower(){


  let splittedInput = document.getElementById('inp').value.split('\n');

  let line1 = splittedInput[0];
  let line2 = splittedInput[1];
  let line3 = splittedInput[2];
  let line4 = splittedInput[3];
  let line5 = splittedInput[4];


  // Rectangular surface
  let columns = line1[0];
  let rows = line1[2];
  let grid = document.createElement('div');
  grid.className = 'grid';
  for (let i = 0; i < columns; ++i) {
      let column = document.createElement('div');
      column.className = 'column';
      for (let j = 0; j < rows; ++j) {
          let row = document.createElement('div'); 
          row.className = 'row';
          row.textContent = i + '-' +j;
          column.appendChild(row); 
      }
      grid.appendChild(column);
  }
  document.body.appendChild(grid);

  // Input control parameter from textArea
  const instructionOne = [line2, line3];
  const instructionTwo = [line4, line5];
  

  // Function that takes the instructions as input and generates the final position of the mower
  function getMowerPosition(instructions) {

    const position = instructions[0].split(" ");
    let x = parseInt(position[0]);
    let y = parseInt(position[1]);
    let facing = position[2];
    const moves = instructions[1].split("");
    // console.log(moves)
    const move = {
      N: [0, 1],
      E: [1, 0],
      S: [0, -1],
      W: [-1, 0],
    };

    // Rotate left
    function rotateLeft() {
      const faces = { N: "W", W: "S", S: "E", E: "N" };
      facing = faces[facing];
    }

    // Rotate Right
    function rotateRight() {
      const faces = { N: "E", E: "S", S: "W", W: "N" };
      facing = faces[facing];
    }

    // Funtion advance mower
    function moveForward() {
      const movement = move[facing];
      x += movement[0];
      y += movement[1];
    }

    // Loop through the moves and adjust the mower position/direction
    for (let i = 0; i < moves.length; i++) {
      const movement = moves[i];
      // console.log(`movement is ${movement}`)
      if (movement === "D") {
        rotateLeft();
      } else if (movement === "G") {
        rotateRight();
      } else if (movement === "A") {
        moveForward();
      } else {
        console.log("Invalid instruction");
        return;
      }
      

    }


    // Final position of mower
    return `${x} ${y} ${facing}`;

  }

  // Call the function for each set of instructions and log the results
  let result1 = getMowerPosition(instructionOne);
  let result2 = getMowerPosition(instructionTwo);

  document.getElementById('result1').innerText = `
  Mower 1 final position
  ${result1}
 `;

 document.getElementById('result2').innerText = `
 Mower 2 final position
 ${result2}
`;


}
