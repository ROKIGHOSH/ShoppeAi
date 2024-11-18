document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Add user message
    addMessage(userMessage, 'user-message');

    // Clear input field
    input.value = '';

    // Fetch response
    const response = await fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
    });
    const data = await response.json();

    // Add bot response
    addMessage(data.answer, 'bot-message');
});

function addMessage(text, className) {
    const chatBody = document.getElementById('chat-body');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${className}`;
    bubble.textContent = text;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
}
