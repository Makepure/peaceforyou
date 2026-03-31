// ============ DATA MANAGEMENT ============
let messages = [];
let articles = [];

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded - initializing...');
    
    try {
        loadMessages();
        loadArticles();
        displayMessages();
        displayMagazine();
        setupEventListeners();
        loadCourses();
        setupMobileMenu();
        console.log('All systems ready!');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Load from localStorage
function loadMessages() {
    const stored = localStorage.getItem('peaceMessages');
    if (stored) {
        messages = JSON.parse(stored);
    } else {
        messages = [
            {
                id: 1,
                type: 'personal',
                author: 'አበበ በቀለ | Abebe Bekele, አዲስ አበባ',
                content: 'ሰላም ማለት ልጆቻችን ያለፍርሃት ሲጫወቱ ማየት ነው። ለኢትዮጵያ ሰላም እንሥራ። Peace means seeing our children play without fear. Let\'s build peace for Ethiopia.',
                image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
                timestamp: new Date().toISOString(),
                reactions: { love: 15, peace: 10 }
            },
            {
                id: 2,
                type: 'family',
                author: 'የአዳም ቤተሰብ | Adam Family, ዲሬ ዳዋ',
                content: 'ቤተሰባችን ለሰላም ቆሞአል። ኢትዮጵያ ትንሳኤዋን ታገኝ! Our family stands for peace. Ethiopia will rise!',
                image: 'https://images.pexels.com/photos/6646861/pexels-photo-6646861.jpeg',
                timestamp: new Date().toISOString(),
                reactions: { love: 22, peace: 18 }
            },
            {
                id: 3,
                type: 'group',
                author: 'ወጣቶች ለሰላም | Youth for Peace, ባህር ዳር',
                content: 'እኛ የነገው ትውልድ ሰላምን እንገነባለን። We the youth build peace for tomorrow.',
                image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
                timestamp: new Date().toISOString(),
                reactions: { love: 35, peace: 28 }
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
                title: 'የኢትዮጵያ ሰላም ባህል | Ethiopian Peace Tradition',
                excerpt: 'ከ3000 ዓመታት በላይ የዘለቀ የኢትዮጵያ ሰላም ባህል ለዛሬው ትውልድ ምን ያስተምረናል? What does Ethiopia\'s 3000-year peace tradition teach us today?',
                content: 'Full article content here...',
                image: 'https://images.pexels.com/photos/3466702/pexels-photo-3466702.jpeg',
                author: 'ደራሲ | Writer',
                date: new Date().toISOString()
            },
            {
                id: 2,
                title: 'መጽሐፈ ኢትዮጵያ፡ የሕዝብ ጥበብ | The People\'s Book',
                excerpt: 'አብረን የምንጽፈው መጽሐፍ - የኢትዮጵያ ሕዝብ ድምጽ ለትውልድ',
                content: 'Full article content here...',
                image: 'https://images.pexels.com/photos/2449543/pexels-photo-2449543.jpeg',
                author: 'ደራሲ | Writer',
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
    if (!grid) {
        console.log('Messages grid not found');
        return;
    }
    
    if (messages.length === 0) {
        grid.innerHTML = '<div class="no-messages">እስካሁን ምንም መልዕክት አልተገኘም። የመጀመሪያው ይሁኑ! | No messages yet. Be the first to contribute!</div>';
        return;
    }
    
    grid.innerHTML = messages.slice(0, 9).map(msg => `
        <div class="message-card">
            <img src="${msg.image || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'}" class="message-image" alt="Peace moment">
            <div class="message-content">
                <div class="message-author">🕊️ ${msg.author}</div>
                <span class="message-type">${getTypeIcon(msg.type)} ${getTypeName(msg.type)}</span>
                <div class="message-text">${msg.content}</div>
                ${msg.audio ? `<audio controls src="${msg.audio}" class="audio-player"></audio>` : ''}
                <small>${new Date(msg.timestamp).toLocaleDateString()}</small>
                <div class="reactions" style="margin-top: 12px;">
                    <button onclick="reactToMessage(${msg.id}, 'love')">❤️ ${msg.reactions?.love || 0}</button>
                    <button onclick="reactToMessage(${msg.id}, 'peace')">🙌 ${msg.reactions?.peace || 0}</button>
                </div>
            </div>
        </div>
    `).join('');
}

function displayMagazine() {
    const grid = document.getElementById('magazineGrid');
    if (!grid) return;
    
    if (articles.length === 0) {
        grid.innerHTML = '<div class="no-messages">እስካሁን ጽሑፎች አልተጨመሩም። የመጀመሪያውን ጽሑፍ ይጻፉ! | No articles yet. Write your first peace article!</div>';
        return;
    }
    
    grid.innerHTML = articles.map(article => `
        <div class="magazine-card">
            <img src="${article.image}" alt="${article.title}">
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <small>By ${article.author} • ${new Date(article.date).toLocaleDateString()}</small>
            <button onclick="readArticle(${article.id})" style="margin-top: 1rem; background:#9b59b6; border:none; padding:8px 18px; border-radius:30px; color:white; cursor:pointer;">Read More →</button>
        </div>
    `).join('');
}

function loadCourses() {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;
    
    const courses = [
        {
            id: 1,
            title: 'የሰላም ግንባታ መሠረቶች | Foundations of Peacebuilding',
            description: 'የሰላም ግንባታ መሠረታዊ መርሆችን ይማሩ | Learn core principles of peacebuilding',
            duration: '4 ሳምንታት | 4 weeks • Self-paced'
        },
        {
            id: 2,
            title: 'ማህበረሰብ ውይይት እና ሽምግልና | Community Dialogue & Mediation',
            description: 'አስቸጋሪ ውይይቶችን የማካሄድ ክህሎት | Master facilitating difficult conversations',
            duration: '6 ሳምንታት | 6 weeks • Interactive'
        },
        {
            id: 3,
            title: 'ወጣቶች የሰላም አመራር | Youth Peace Leadership',
            description: 'ወጣቶች የሰላም መሪዎች እንዲሆኑ ማበረታቻ | Empower youth as peace leaders',
            duration: '8 ሳምንታት | 8 weeks • Certificate'
        }
    ];
    
    grid.innerHTML = courses.map(course => `
        <div class="course-card">
            <h3><i class="fas fa-book-open"></i> ${course.title}</h3>
            <p>${course.description}</p>
            <p><i class="fas fa-clock"></i> ${course.duration}</p>
            <button onclick="enrollCourse(${course.id})" class="enroll-btn">ተመዝገብ | Enroll Free →</button>
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

function getTypeName(type) {
    const names = {
        personal: 'የግል ምስክርነት | Personal',
        couple: 'የባልና ሚስት | Couple',
        family: 'የቤተሰብ | Family',
        group: 'የማህበረሰብ | Community',
        capsule: 'የጊዜ ሳጥን | Time Capsule'
    };
    return names[type] || 'Peace';
}

// ============ FORM HANDLING ============
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    const peaceForm = document.getElementById('peaceForm');
    if (peaceForm) {
        peaceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePeaceSubmission(e);
        });
        console.log('Peace form listener attached');
    } else {
        console.log('Peace form not found');
    }
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletter(e);
        });
        console.log('Newsletter listener attached');
    }
    
    const peaceType = document.getElementById('peaceType');
    if (peaceType) {
        peaceType.addEventListener('change', showDynamicFields);
        console.log('Peace type listener attached');
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

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

function showDynamicFields() {
    const type = document.getElementById('peaceType').value;
    const dynamicFields = document.getElementById('dynamicFields');
    const capsuleFields = document.getElementById('capsuleFields');
    
    if (type === 'family') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <label><i class="fas fa-users"></i> የቤተሰብ አባላት ስሞች | Family Members Names</label>
                <textarea id="familyMembers" rows="3" placeholder="የቤተሰብ አባላት (አንድ በአንድ መስመር) | List family members (one per line)"></textarea>
            </div>
            <div class="form-group">
                <label><i class="fas fa-tag"></i> የቤተሰብ ስም | Family Name</label>
                <input type="text" id="familyName" placeholder="ለምሳሌ፡ የአበበ ቤተሰብ | e.g., Abebe Family">
            </div>
        `;
    } else if (type === 'group') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <label><i class="fas fa-users"></i> የማህበረሰብ/ቡድን ስም | Group/Community Name</label>
                <input type="text" id="groupName" placeholder="ለምሳሌ፡ ወጣቶች ለሰላም | e.g., Youth for Peace">
            </div>
            <div class="form-group">
                <label><i class="fas fa-user-plus"></i> የአባላት ቁጥር | Number of Members</label>
                <input type="number" id="memberCount" placeholder="ስንት ሰዎች? | How many people?">
            </div>
        `;
    } else if (type === 'couple') {
        dynamicFields.innerHTML = `
            <div class="form-group">
                <label><i class="fas fa-heart"></i> የትዳር ጓደኛ/ወይም አጋር ስም | Partner's Name</label>
                <input type="text" id="partnerName" placeholder="የትዳር ጓደኛዎ/ዎት ስም | Your partner's name">
            </div>
        `;
    } else {
        dynamicFields.innerHTML = '';
    }
    
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
            preview.innerHTML = `<img src="${e.target.result}" style="max-width:100%; height:auto; margin-top:10px; border-radius:12px;">`;
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
    } else if (file) {
        preview.innerHTML = '<p style="color:#f1c40f;">እባክዎ MP3 ፋይል ይምረጡ | Please upload MP3 file</p>';
    }
}

async function handlePeaceSubmission(e) {
    e.preventDefault();
    console.log('Form submitted!');
    
    const type = document.getElementById('peaceType').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const country = document.getElementById('country').value;
    const language = document.getElementById('language').value;
    const messageContent = document.getElementById('messageContent').value;
    
    if (!messageContent.trim()) {
        alert('እባክዎ መልዕክትዎን ይጻፉ | Please write your message');
        return;
    }
    
    // Handle image
    let imageData = null;
    const imageFile = document.getElementById('imageUpload').files[0];
    if (imageFile) {
        imageData = await readFileAsDataURL(imageFile);
    } else {
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
        
        if (newMessage.capsuleEmail) {
            let capsules = JSON.parse(localStorage.getItem('timeCapsules') || '[]');
            capsules.push({
                email: newMessage.capsuleEmail,
                message: newMessage.content.substring(0, 200),
                openDate: newMessage.capsuleDate,
                author: newMessage.author,
                id: newMessage.id
            });
            localStorage.setItem('timeCapsules', JSON.stringify(capsules));
        }
    }
    
    messages.unshift(newMessage);
    saveMessages();
    displayMessages();
    closeShareModal();
    
    alert('✨ መልዕክትዎ በመጽሐፈ ኢትዮጵያ ላይ ተጨምሯል! | Your message has been added to the Book of Ethiopia! ✨');
    
    document.getElementById('peaceForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('audioPreview').innerHTML = '';
    document.getElementById('dynamicFields').innerHTML = '';
    document.getElementById('capsuleFields').style.display = 'none';
}

function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

function handleNewsletter(e) {
    const email = e.target.querySelector('input').value;
    if (email) {
        alert(`📬 እናመሰግናለን! የሰላም ዜናዎች ወደ ${email} ይላካሉ | Thank you! Peace updates will be sent to ${email}`);
        e.target.reset();
    }
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
        1: 'የሰላም ግንባታ መሠረቶች | Foundations of Peacebuilding',
        2: 'ማህበረሰብ ውይይት እና ሽምግልና | Community Dialogue & Mediation',
        3: 'ወጣቶች የሰላም አመራር | Youth Peace Leadership'
    };
    
    let enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    enrollments.push({
        courseId: courseId,
        courseName: courses[courseId],
        date: new Date().toISOString(),
        userId: Date.now()
    });
    localStorage.setItem('courseEnrollments', JSON.stringify(enrollments));
    
    alert(`✨ በ ${courses[courseId]} ላይ ተመዝግበዋል! ተጨማሪ መረጃ በኢሜይል ይላካል | You've enrolled in ${courses[courseId]}! Check your email for details.`);
}

function readArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (article) {
        alert(`📖 ${article.title}\n\n${article.content}\n\nFull article coming soon to the magazine!`);
    }
}

// ============ MODAL FUNCTIONS ============
function openShareModal() {
    console.log('Opening share modal');
    const modal = document.getElementById('shareModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Share modal not found!');
    }
}

function closeShareModal() {
    const modal = document.getElementById('shareModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openAIGuide() {
    console.log('Opening AI guide');
    const modal = document.getElementById('aiModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        console.error('AI modal not found!');
    }
}

function closeAIModal() {
    const modal = document.getElementById('aiModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ============ GROQ AI INTEGRATION ============
async function sendToGroq() {
    const input = document.getElementById('chatInput');
    const userMessage = input.value.trim();
    if (!userMessage) return;
    
    addChatMessage(userMessage, 'user');
    input.value = '';
    addChatMessage('...', 'ai', true);
    
    setTimeout(() => {
        removeTypingIndicator();
        addChatMessage("ሰላም! የሰላም መሪ እንዲረዳዎ ይፈልጋሉ? ስለ ኢትዮጵያ፣ ስለ ሰላም፣ ወይም ስለ መጽሐፈ ኢትዮጵያ ማንኛውንም ነገር ይጠይቁ። | Hello! How can I help you with peace, Ethiopia, or our book?", 'ai');
    }, 1000);
}

function addChatMessage(text, sender, isTyping = false) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
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

// Make functions globally available
window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;
window.openAIGuide = openAIGuide;
window.closeAIModal = closeAIModal;
window.sendToGroq = sendToGroq;
window.reactToMessage = reactToMessage;
window.enrollCourse = enrollCourse;
window.readArticle = readArticle;
window.loadAllMessages = loadAllMessages;

// Close modals when clicking outside
window.onclick = (event) => {
    const shareModal = document.getElementById('shareModal');
    const aiModal = document.getElementById('aiModal');
    if (event.target === shareModal) closeShareModal();
    if (event.target === aiModal) closeAIModal();
};

console.log('Script loaded successfully!');
