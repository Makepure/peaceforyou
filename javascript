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
                image: 'https://images.pexels.com/photos/3171810
