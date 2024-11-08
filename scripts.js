function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const hashObj = {
        'PlantScada': '6f7806c7aeb7a638bfeceff38d699527ce7677f532df96677457e7085be64eab',
        'test1': 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae'
    };

    if (hashObj[username] && sha256(password) === hashObj[username]) {
        alert('Login successful! Redirecting...');
        
        // Redirect based on username
        if (username === 'PlantScada') {
            window.location.href = "scada1.html";
        } else if (username === 'test1') {
            window.location.href = "scada2.html";
        }
    } else {
        alert('Invalid username or password');
    }
}
