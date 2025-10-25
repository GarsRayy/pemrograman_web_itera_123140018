
const timeWidget = document.getElementById('time-widget');
const timeError = document.getElementById('time-error');
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteIdInput = document.getElementById('note-id');
const submitButton = document.getElementById('submit-button');
const cancelEditButton = document.getElementById('cancel-edit-button');
const notesList = document.getElementById('notes-list');
const notesCount = document.getElementById('notes-count');
const lastAdded = document.getElementById('last-added');

let notes = [];
let serverTime = null; 

class Note {
    constructor(text) {
        this.id = Date.now();
        this.text = text;
        this.createdAt = new Date().toISOString();
    }
}

const updateClockDisplay = () => {
    if (!serverTime) return; 

    serverTime.setSeconds(serverTime.getSeconds() + 1);

    const timeString = serverTime.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    timeWidget.textContent = `${timeString}`;
};

const startClock = () => {
    setInterval(updateClockDisplay, 1000);
};

const fetchTime = async () => {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        serverTime = new Date(data.datetime);
        timeError.textContent = '';
        
    } catch (error) {
        console.error("Gagal mengambil waktu:", error);
        timeError.textContent = "";
        serverTime = new Date();
    }
    
    updateClockDisplay();
    startClock();      
};

const updateStats = () => {
    notesCount.textContent = notes.length;
    if (notes.length > 0) {
        const latestNote = notes[0]; 
        const date = new Date(latestNote.createdAt);
        lastAdded.textContent = `${date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        })}`;
    } else {
        lastAdded.textContent = '-';
    }
};
const renderNotes = () => {
    notesList.innerHTML = '';
    if (notes.length === 0) {
        notesList.innerHTML = `
            <div class="text-center py-12">
                <div class="text-6xl mb-4">📭</div>
                <p class="text-gray-400 text-lg">Belum ada catatan. Mulai tulis sekarang!</p>
            </div>
        `;
        updateStats();
        return;
    }

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-item flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400/50';
        noteElement.setAttribute('data-id', note.id);
        noteElement.style.animationDelay = `${index * 0.05}s`;
        noteElement.classList.add('slide-in');
        
        const date = new Date(note.createdAt);
        const timeStr = date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        noteElement.innerHTML = `
            <div class="flex-grow">
                <p class="text-white text-lg mb-1">${note.text}</p>
                <p class="text-gray-500 text-xs"> ${timeStr}</p>
            </div>
            <div class="flex-shrink-0 ml-4 space-x-2">
                <button class="edit-btn bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg font-semibold border border-yellow-500/30">
                    ✏️ Edit
                </button>
                <button class="delete-btn bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg font-semibold border border-red-500/30">
                    🗑️ Hapus
                </button>
            </div>
        `;
        notesList.appendChild(noteElement);
    });
    
    updateStats();
};

const saveNotes = () => {
    localStorage.setItem('personalDashboardNotes', JSON.stringify(notes));
};

const loadNotes = () => {
    const storedNotes = localStorage.getItem('personalDashboardNotes');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
};

const resetForm = () => {
    noteInput.value = '';
    noteIdInput.value = '';
    submitButton.innerHTML = 'Tambah';
    cancelEditButton.classList.add('hidden');
    noteInput.placeholder = 'Tulis sesuatu yang menarik...';
};

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = noteInput.value.trim();
    const id = noteIdInput.value;

    if (text === '') return;

    if (id) {
        const noteToEdit = notes.find(note => note.id == id);
        if (noteToEdit) {
            noteToEdit.text = text;
        }
    } else {
        const newNote = new Note(text);
        notes.unshift(newNote); 
    }

    saveNotes();
    renderNotes();
    resetForm();
});

notesList.addEventListener('click', (e) => {
    const target = e.target;
    const button = target.closest('button');
    if (!button) return; 
    
    const noteElement = button.closest('[data-id]');
    if (!noteElement) return; 

    const id = Number(noteElement.dataset.id);

    if (button.classList.contains('delete-btn')) {
        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            notes = notes.filter(note => note.id !== id);
            saveNotes();
            renderNotes();
            resetForm(); 
        }
    }

    if (button.classList.contains('edit-btn')) {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            noteInput.value = noteToEdit.text;
            noteIdInput.value = noteToEdit.id;
            submitButton.innerHTML = 'Simpan';
            cancelEditButton.classList.remove('hidden');
            noteInput.focus();
            noteInput.placeholder = 'Edit catatan Anda...';
        }
    }
});

cancelEditButton.addEventListener('click', resetForm);

loadNotes();
renderNotes();
fetchTime();