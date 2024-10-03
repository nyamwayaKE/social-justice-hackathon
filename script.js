const petitions = [];
const polls = [];
const conversation =[];

function submitPetition(event) {
    event.preventDefault();
    const title = document.getElementById('petitionTitle').value;
    const description = document.getElementById('petitionDescription').value;

    const petition = { title, description };
    petitions.push(petition);
    displayPetitions();
    event.target.reset(); // Clear form fields
}

function displayPetitions() {
    const petitionsList = document.getElementById('petitionsList');
    petitionsList.innerHTML = '<h3>Current Petitions:</h3>' + petitions.map(p => 
        `<div class="petition"><h4>${p.title}</h4><p>${p.description}</p></div>`
    ).join('');
}

function submitPoll(event) {
    event.preventDefault();
    const question = document.getElementById('pollQuestion').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;

    const poll = { question, options: [option1, option2], votes: [0, 0] };
    polls.push(poll);
    displayPolls();
    event.target.reset(); // Clear form fields
}

function displayPolls() {
    const pollsList = document.getElementById('pollsList');
    pollsList.innerHTML = '<h3>Current Polls:</h3>' + polls.map((p, index) => 
        `<div class="poll">
            <h4>${p.question}</h4>
            <button onclick="vote(${index}, 0)">Vote: ${p.options[0]}</button>
            <button onclick="vote(${index}, 1)">Vote: ${p.options[1]}</button>
            <p>Votes: ${p.votes[0]} for ${p.options[0]}, ${p.votes[1]} for ${p.options[1]}</p>
        </div>`
    ).join('');
}

function vote(pollIndex, optionIndex) {
    polls[pollIndex].votes[optionIndex]++;
    displayPolls(); // Update poll display
}

function submitConversation(event) {
    event.preventDefault();
    const topic = document.getElementById('conversationTopic').value;
    const description = document.getElementById('conversationDescription').value;

    const conversation = {
        topic,
        description,
        comments: [],
        likes: 0,
        dislikes: 0
    };
    conversation.submit(event);
    event.target.reset(); // Clear form fields
}

function displayConversations() {
    const conversationsList = document.getElementById('conversationsList');
    conversationsList.innerHTML = '<h3>Ongoing Conversations:</h3>' + conversationsList.map((c, index) => 
        `<div class="conversation">
            <h4>${c.topic}</h4>
            <p>${c.description}</p>
            <button onclick="like(${index})">Like (${c.likes})</button>
            <button onclick="dislike(${index})">Dislike (${c.dislikes})</button>
            <div class="comment-section">
                <input type="text" id="commentInput${index}" placeholder="Add a comment" />
                <button onclick="addComment(${index})">Comment</button>
                <div id="commentsList${index}">${displayComments(c.comments)}</div>
            </div>
        </div>`
    ).join('');
}

function displayComments(comments) {
    return comments.map(comment => `<p>${comment}</p>`).join('');
}

function addComment(conversationIndex) {
    const commentInput = document.getElementById(`commentInput${conversationIndex}`);
    const comment = commentInput.value;
    
    if (comment) {
        conversation[conversationIndex].comments.push(comment);
        displayConversations(); // Update conversation display
        commentInput.value = ''; // Clear input field
    }
}

function like(conversationIndex) {
    conversation[conversationIndex].likes++;
    displayConversations(); // Update conversation display
}

function dislike(conversationIndex) {
    conversation[conversationIndex].dislikes++;
    displayConversations(); // Update conversation display
}