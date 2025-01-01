// Function to calculate time remaining until 11:59 PM EST
function getTimeRemaining() {
    const now = new Date();
    const estOffset = -5; // EST offset from UTC
    const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    
    const endOfDay = new Date(estTime);
    endOfDay.setHours(23, 59, 59, 999); // Set time to 11:59:59.999 PM
  
    const timeDiff = endOfDay - now; // Time remaining in milliseconds
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  
  // Function to calculate followers loss rate based on the previous data
  function calculateFollowerLossRate(previousFollowers, currentFollowers) {
    const timeElapsed = 60; // Assume we check once a minute, so 60 seconds
    const followerLossRate = (previousFollowers - currentFollowers) / timeElapsed;
    return followerLossRate.toFixed(2); // Loss rate per minute
  }
  
  function fetchFollowerData() {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        const response = JSON.parse(this.responseText);
        
        // Debugging the API response to check its structure
        console.log(response);  // This will help you verify the structure
  
        if (response && response.data && response.data.followersCount) {
          const currentFollowers = response.data.followersCount;
          document.getElementById('current-followers').innerText = currentFollowers;
  
          // Placeholder for previous followers, you can store and compare previous data for rate calculation
          const previousFollowers = 1000; // Example static value for previous followers, update as needed
          const followerLossRate = calculateFollowerLossRate(previousFollowers, currentFollowers);
          document.getElementById('follower-loss-rate').innerText = followerLossRate;
        } else {
          console.error('followersCount not found in the API response.');
          document.getElementById('current-followers').innerText = 'Error: Follower data not available';
        }
  
        // Update the time remaining until 11:59 PM EST
        setInterval(() => {
          document.getElementById('time-remaining').innerText = getTimeRemaining();
        }, 1000); // Update every second
      }
    });
  
    xhr.open('GET', 'https://tiktok-api23.p.rapidapi.com/api/user/followers?secUid=MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6&count=50&minCursor=0&maxCursor=0');
    xhr.setRequestHeader('x-rapidapi-key', '37d2fba656msh0764c91b2acf93fp17ddc2jsn5fbca28be25e');
    xhr.setRequestHeader('x-rapidapi-host', 'tiktok-api23.p.rapidapi.com');
    
    xhr.send();
  }
  
  
  // Initialize the data fetch when the page loads
  window.onload = () => {
    fetchFollowerData();
  };
  
