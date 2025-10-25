// Menunggu seluruh konten HTML dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {
  let tasks = [];
  let editingTaskId = null;

  // --- Seleksi Elemen DOM ---
  const taskForm = document.getElementById('task-form');
  const taskNameInput = document.getElementById('task-name');
  const taskCourseInput = document.getElementById('task-course');
  const taskDeadlineInput = document.getElementById('task-deadline');
  const taskNotesInput = document.getElementById('task-notes');
  const tasksContainer = document.getElementById('tasks-container');
  const searchInput = document.getElementById('search-input');
  const filterStatusSelect = document.getElementById('filter-status');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const formTitle = document.getElementById('form-title');

  // --- Fungsi Utama ---

  function loadTasks() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      tasks = JSON.parse(stored);
    }
    renderTasks();
    updateStatistics();
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function validateForm(name, course, deadline) {
    let isValid = true;
    const errorName = document.getElementById('error-name');
    const errorCourse = document.getElementById('error-course');
    const errorDeadline = document.getElementById('error-deadline');

    // Reset error messages
    [errorName, errorCourse, errorDeadline].forEach(el => el.classList.add('hidden'));

    if (name.trim() === '') {
      errorName.textContent = '⚠️ Nama tugas tidak boleh kosong';
      errorName.classList.remove('hidden');
      isValid = false;
    }

    if (course.trim() === '') {
      errorCourse.textContent = '⚠️ Mata kuliah tidak boleh kosong';
      errorCourse.classList.remove('hidden');
      isValid = false;
    }

    if (!deadline) {
      errorDeadline.textContent = '⚠️ Deadline harus diisi';
      errorDeadline.classList.remove('hidden');
      isValid = false;
    } else {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      // Memberi toleransi 1 menit untuk menghindari error karena perbedaan milidetik
      if (deadlineDate < new Date(now.getTime() - 60000)) {
        errorDeadline.textContent = '⚠️ Deadline tidak boleh di masa lampau';
        errorDeadline.classList.remove('hidden');
        isValid = false;
      }
    }
    return isValid;
  }

  function resetForm() {
    taskForm.reset();
    editingTaskId = null;
    submitBtn.innerHTML = '➕ Tambah Tugas';
    formTitle.textContent = 'Tambah Tugas Baru';
    cancelBtn.classList.add('hidden');
    
    ['error-name', 'error-course', 'error-deadline'].forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
  }

  function formatDeadline(deadline) {
    const date = new Date(deadline);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('id-ID', options).replace(/\./g, ':');
  }

  function isDeadlineClose(deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffHours = (deadlineDate - now) / (1000 * 60 * 60);
    return diffHours <= 24 && diffHours > 0;
  }

  function renderTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterStatus = filterStatusSelect.value;

    let filteredTasks = tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm) || task.course.toLowerCase().includes(searchTerm);
      const matchesFilter = filterStatus === 'all' || (filterStatus === 'completed' && task.completed) || (filterStatus === 'pending' && !task.completed);
      return matchesSearch && matchesFilter;
    });

    if (tasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="text-center py-16 empty-state">
          <div class="text-8xl mb-4">📝</div>
          <p class="text-xl text-gray-500 font-medium">Belum ada tugas</p>
          <p class="text-gray-400 mt-2">Tambahkan tugas pertama Anda untuk memulai!</p>
        </div>`;
      return;
    }
    
    if (filteredTasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="text-center py-16 empty-state">
          <div class="text-8xl mb-4">🔍</div>
          <p class="text-xl text-gray-500 font-medium">Tidak ada tugas yang ditemukan</p>
          <p class="text-gray-400 mt-2">Coba ubah filter atau kata kunci pencarian</p>
        </div>`;
      return;
    }

    tasksContainer.innerHTML = filteredTasks.map(task => {
      const deadlineClose = isDeadlineClose(task.deadline);
      const borderColor = task.completed ? 'border-green-400' : deadlineClose ? 'border-red-400' : 'border-indigo-400';
      const bgGradient = task.completed ? 'from-green-50 to-emerald-50' : deadlineClose ? 'from-red-50 to-orange-50' : 'from-indigo-50 to-purple-50';
      
      return `
        <div class="task-card ${borderColor} bg-gradient-to-br ${bgGradient} rounded-xl p-5 fade-in shadow-md">
          <div class="flex gap-4 items-start">
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" class="checkbox-custom mt-1">
            
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-lg text-gray-800 mb-2 ${task.completed ? 'task-completed' : ''}">${task.name}</h3>
              
              <div class="flex flex-wrap gap-2 mb-3">
                <span class="badge bg-indigo-100 text-indigo-700">📖 ${task.course}</span>
                ${task.completed ? '<span class="badge bg-green-100 text-green-700">✅ Selesai</span>' : '<span class="badge bg-yellow-100 text-yellow-700">⏳ Belum Selesai</span>'}
              </div>
              
              <p class="text-sm text-gray-600 mb-2 flex items-center gap-2 flex-wrap">
                <span class="font-semibold">⏰</span>
                <span>${formatDeadline(task.deadline)}</span>
                ${deadlineClose && !task.completed ? '<span class="badge bg-red-100 text-red-700 animate-pulse">⚠️ Mendesak!</span>' : ''}
              </p>
              
              ${task.notes ? `<p class="text-sm text-gray-500 italic mt-3 p-3 bg-white bg-opacity-50 rounded-lg">💭 ${task.notes}</p>` : ''}
            </div>
            
            <div class="flex flex-col gap-2">
              <button onclick="editTask(${task.id})" class="btn-icon bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-600 shadow-md">✏️</button>
              <button onclick="deleteTask(${task.id})" class="btn-icon bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-600 shadow-md">🗑️</button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('total-tasks').textContent = total;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('pending-tasks').textContent = pending;
  }

  // --- Event Handlers (Global Scope for inline onclick) ---
  window.toggleTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      updateStatistics();
    }
  }

  window.editTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      taskNameInput.value = task.name;
      taskCourseInput.value = task.course;
      taskDeadlineInput.value = task.deadline;
      taskNotesInput.value = task.notes;
      editingTaskId = id;
      submitBtn.innerHTML = '💾 Simpan Perubahan';
      formTitle.innerHTML = '✏️ Edit Tugas';
      cancelBtn.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  window.deleteTask = function(id) {
    if (confirm('🗑️ Apakah Anda yakin ingin menghapus tugas ini?')) {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
      updateStatistics();
    }
  }

  // --- Event Listeners ---
  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = taskNameInput.value;
    const course = taskCourseInput.value;
    const deadline = taskDeadlineInput.value;
    const notes = taskNotesInput.value;

    if (!validateForm(name, course, deadline)) return;

    if (editingTaskId !== null) {
      const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
      tasks[taskIndex] = { ...tasks[taskIndex], name: name.trim(), course: course.trim(), deadline, notes: notes.trim() };
    } else {
      const newTask = { id: Date.now(), name: name.trim(), course: course.trim(), deadline, notes: notes.trim(), completed: false, createdAt: new Date().toISOString() };
      tasks.unshift(newTask); // Menambah ke awal array agar tampil di atas
    }

    saveTasks();
    renderTasks();
    updateStatistics();
    resetForm();
  });

  cancelBtn.addEventListener('click', resetForm);
  searchInput.addEventListener('input', renderTasks);
  filterStatusSelect.addEventListener('change', renderTasks);

  // --- Inisialisasi Aplikasi ---
  loadTasks();
});