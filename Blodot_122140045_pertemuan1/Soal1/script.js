const todoInput = document.getElementById("todo-input");
const addItemBtn = document.getElementById("tambah-item");
const tambahPesan = document.getElementById("tambah-pesan");
const todoList = document.getElementById("todo-list");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const changeColorBtn = document.getElementById("change-color-btn");

// Array untuk menyimpan daftar tugas
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Fungsi untuk membuat pesan berhasil
function berhasilTambah(list) {
  return `Anda berhasil memasukkan ${list} ke dalam daftar!`;
}

// Event listener untuk tombol "Tambah Item"
addItemBtn.addEventListener("click", function () {
  const list = todoInput.value.trim(); // Menghapus spasi di awal dan akhir input

  if (list === "") {
    tambahPesan.innerHTML = '<p class="text-red-500">Anda belum memasukkan item yang akan ditambahkan</p>';
  } else {
    todos.push({ text: list, completed: false });
    todoInput.value = ""; // Kosongkan input setelah menambahkan
    tambahPesan.innerHTML = `<p class="text-green-500">${berhasilTambah(list)}</p>`;
    saveToLocalStorage();
    renderTodos();
  }
});

// Fungsi untuk merender daftar tugas ke dalam elemen #todo-list
function renderTodos() {
  todoList.innerHTML = ""; // Hapus isi terlebih dahulu

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("p-2", "mb-2", "bg-gray-100", "rounded", "flex", "items-center");

    // Checkbox untuk menandai tugas sebagai selesai
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveToLocalStorage();
      renderTodos(); 
    });

    // Label untuk nama tugas
    const label = document.createElement("span");
    label.textContent = todo.text;
    if (todo.completed) {
      label.classList.add("line-through", "text-gray-400");
    }

    // Tombol hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("ml-auto", "bg-red-500", "text-white", "px-2", "py-1", "rounded", "hover:bg-red-600");
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveToLocalStorage();
      renderTodos(); 
    });

    // Menyusun elemen-elemen
    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(deleteBtn);

    todoList.appendChild(todoItem);
  });
}
// Fungsi untuk menyimpan data ke localStorage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event listener untuk tombol "Hapus Selesai"
clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed); // Hapus tugas yang sudah selesai
  saveToLocalStorage();
  renderTodos(); // Segarkan tampilan
});

// Event listener untuk tombol "Ubah Warna"
changeColorBtn.addEventListener("click", () => {
  const colors = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-pink-100"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  todoList.className = `bg-white p-4 rounded shadow ${randomColor}`;
});

// Memuat data dari localStorage saat halaman dimuat
window.onload = () => {
  renderTodos();
};