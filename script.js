// Function to fetch VexBolt follower data
function fetchFollowerData() {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            try {
                const response = JSON.parse(this.responseText);
                console.log(response); // Log the response to check its structure

                // Check if the response contains the expected structure and data
                if (response && response.data && response.data.followersCount !== undefined) {
                    const currentFollowers = response.data.followersCount;
                    document.getElementById('current-followers').innerText = `VexBolt Current Followers: ${currentFollowers}`;

                    // Example of previous followers value
                    const previousFollowers = 1000; // Example static value, update as needed
                    const followerLossRate = calculateFollowerLossRate(previousFollowers, currentFollowers);
                    document.getElementById('follower-loss-rate').innerText = `VexBolt Follower Loss Rate: ${followerLossRate} followers per minute`;
                } else {
                    console.error('VexBolt followers count data is missing or the response structure is incorrect');
                    document.getElementById('current-followers').innerText = 'Error: VexBolt follower data not available.';
                    document.getElementById('follower-loss-rate').innerText = '';
                }

                // Update the time remaining until 11:59 PM EST
                setInterval(() => {
                    document.getElementById('time-remaining').innerText = getTimeRemaining();
                }, 1000); // Update every second
            } catch (error) {
                console.error('Error parsing API response:', error);
                document.getElementById('current-followers').innerText = 'Error parsing VexBolt follower data.';
                document.getElementById('follower-loss-rate').innerText = '';
            }
        }
    });

    // Replace 'userId' with VexBolt's actual TikTok user ID
    const vexboltsUserId = '6918910644826342405'; // VexBolt's user ID
    xhr.open('GET', `https://tiktok-api23.p.rapidapi.com/api/user/followers?userId=${vexboltsUserId}&count=50&minCursor=0&maxCursor=0`);
    xhr.setRequestHeader('x-rapidapi-key', '37d2fba656msh0764c91b2acf93fp17ddc2jsn5fbca28be25e');
    xhr.setRequestHeader('x-rapidapi-host', 'tiktok-api23.p.rapidapi.com');
    
    xhr.send();
}

// Function to calculate follower loss rate (dummy example logic)
function calculateFollowerLossRate(previousFollowers, currentFollowers) {
    const timeElapsed = 5; // Assuming the data is updated every 5 minutes
    const loss = previousFollowers - currentFollowers;
    return loss / timeElapsed;
}

// Function to calculate time remaining until 11:59 PM EST
function getTimeRemaining() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 0); // Set to 11:59:59 PM

    const timeDiff = endOfDay - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Call the function when the page loads
window.onload = fetchFollowerData;


// Function to calculate follower loss rate (dummy example logic)
function calculateFollowerLossRate(previousFollowers, currentFollowers) {
    const timeElapsed = 5; // Assuming the data is updated every 5 minutes
    const loss = previousFollowers - currentFollowers;
    return loss / timeElapsed;
}

// Function to calculate time remaining until 11:59 PM EST
function getTimeRemaining() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 0); // Set to 11:59:59 PM

    const timeDiff = endOfDay - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Call the function when the page loads
window.onload = fetchFollowerData;

