document.addEventListener('DOMContentLoaded', () => {
    
    // ================= TRANSLATIONS DICTIONARY =================
    const translations = {
        en: {
            btn_login: "Loging", btn_create: "Create a new account", btn_forgot: "Forget user password", btn_back: "Back to Login",
            signup_title: "Create New Account", forgot_title: "Reset Password", forgot_desc: "Enter your registered email address to receive an OTP code.",
            otp_title: "Enter OTP Code", otp_desc: "We have simulated an OTP code to your email. Check your alerts!", btn_verify: "Verify & Show Password",
            btn_register: "Register", btn_send: "Send OTP Code", placeholder_user: "User Name / Email", placeholder_pass: "Password",
            placeholder_reguser: "Enter your user name", placeholder_reggmail: "Gmail", placeholder_regpass: "Password", placeholder_regconf: "Confirm password", placeholder_forgot: "Enter your registered Gmail",
            msg_pass_miss: "Passwords do not match!", msg_reg_ok: "Registration successful! You can now log in.", msg_login_err: "Invalid username or password!",
            msg_reset_ok: "OTP Sent! Enter this code: ", msg_reset_err: "This email is not registered in our system!",
            msg_otp_wrong: "Invalid OTP Code! Please try again.", msg_your_pass: "OTP Verified! Your password is: "
        },
        si: {
            btn_login: "ඇතුල් වන්න (Loging)", btn_create: "නව ගිණුමක් සාදන්න", btn_forgot: "මුරපදය අමතකද?", btn_back: "ආපසු ලොගින් පිටුවට",
            signup_title: "නව ගිණුමක් ආරම්භ කරන්න", forgot_title: "මුරපදය නැවත සැකසීම", forgot_desc: "මුරපදය නැවත සැකසීමේ OTP කේතය ලබා ගැනීමට ලියාපදිංචි කළ Email ලිපිනය ඇතුළත් කරන්න.",
            otp_title: "OTP කේතය ඇතුළත් කරන්න", otp_desc: "අපි ඔබගේ විද්‍යුත් තැපෑලට OTP කේතයක් යවා ඇත. Alert එක පරීක්ෂා කරන්න!", btn_verify: "තහවුරු කර මුරපදය පෙන්වන්න",
            btn_register: "ලියාපදිංචි වන්න", btn_send: "OTP කේතය යොමු කරන්න", placeholder_user: "පරිශීලක නාමය / Email", placeholder_pass: "මුරපදය ඇතුලත් කරන්න",
            placeholder_reguser: "පරිශීලක නාමය ඇතුළත් කරන්න", placeholder_reggmail: "Gmail ලිපිනය", placeholder_regpass: "මුරපදය", placeholder_regconf: "මුරපදය තහවුරු කරන්න", placeholder_forgot: "ලියාපදිංචි කළ Gmail ලිපිනය ඇතුළත් කරන්න",
            msg_pass_miss: "මුරපදයන් එකිනෙකට ගැලපෙන්නේ නැත!", msg_reg_ok: "ලියාපදිංචිය සාර්ථකයි! දැන් ඔබට ඇතුල් විය හැක.", msg_login_err: "පරිශීලක නාමය හෝ මුරපදය වැරදියි!",
            msg_reset_ok: "OTP යවන ලදී! මෙම කේතය ඇතුළත් කරන්න: ", msg_reset_err: "මෙම Email ලිපිනය පද්ධතියේ ලියාපදිංචි කර නැත!",
            msg_otp_wrong: "වැරදි OTP කේතයක්! නැවත උත්සාහ කරන්න.", msg_your_pass: "OTP තහවුරුයි! ඔබගේ මුරපදය වන්නේ: "
        }
    };

    let activeLang = 'en';
    let generatedOTP = "";
    let matchedUserObj = null;

    // DOM Elements Mapping
    const btnEn = document.getElementById('btn-en');
    const btnSi = document.getElementById('btn-si');
    const btnCreate = document.getElementById('btn-create');
    const btnForgotLink = document.getElementById('btn-forgot-link');
    const btnSignupBack = document.getElementById('btn-signup-back');
    const btnForgotBack = document.getElementById('btn-forgot-back');
    const btnOtpBack = document.getElementById('btn-otp-back');

    function showSection(sectionId) {
        const sections = ['loginSection', 'signupSection', 'forgotSection', 'otpSection'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.add('d-none');
        });
        const target = document.getElementById(sectionId);
        if(target) target.classList.remove('d-none');
    }

    function changeLanguage(lang) {
        activeLang = lang;
        btnEn.classList.remove('active');
        btnSi.classList.remove('active');
        document.getElementById(`btn-${lang}`).classList.add('active');

        document.getElementById('btn-login').textContent = translations[lang].btn_login;
        btnCreate.textContent = translations[lang].btn_create;
        btnForgotLink.textContent = translations[lang].btn_forgot;
        btnSignupBack.textContent = translations[lang].btn_back;
        btnForgotBack.textContent = translations[lang].btn_back;
        btnOtpBack.textContent = translations[lang].btn_back;

        document.getElementById('txt-signup-title').textContent = translations[lang].signup_title;
        document.getElementById('txt-forgot-title').textContent = translations[lang].forgot_title;
        document.getElementById('txt-forgot-desc').textContent = translations[lang].forgot_desc;
        document.getElementById('btn-register-submit').textContent = translations[lang].btn_register;
        document.getElementById('btn-send-code').textContent = translations[lang].btn_send;
        
        document.getElementById('txt-otp-title').textContent = translations[lang].otp_title;
        document.getElementById('txt-otp-desc').textContent = translations[lang].otp_desc;
        document.getElementById('btn-verify-otp').textContent = translations[lang].btn_verify;

        document.getElementById('username').placeholder = translations[lang].placeholder_user;
        document.getElementById('password').placeholder = translations[lang].placeholder_pass;
        document.getElementById('regUser').placeholder = translations[lang].placeholder_reguser;
        document.getElementById('regGmail').placeholder = translations[lang].placeholder_reggmail;
        document.getElementById('regPass').placeholder = translations[lang].placeholder_regpass;
        document.getElementById('regConfirmPass').placeholder = translations[lang].placeholder_regconf;
        document.getElementById('forgotEmail').placeholder = translations[lang].placeholder_forgot;
    }

    // Event Listeners Binding
    if(btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
    if(btnSi) btnSi.addEventListener('click', () => changeLanguage('si'));
    if(btnCreate) btnCreate.addEventListener('click', () => showSection('signupSection'));
    if(btnForgotLink) btnForgotLink.addEventListener('click', () => showSection('forgotSection'));
    if(btnSignupBack) btnSignupBack.addEventListener('click', () => showSection('loginSection'));
    if(btnForgotBack) btnForgotBack.addEventListener('click', () => showSection('loginSection'));
    if(btnOtpBack) btnOtpBack.addEventListener('click', () => showSection('loginSection'));

    // ================= 1. STANDARD LOGIN EVENT =================
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputUser = document.getElementById('username').value;
        const inputPass = document.getElementById('password').value;

        let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const foundUser = users.find(u => u.username === inputUser && u.password === inputPass);

        if (foundUser || (inputUser === "admin" && inputPass === "123456")) {
            const name = foundUser ? foundUser.username : "Admin";
            sessionStorage.setItem('loggedInUser', JSON.stringify({ name: name }));
            window.location.href = 'main.html';
        } else {
            alert(translations[activeLang].msg_login_err);
        }
    });

    // ================= 2. REGISTER SIGN UP EVENT =================
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('regUser').value;
        const email = document.getElementById('regGmail').value;
        const password = document.getElementById('regPass').value;
        const confirmPassword = document.getElementById('regConfirmPass').value;

        if (password !== confirmPassword) {
            alert(translations[activeLang].msg_pass_miss);
            return;
        }

        let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        users.push({ username, email, password });
        localStorage.setItem('registeredUsers', JSON.stringify(users));

        alert(translations[activeLang].msg_reg_ok);
        this.reset();
        showSection('loginSection');
    });

    // ================= 3. FORGOT PASSWORD (GENERATE OTP) =================
    document.getElementById('forgotForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputEmail = document.getElementById('forgotEmail').value;
        let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // check registerd mail or not
        const matchFound = users.find(u => u.email === inputEmail);

        if (matchFound) {
            matchedUserObj = matchFound;
            // generate random otp
            generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
            
            // show generated OTP (Simulation)
            alert(translations[activeLang].msg_reset_ok + generatedOTP);
            
            this.reset();
            showSection('otpSection'); // OTP ඇතුළත් කරන section එකට මාරු කරනවා
        } else {
            alert(translations[activeLang].msg_reset_err);
        }
    });

    // ================= 4. VERIFY OTP SUBMIT EVENT =================
    document.getElementById('otpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const userEnteredOTP = document.getElementById('otpInput').value;

        if (userEnteredOTP === generatedOTP) {
            alert(translations[activeLang].msg_your_pass + matchedUserObj.password);
            this.reset();
            showSection('loginSection');
        } else {
            alert(translations[activeLang].msg_otp_wrong);
        }
    });

});