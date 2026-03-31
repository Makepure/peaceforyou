// ============ DATA MANAGEMENT ============
let messages = [];
let articles = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
    loadArticles();
    displayMessages();
    displayMagazine();
    setupEventListeners();
    loadCourses();
});

// Load from localStorage
function loadMessages() {
    const stored = localStorage.getItem('peaceMessages');
    if (stored) {
        messages = JSON.parse(stored);
    } else {
        // Sample messages with real human images (Ethiopian & Black American style)
        messages = [
            {
                id: 1,
                type: 'personal',
                author: 'Meron A., Addis Ababa',
                email: 'meron@example.com',
                content: 'Peace means seeing my children play without fear. From Ethiopia to the world, we stand together in love and unity.',
                image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
                timestamp: new Date().toISOString(),
                reactions: { love: 12, peace: 8 }
            },
            {
                id: 2,
                type: 'community',
                author: 'Marcus W., Atlanta',
                email: 'marcus@example.com',
                content: 'Our ancestors dreamed of this unity. Ethiopian and Black American solidarity is the bridge to peace. Together we rise!',
                image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
                timestamp: new Date().toISOString(),
                reactions: { love: 24, peace: 15 }
            },
            {
                id: 3,
                type: 'family',
                author: 'The Johnson Family, Chicago',
                email: 'johnson@example.com',
                content: 'Our family stands for peace across all cultures. Ethiopia and Black America united!',
                image: 'https://images.pexels.com/photos/6646861/pexels-photo-6646861.jpeg',
                timestamp: new Date().toISOString(),
                reactions: { love: 18, peace: 10 }
            }
        ];
        saveMessages();
    }
}

function saveMessages() {
    localStorage.setItem('peaceMessages', JSON.stringify(messages));
}

function loadArticles() {
    const stored = localStorage.getItem('magazineArticles');
    if (stored) {
        articles = JSON.parse(stored);
    } else {
        articles = [
            {
                id: 1,
                title: 'The Ethiopian Peace Tradition: A 3000-Year Legacy',
                excerpt: 'Exploring ancient peace practices from the Horn of Africa that still resonate today...',
                content: 'Full article content here...',
                image: 'https://images.pexels.com/photos/3466702/pexels-photo-3466702.jpeg',
                author: 'Writer',
                date: new Date().toISOString()
            },
            {
                id: 2,
                title: 'From Civil Rights to Global Peace: Black American Leadership',
                excerpt: 'How the legacy of Dr. King and modern movements inspire peace worldwide...',
                content: 'Full article content here...',
                image: 'https://images.pexels.com/photos/2449543/pexels-photo-2449543.jpeg',
                author: 'Writer',
                date: new Date().toISOString()
            },
            {
                id: 3,
                title: 'Bridges of Unity: Ethiopian & Black American Connections',
                excerpt: 'Stories of solidarity, cultural exchange, and shared dreams for peace...',
                content: 'Full article content here...',
                image: 'https://images.pexels.com/photos/3171810/pexels-photo-3171810.jpeg',
                author: 'Writer',
                date: new Date().toISOString()
            }
        ];
        saveArticles();
    }
}

function saveArticles() {
    localStorage.setItem('magazineArticles', JSON.stringify(articles));
}

// ============ DISPLAY FUNCTIONS ============
function displayMessages() {
    const grid = document.getElementById('messagesGrid');
    if (!grid) return;
    
    grid.innerHTML = messages.slice(0, 9).map(msg => `
        <div class="message-card">
            <img src="${msg.image || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'}" class="message-image" alt="Peace moment">
            <div class="message-content">
                <div class="message-author">🕊️ ${msg.author}</div>
                <span class="message-type">${getTypeIcon(msg.type)} ${msg.type.toUpperCase()}</span>
                <div class="message-text">${msg.content}</div>
                ${msg.audio ? `<audio controls src="${msg.audio}" class="audio-player"></audio>` : ''}
                <small>${new Date(msg.timestamp).toLocaleDateString()}</small>
                <div class="reactions" style="margin-top: 10px;">
                    <button onclick="reactToMessage(${msg.id}, 'love')" style="background:none; border:none; cursor:pointer;">❤️ ${msg.reactions?.love || 0}</button>
                    <button onclick="reactToMessage(${msg.id}, 'peace')" style="background:none; border:none; cursor:pointer;">🙌 ${msg.reactions?.peace || 0}</button>
                </div>
            </div>
        </div>
    `).join('');
}

function displayMagazine() {
    const grid = document.getElementById('magazineGrid');
    if (!grid) return;
    
    grid.innerHTML = articles.map(article => `
        <div class="magazine-card">
            <img src="${article.image}" alt="${article.title}">
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <small>By ${article.author} • ${new Date(article.date).toLocaleDateString()}</small>
            <button onclick="readArticle(${article.id})" style="margin-top: 1rem; background:#9b59b6; border:none; padding:8px 16px; border-radius:5px; color:white; cursor:pointer;">Read More →</button>
        </div>
    `).join('');
}

function loadCourses() {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;
    
    const courses = [
        {
            id: 1,
            title: 'Foundations of Peacebuilding',
            description: 'Learn peace principles from Ethiopian and Black American leaders',
            image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
            duration: '4 weeks'
        },
        {
            id: 2,
            title: 'Community Dialogue & Mediation',
            description: 'Bridge cultural differences through effective communication',
            image: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg',
            duration: '6 weeks'
        },
        {
            id: 3,
            title: 'Youth Peace Leadership',
            description: 'Empower the next generation of peacemakers',
            image: 'https://images.pexels.com/photos/6646862/pexels-photo-6646862.jpeg',
            duration: '8 weeks'
        }
    ];
    
    grid.innerHTML = courses.map(course => `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p><i class="fas fa-clock"></i> ${course.duration}</p>
            <button onclick="enrollCourse(${course.id})" style="margin-top: 1rem; background:#f1c40f; border:none; padding:10px 20px; border-radius:5px; color:#1a0b2e; cursor:pointer; font-weight:600;">Enroll Free →</button>
        </div>
    `).join('');
}

function getTypeIcon(type) {
    const icons = {
        personal: '👤',
        couple: '💑',
        family: '👨👩👧👦',
        group: '👥',
        capsule: '⏰'
    };
    return icons[type] || '🕊️';
}

// ============ FORM HANDLING ============
function setupEventListeners() {
    const peaceForm = document.getElementById('peaceForm');
    if (peaceForm) {
        peaceForm.addEventListener('submit', handlePeaceSubmission);
    }
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
    
    const peaceType = document.getElementById('peaceType');
    if (peaceType) {
        peaceType.addEventListener('change', showDynamicFields);
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('change', previewImage);
    }
    
    const audioUpload = document.getElementById('audioUpload');
    if (audioUpload) {
        audioUpload.addEventListener('change', previewAudio);
    }
}

function showDynamicFields() {
    const type = document.getElementById('peaceType').value;
    const dynamicFields = document.getElementById('dynamicFields');
    const capsuleFields = document.getElementById('capsuleFields');
    
    if (type === 'family') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <label><i class="fas fa-users"></i> Family Members Names</label>
                <textarea id="familyMembers" rows="3" placeholder="List family members (one per line)"></textarea>
            </div>
            <div class="form-group">
                <label><i class="fas fa-tag"></i> Family Name</label>
                <input type="text" id="familyName" placeholder="Family name (e.g., Johnson Family)">
            </div>
        `;
    } else if (type === 'group') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <label><i class="fas fa-users"></i> Group/Community Name</label>
                <input type="text" id="groupName" placeholder="Group or community name">
            </div>
            <div class="form-group">
                <label><i class="fas fa-user-plus"></i> Number of Members</label>
                <input type="number" id="memberCount" placeholder="How many people?">
            </div>
        `;
    } else if (type === 'couple') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <label><i class="fas fa-heart"></i> Partner's Name</label>
                <input type="text" id="partnerName" placeholder="Partner's name">
            </div>
        `;
    } else {
        dynamicFields.innerHTML = '';
    }
    
    // Show/hide time capsule fields
    if (type === 'capsule') {
        capsuleFields.style.display = 'block';
    } else {
        capsuleFields.style.display = 'none';
    }
}

function previewImage() {
    const file = document.getElementById('imageUpload').files[0];
    const preview = document.getElementById('imagePreview');
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" style="max-width:100%; height:auto; margin-top:10px; border-radius:10px;">`;
        };
        reader.readAsDataURL(file);
    }
}

function previewAudio() {
    const file = document.getElementById('audioUpload').files[0];
    const preview = document.getElementById('audioPreview');
    if (file && file.type === 'audio/mpeg') {
        const url = URL.createObjectURL(file);
        preview.innerHTML = `<audio controls src="${url}" style="width:100%; margin-top:10px;"></audio>`;
    } else {
        preview.innerHTML = '<p style="color:red;">Please upload MP3 file</p>';
    }
}

async function handlePeaceSubmission(e) {
    e.preventDefault();
    
    const type = document.getElementById('peaceType').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const country = document.getElementById('country').value;
    const language = document.getElementById('language').value;
    const messageContent = document.getElementById('messageContent').value;
    
    // Handle image
    let imageData = null;
    const imageFile = document.getElementById('imageUpload').files[0];
    if (imageFile) {
        imageData = await readFileAsDataURL(imageFile);
    } else {
        // Default human images based on type
        const defaultImages = {
            personal: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
            couple: 'https://images.pexels.com/photos/6646872/pexels-photo-6646872.jpeg',
            family: 'https://images.pexels.com/photos/6646861/pexels-photo-6646861.jpeg',
            group: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
            capsule: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg'
        };
        imageData = defaultImages[type];
    }
    
    // Handle audio
    let audioData = null;
    const audioFile = document.getElementById('audioUpload').files[0];
    if (audioFile) {
        audioData = await readFileAsDataURL(audioFile);
    }
    
    const newMessage = {
        id: Date.now(),
        type: type,
        author: fullName,
        email: email,
        phone: phone,
        age: age,
        gender: gender,
        country: country,
        language: language,
        content: messageContent,
        image: imageData,
        audio: audioData,
        timestamp: new Date().toISOString(),
        reactions: { love: 0, peace: 0 }
    };
    
    // Add type-specific fields
    if (type === 'family') {
        newMessage.familyMembers = document.getElementById('familyMembers')?.value;
        newMessage.familyName = document.getElementById('familyName')?.value;
    } else if (type === 'group') {
        newMessage.groupName = document.getElementById('groupName')?.value;
        newMessage.memberCount = document.getElementById('memberCount')?.value;
    } else if (type === 'couple') {
        newMessage.partnerName = document.getElementById('partnerName')?.value;
    } else if (type === 'capsule') {
        newMessage.capsuleDate = document.getElementById('capsuleDate')?.value;
        newMessage.capsuleEmail = document.getElementById('capsuleEmail')?.value;
        
        // Send notification via Formspree (free)
        if (newMessage.capsuleEmail) {
            await sendCapsuleNotification(newMessage);
        }
    }
    
    messages.unshift(newMessage);
    saveMessages();
    displayMessages();
    closeShareModal();
    
    alert('✨ Your peace message has been released to the sky! ✨');
    document.getElementById('peaceForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('audioPreview').innerHTML = '';
    document.getElementById('dynamicFields').innerHTML = '';
}

function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

async function sendCapsuleNotification(message) {
    // Using Formspree free endpoint (replace with your endpoint)
    try {
        await fetch('https://formspree.io/f/your-endpoint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: message.capsuleEmail,
                message: `Your time capsule "${message.content.substring(0, 100)}..." will open on ${new Date(message.capsuleDate).toLocaleString()}`,
                subject: 'Book for Peace - Time Capsule Confirmation'
            })
        });
    } catch (error) {
        console.log('Notification queued locally');
        // Store for later
        let notifications = JSON.parse(localStorage.getItem('capsuleNotifications') || '[]');
        notifications.push(message);
        localStorage.setItem('capsuleNotifications', JSON.stringify(notifications));
    }
}

function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`📬 Thank you for subscribing! Peace updates will be sent to ${email}`);
    e.target.reset();
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

function reactToMessage(messageId, reactionType) {
    const message = messages.find(m => m.id === messageId);
    if (message) {
        message.reactions[reactionType]++;
        saveMessages();
        displayMessages();
    }
}

function loadAllMessages() {
    displayMessages();
    document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });
}

function enrollCourse(courseId) {
    const courses = {
        1: 'Foundations of Peacebuilding',
        2: 'Community Dialogue & Mediation',
        3: 'Youth Peace Leadership'
    };
    
    const enrollment = {
        courseId: courseId,
        courseName: courses[courseId],
        date: new Date().toISOString(),
        userId: Date.now()
    };
    
    let enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    enrollments.push(enrollment);
    localStorage.setItem('courseEnrollments', JSON.stringify(enrollments));
    
    alert(`✨ You've enrolled in: ${courses[courseId]}!\nCheck your email for course materials.`);
}

function readArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (article) {
        alert(`📖 ${article.title}\n\n${article.content}\n\nFull article coming soon to the magazine!`);
    }
}

// ============ MODAL FUNCTIONS ============
function openShareModal() {
    document.getElementById('shareModal').style.display = 'block';
}

function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

function openAIGuide() {
    document.getElementById('aiModal').style.display = 'block';
}

function closeAIModal() {
    document.getElementById('aiModal').style.display = 'none';
}

// ============ GROQ AI INTEGRATION (FREE) ============
async function sendToGroq() {
    const input = document.getElementById('chatInput');
    const userMessage = input.value.trim();
    if (!userMessage) return;
    
    // Add user message to chat
    addChatMessage(userMessage, 'user');
    input.value = '';
    
    // Show typing indicator
    addChatMessage('...', 'ai', true);
    
    try {
        // Using Groq's free API (you'll need to add your API key)
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_GROQ_API_KEY' // Replace with your key
            },
            body: JSON.stringify({
                model: 'mixtral-8x7b-32768',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a Peace Guide AI. You help people find inner peace, resolve conflicts, and promote unity between Ethiopian and Black American communities. Be compassionate, wise, and supportive.'
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Remove typing indicator and add real response
        removeTypingIndicator();
        addChatMessage(aiResponse, 'ai');
        
    } catch (error) {
        console.error('Groq API error:', error);
        removeTypingIndicator();
        addChatMessage("I'm here to support you. Please try again, or share what's on your mind about peace.", 'ai');
    }
}

function addChatMessage(text, sender, isTyping = false) {
    const container = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
    if (isTyping) messageDiv.id = 'typing-indicator';
    messageDiv.innerHTML = `<i class="fas ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i> ${text}`;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// Allow Enter key in chat
document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendToGroq();
});

// Close modals when clicking outside
window.onclick = (event) => {
    const shareModal = document.getElementById('shareModal');
    const aiModal = document.getElementById('aiModal');
    if (event.target === shareModal) closeShareModal();
    if (event.target === aiModal) closeAIModal();
};
