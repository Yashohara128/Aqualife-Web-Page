// Admin Mode State (Default Off)
let isAdminMode = false;
const ADMIN_PASSWORD = "admin123";

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
        btn_delete_review: "Delete",
        no_reviews: "No reviews yet. Be the first to leave a review!"
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
        btn_delete_review: "මකා දමන්න",
        no_reviews: "තවමත් සමාලෝචන නොමැත. ඔබේ අදහස පළමුවෙන්ම එක් කරන්න!"
    }
};

// 📥 Fetch and Render Reviews from MySQL Database
function loadReviews() {
    fetch('get_reviews.php')
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                renderReviews(res.data);
            }
        })
        .catch(error => console.error('Error loading reviews:', error));
}

// 🎨 Render Reviews to UI Dynamically
function renderReviews(reviews) {
    const currentLang = localStorage.getItem('aqualife_lang') || 'en';
    const feedbackList = document.getElementById('feedbackList');
    if (!feedbackList) return;

    feedbackList.innerHTML = '';

    if (!reviews || reviews.length === 0) {
        feedbackList.innerHTML = `<div class="col-12 text-center text-white-50"><p>${translations[currentLang].no_reviews}</p></div>`;
        return;
    }

    reviews.forEach(review => {
        const stars = '⭐'.repeat(parseInt(review.rating));

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
                <p class="text-muted small mb-0 opacity-90">${review.comment}</p>
            </div>
        `;
        feedbackList.appendChild(col);
    });
}

// 🗑️ Delete Review Function (Connected to PHP)
function deleteReview(reviewId) {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const formData = new FormData();
    formData.append('id', reviewId);

    fetch('delete_review.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 'success') {
            loadReviews();
        } else {
            alert('Error deleting review: ' + res.message);
        }
    })
    .catch(error => console.error('Error deleting review:', error));
}

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

    loadReviews();
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

    loadReviews();
}

// 💬 Dynamic Review Submission Logic (Connected to PHP)
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('fbName').value.trim();
    const rating = document.getElementById('fbRating').value;
    const comment = document.getElementById('fbComment').value.trim();
    const currentLang = localStorage.getItem('aqualife_lang') || 'en';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rating', rating);
    formData.append('comment', comment);

    fetch('submit_review.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 'success') {
            alert(translations[currentLang].msg_fb_success);
            document.getElementById('feedbackForm').reset();
            loadReviews();
        } else {
            alert('Error: ' + res.message);
        }
    })
    .catch(error => {
        console.error('Error submitting review:', error);
        alert('Server error. Please try again!');
    });
});

// 🚀 Load Page Data
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('aqualife_lang') || 'en';
    changeLanguage(savedLang);
    loadReviews();
});