import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import './Header.css'

const Header = () => {

  // Device related consts
  const [deviceWidth, changeDeviceWidth] = useState(window.innerWidth);
  const [deviceHeight, changeDeviceHeight] = useState(window.innerHeight);
  const [counter, setCounter] = useState(0);

  const FPS = 2;
  const renderPerCounter = FPS * 10;
  const ledDimmingRate = 1 / FPS;
  const [renderFps] = useState(1000 / (FPS * renderPerCounter));

  // Update the width and height on resize
  useEffect(() => {
    const resize = () => {
      changeDeviceWidth(window.innerWidth);
      changeDeviceHeight(window.innerHeight);
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  // Canvas related consts
  const canvas = useRef();
  const ctx = useRef(null);

  const drawing = useMemo(() => {
    return [
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 0, 1, 1, 1, 0],
    ]
  }, []);

  const [currCurrent, setCurrCurrent] = useState(
    Array.from({ length: drawing.length }, () => Array(drawing[0].length).fill(0))
  );

  // Function to draw a circle
  const drawCircle = useCallback((x, y, radius, color) => {
    ctx.current.beginPath(); // Start a new path
    ctx.current.arc(x, y, radius, 0, Math.PI * 2, false); // Create the circle
    ctx.current.fillStyle = color; // Set the fill color
    ctx.current.fill(); // Fill the circle with color
    ctx.current.closePath(); // Close the path
    ctx.current.stroke();
  }, [ctx]);

  // Function to draw the current
  const drawCurrent = useCallback((x, y, cellSize, isOn) => {
    if(isOn) {
      drawCircle(x, y, cellSize / 15, 'blue');
    } else {
      drawCircle(x, y, cellSize / 15, 'white');
    }
  }, [drawCircle]);

  // Function to draw a resistor
  const drawResistor = useCallback((x, y, cellSize, isOn) => {
    const resistorLength = cellSize / 2;
    const resistorHeight = cellSize / 10;
    const connectionLen = cellSize / 5;

    drawCurrent(x, y, cellSize, isOn);

    ctx.current.beginPath();
    ctx.current.moveTo(x + cellSize / 15, y); // a bit hacky, should get this from drawCurrent
    ctx.current.lineTo(x + connectionLen + resistorLength / 5, y);
    ctx.current.lineTo(x + connectionLen + resistorLength / 5, y);
    ctx.current.lineTo(x + connectionLen + resistorLength / 5 + resistorHeight, y - resistorHeight);
    ctx.current.lineTo(x + connectionLen + 2 * resistorLength / 5 - resistorHeight, y + resistorHeight);
    ctx.current.lineTo(x + connectionLen + 2 * resistorLength / 5 + resistorHeight, y - resistorHeight);
    ctx.current.lineTo(x + connectionLen + 3 * resistorLength / 5 - resistorHeight, y + resistorHeight);
    ctx.current.lineTo(x + connectionLen + 3 * resistorLength / 5, y);
    ctx.current.lineTo(x + cellSize, y);
    ctx.current.stroke();
  }, [ctx, drawCurrent]);

  // Function to draw an LED
  const drawLED = useCallback((x, y, cellSize, current) => {
    const ledLength = cellSize / 2.5;
    const height = ledLength * 0.866;
    const circleRadius = cellSize / 25;
    const connectionLen = cellSize / 5;
    const arcPart = cellSize / 25;
    
    // connection
    drawCircle(x + cellSize / 2, y, circleRadius, 'black');
    ctx.current.beginPath();
    ctx.current.moveTo(x + cellSize / 2, y);
    ctx.current.lineTo(x + cellSize / 2, y + connectionLen);
    ctx.current.stroke();
    
    // triangle
    ctx.current.beginPath();
    ctx.current.moveTo(x + cellSize / 2 - ledLength / 2, y + connectionLen);
    ctx.current.lineTo(x + cellSize / 2 + ledLength / 2, y + connectionLen);
    ctx.current.lineTo(x + cellSize / 2, y + connectionLen + height);
    ctx.current.lineTo(x + cellSize / 2 - ledLength / 2, y + connectionLen);
    const hex = Math.round(current * 255).toString(16).padStart(2, '0');
    ctx.current.fillStyle = `#${hex}${hex}${hex}`;
    ctx.current.fill();
    ctx.current.stroke();

    // bottom line
    ctx.current.beginPath();
    ctx.current.moveTo(x + cellSize / 2 - ledLength / 2, y + connectionLen + height);
    ctx.current.lineTo(x + cellSize / 2 + ledLength / 2, y + connectionLen + height);
    
    // connection
    ctx.current.moveTo(x + cellSize / 2, y + connectionLen + height); 
    ctx.current.lineTo(x + cellSize / 2, y + 2 * connectionLen + height - circleRadius - arcPart);
    ctx.current.moveTo(x + cellSize / 2 + arcPart, y + 2 * connectionLen + height - circleRadius);
    ctx.current.lineTo(x + cellSize, y + 2 * connectionLen + height - circleRadius);
    ctx.current.stroke();

    ctx.current.beginPath();
    ctx.current.arc(x + cellSize / 2 + arcPart, y + 2 * connectionLen + height - circleRadius - arcPart, arcPart, Math.PI / 2, Math.PI);
    ctx.current.stroke();

    drawCircle(x + cellSize, y + 2 * connectionLen + height - circleRadius, circleRadius, 'black');
  }, [ctx, drawCircle]);

  // Function to draw the ground
  const drawGround = useCallback((x, y, cellSize) => {
    const groundSize = cellSize / 4;

    ctx.current.beginPath();
    ctx.current.moveTo(x, y);
    ctx.current.lineTo(x, y + groundSize);
    ctx.current.moveTo(x - groundSize / 2, y + groundSize);
    ctx.current.lineTo(x + groundSize / 2, y + groundSize);
    ctx.current.moveTo(x - groundSize / 4, y + groundSize + groundSize / 4);
    ctx.current.lineTo(x + groundSize / 4, y + groundSize + groundSize / 4);
    ctx.current.moveTo(x - groundSize / 10, y + groundSize + groundSize / 2);
    ctx.current.lineTo(x + groundSize / 10, y + groundSize + groundSize / 2);
    ctx.current.stroke();
  }, [ctx]);

  // Function to draw the switch
  const drawSwitch = useCallback((x, y, cellSize, isOn) => {
    ctx.current.beginPath();    
    
    ctx.current.moveTo(x, y);
    ctx.current.lineTo(x - cellSize / 4, y + cellSize / 4);  
    ctx.current.moveTo(x, y);
    ctx.current.lineTo(x + cellSize / 4, y + cellSize / 4);
    
    ctx.current.moveTo(x + cellSize / 4, y + cellSize / 4);
    ctx.current.lineTo(x + cellSize / 4, y + cellSize / 2);
    ctx.current.stroke();
    drawCurrent(x + cellSize / 4, y + cellSize / 2, cellSize, true);
    drawGround(x - cellSize / 4, y + cellSize / 4, cellSize);
  }, [ctx, drawCurrent, drawGround]);

  // Function to draw the circuit
  const drawCircuit = useCallback(() => {
    // Clear the canvas.current
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

    // Define the grid and cell sizes
    const cellSize = canvas.current.width / (Math.max(drawing.length, drawing[0].length) + 2);
    const xOffset = Math.max(drawing[0].length - drawing.length, 0) * cellSize / 2;
    const yOffset = Math.max(drawing.length - drawing[0].length, 0) * cellSize / 2;;
    const startX = cellSize + xOffset;
    const startY = cellSize + yOffset;

    // Function to draw a resistor
    // Draw resistors on the left
    for (let i = 0; i < drawing[0].length; i++) {
      const y = startY + i * cellSize;
      drawResistor(startX - cellSize / 2, y, cellSize, drawing[Math.round(counter / renderPerCounter) % drawing.length][i] === 1);
    }

    // Draw LEDs
    for (let col = 0; col < drawing.length; col++) {
      for (let row = 0; row < drawing[0].length; row++) {
        drawLED(startX + col * cellSize, startY + row * cellSize, cellSize, currCurrent[col][row]);
      }
    }

    // Draw vertical connections
    for (let col = 0; col < drawing.length; col++) {
      const x = startX + col * cellSize + cellSize;
      ctx.current.beginPath();
      ctx.current.moveTo(x, startY - cellSize / 2);
      ctx.current.lineTo(x, startY + drawing[0].length * cellSize);
      ctx.current.stroke();
    }

    // Draw horizontal connections
    for (let row = 0; row < drawing[0].length; row++) {
      const y = startY + row * cellSize;
      ctx.current.beginPath();
      ctx.current.moveTo(startX - cellSize / 2 + cellSize, y);
      ctx.current.lineTo(startX + drawing.length * cellSize + cellSize / 2, y);
      ctx.current.stroke();
    }

    // Draw ground connections at the bottom
    for (let col = 0; col < drawing.length; col++) {
      const x = startX + col * cellSize + cellSize;
      const y = startY + drawing[0].length * cellSize;
      drawSwitch(x, y, cellSize, counter % drawing.length === col);
    }
  }, [ctx, drawing, counter, drawLED, drawResistor, drawSwitch, currCurrent, renderPerCounter]);

  // initialize the canvas.current context
  useEffect(() => {
    // dynamically assign the width and height to canvas.current
    canvas.current.width = Math.min(deviceWidth, 800);
    canvas.current.height = canvas.current.width;

    // get context of the canvas.current
    ctx.current = canvas.current.getContext("2d");

    // Initial canvas.current setup
    drawCircuit();
  }, [deviceWidth, deviceHeight, drawCircuit]);

  useEffect(() => {
    const renderInterval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);

      setCurrCurrent(prevCurrCurrent => {
        let updatedCurrent = prevCurrCurrent.map(row => [...row]); // Deep copy the current state
        for (let i = 0; i < updatedCurrent.length; i++) {
          for (let j = 0; j < updatedCurrent[0].length; j++) {
            if (i === Math.round(counter / renderPerCounter) % drawing.length && drawing[i][j] === 1) { // Replace this condition with the actual logic
                updatedCurrent[i][j] = 1;
            } else { // Replace this condition with the actual logic
              updatedCurrent[i][j] = Math.max(0, prevCurrCurrent[i][j] - ledDimmingRate);
            }
          }
        }
        return updatedCurrent;
      });
    }, renderFps);
  
    return () => clearInterval(renderInterval);
  }, [renderFps, drawCircuit, setCurrCurrent, currCurrent, counter, drawing, ledDimmingRate, renderPerCounter]);

  return (<div className="header-bg"><canvas ref={canvas} id="circuitCanvas"></canvas></div>);
}

export default Header;