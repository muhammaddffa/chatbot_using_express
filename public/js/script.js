function sendMessage() {
    const userInput = document.getElementById('userInput').value; // Capturing user input
    document.getElementById('response').innerText = 'Bot: Typing...'; // Feedback while waiting

    // Send data to the server and handle the response
    fetch('/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text: userInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = `Bot: ${data.reply}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Error: Could not talk to bot';
    });
}