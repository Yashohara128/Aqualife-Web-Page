document.addEventListener('DOMContentLoaded', () => {
    
    // සෙකියුරිටි චෙක්: යූසර් කෙනෙක් ලොග් වෙලා නැත්නම් ආයේ ලොගින් පේජ් එකට හරවනවා
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // ලොග් වෙච්ච යූසර්ගේ නම හෙඩර් එකේ පෙන්වීම
    document.getElementById('userDisplayName').textContent = loggedInUser.name;

    // ================= FULL TRANSLATIONS DATA DICTIONARY =================
    const translations = {
        en: {
            main_title: "Aqualife Waters",
            txt_welcome: "Welcome,",
            section_about: "ABOUT US",
            section_mission: "Our Mission",
            section_vision: "Our Vision",
            section_why: "Why Choose Us?",
            btn_explore: "Our services",
            about_p1: "Aqua Life Waters (Pvt) Ltd is a trusted pioneer in the water purification industry in Sri Lanka, committed to providing safe, clean, and healthy drinking water for every household and business. Since our inception, we have specialized in the design, manufacturing, and distribution of high-quality water filtration systems tailored to meet the diverse needs of Sri Lankan families and organizations.",
            about_p2: "We believe that pure water is the foundation of a healthy life. With this vision, Aqua Life Waters has become a household name, offering innovative water filters that combine modern technology, durability, and affordability. Our wide product range from domestic filters to advanced commercial purification solutions ensures that every customer finds the right fit for their lifestyle.",
            mission_body: "To deliver safe, reliable, and eco-friendly water purification solutions that enhance the health and well-being of our customers while contributing to a sustainable future.",
            vision_body: "To be the most trusted water filter brand in Sri Lanka, ensuring that every home and business has access to pure drinking water.",
            feat_1_title: "Proven Experience:", feat_1_desc: " A decade of service in Sri Lanka's water purification market.",
            feat_2_title: "Innovative Technology:", feat_2_desc: " Filters designed to tackle local water challenges.",
            feat_3_title: "Strong After-Sales Service:", feat_3_desc: " Reliable customer care and technical support across all regions.",
            feat_4_title: "Commitment to Quality:", feat_4_desc: " Every product is built to international standards and tested for durability.",
            feat_5_title: "Trusted by Thousands:", feat_5_desc: " From families to businesses, our name represents reliability and health."
        },
        si: {
            main_title: "ඇක්වාලයිෆ් වෝටර්ස්",
            txt_welcome: "සාදරයෙන් පිළිගනිමු,",
            section_about: "අප පිළිබඳව",
            section_mission: "අපගේ මෙහෙවර",
            section_vision: "අපගේ දැක්ම",
            section_why: "ඇයි අපව තෝරාගන්නේ?",
            btn_explore: "අපගේ සේවාවන්",
            about_p1: "ඇක්වා ලයිෆ් වෝටර්ස් (පුද්) සමාගම යනු ශ්‍රී ලංකාවේ සෑම නිවසකටම සහ ව්‍යාපාරයකටම ආරක්ෂිත, පිරිසිදු සහ සෞඛ්‍ය සම්පන්න පානීය ජලය සැපයීමට කැපවී සිටින, ජල පිරිපහදු ක්ෂේත්‍රයේ විශ්වාසදායක පුරෝගාමියෙකි. අපගේ ආරම්භයේ සිටම, ශ්‍රී ලාංකික පවුල් සහ ආයතනවල විවිධ අවශ්‍යතා සපුරාලීම සඳහා සකස් කරන ලද උසස් තත්ත්වයේ ජල පිරිපහදු පද්ධති සැලසුම් කිරීම, නිෂ්පාදනය කිරීම සහ බෙදා හැරීම සම්බන්ධයෙන් අප විශේෂඥතාවක් ලබා ඇත.",
            about_p2: "පිරිසිදු ජලය යනු නිරෝගී ජීවිතයක පදනම බව අප විශ්වාස කරමු. මෙම දැක්ම පෙරදැරිව, නවීන තාක්‍ෂණය, කල්පැවැත්ම සහ දැරිය හැකි මිල ඒකාබද්ධ කරන නව්‍ය ජල පෙරහන් පිරිනමමින් ඇක්වා ලයිෆ් වෝටර්ස් සෑම නිවසකම හුරුපුරුදු නාමයක් බවට පත්ව ඇත. ගෘහස්ථ පෙරහන් වල සිට උසස් වාණිජ පිරිපහදු විසඳුම් දක්වා වූ අපගේ පුළුල් නිෂ්පාදන පරාසය සෑම පාරිභෝගිකයෙකුටම ඔවුන්ගේ ජීවන රටාවට ගැළපෙනම නිෂ්පාදනයක් තෝරා ගැනීමට මඟ පාදයි.",
            mission_body: "තිරසාර අනාගතයකට දායක වෙමින් අපගේ පාරිභෝගිකයින්ගේ සෞඛ්‍යය සහ යහපැවැත්ම ඉහළ නංවන ආරක්ෂිත, විශ්වාසදායක සහ පරිසර හිතකාමී ජල පිරිපහදු විසඳුම් ලබා දීමයි.",
            vision_body: "සෑම නිවසකටම සහ ව්‍යාපාරයකටම පිරිසිදු පානීය ජලය ලබා ගැනීමට ඇති අයිතිය තහවුරු කරමින්, ශ්‍රී ලංකාවේ වඩාත්ම විශ්වාසදායක ජල පෙරහන් සන්නාමය බවට පත්වීමයි.",
            feat_1_title: "ඔප්පු කරන ලද පළපුරුද්ද:", feat_1_desc: " ශ්‍රී ලංකාවේ ජල පිරිපහදු වෙළඳපොළ තුළ දශකයක විශ්වාසනීය සේවාව.",
            feat_2_title: "නව්‍ය තාක්‍ෂණය:", feat_2_desc: " ප්‍රාදේශීය ජල ගැටළු වලට විසඳුම් සෙවීම සඳහාම විශේෂයෙන් සැලසුම් කරන ලද පෙරහන් පද්ධති.",
            feat_3_title: "විශිෂ්ට අලෙවියෙන් පසු සේවාව:", feat_3_desc: " සියලුම ප්‍රදේශ ආවරණය වන පරිදි විශ්වාසදායක පාරිභෝගික සේවා සහ...</p>",
            feat_3_title: "විශිෂ්ට අලෙවියෙන් පසු සේවාව:", feat_3_desc: " සියලුම ප්‍රදේශ ආවරණය වන පරිදි විශ්වාසදායක පාරිභෝගික සේවා සහ තාක්ෂණික සහාය.",
            feat_4_title: "ගුණාත්මකභාවය පිළිබඳ කැපවීම:", feat_4_desc: " සෑම නිෂ්පාදනයක්ම ජාත්‍යන්තර ප්‍රමිතීන්ට අනුකූලව නිපදවා ඇති අතර කල්පැවැත්ම පිළිබඳව පරීක්ෂා කර ඇත.",
            feat_5_title: "දහස් ගණනකගේ විශ්වාසය:", feat_5_desc: " සාමාන්‍ය පවුල්වල සිට මහා පරිමාණ ව්‍යාපාර දක්වා, අපගේ නාමය විශ්වාසවන්තභාවයේ සහ සෞඛ්‍යයේ සලකුණකි."
        }
    };

    const btnEn = document.getElementById('btn-en');
    const btnSi = document.getElementById('btn-si');
    const btnLogout = document.getElementById('btn-logout');

    // භාෂාව වෙනස් කරන ප්‍රධාන ෆන්ක්ෂන් එක
    function changeLanguage(lang) {
        btnEn.classList.remove('active');
        btnSi.classList.remove('active');
        document.getElementById(`btn-${lang}`).classList.add('active');

        // ලිපි තියෙන පැරග්‍රාෆ් ඩයිනමික්ව මාරු කිරීම
        document.getElementById('txt-about-p1').textContent = translations[lang].about_p1;
        document.getElementById('txt-about-p2').textContent = translations[lang].about_p2;
        document.getElementById('txt-mission-body').textContent = translations[lang].mission_body;
        document.getElementById('txt-vision-body').textContent = translations[lang].vision_body;

        // අනෙකුත් ඩැටා ටැග්ස් මාරු කිරීම (අයිකන කැපෙන්නේ නැති වෙන්න)
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                const icon = element.querySelector('i');
                if(icon) {
                    element.innerHTML = icon.outerHTML + " " + translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    // ලැන්වේජ් ක්ලික් ලිස්නර්ස්
    if(btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
    if(btnSi) btnSi.addEventListener('click', () => changeLanguage('si'));

    // මුලින්ම පිටුව ලෝඩ් වෙද්දී ඉංග්‍රීසි භාෂාවෙන් පෙන්වීම
    changeLanguage('en');

    // ලොග් අවුට් වීමේ ක්‍රියාවලිය
    if(btnLogout) {
        btnLogout.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
    }

});