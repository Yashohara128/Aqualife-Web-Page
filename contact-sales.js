document.addEventListener('DOMContentLoaded', () => {
    
    // Security Session Check
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // ================= BILINGUAL DICTIONARY FOR SALES PAGE =================
    const translations = {
        en: {
            btn_back: "Back",
            sales_title: "Our Sales Representatives",
            btn_call: "Call Now",
            btn_whatsapp: "WhatsApp",
            rep_names: ["Mr.Yashohara Ganewaththa", "Mr.Nawod Tharuka", "Ms.Ishani Tharushika"]
        },
        si: {
            main_title: "ඇක්වාලයිෆ් වෝටර් ස්",
            btn_back: "පසුපසට",
            sales_title: "අපගේ විකුණුම් නියෝජිතයින්",
            btn_call: "ඇමතුමක් ගන්න",
            btn_whatsapp: "වට්ස්ඇප්",
            rep_names: ["යශෝහර ගනේවත්ත මහතා", "නවෝද් තාරුක මහතා", "ඉෂානි තරුෂිකා මෙනවිය"]
        }
    };

    const btnEn = document.getElementById('btn-en');
    const btnSi = document.getElementById('btn-si');

    function changeLanguage(lang) {
        if (btnEn) btnEn.classList.remove('active');
        if (btnSi) btnSi.classList.remove('active');
        
        const activeBtn = document.getElementById(`btn-${lang}`);
        if (activeBtn) activeBtn.classList.add('active');

        // Dynamic Names translation array mapping loop safely
        const nameElements = document.querySelectorAll('.sales-name');
        nameElements.forEach((el, index) => {
            if (translations[lang] && translations[lang].rep_names && translations[lang].rep_names[index]) {
                el.textContent = translations[lang].rep_names[index];
            }
        });

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
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

    // Default initialization is set to English framework view
    changeLanguage('en');

});