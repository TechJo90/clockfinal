const timeZones = {
    'NewYork': -5,
    'LosAngeles': -8,
    'Paris': 1,
    'Tokyo': 9,
    'Sydney': 11,
    'London': 0
};

const localOffset = -(new Date().getTimezoneOffset() / 60);

function updateClocks() {
    const now = new Date();
    
    updateClock('local', now, localOffset);
    updateClock('la', now, timeZones.LosAngeles);
    updateClock('paris', now, timeZones.Paris);
}

function updateClock(id, baseTime, offset) {
    const time = new Date(baseTime);
    
    time.setHours(time.getUTCHours() + offset);
    
    let hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    document.getElementById(`${id}Time`).textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById(`${id}AmPm`).textContent = ampm;
    
    const day = time.getDate();
    let dayStr = day.toString();
    
    if (day % 10 === 1 && day !== 11) {
        dayStr += 'st';
    } else if (day % 10 === 2 && day !== 12) {
        dayStr += 'nd';
    } else if (day % 10 === 3 && day !== 13) {
        dayStr += 'rd';
    } else {
        dayStr += 'th';
    }
    
    const monthStr = time.toLocaleString('en-US', { month: 'long' });
    const yearStr = time.getFullYear();
    
    const formattedDate = `${monthStr} ${dayStr} ${yearStr}`;
    
    if (document.getElementById(`${id}Date`)) {
        document.getElementById(`${id}Date`).textContent = formattedDate;
    }
}

document.getElementById('citySelect').addEventListener('change', function() {
    const selectedCity = this.value;
    if (selectedCity) {
        document.getElementById('localCityName').textContent = selectedCity.replace(/([A-Z])/g, ' $1').trim();
    } else {
        document.getElementById('localCityName').textContent = 'New York';
    }
});

updateClocks();
setInterval(updateClocks, 1000);
