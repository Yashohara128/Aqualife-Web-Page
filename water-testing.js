document.addEventListener('DOMContentLoaded', () => {
    
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const districtsEn = {
        "Western": ["Colombo", "Gampaha", "Kalutara"],
        "Central": ["Kandy", "Matale", "Nuwara Eliya"],
        "Southern": ["Galle", "Matara", "Hambantota"],
        "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu"],
        "Eastern": ["Trincomalee", "Batticaloa", "Ampara"],
        "North West": ["Kurunegala", "Puttalam"],
        "North Central": ["Anuradhapura", "Polonnaruwa"],
        "Uva": ["Badulla", "Moneragala"],
        "Sabaragamuwa": ["Ratnapura", "Kegalle"]
    };

    const districtsSi = {
        "Western": ["කොළඹ", "ගම්පහ", "කළුතර"],
        "Central": ["මහනුවර", "මාතලේ", "නුවරඑළිය"],
        "Southern": ["ගාල්ල", "මාතර", "හම්බන්තොට"],
        "Northern": ["යාපනය", "කිලිනොච්චිය", "මන්නාරම", "වවුනියාව", "මුලතිව්"],
        "Eastern": ["ත්‍රිකුණාමලය", "මඩකලපුව", "අම්පාර"],
        "North West": ["කුරුණෑගල", "පුත්තලම"],
        "North Central": ["අනුරාධපුරය", "පොළොන්නරුව"],
        "Uva": ["බදුල්ල", "මොනරාගල"],
        "Sabaragamuwa": ["රත්නපුරය", "කෑගල්ල"]
    };

    const translations = {
        en: {
            main_title: "Aqualife Waters",
            btn_back: "Services",
            btn_back_intro: "Back to Tests",
            intro_title: "Free Water Quality Analysis",
            intro_desc: "Discover what's in your drinking water. Click the tabs below to read about each test we perform.",
            lbl_about_tests: "About Tests",
            btn_request_now: "Request Now",
            /* 🎯 Added translation entry for Direct Contact button */
            btn_direct_contact: "Direct Contact",
            form_title: "Enter Your Details",
            form_desc: "Please fill out this form to book your free water test appointment.",
            lbl_name: "Customer Name",
            lbl_province: "Province",
            opt_province_default: "Select Province...",
            lbl_district: "District",
            opt_district_default: "Select Province first...",
            opt_district_choose: "Choose District...",
            lbl_address: "Address",
            lbl_location: "Google Location Mapping",
            btn_google_loc: "Google Location (Auto Redirect)",
            lbl_phone: "Contact Number",
            btn_submit: "Submit Request",
            placeholder_name: "Enter customer's name",
            placeholder_address: "Enter complete home address details",
            placeholder_phone: "e.g., 0771234567",
            msg_success: "🎉 Water Testing Request Submitted Successfully! We will contact you soon.",
            msg_fields: "⚠️ Please fill out all required fields properly before submitting!",
            msg_address_err: "⚠️ Please type your address in the address box first to redirect Google Maps!",
            lbl_range: "Standard Range:",
            tds_title: "TDS Test (Total Dissolved Solids)",
            tds_desc: "Measures the dissolved combined content of all inorganic and organic substances in your water. It helps identify if the water contains heavy minerals.",
            tds_range: "15 - 50 ppm (Ideal)",
            ph_title: "pH Test (Acidity / Alkalinity)",
            ph_desc: "Measures how acidic or basic your water is. Highly acidic or highly alkaline water can be harmful to health. Neutral pH level is recommended.",
            ph_range: "6.5 - 8.5 pH (Ideal)",
            electro_title: "Electrolyzer Test (Purity Indicator)",
            electro_desc: "Uses minor electrical currents to precipitate dissolved impurities. It visually separates minerals, metals, and rust from pure water.",
            electro_range: "White or no color changing (Less Minerals Water)/Gold (Pure Water)/Yellow (Low Impurities Water) / Green-Red (High Impurities Water)"
        },
        si: {
            main_title: "ඇක්වාලයිෆ් වෝටර්ස්",
            btn_back: "සේවාවන්",
            btn_back_intro: "පරීක්ෂණ වෙත",
            intro_title: "නොමිලේ ජල තත්ත්ව විශ්ලේෂණය",
            intro_desc: "ඔබ බොන ජලයේ අඩංගු දෑ සොයා ගන්න. අප සිදු කරන පරීක්ෂණ ගැන කියවීමට පහත ටැබ් ක්ලික් කරන්න.",
            lbl_about_tests: "පරීක්ෂණ පිළිබඳව",
            btn_request_now: "දැන්ම වෙන්කරවා ගන්න",
            /* 🎯 Added translation entry for Direct Contact button */
            btn_direct_contact: "කෙලින්ම සම්බන්ධ වන්න",
            form_title: "ඔබගේ විස්තර ඇතුළත් කරන්න",
            form_desc: "නොමිලේ ජල පරීක්ෂාවක් වෙන්කරවා ගැනීමට කරුණාකර පහත පෝරමය පුරවන්න.",
            lbl_name: "පාරිභෝගිකයාගේ නම",
            lbl_province: "පළාත",
            opt_province_default: "පළාත තෝරන්න...",
            lbl_district: "දිස්ත්‍රික්කය",
            opt_district_default: "ප්‍රථමයෙන් පළාත තෝරන්න...",
            opt_district_choose: "දිස්ත්‍රික්කය තෝරන්න...",
            lbl_address: "ලිපිනය",
            lbl_location: "ගූගල් සිතියම් සලකුණුකරණය",
            btn_google_loc: "Google Location (ස්වයංක්‍රීය යොමු කිරීම්)",
            lbl_phone: "දුරකථන අංකය",
            btn_submit: "ඉල්ලීම යොමු කරන්න",
            placeholder_name: "පාරිභෝගිකයාගේ නම ඇතුළත් කරන්න",
            placeholder_address: "සම්පූර්ණ නිවාස ලිපිනය ඇතුළත් කරන්න",
            placeholder_phone: "උදා: 0771234567",
            msg_success: "🎉 ජල පරීක්ෂා කිරීමේ ඉල්ලීම සාර්ථකව යොමු කරන ලදී! අප ඔබව සම්බන්ධ කර ගන්නෙමු.",
            msg_fields: "⚠️ කරුණාකර ඉල්ලීම යොමු කිරීමට පෙර සියලුම කඩඉම් නිවැරදිව පුරවන්න!",
            msg_address_err: "⚠️ ගූගල් මැප් එකට යොමු කිරීමට කරුණාකර ප්‍රථමයෙන් ලිපිනය ඇතුළත් කරන්න!",
            lbl_range: "ප්‍රමිතිගත සීමාව:",
            tds_title: "TDS පරීක්ෂාව (Total Dissolved Solids)",
            tds_desc: "ජලයේ දියවී ඇති අකාබනික සහ කාබනික ද්‍රව්‍යවල සම්පූර්ණ ප්‍රමාණය මනිනු ලබයි. ජලයේ අඩංගු ඛනිජ ලවණ මට්ටම හඳුනා ගැනීමට මෙය උපකාරී වේ.",
            tds_range: "15 - 50 ppm (නිර්දේශිත)",
            ph_title: "pH පරීක්ෂාව (ආම්ලිකතාවය / භාෂ්මිකතාවය)",
            ph_desc: "ජලයේ ආම්ලික හෝ භාෂ්මිකතාවය මනිනු ලබයි. අධික ආම්ලික හෝ අධික භාෂ්මික ජලය සෞඛ්‍යයට හානිකර විය හැක. උදාසීන මට්ටම නිර්දේශ කෙරේ.",
            ph_range: "6.5 - 8.5 pH (නිර්දේශිත)",
            electro_title: "Electrolyzer පරීක්ෂාව (පිරිසිදු බව මැනීම)",
            electro_desc: "සුළු විද්‍යුත් ධාරාවක් ආධාරයෙන් ජලයේ ඇති අපද්‍රව්‍ය වෙන්කර පෙන්වයි. ජලයේ අඩංගු බැර ලෝහ සහ මලකඩ පිරිසිදු ජලයෙන් වෙන්කර පෙන්වයි.",
            electro_range: "සුදු හෝ පැහැය වෙනසක් නොවේ(ඛනිජ ලවණ රහිත ජලය)/ගෝල්ඩ්(පිරිසිදු ජලය)/කහ (අඩු අපද්‍රව්‍ය සහිත ජලය)/කොළ-රතු (වැඩි අපද්‍රව්‍ය සහිත ජලය)"
        }
    };

    const btnEn = document.getElementById('btn-en');
    const btnSi = document.getElementById('btn-si');
    const form = document.getElementById('waterTestForm');
    
    const tabTds = document.getElementById('tab-tds');
    const tabPh = document.getElementById('tab-ph');
    const tabElectro = document.getElementById('tab-electro');
    
    const testIntroCard = document.getElementById('testIntroCard');
    const bookingFormCard = document.getElementById('bookingFormCard');
    const btnRequestNow = document.getElementById('btnRequestNow');
    const btnBackToIntro = document.getElementById('btnBackToIntro');

    const provinceSelect = document.getElementById('province');
    const districtSelect = document.getElementById('district');

    let currentTab = "tds";

    function populateDistricts() {
        if (!provinceSelect || !districtSelect) return;
        const selectedProvince = provinceSelect.value;
        const lang = (btnEn && btnEn.classList.contains('active')) ? 'en' : 'si';
        
        districtSelect.innerHTML = '';
        
        if (!selectedProvince) {
            districtSelect.disabled = true;
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.disabled = true;
            defaultOpt.selected = true;
            defaultOpt.textContent = translations[lang].opt_district_default;
            districtSelect.appendChild(defaultOpt);
            return;
        }

        districtSelect.disabled = false;
        
        const chooseOpt = document.createElement('option');
        chooseOpt.value = '';
        chooseOpt.disabled = true;
        chooseOpt.selected = true;
        chooseOpt.textContent = translations[lang].opt_district_choose;
        districtSelect.appendChild(chooseOpt);

        const list = lang === 'en' ? districtsEn[selectedProvince] : districtsSi[selectedProvince];
        const rawList = districtsEn[selectedProvince];

        if (list) {
            list.forEach((district, index) => {
                const opt = document.createElement('option');
                opt.value = rawList[index];
                opt.textContent = district;
                districtSelect.appendChild(opt);
            });
        }
    }

    if (provinceSelect) {
        provinceSelect.addEventListener('change', populateDistricts);
    }

    function updateDynamicTestContent() {
        const lang = (btnEn && btnEn.classList.contains('active')) ? 'en' : 'si';
        const titleEl = document.getElementById('dynamicTestTitle');
        const descEl = document.getElementById('dynamicTestDesc');
        const rangeEl = document.getElementById('dynamicTestRange');
        const imgEl = document.getElementById('dynamicTestImg');
        const rangeLblEl = document.getElementById('dynamicRangeLabel');

        if (rangeLblEl && translations[lang]) rangeLblEl.textContent = translations[lang].lbl_range;

        if (translations[lang]) {
            if (currentTab === "tds") {
                if (titleEl) titleEl.textContent = translations[lang].tds_title;
                if (descEl) descEl.textContent = translations[lang].tds_desc;
                if (rangeEl) rangeEl.textContent = translations[lang].tds_range;
                if (imgEl) {
                    imgEl.src = "tds_meter.jpg"; 
                    imgEl.alt = "TDS Testing Equipment";
                }
            } else if (currentTab === "ph") {
                if (titleEl) titleEl.textContent = translations[lang].ph_title;
                if (descEl) descEl.textContent = translations[lang].ph_desc;
                if (rangeEl) rangeEl.textContent = translations[lang].ph_range;
                if (imgEl) {
                    imgEl.src = "ph_tester.jpg"; 
                    imgEl.alt = "pH Testing Equipment";
                }
            } else if (currentTab === "electro") {
                if (titleEl) titleEl.textContent = translations[lang].electro_title;
                if (descEl) descEl.textContent = translations[lang].electro_desc;
                if (rangeEl) rangeEl.textContent = translations[lang].electro_range;
                if (imgEl) {
                    imgEl.src = "electrolyzer.jpg"; 
                    imgEl.alt = "Electrolyzer Testing Equipment";
                }
            }
        }
    }

    function changeLanguage(lang) {
        if (btnEn) btnEn.classList.remove('active');
        if (btnSi) btnSi.classList.remove('active');
        
        const activeBtn = document.getElementById(`btn-${lang}`);
        if (activeBtn) activeBtn.classList.add('active');

        const nameInput = document.getElementById('customerName');
        const addrInput = document.getElementById('homeAddress');
        const phoneInput = document.getElementById('contactNumber');

        if (nameInput && translations[lang]) nameInput.placeholder = translations[lang].placeholder_name;
        if (addrInput && translations[lang]) addrInput.placeholder = translations[lang].placeholder_address;
        if (phoneInput && translations[lang]) phoneInput.placeholder = translations[lang].placeholder_phone;

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

        populateDistricts();
        updateDynamicTestContent();
    }

    function setTabActive(activeTabBtn, tabName) {
        const tabs = [tabTds, tabPh, tabElectro];
        tabs.forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        if (activeTabBtn) activeTabBtn.classList.add('active');
        currentTab = tabName;
        updateDynamicTestContent();
    }

    if (tabTds) tabTds.addEventListener('click', () => setTabActive(tabTds, "tds"));
    if (tabPh) tabPh.addEventListener('click', () => setTabActive(tabPh, "ph"));
    if (tabElectro) tabElectro.addEventListener('click', () => setTabActive(tabElectro, "electro"));

    if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
    if (btnSi) btnSi.addEventListener('click', () => changeLanguage('si'));

    if (btnRequestNow && testIntroCard && bookingFormCard) {
        btnRequestNow.addEventListener('click', () => {
            testIntroCard.classList.add('d-none');
            bookingFormCard.classList.remove('d-none');
        });
    }

    if (btnBackToIntro && testIntroCard && bookingFormCard) {
        btnBackToIntro.addEventListener('click', () => {
            bookingFormCard.classList.add('d-none');
            testIntroCard.classList.remove('d-none');
        });
    }

    const btnGoogleLoc = document.getElementById('btnGoogleLocation');
    if (btnGoogleLoc) {
        btnGoogleLoc.addEventListener('click', () => {
            const homeAddressEl = document.getElementById('homeAddress');
            const addressValue = homeAddressEl ? homeAddressEl.value.trim() : '';
            const lang = (btnEn && btnEn.classList.contains('active')) ? 'en' : 'si';

            if (addressValue) {
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressValue)}`, '_blank');
            } else {
                alert(translations[lang].msg_address_err);
            }
        });
    }

    changeLanguage('en');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentLang = (btnEn && btnEn.classList.contains('active')) ? 'en' : 'si';
            
            if (this.checkValidity()) {
                alert(translations[currentLang].msg_success);
                this.reset();
                window.location.href = 'services.html';
            } else {
                alert(translations[currentLang].msg_fields);
            }
        });
    }

});