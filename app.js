const seatMap = {
    rows: 10,
    columns: 10,
    seats: []
};

// Generate random seat data
for (let i = 0; i < seatMap.rows; i++) {
    const row = [];
    for (let j = 0; j < seatMap.columns; j++) {
        row.push({
            id: `seat-${i}-${j}`,
            reserved: Math.random() > 0.7
        });
    }
    seatMap.seats.push(row);
}

function generateSeatMap() {
    const seatMapContainer = document.querySelector('.seat-map');
    seatMapContainer.innerHTML = ''; // Clear existing content

    seatMap.seats.forEach(row => {
        row.forEach(seat => {
            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');
            if (seat.reserved) {
                seatElement.classList.add('reserved');
            }
            seatElement.setAttribute('id', seat.id);
            seatElement.addEventListener('click', () => selectSeat(seat));
            seatMapContainer.appendChild(seatElement);
        });
    });
}

const mq = window.matchMedia("(max-width: 767px)");

function handleMediaQueryChange(e) {
    if (e.matches) {
        // Handle mobile layout
        generateSeatAreas();
    } else {
        // Handle desktop layout
        generateSeatMap();
    }
}

mq.addListener(handleMediaQueryChange);
handleMediaQueryChange(mq);

function generateSeatAreas() {
    const seatMapContainer = document.querySelector('.seat-map');
    seatMapContainer.innerHTML = ''; // Clear existing content

    for (let i = 0; i < seatMap.rows; i += 5) {
        for (let j = 0; j < seatMap.columns; j += 5) {
            const areaElement = document.createElement('div');
            areaElement.classList.add('seat-area');
            areaElement.textContent = `Area ${i / 5 + 1}-${j / 5 + 1}`;
            areaElement.addEventListener('click', () => showSeatArea(i, j));
            seatMapContainer.appendChild(areaElement);
        }
    }
}

function showSeatArea(startRow, startCol) {
    const seatMapContainer = document.querySelector('.seat-map');
    seatMapContainer.innerHTML = ''; // Clear existing content

    for (let i = startRow; i < startRow + 5 && i < seatMap.rows; i++) {
        for (let j = startCol; j < startCol + 5 && j < seatMap.columns; j++) {
            const seat = seatMap.seats[i][j];
            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');
            if (seat.reserved) {
                seatElement.classList.add('reserved');
            }
            seatElement.setAttribute('id', seat.id);
            seatElement.addEventListener('click', () => selectSeat(seat));
            seatMapContainer.appendChild(seatElement);
        }
    }
    document.getElementById('back-button').style.display = 'block';
}

document.getElementById('back-button').addEventListener('click', () => {
    generateSeatAreas();
    document.getElementById('back-button').style.display = 'none';
});

let selectedSeat = null;

function selectSeat(seat) {
    if (seat.reserved) return;

    if (selectedSeat) {
        document.getElementById(selectedSeat.id).classList.remove('selected');
    }
    selectedSeat = seat;
    document.getElementById(seat.id).classList.add('selected');
    document.getElementById('reserve-button').style.display = 'block';
}

document.getElementById('reserve-button').addEventListener('click', () => {
    if (selectedSeat) {
        alert(`Reserved Seat: ${selectedSeat.id}`);
        selectedSeat.reserved = true;
        document.getElementById(selectedSeat.id).classList.add('reserved');
        document.getElementById(selectedSeat.id).classList.remove('selected');
        selectedSeat = null;
        document.getElementById('reserve-button').style.display = 'none';
    }
});
