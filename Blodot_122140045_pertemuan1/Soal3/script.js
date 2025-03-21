// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
document.getElementById('validationForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
  
// Reset error messages
    document.getElementById('nameError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('passwordError').classList.add('hidden');
  
    let isValid = true;
  
    // Untuk Name
    if (document.getElementById('name').value.length <= 3) {
        document.getElementById('nameError').classList.remove('hidden');
        isValid = false;
    }
  
    // Untuk Email
    if (!emailRegex.test(document.getElementById('email').value)) {
        document.getElementById('emailError').classList.remove('hidden');
        isValid = false;
    }
  
    // Untuk password
    if (document.getElementById('password').value.length < 8) {
        document.getElementById('passwordError').classList.remove('hidden');
        isValid = false;
    }
  
    // Menampilkan pesan jika validasi berhasil
    if (isValid) {
        document.getElementById('outputMessage').classList.remove('hidden');
        document.getElementById('messageContent').textContent = `Halo, ${document.getElementById('name').value}! Selamat belajar JavaScript 😊`;
    }
});