function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const hashObj = {
        'PlantScada': '6f7806c7aeb7a638bfeceff38d699527ce7677f532df96677457e7085be64eab',
        'test1': 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae'
    };
    if (hashObj[username] && sha256(password) === hashObj[username]) {
        alert('Login successful! Redirecting...');
        if (username === 'PlantScada') {
            document.getElementById('scada-frame').src = "https://web.eu.v-box.net/box-zt-web/web/html/pv.html?t=aa01f501595c4add8da3556357e5626e&uid=1012104&o=68e3ddfddaccf8202d7a554117c3398a&isPermission=1";
        } else if (username === 'test1') {
            document.getElementById('scada-frame').src = "https://web.eu.v-box.net/box-zt-web/web/html/pv.html?t=be298898197b40a1a0da564209b69593&uid=1012104&o=a6dabeefb53aba7f0cd41a2a3c0a512f&isPermission=1";
        }
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('scada-page').style.display = 'block';
    } else {
        alert('Invalid username or password');
    }
}
