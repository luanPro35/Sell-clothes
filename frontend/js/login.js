const email = document.querySelector('.input-email');
const password = document.querySelector('.input-password');
const pass_again = document.querySelector('.input-pass-again');
const name = document.querySelector('.input-name');
const address = document.querySelector('.input-address');
const phone = document.querySelector('.input-phone');

async function login() {
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    const data = {
        email: emailVal,
        password: passwordVal
    };

    if (!emailVal || !passwordVal) {
        alert("Nhập lại thông tin đăng nhập");
        return;
    }

    if (!emailVal.includes('@')) {
        alert("Email không hợp lệ");
        return;
    }

    if (passwordVal.length < 9) {
        alert("Mật khẩu phải có ít nhất 9 ký tự");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Đăng nhập không thành công");

        const result = await response.json();
        alert("Đăng nhập thành công!");
        console.log(result);
        localStorage.setItem("token", result.token);
    } catch (err) {
        console.error(err);
        alert("Có lỗi xảy ra khi đăng nhập.");
    }
}

async function register() {
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const passAgainVal = pass_again.value.trim();
    const nameVal = name.value.trim();
    const addressVal = address.value.trim();
    const phoneVal = phone.value.trim();

    const data = {
        email: emailVal,
        password: passwordVal,
        name: nameVal,
        address: addressVal,
        phone: phoneVal
    };

    if (!emailVal || !passwordVal || !passAgainVal || !nameVal || !addressVal || !phoneVal) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    if (!emailVal.includes('@')) {
        alert("Email không hợp lệ");
        return;
    }

    if (passwordVal.length < 9) {
        alert("Mật khẩu phải có ít nhất 9 ký tự");
        return;
    }

    if (passwordVal !== passAgainVal) {
        alert("Mật khẩu nhập lại không khớp");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", { // <-- ✅ ĐÃ SỬA Ở ĐÂY
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Đăng ký không thành công");
        }

        const result = await response.json();
        alert("Đăng ký thành công!");
        console.log(result);
        localStorage.setItem("token", result.token);
    } catch (err) {
        console.error(err);
        alert(err.message || "Có lỗi xảy ra khi đăng ký.");
    }
}
