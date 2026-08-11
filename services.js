document.addEventListener('DOMContentLoaded', () => {
    
    // Security check: User කෙනෙක් ලොග් වෙලා නැත්නම් ආයේ ලොගින් පේජ් එකට හරවනවා
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // ================= FULL BILINGUAL TRANSLATION DATA DICTIONARY =================
    const translations = {
        en: {
            main_title: "Aqualife Waters",
            btn_back: "Dashboard",
            services_title: "Our Services",
            service_1_title: "Request Free Water Test",
            service_1_desc: "Get professional analysis of your ordinary tap water condition absolutely free of charge.",
            service_2_title: "Request a Water Filter",
            service_2_desc: "Request a custom high-quality filtration unit setup perfectly tailored for your family needs.",
            service_3_title: "Q/A Section",
            service_3_desc: "Have questions about our water treatment solutions? Find answers to frequently asked questions or contact our support team."
        },
        si: {
            main_title: "ඇක්වාලයිෆ් වෝටර්ස්",
            btn_back: "ප්‍රධාන පුවරුව",
            services_title: "අපගේ සේවාවන්",
            service_1_title: "නොමිලේ ජල පරීක්ෂාව",
            service_1_desc: "ඔබගේ සාමාන්‍ය නළ ජලයේ තත්ත්වය පිළිබඳ වෘත්තීය විශ්ලේෂණයක් සම්පූර්ණයෙන්ම නොමිලේ ලබා ගන්න.",
            service_2_title: "ජල පෙරහන් ඉල්ලීම්",
            service_2_desc: "ඔබගේ පවුලේ අවශ්‍යතාවලට හොඳින්ම ගැලපෙන උසස් තත්ත්වයේ ජල පෙරහන් පද්ධතියක් ස්ථාපනය කිරීමට ඉල්ලුම් කරන්න.",
            service_3_title: "ප්‍රශ්න/පිළිතුරු අංශය",
            service_3_desc: "අපගේ ජල සැකසීමේ සම්බන්ධ ප්‍රශ්නවලට පිළිතුරු සොයනවද? අපගේ නිතර අසන ප්‍රශ්නවලට පිළිතුරු සොයා ගන්න හෝ අපගේ සහාය කණ්ඩායම අමතන්න."
        }
    };

    const btnEn = document.getElementById('btn-en');
    const btnSi = document.getElementById('btn-si');

    // Dynamically update text nodes
    function changeLanguage(lang) {
        btnEn.classList.remove('active');
        btnSi.classList.remove('active');
        document.getElementById(`btn-${lang}`).classList.add('active');

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                const icon = element.querySelector('i');
                if (icon) {
                    element.innerHTML = icon.outerHTML + " " + translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
    if (btnSi) btnSi.addEventListener('click', () => changeLanguage('si'));

    // Default initialization
    changeLanguage('en');

});