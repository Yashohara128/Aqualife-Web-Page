// Admin Mode State (Default Off)
let isAdminMode = false;
const ADMIN_PASSWORD = "admin123"; // 🔑 Admin password එක මෙතනින් වෙනස් කරගන්න පුළුවන්

// Initial Default Reviews
const defaultReviews = [
    {
        id: 1,
        name: "Kasun Rajapaksha",
        rating: 5,
        comment_en: "Great water filter! Water taste changed completely and installation was super fast. Highly recommended!",
        comment_si: "ඉතාමත් හොඳ ජල පෙරහනක්! ජලයේ රසය සම්පූර්ණයෙන්ම වෙනස් වුණා. සවිකිරීමත් ඉතා ඉක්මනින් කර දුන්නා."
    },
    {
        id: 2,
        name: "Samanthi Dilrukshi",
        rating: 5,
        comment_en: "Awesome service! Very helpful sales representatives and easy installment options. Thanks Aqualife!",
        comment_si: "විශිෂ්ට සේවාවක්! අලෙවි නියෝජිතයින් ඉතා සහයෝගයෙන් කටයුතු කළා. පහසු වාරික ක්‍රමත් තියෙනවා. ස්තූතියි Aqualife!"
    }
];

// Load Reviews from LocalStorage or initialize with defaults
function getStoredReviews() {
    const stored = localStorage.getItem('aqualife_reviews');
    if (stored) {
        return JSON.parse(stored);
    } else {
        localStorage.setItem('aqualife_reviews', JSON.stringify(defaultReviews));
        return defaultReviews;
    }
}

// Save Reviews to LocalStorage
function saveReviews(reviews) {
    localStorage.setItem('aqualife_reviews', JSON.stringify(reviews));
}

// 🌐 Translations Dictionary (English & Sinhala)
const translations = {
    en: {
        top_back_btn: "Back to Services",
        page_title: "Frequently Asked Questions",
        page_sub: "Find answers to common questions about our water filters, maintenance, and services.",

        // Accordion Questions & Answers
        q1_title: "How often should I change the filter cartridges?",
        q1_ans: "Filter cartridges usually need to be replaced every 6 to 12 months depending on your home water usage and quality. Our after-service team will send you timely reminders!",

        q2_title: "What warranty options do Aqualife water filters include?",
        q2_ans: "All our Home & Industry filters come with 1 Year Full Company Warranty and a 10-Year Product Service Warranty for complete peace of mind.",

        q3_title: "Is the initial water quality test completely free?",
        q3_ans: "Yes! Our professional tap water condition analysis is 100% free of charge. You can request a free test directly from our services menu.",

        q4_title: "What payment and installment methods do you accept?",
        q4_ans: "We accept Cash, Online Bank Transfers, and easy 8 to 10-month down-payment installment plans. Full cash payments also enjoy special cash discounts!",

        q5_title: "How can I contact sales or technical support for help?",
        q5_ans: "You can directly reach out to our dedicated Sales Representatives via our Contact Sales page or call our support team directly.",

        // Callout Box
        callout_title: "Still Have Questions?",
        callout_sub: "If you couldn't find your answer here, our sales representatives are ready to assist you!",
        btn_contact_sales: "Contact Sales Team",

        // User Feedback Section
        feedback_title: "Customer Feedback & Reviews",
        feedback_sub: "Share your experience with Aqualife Waters or see what others say!",
        leave_review_heading: "Leave a Review",
        lbl_fb_name: "Your Name",
        lbl_fb_rating: "Rating",
        lbl_fb_comment: "Your Feedback",
        ph_name: "e.g. Nimal Perera",
        ph_fb_comment: "Write your experience with Aqualife Waters...",
        btn_submit_review: "Submit Review",
        msg_fb_success: "Thank you for your valuable feedback! Your review has been added.",

        // Admin Prompt Texts
        admin_prompt: "Enter System Admin Password:",
        admin_wrong_pass: "Incorrect Admin Password!",
        admin_mode_on: "Admin Mode Activated! You can now delete reviews.",
        admin_mode_off: "Admin Mode Deactivated.",
        btn_delete_review: "Delete"
    },
    si: {
        top_back_btn: "සේවා වෙත ආපසු",
        page_title: "නිතර අසන ප්‍රශ්න (Q/A)",
        page_sub: "අපගේ ජල පෙරහන්, නඩත්තුව සහ සේවාවන් පිළිබඳ පොදු ප්‍රශ්නවලට පිළිතුරු මෙතැනින් ලබාගන්න.",

        // Accordion Questions & Answers
        q1_title: "ෆිල්ටර් කැට (Cartridges) මාරු කළ යුත්තේ කොපමණ කාලයකට සැරයක්ද?",
        q1_ans: "ඔබගේ භාවිතය සහ ජලයේ තත්ත්වය අනුව සාමාන්‍යයෙන් මාස 6 සිට 12 දක්වා කාලයකදී ෆිල්ටර් කැට මාරු කළ යුතුය. ඒ සඳහා අපගේ සේවා කණ්ඩායම විසින් ඔබට නිසි වෙලාවට දැනුම් දෙනු ඇත!",

        q2_title: "Aqualife ජල පෙරහන් සඳහා ලැබෙන වගකීම් කාලය කොපමණද?",
        q2_ans: "අපගේ සියලුම නිවාස සහ කාර්මික ෆිල්ටර සඳහා වසර 1ක පූර්ණ සමාගම් වගකීමක් සහ වසර 10ක නිෂ්පාදන සේවා වගකීමක් (Service Warranty) හිමිවේ.",

        q3_title: "පළමු ජල පරීක්ෂාව (Water Test) නොමිලේ සිදු කරයිද?",
        q3_ans: "ඔව්! අපගේ වෘත්තීය ජල තත්ත්ව පරීක්ෂාව 100%ක්ම නොමිලේ සිදු කරනු ලබයි. ඔබට සේවා මෙනුව හරහා නොමිලේ ජල පරීක්ෂාවක් ඉල්ලුම් කළ හැක.",

        q4_title: "ලබාගත හැකි ගෙවීමේ ක්‍රම සහ වාරික ක්‍රම මොනවාද?",
        q4_ans: "අතින් මුදල් ගෙවීම, ඔන්ලයින් බැංකු තැන්පතු සහ මාස 8 සිට 10 දක්වා පහසු වාරික ගෙවීමේ ක්‍රම අප සතුව ඇත. එකවර ගෙවීමේදී විශේෂ වට්ටම්ද හිමිවේ!",

        q5_title: "අලෙවි හෝ තාක්ෂණික සහාය ලබාගන්නේ කෙසේද?",
        q5_ans: "අපගේ Contact Sales පිටුව හරහා අපගේ අලෙවි නියෝජිතයින් සෘජුවම සම්බන්ධ කර ගැනීමට හෝ සහායක කණ්ඩායම ඇමතීමට ඔබට හැක.",

        // Callout Box
        callout_title: "තවමත් ප්‍රශ්න තියෙනවාද?",
        callout_sub: "ඔබට අවශ්‍ය පිළිතුර මෙතැනින් හමු නොවූයේ නම්, අපගේ අලෙවි නියෝජිතයින් ඔබට සහාය වීමට ලෑස්තියි!",
        btn_contact_sales: "අලෙවි නියෝජිතයින් අමතන්න",

        // User Feedback Section
        feedback_title: "පාරිභෝගික අදහස් සහ සමාලෝචන",
        feedback_sub: "Aqualife Waters සමඟ ඔබගේ අත්දැකීම් බෙදාගන්න හෝ අන් අය පවසන දේ බලන්න!",
        leave_review_heading: "ඔබේ අදහස ඇතුළත් කරන්න",
        lbl_fb_name: "ඔබේ නම",
        lbl_fb_rating: "තාරකා මට්ටම (Rating)",
        lbl_fb_comment: "ඔබේ අදහස/අත්දැකීම",
        ph_name: "උදා: නිමල් පෙරේරා",
        ph_fb_comment: "Aqualife Waters සමඟ ඔබේ අත්දැකීම ලියන්න...",
        btn_submit_review: "අදහස යොමු කරන්න",
        msg_fb_success: "ඔබගේ වටිනා අදහසට ස්තූතියි! ඔබේ Review එක සටහන් කරගන්නා ලදී.",

        // Admin Prompt Texts
        admin_prompt: "පද්ධති පරිපාලක (Admin) මුරපදය ඇතුළත් කරන්න:",
        admin_wrong_pass: "ඇතුළත් කළ මුරපදය වැරදියි!",
        admin_mode_on: "Admin Mode සක්‍රියයි! දැන් ඔබට Reviews Delete කළ හැක.",
        admin_mode_off: "Admin Mode අක්‍රිය කරන ලදී.",
        btn_delete_review: "මකා දමන්න"
    }
};

// 🔑 Toggle Admin Mode Function
function toggleAdminMode() {
    const currentLang = localStorage.getItem('aqualife_lang') || 'en';
    const adminBtn = document.getElementById('adminToggleBtn');

    if (!isAdminMode) {
        const password = prompt(translations[currentLang].admin_prompt);
        if (password === ADMIN_PASSWORD) {
            isAdminMode = true;
            alert(translations[currentLang].admin_mode_on);
            adminBtn.classList.remove('btn-outline-warning');
            adminBtn.classList.add('btn-warning', 'text-dark');
            adminBtn.innerHTML = '<i class="fa-solid fa-user-check me-1"></i> Admin ON';
        } else if (password !== null) {
            alert(translations[currentLang].admin_wrong_pass);
        }
    } else {
        isAdminMode = false;
        alert(translations[currentLang].admin_mode_off);
        adminBtn.classList.remove('btn-warning', 'text-dark');
        adminBtn.classList.add('btn-outline-warning');
        adminBtn.innerHTML = '<i class="fa-solid fa-user-shield me-1"></i> Admin Mode';
    }

    renderReviews(); // Re-render to show/hide delete buttons
}

// 🗑️ Delete Review Function
function deleteReview(reviewId) {
    let reviews = getStoredReviews();
    reviews = reviews.filter(r => r.id !== reviewId);
    saveReviews(reviews);
    renderReviews();
}

// 🎨 Render Reviews to UI Dynamically
function renderReviews() {
    const reviews = getStoredReviews();
    const currentLang = localStorage.getItem('aqualife_lang') || 'en';
    const feedbackList = document.getElementById('feedbackList');
    if (!feedbackList) return;

    feedbackList.innerHTML = '';

    reviews.forEach(review => {
        const stars = '⭐'.repeat(parseInt(review.rating));
        const commentText = currentLang === 'si' 
            ? (review.comment_si || review.comment_en) 
            : (review.comment_en || review.comment_si);

        const deleteBtnHtml = isAdminMode ? `
            <button class="btn btn-sm btn-danger py-0 px-2 rounded-pill fw-bold" onclick="deleteReview(${review.id})">
                <i class="fa-solid fa-trash-can me-1"></i> ${translations[currentLang].btn_delete_review || 'Delete'}
            </button>
        ` : '';

        const col = document.createElement('div');
        col.className = 'col-md-6';
        col.innerHTML = `
            <div class="bg-white p-3 rounded-4 text-dark h-100 shadow-sm border-start border-4 border-warning position-relative">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <strong class="text-primary fs-6">${review.name}</strong>
                    <div class="d-flex align-items-center gap-2">
                        <span class="text-warning small">${stars}</span>
                        ${deleteBtnHtml}
                    </div>
                </div>
                <p class="text-muted small mb-0 opacity-90">${commentText}</p>
            </div>
        `;
        feedbackList.appendChild(col);
    });
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

    renderReviews();
}

// 💬 Dynamic Review Submission Logic
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('fbName').value.trim();
    const rating = document.getElementById('fbRating').value;
    const comment = document.getElementById('fbComment').value.trim();

    const newReview = {
        id: Date.now(), // Unique Timestamp ID
        name: name,
        rating: rating,
        comment_en: comment,
        comment_si: comment
    };

    const reviews = getStoredReviews();
    reviews.unshift(newReview); // Add to beginning
    saveReviews(reviews);

    renderReviews();

    const currentLang = localStorage.getItem('aqualife_lang') || 'en';
    alert(translations[currentLang].msg_fb_success);

    this.reset();
});

// 🚀 Load Saved Language and Render Reviews on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('aqualife_lang') || 'en';
    changeLanguage(savedLang);
});