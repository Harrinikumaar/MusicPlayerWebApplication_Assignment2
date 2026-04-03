const songs = [
    { id: 1, title: "Midnight City", artist: "M83", album: "Hurry Up", genre: "Electronic", duration: "4:03", favorite: true, playCount: 150 },
    { id: 2, title: "Starboy", artist: "The Weeknd", album: "Starboy", genre: "Pop", duration: "3:50", favorite: false, playCount: 342 },
    { id: 3, title: "Weightless", artist: "Marconi Union", album: "Ambient", genre: "Lo-fi", duration: "8:00", favorite: true, playCount: 89 },
    { id: 4, title: "Everlong", artist: "Foo Fighters", album: "The Colour", genre: "Rock", duration: "4:10", favorite: false, playCount: 210 },
    { id: 5, title: "Circles", artist: "Post Malone", album: "Hollywood", genre: "Pop", duration: "3:35", favorite: true, playCount: 560 },
    { id: 6, title: "Lost in Yesterday", artist: "Tame Impala", album: "The Slow Rush", genre: "Rock", duration: "4:12", favorite: false, playCount: 125 },
    { id: 7, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", genre: "Pop", duration: "3:23", favorite: true, playCount: 890 },
    { id: 8, title: "Mr. Brightside", artist: "The Killers", album: "Hot Fuss", genre: "Rock", duration: "3:42", favorite: true, playCount: 1200 },
    { id: 9, title: "Get Lucky", artist: "Daft Punk", album: "RAM", genre: "Electronic", duration: "4:08", favorite: true, playCount: 750 },
    { id: 10, title: "Coffee Breath", artist: "Sofia Mills", album: "Single", genre: "Lo-fi", duration: "2:15", favorite: false, playCount: 45 },
    { id: 11, title: "Take Five", artist: "Dave Brubeck", album: "Time Out", genre: "Jazz", duration: "5:24", favorite: true, playCount: 310 },
    { id: 12, title: "Clarity", artist: "Zedd", album: "Clarity", genre: "Electronic", duration: "4:31", favorite: false, playCount: 620 },
    { id: 13, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", genre: "Rock", duration: "5:55", favorite: true, playCount: 2500 },
    { id: 14, title: "Bad Guy", artist: "Billie Eilish", album: "WWAFAWDWFA", genre: "Pop", duration: "3:14", favorite: false, playCount: 1100 },
    { id: 15, title: "Fly Me To The Moon", artist: "Frank Sinatra", album: "It Might as Well Be Swing", genre: "Jazz", duration: "2:27", favorite: true, playCount: 940 },
    { id: 16, title: "Window Pane", artist: "Mild High Club", album: "Skiptracing", genre: "Lo-fi", duration: "3:01", favorite: false, playCount: 180 },
    { id: 17, title: "Starlight", artist: "Muse", album: "Black Holes", genre: "Rock", duration: "4:00", favorite: true, playCount: 430 },
    { id: 18, title: "Wake Me Up", artist: "Avicii", album: "True", genre: "Electronic", duration: "4:07", favorite: true, playCount: 1800 },
    { id: 19, title: "As It Was", artist: "Harry Styles", album: "Harry's House", genre: "Pop", duration: "2:47", favorite: true, playCount: 1500 },
    { id: 20, title: "Lush Life", artist: "John Coltrane", album: "Lush Life", genre: "Jazz", duration: "5:25", favorite: false, playCount: 215 },
    { id: 21, title: "Sweater Weather", artist: "The Neighbourhood", album: "I Love You", genre: "Rock", duration: "4:00", favorite: false, playCount: 880 },
    { id: 22, title: "Daylight", artist: "David Kushner", album: "Daylight", genre: "Pop", duration: "3:32", favorite: true, playCount: 670 },
    { id: 23, title: "Veridis Quo", artist: "Daft Punk", album: "Discovery", genre: "Electronic", duration: "5:44", favorite: false, playCount: 390 },
    { id: 24, title: "Sunset Lover", artist: "Petit Biscuit", album: "Presence", genre: "Lo-fi", duration: "3:57", favorite: true, playCount: 920 },
    { id: 25, title: "Blue in Green", artist: "Miles Davis", album: "Kind of Blue", genre: "Jazz", duration: "5:37", favorite: true, playCount: 510 }
];

let recentlyPlayed = []; // Fixed tuple of 5
let currentSortOrder = 'asc';

// Function to render the UI
function renderGrid(data) {
    const grid = document.getElementById('songGrid');
    grid.innerHTML = data.map(song => `
        <div class="song-card" onclick="playSong(${song.id})">
            <div class="cover-art">${song.title.charAt(0)}</div>
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
            <p style="font-size: 11px;">${song.genre} • ${song.duration}</p>
        </div>
    `).join('');
}

// Logic for FilterByGenre & FilterByArtist (Combined)
function applyFilters() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const genre = document.getElementById('genreFilter').value;

    const filtered = songs.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(searchTerm) || s.artist.toLowerCase().includes(searchTerm);
        const matchesGenre = (genre === 'all' || s.genre === genre);
        return matchesSearch && matchesGenre;
    });

    renderGrid(filtered);
}

// Logic for sortBy() using keyof behavior
function toggleSort() {
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...songs].sort((a, b) => {
        return currentSortOrder === 'asc' 
            ? a.title.localeCompare(b.title) 
            : b.title.localeCompare(a.title);
    });
    renderGrid(sorted);
}

// Play function: Updates Now Playing, PlayCount, and Recent List
function playSong(id) {
    const song = songs.find(s => s.id === id);
    if (!song) return;

    // Increment Play Count
    song.playCount++;

    // Update Bottom Bar
    document.getElementById('nowPlayingTitle').innerText = song.title;
    document.getElementById('nowPlayingArtist').innerText = song.artist;
    document.getElementById('playCountLabel').innerText = `Plays: ${song.playCount}`;
    
    // Aesthetic update: change mini-cover color randomly
    document.getElementById('miniCover').style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;

    // Manage Recently Played (Fixed "Tuple" of 5)
    recentlyPlayed = [song, ...recentlyPlayed.filter(s => s.id !== id)].slice(0, 5);
    updateRecentUI();
}

function updateRecentUI() {
    const list = document.getElementById('recentList');
    list.innerHTML = recentlyPlayed.map(s => `
        <li onclick="playSong(${s.id})">${s.title} <span>${s.artist}</span></li>
    `).join('');
}

// Event Listeners
document.getElementById('searchBar').addEventListener('input', applyFilters);
document.getElementById('genreFilter').addEventListener('change', applyFilters);

// Initial Load
window.onload = () => renderGrid(songs);
