let defaultColor = '#800080'; // Default color set to purple
        let isRainbow = false;
        let darkening = false;
        let isDrawing = false;

        generateGrid(16);

        document.getElementById("colorPicker").addEventListener("input", function(event) {
            isRainbow = false;
            darkening = false;
            defaultColor = event.target.value; 
        });

        document.getElementById("darkening").addEventListener("click", function(event) {
            darkening = true;
            isRainbow = false;
        });

        document.getElementById("colorful").addEventListener("click", function(event) {
            darkening = false;
            isRainbow = true;
        });

        document.getElementById("erase").addEventListener("click", function(event) {
            const gridItems = document.querySelectorAll('.grid-item');
            gridItems.forEach(item => {
                item.style.backgroundColor = '#d3d3d3'; 
                item.style.filter = ''; 
                item.dataset.brightness = ''; 
            });
        });

        function myPrompt() {
            let userGridSize = prompt("Please provide the number of squares per side for the new grid (max: 100)", "16");
            if (isNaN(userGridSize) || userGridSize <= 0 || userGridSize > 100) {
                alert("Please enter a number between 1 and 100.");
                return;
            }
            removeOldGrid();
            generateGrid(userGridSize);
        }

        // Function to remove the existing grid
        function removeOldGrid() {
            const gridContainer = document.getElementById('myContainer');
            while (gridContainer.firstChild) {
                gridContainer.removeChild(gridContainer.firstChild);
            }
        }

        function generateGrid(size) {
            const rows = size;
            const columns = size;
            
            const containerSize = 960; 
            const gridContainer = document.getElementById('myContainer');
            const gridItemSize = containerSize / size - 2; // Subtract 2px to account for gaps

            // Create the grid
            for (let i = 0; i < rows; i++) {
                const row = document.createElement('div');
                row.className = 'flex-container'; 
                for (let j = 0; j < columns; j++) {
                    // Create a grid item
                    const gridItem = document.createElement('div');
                    gridItem.className = 'grid-item';
                    gridItem.style.width = `${gridItemSize}px`;
                    gridItem.style.height = `${gridItemSize}px`;
                    row.appendChild(gridItem);

                    gridItem.addEventListener("mousedown", (event) => {
                        isDrawing = true; // Start drawing
                        draw(gridItem);
                    });

                    gridItem.addEventListener("mouseup", (event) => {
                        isDrawing = false; // Stop drawing
                    })

                    gridItem.addEventListener("mouseenter", (event) => {
                        if (isDrawing) {
                            draw(gridItem)
                        }
                    })
                }
                gridContainer.appendChild(row);
            }

            function draw(gridItem) {
                if (isRainbow) {
                    let randomColor = Math.floor(Math.random()*16777215).toString(16);
                    gridItem.style.backgroundColor = `#${randomColor}`;
                } else if (darkening) {
                    let currentBrightness = gridItem.dataset.brightness || 100;
                    currentBrightness = parseInt(currentBrightness) - 10;

                    if (currentBrightness >= 0) {
                        gridItem.style.filter = `brightness(${currentBrightness}%)`;
                        gridItem.dataset.brightness = currentBrightness;
                    }
                } else {
                    gridItem.style.backgroundColor = `${defaultColor}`;
                }
            }
        }