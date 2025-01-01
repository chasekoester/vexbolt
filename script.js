// Function to fetch VexBolt follower data from TokCount website using querySelector
function fetchFollowerData() {
    // URL of the TokCount page for the user (replace with the actual TokCount page URL)
    const url = 'https://tokcount.com/?user=vexbolts'; // Replace with actual URL

    // Use the Fetch API to load the webpage
    fetch(url)
        .then(response => response.text())  // Get the HTML content of the page
        .then(html => {
            // Parse the HTML content to extract the follower count
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Example: Query for the follower count element (adjust selector as needed)
            const followerElement = doc.querySelector('.follower-count'); // Update this to the correct selector
            if (followerElement) {
                const followerCount = followerElement.textContent.trim();
                console.log('Follower Count: ', followerCount);

                // Display the follower count on the page
                document.getElementById('current-followers').innerText = `VexBolt Current Followers: ${followerCount}`;

                // Calculate follower loss rate (this is a placeholder and should be updated based on your logic)
                const previousFollowers = 1000; // Placeholder for previous followers (update as needed)
                const followerLossRate = calculateFollowerLossRate(previousFollowers, parseInt(followerCount));
                document.getElementById('follower-loss-rate').innerText = `VexBolt Follower Loss Rate: ${followerLossRate} followers per minute`;
            } else {
                console.error('Could not find the follower count on the page.');
                document.getElementById('current-followers').innerText = 'Error: Follower data not found.';
                document.getElementById('follower-loss-rate').innerText = '';
            }

            // Update the time remaining until 11:59 PM EST
            setInterval(() => {
                document.getElementById('time-remaining').innerText = getTimeRemaining();
            }, 1000); // Update every second
        })
        .catch(error => {
            console.error('Error fetching the TokCount page:', error);
            document.getElementById('current-followers').innerText = 'Error: Failed to load page.';
            document.getElementById('follower-loss-rate').innerText = '';
        });
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

