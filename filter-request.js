// Current state tracking variables
let currentType = 'home'; 
let currentProductName = 'Home Water Filter';
let currentPrice = 'LKR 54,990';

// 🌐 Translations Dictionary with LKR 54,990 Updates
const translations = {
    en: {
        top_back_btn: "Back to Services",
        page_title: "Choose Your Water Filter",
        page_sub: "Select the perfect filtration system for your home or business with easy installment plans.",
        
        // Home Filter Card
        badge_home: "Most Popular",
        home_title: "Home Water Filter",
        home_desc: "RO + UV + TDS Controller Multi-stage Pure Filtration for Families.",
        full_price_label: "Full Price:",
        discount_tag: "Special Offer",
        home_discount_note: "🎉 Special Discounted Price for Full Cash Payment!",
        unit: "/ unit",
        easy_plan_title: "Easy Installment Plan:",
        home_inst_1: "First Down Payment LKR 25,000 you have to pay LKR 5,000 / Month (08 Months)",
        home_inst_2: "First Down Payment LKR 15,000 you have to pay LKR 5,490 / Month (10 Months)",
        home_inst_3: "First Down Payment LKR 10,000 you have to pay LKR 5,990 / Month (10 Months)",
        card_interest: "0% Interest for selected Credit Cards",
        free_del_inst: "Free Delivery & Free Installation",
        btn_req_home: "Request Home Filter",

        // Industry Filter Card
        badge_ind: "Commercial Grade",
        ind_title: "Industry Water Filter",
        ind_desc: "Heavy Duty High Capacity Filtration System for Factories & Offices.",
        comm_plan_title: "Commercial Installment Plan:",
        ind_inst_1: "Pay LKR 15,400 / Month (12 Months)",
        ind_inst_2: "Flexible Business Payment Options",
        ind_inst_3: "2 Years Commercial Warranty Included",
        btn_req_ind: "Request Industry Filter",

        // Form Modal Labels
        modal_title: "Filter Request Form",
        lbl_selected: "Selected Product",
        lbl_name: "Your Full Name",
        lbl_phone: "Phone Number",
        lbl_plan: "Payment Plan Option",
        lbl_address: "Delivery / Installation Address",
        btn_submit: "Submit Filter Request",
        
        // Placeholders
        ph_name: "e.g. Yashohara",
        ph_phone: "07X XXX XXXX",
        ph_address: "Enter full address",
        
        // Dynamic Dropdown Options (Home Filter - LKR 54,990)
        opt_home_full: "Full Payment - Cash Discount (LKR 54,990 - Outright Purchase)",
        opt_home_plan1: "Down Payment LKR 25,000 + LKR 5,000/mo (08 Months)",
        opt_home_plan2: "Down Payment LKR 15,000 + LKR 5,490/mo (10 Months)",
        opt_home_plan3: "Down Payment LKR 10,000 + LKR 5,990/mo (10 Months)",

        // Dynamic Dropdown Options (Industry Filter)
        opt_ind_full: "Full Payment (LKR 185,000 - Outright Purchase)",
        opt_ind_plan1: "Monthly Installment LKR 15,400/mo (12 Months)",

        // Alerts
        msg_success: "Thank you! Your filter request has been submitted successfully. Our team will contact you shortly."
    },
    si: {
        top_back_btn: "සේවා වෙත ආපසු",
        page_title: "ඔබට අවශ්‍ය ජල පෙරහන තෝරාගන්න",
        page_sub: "පහසු ගෙවීමේ ක්‍රම සහිතව ඔබේ නිවසට හෝ ව්‍යාපාරයට ගැළපෙන ජල පෙරහන් පද්ධතිය තෝරාගන්න.",
        
        // Home Filter Card
        badge_home: "වඩාත්ම ජනප්‍රියයි",
        home_title: "නිවසේ භාවිතයට ජල පෙරහන",
        home_desc: "පවුලේ සැමට පිරිසිදු ජලය ලබාදෙන RO + UV + TDS Controller බහු-පියවර තාක්ෂණය.",
        full_price_label: "සම්පූර්ණ මිළ:",
        discount_tag: "විශේෂ වට්ටම්",
        home_discount_note: "🎉 එකවර ගෙවීමේදී විශේෂ වට්ටම් මිල!",
        unit: "/ එකකයක්",
        easy_plan_title: "පහසු වාරික ගෙවීමේ ක්‍රමය:",
        home_inst_1: "මුලින් LKR 25,000 ක් ගෙවා මසකට LKR 5,000 බැගින් (මාස 08)",
        home_inst_2: "මුලින් LKR 15,000 ක් ගෙවා මසකට LKR 5,490 බැගින් (මාස 10)",
        home_inst_3: "මුලින් LKR 10,000 ක් ගෙවා මසකට LKR 5,990 බැගින් (මාස 10)",
        card_interest: "තෝරාගත් ක්‍රෙඩිට් කාඩ්පත් සඳහා 0% පොලියක්",
        free_del_inst: "නොමිලේ ප්‍රවාහනය සහ සවිකර දීම",
        btn_req_home: "නිවාස ෆිල්ටරය ලබාගන්න",

        // Industry Filter Card
        badge_ind: "ව්‍යාපාරික මට්ටමේ",
        ind_title: "කාර්මික භාවිතයට ජල පෙරහන",
        ind_desc: "කර්මාන්තශාලා සහ කාර්යාල සඳහා ඉහළ ධාරිතාවයෙන් යුත් ජල පෙරහන් පද්ධතිය.",
        comm_plan_title: "ව්‍යාපාරික වාරික ගෙවීමේ ක්‍රමය:",
        ind_inst_1: "මසකට LKR 15,400 බැගින් (මාස 12)",
        ind_inst_2: "ව්‍යාපාර සඳහා පහසු ගෙවීමේ ක්‍රම",
        ind_inst_3: "වසර 2ක වගකීම් සහතිකය සහිතයි",
        btn_req_ind: "කාර්මික ෆිල්ටරය ලබාගන්න",

        // Form Modal Labels
        modal_title: "ජල පෙරහන් ඉල්ලුම් පත්‍රය",
        lbl_selected: "තෝරාගත් නිෂ්පාදනය",
        lbl_name: "ඔබේ සම්පූර්ණ නම",
        lbl_phone: "දුරකථන අංකය",
        lbl_plan: "ගෙවීමේ ක්‍රමය",
        lbl_address: "ලබාදිය යුතු ලිපිනය",
        btn_submit: "ඉල්ලුම්පත යොමු කරන්න",

        // Placeholders
        ph_name: "උදා: යශෝහාර",
        ph_phone: "07X XXX XXXX",
        ph_address: "සම්පූර්ණ ලිපිනය ඇතුළත් කරන්න",

        // Dynamic Dropdown Options (Home Filter - LKR 54,990)
        opt_home_full: "එකවර ගෙවීම - විශේෂ වට්ටම් මිල (LKR 54,990)",
        opt_home_plan1: "මුලින් LKR 25,000 + මසකට LKR 5,000 බැගින් (මාස 08)",
        opt_home_plan2: "මුලින් LKR 15,000 + මසකට LKR 5,490 බැගින් (මාස 10)",
        opt_home_plan3: "මුලින් LKR 10,000 + මසකට LKR 5,990 බැගින් (මාස 10)",

        // Dynamic Dropdown Options (Industry Filter)
        opt_ind_full: "සම්පූර්ණ මුදල ගෙවීම (LKR 185,000)",
        opt_ind_plan1: "මාසික වාරික ගෙවීම - මසකට LKR 15,400 බැගින් (මාස 12)",

        // Alerts
        msg_success: "ස්තූතියි! ඔබේ ජල පෙරහන් ඉල්ලුම්පත සාර්ථකව යොමු කෙරුණි. අපගේ කණ්ඩායම ඉක්මනින් ඔබව සම්බන්ධ කර ගනු ඇත."
    }
};

// 🔄 Populate Dropdown Options Dynamically
function populatePaymentOptions(type, lang) {
    const select = document.getElementById('paymentPlanSelect');
    if (!select) return;

    select.innerHTML = '';

    if (type === 'home') {
        const options = [
            { val: 'full_54990', text: translations[lang].opt_home_full },
            { val: 'plan1_25k', text: translations[lang].opt_home_plan1 },
            { val: 'plan2_15k', text: translations[lang].opt_home_plan2 },
            { val: 'plan3_10k', text: translations[lang].opt_home_plan3 }
        ];
        options.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.val;
            el.textContent = opt.text;
            select.appendChild(el);
        });
    } else if (type === 'industry') {
        const options = [
            { val: 'full', text: translations[lang].opt_ind_full },
            { val: 'plan_12m', text: translations[lang].opt_ind_plan1 }
        ];
        options.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.val;
            el.textContent = opt.text;
            select.appendChild(el);
        });
    }
}

// 🌐 Language Switcher Function
function changeLanguage(lang) {
    localStorage.setItem('aqualife_lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    const btnEn = document.getElementById('lang-en');
    const btnSi = document.getElementById('lang-si');

    if (lang === 'si') {
        btnSi.classList.add('btn-light', 'active');
        btnSi.classList.remove('btn-outline-light');
        btnEn.classList.add('btn-outline-light');
        btnEn.classList.remove('btn-light', 'active');
    } else {
        btnEn.classList.add('btn-light', 'active');
        btnEn.classList.remove('btn-outline-light');
        btnSi.classList.add('btn-outline-light');
        btnSi.classList.remove('btn-light', 'active');
    }

    populatePaymentOptions(currentType, lang);
}

// 📦 Open Modal Function
function openRequestModal(productName, price, type) {
    currentProductName = productName;
    currentPrice = price;
    currentType = type;

    document.getElementById('selectedProduct').value = productName + " (" + price + ")";
    
    const currentLang = localStorage.getItem('aqualife_lang') || 'en';
    populatePaymentOptions(type, currentLang);

    var requestModal = new bootstrap.Modal(document.getElementById('requestModal'));
    requestModal.show();
}

// 📝 Form Submit Handler
document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentLang = localStorage.getItem('aqualife_lang') || 'en';
    alert(translations[currentLang].msg_success);
    
    var modalElement = document.getElementById('requestModal');
    var modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    this.reset();
});

// 🚀 Load Saved Language on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('aqualife_lang') || 'en';
    changeLanguage(savedLang);
});