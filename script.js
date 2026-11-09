/**
 * नेपाली एवं मैथिली पारम्परिक विवाह निमन्त्रण पत्र - जावास्क्रिप्ट
 * वर: चि. गोविन्द साह (जनकपुरधाम, धनुषा, नेपाल)
 * वधू: सुश्री कस्तुरी साह (सीतामढ़ी, बिहार, भारत)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ================= Elements =================
  const envelopeScreen = document.getElementById('envelopeScreen');
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');
  const openInviteBtn = document.getElementById('openInviteBtn');
  const invitationContent = document.getElementById('invitationContent');
  const reopenEnvelopeBtn = document.getElementById('reopenEnvelopeBtn');

  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');
  const petalToggleBtn = document.getElementById('petalToggleBtn');
  const toastNotification = document.getElementById('toastNotification');

  // Countdown Elements
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Action Buttons
  const addToCalBtn = document.getElementById('addToCalBtn');
  const downloadIcsBtn = document.getElementById('downloadIcsBtn');
  const shareWhatsappBtn = document.getElementById('shareWhatsappBtn');

  // Wishes / Guestbook Elements
  const wishesForm = document.getElementById('wishesForm');
  const wishesList = document.getElementById('wishesList');

  let isEnvelopeOpen = false;

  // Convert English numerals to Devanagari numerals
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  function toDevanagari(num) {
    const str = String(num).padStart(2, '0');
    return str.split('').map(char => {
      const digit = parseInt(char, 10);
      return !isNaN(digit) ? devanagariDigits[digit] : char;
    }).join('');
  }

  // ================= Magic Royal Envelope Opening =================
  function openRoyalEnvelope() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;

    // Auspicious Chime sound
    playAuspiciousChime();

    // Crack wax seal with animation
    waxSeal.classList.add('broken');

    // Envelope top flap opens
    envelope.classList.add('open');

    // Instant floral shower
    triggerPetalBurst(75);

    // Transition smoothly and reveal the grand invitation immediately
    setTimeout(() => {
      envelopeScreen.classList.add('fade-out');

      setTimeout(() => {
        envelopeScreen.style.display = 'none';
        invitationContent.classList.remove('hidden');
        invitationContent.classList.add('revealed');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Start soothing traditional Shehnai melody
        startWeddingShehnaiMelody();
      }, 650);
    }, 900);
  }

  if (waxSeal) waxSeal.addEventListener('click', openRoyalEnvelope);
  if (openInviteBtn) openInviteBtn.addEventListener('click', openRoyalEnvelope);
  if (envelope) {
    envelope.addEventListener('click', (e) => {
      if (!isEnvelopeOpen) openRoyalEnvelope();
    });
  }

  // Re-open Envelope Feature
  if (reopenEnvelopeBtn) {
    reopenEnvelopeBtn.addEventListener('click', () => {
      isEnvelopeOpen = false;
      envelope.classList.remove('open');
      waxSeal.classList.remove('broken');
      invitationContent.classList.remove('revealed');
      invitationContent.classList.add('hidden');
      envelopeScreen.style.display = 'flex';
      void envelopeScreen.offsetWidth; // Force reflow
      envelopeScreen.classList.remove('fade-out');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('✉️ लिफ़ाफ़ा पुनः तैयार है!');
    });
  }

  // ================= Standalone Shehnai & Tanpura Melodic Synthesizer =================
  let audioCtx = null;
  let isMusicPlaying = false;
  let musicInterval = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playAuspiciousChime() {
    initAudioContext();
    if (!audioCtx) return;

    // Pentatonic auspicious chimes
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chimeFreqs.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      }, idx * 105);
    });
  }

  // Raag Bilawal & Yaman Auspicious Wedding Motif Notes
  const raagNotes = [
    { freq: 293.66, dur: 0.6 }, // Re
    { freq: 329.63, dur: 0.6 }, // Ga
    { freq: 369.99, dur: 0.8 }, // Ma
    { freq: 440.00, dur: 0.9 }, // Dha
    { freq: 493.88, dur: 0.6 }, // Ni
    { freq: 587.33, dur: 1.2 }, // Sa'
    { freq: 493.88, dur: 0.6 }, // Ni
    { freq: 440.00, dur: 0.8 }, // Dha
    { freq: 369.99, dur: 0.6 }, // Ma
    { freq: 329.63, dur: 0.9 }, // Ga
    { freq: 293.66, dur: 1.3 }  // Re
  ];

  let noteIndex = 0;

  function playSingleWeddingTone(freq, duration) {
    if (!audioCtx || !isMusicPlaying) return;

    const osc = audioCtx.createOscillator();
    const subDrone = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sawtooth'; // Shehnai reed warmth
    subDrone.type = 'sine'; // Tanpura resonance
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    subDrone.frequency.setValueAtTime(freq / 2, audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1350, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.075, audioCtx.currentTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(filter);
    subDrone.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    subDrone.start();
    osc.stop(audioCtx.currentTime + duration);
    subDrone.stop(audioCtx.currentTime + duration);
  }

  function startWeddingShehnaiMelody() {
    initAudioContext();
    if (!audioCtx) return;

    isMusicPlaying = true;
    musicIcon.textContent = '🔊';
    musicLabel.textContent = 'संगीत चालू';

    if (musicInterval) clearInterval(musicInterval);

    function step() {
      if (!isMusicPlaying) return;
      const note = raagNotes[noteIndex];
      playSingleWeddingTone(note.freq, note.dur);
      noteIndex = (noteIndex + 1) % raagNotes.length;
    }

    step();
    musicInterval = setInterval(step, 820);
  }

  function stopWeddingShehnaiMelody() {
    isMusicPlaying = false;
    musicIcon.textContent = '🎵';
    musicLabel.textContent = 'शहनाई धुन';
    if (musicInterval) clearInterval(musicInterval);
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (isMusicPlaying) {
        stopWeddingShehnaiMelody();
        showToast('🔇 शहनाई संगीत विरामित किया गया');
      } else {
        startWeddingShehnaiMelody();
        showToast('🎵 मांगलिक शहनाई धुन प्रारम्भ!');
      }
    });
  }

  // ================= Floating Marigold & Rose Petals Engine =================
  const canvas = document.getElementById('petalsCanvas');
  const ctx = canvas.getContext('2d');
  let petals = [];
  const maxPetals = 45;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const petalColors = [
    '#e63946', // गहरा लाल गुलाब
    '#ff4d6d', // चटक गुलाबी गुलाब
    '#ffb703', // गेंद का पीला फूल (गेंदा)
    '#fb8500', // नारंगी गेंदा फूल
    '#ffd166', // स्वर्ण पराग
    '#f4a261'  // मिथिला पारम्परिक पुष्प
  ];

  class Petal {
    constructor(isBurst = false) {
      this.reset(isBurst);
    }

    reset(isBurst = false) {
      this.x = Math.random() * canvas.width;
      this.y = isBurst ? Math.random() * canvas.height * 0.4 : -20;
      this.size = Math.random() * 13 + 8;
      this.speedY = Math.random() * 1.6 + 1.2;
      this.speedX = Math.random() * 1.6 - 0.8;
      this.angle = Math.random() * 360;
      this.angularSpeed = (Math.random() - 0.5) * 2;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.opacity = Math.random() * 0.4 + 0.6;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.angle * Math.PI / 180) * 0.5;
      this.angle += this.angularSpeed;
      this.flip += this.flipSpeed;

      if (this.y > canvas.height + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * Math.PI / 180);
      ctx.scale(1, Math.cos(this.flip));
      ctx.globalAlpha = this.opacity;

      ctx.beginPath();
      ctx.fillStyle = this.color;
      // Traditional Petal Bezier Curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, -this.size / 4, this.size, this.size / 2);
      ctx.bezierCurveTo(this.size, this.size, this.size / 2, this.size * 1.2, 0, this.size * 1.4);
      ctx.bezierCurveTo(-this.size / 2, this.size * 1.2, -this.size, this.size, -this.size, this.size / 2);
      ctx.bezierCurveTo(-this.size, -this.size / 4, -this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < maxPetals; i++) {
    petals.push(new Petal());
  }

  function triggerPetalBurst(count = 55) {
    for (let i = 0; i < count; i++) {
      petals.push(new Petal(true));
    }
    setTimeout(() => {
      if (petals.length > maxPetals) {
        petals = petals.slice(0, maxPetals);
      }
    }, 6000);
  }

  if (petalToggleBtn) {
    petalToggleBtn.addEventListener('click', () => {
      triggerPetalBurst(60);
      showToast('🌸 मङ्गलमय पुष्प वर्षा की गई!');
    });
  }

  function renderPetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(renderPetals);
  }
  renderPetals();

  // ================= Live Wedding Countdown =================
  // विवाह एवं प्रीतिभोज: २२ नवम्बर, सायं ६:०० बजे
  function getWeddingTargetDate() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, 10, 22, 18, 0, 0); // Month 10 = November

    if (now.getTime() > target.getTime()) {
      target = new Date(year + 1, 10, 22, 18, 0, 0);
    }
    return target;
  }

  const weddingDate = getWeddingTargetDate();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate.getTime() - now;

    if (distance <= 0) {
      daysEl.textContent = '००';
      hoursEl.textContent = '००';
      minutesEl.textContent = '००';
      secondsEl.textContent = '००';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = toDevanagari(d);
    hoursEl.textContent = toDevanagari(h);
    minutesEl.textContent = toDevanagari(m);
    secondsEl.textContent = toDevanagari(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Auspicious Venue & Event Details
  const newVenueName = "चौधरी कलवार विवाह भवन पार्टी पैलेश एवं गेष्ट हाउस, नमस्कार चौक, जनकपुरधाम - ७ (नेपाल)";
  const hindiEventTitle = "शुभ विवाह एवं प्रीतिभोज: चि. गोविन्द साह (Software Developer) संग आयु. कस्तुरी साह";
  const hindiEventDesc = `॥ श्री गणेशाय नमः ॥\\nचि. गोविन्द साह (सॉफ्टवेयर डेवलपर) [सुपुत्र: श्रीमती सुलोचना देवी साह एवं श्री गौरी शंकर साह, जनकपुरधाम - ११, नेपाल]\\nसंग\\nआयु. कस्तुरी साह [सुपुत्री: श्रीमती प्रीति देवी साह एवं श्री बैजू साह, जानकी स्थान - ०८, सीतामढ़ी, भारत]\\nका पावन शुभ विवाह एवं प्रीतिभोज समारोह।\\nस्थल: ${newVenueName}`;
  const venueLocation = newVenueName;

  const yr = weddingDate.getFullYear();
  const startIso = `${yr}1122T121500Z`; // 6:00 PM Nepal Time (UTC+5:45)
  const endIso = `${yr}1122T181500Z`;

  if (addToCalBtn) {
    addToCalBtn.addEventListener('click', () => {
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(hindiEventTitle)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(hindiEventDesc)}&location=${encodeURIComponent(venueLocation)}`;
      window.open(gcalUrl, '_blank');
    });
  }

  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Govind Kasturi Vivah Patrika//HI//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `SUMMARY:${hindiEventTitle}`,
        `DESCRIPTION:${hindiEventDesc}`,
        `LOCATION:${venueLocation}`,
        `DTSTART:${startIso}`,
        `DTEND:${endIso}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Govind-Kasturi-Shubh-Vivah.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📅 विवाह उत्सव कैलेण्डर (.ics) सुरक्षित कर लिया गया!');
    });
  }

  // ================= WhatsApp Sharing =================
  if (shareWhatsappBtn) {
    shareWhatsappBtn.addEventListener('click', () => {
      const shareMessage = `॥ श्री गणेशाय नमः ॥\n॥ ॐ श्री सीता-रामाभ्यां नमः ॥\n\n🌸 *मांगलिक विवाह एवं प्रीतिभोज निमन्त्रण पत्र* 🌸\n\n*चि. गोविन्द साह (सॉफ्टवेयर डेवलपर)*\n(सुपुत्र: श्रीमती सुलोचना देवी साह एवं श्री गौरी शंकर साह, जनकपुरधाम - ११, धनुषा, नेपाल)\n          *संग*\n*आयु. कस्तुरी साह*\n(सुपुत्री: श्रीमती प्रीति देवी साह एवं श्री बैजू साह, जानकी स्थान - ०८, सीतामढ़ी, भारत)\n\n🗓 *विवाह तिथि:* २२ नवम्बर\n⏰ *प्रीतिभोज:* सायं ६:०० बजे से\n🏛 *विवाह एवं प्रीतिभोज स्थल:* ${newVenueName}\n\nइस पावन अवसर पर वर-वधू को शुभाशीष प्रदान करने हेतु आप सपरिवार सादर आमन्त्रित हैं। 🙏\n— साह परिवार (जनकपुरधाम एवं सीतामढ़ी)`;
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
      window.open(waUrl, '_blank');
    });
  }

  // ================= Copy Address Buttons & Toast =================
  document.querySelectorAll('.copy-addr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const copyVal = btn.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`📋 पता कॉपी हो गया: "${copyVal}"`);
        }).catch(() => {
          fallbackCopyText(copyVal);
        });
      } else {
        fallbackCopyText(copyVal);
      }
    });
  });

  function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(`📋 पता कॉपी हो गया!`);
  }

  function showToast(msg) {
    toastNotification.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  // ================= Relationship (Friend / Family) Toggle =================
  const relationRadios = document.querySelectorAll('input[name="guestRelation"]');
  const relFamilyLabel = document.querySelector('label[for="relFamily"]');
  const relFriendLabel = document.querySelector('label[for="relFriend"]');

  relationRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value.includes('परिवार')) {
        relFamilyLabel.classList.add('active');
        relFriendLabel.classList.remove('active');
      } else {
        relFriendLabel.classList.add('active');
        relFamilyLabel.classList.remove('active');
      }
    });
  });

  // ================= Simple Typeable Location Input =================
  const guestLocationInput = document.getElementById('guestLocation');

  // ================= Instant Blessings & Guestbook =================
  const defaultWishesHindi = [
    {
      name: "श्री रामेश्वर प्रसाद साह एवं परिवार",
      relation: "परिवार / सम्बन्धी (Family)",
      location: "जनकपुरधाम - ११, धनुषा (नेपाल)",
      message: "प्रभु श्री सीताराम जी की असीम कृपा से दोनों परिवारों का यह पवित्र मिलन सदैव सुख, समृद्धि और सौभाग्य से परिपूर्ण रहे। गोविन्द एवं कस्तुरी को हार्दिक बधाई!"
    },
    {
      name: "सुनील कुमार साह (सॉफ्टवेयर इंजीनियर साथी)",
      relation: "मित्र (Friend)",
      location: "जनकपुरधाम - ७, धनुषा",
      message: "मेरे प्रिय सॉफ्टवेयर डेवलपर भाई गोविन्द और भाभी कस्तुरी को पावन विवाह की अनन्त शुभकामनाएं! नई ज़िन्दगी में अपार सफलता मिले।"
    },
    {
      name: "श्री आनन्द कुमार साह एवं समस्त परिवार",
      relation: "परिवार / सम्बन्धी (Family)",
      location: "जानकी स्थान - ०८, सीतामढ़ी (भारत)",
      message: "माता जानकी की पावन जन्मभूमि सीतामढ़ी और प्रभु राम की विवाह भूमि जनकपुरधाम का यह दिव्य सम्बन्ध अमर रहे। नवदम्पति को कोटि-कोटि आशीर्वाद!"
    },
    {
      name: "अमित कुमार वर्मा (टेक टीम मित्र)",
      relation: "मित्र (Friend)",
      location: "Patna, Bihar (India)",
      message: "दोस्ती और रिश्ते की इस खूबसूरत शुरुआत पर हार्दिक बधाई। गोविन्द भाई एवं कस्तुरी भाभी, आपका दाम्पत्य जीवन सदा खुशहाल रहे!"
    }
  ];

  function loadWishes() {
    let saved = localStorage.getItem('govind_kasturi_wishes_v4');
    let wishes = [];
    if (saved) {
      try {
        wishes = JSON.parse(saved);
      } catch (e) {
        wishes = defaultWishesHindi;
      }
    } else {
      wishes = defaultWishesHindi;
    }
    renderWishes(wishes);
  }

  function renderWishes(wishes) {
    if (!wishesList) return;
    wishesList.innerHTML = '';
    wishes.forEach(item => {
      const isFamily = (item.relation || '').includes('परिवार') || (item.relation || '').includes('Family');
      const pillClass = isFamily ? 'family' : 'friend';
      const pillIcon = isFamily ? '👨‍👩‍👧‍👦' : '🤝';
      const pillText = isFamily ? 'परिवार / सम्बन्धी (Family)' : 'मित्र (Friend)';

      const card = document.createElement('div');
      card.className = 'wish-single-card';
      card.innerHTML = `
        <div class="wish-header-line">
          <div class="wish-author-info">
            <span class="wish-author">👤 ${escapeHTML(item.name)}</span>
            <span class="rel-pill ${pillClass}">
              ${pillIcon} ${pillText}
            </span>
          </div>
          <span class="wish-origin">📍 ${escapeHTML(item.location)}</span>
        </div>
        <div class="wish-quote">“${escapeHTML(item.message)}”</div>
      `;
      wishesList.appendChild(card);
    });
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  if (wishesForm) {
    wishesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('guestName');
      const msgInput = document.getElementById('guestMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const loc = guestLocationInput ? guestLocationInput.value.trim() : '';
      const msg = msgInput ? msgInput.value.trim() : '';

      if (!loc) {
        showToast('⚠️ कृपया अपना शहर / स्थान भरें!');
        if (guestLocationInput) guestLocationInput.focus();
        return;
      }

      const selectedRelationRadio = document.querySelector('input[name="guestRelation"]:checked');
      const relationVal = selectedRelationRadio ? selectedRelationRadio.value : 'परिवार / सम्बन्धी (Family)';

      if (!name || !loc || !msg) return;

      let saved = localStorage.getItem('govind_kasturi_wishes_v4');
      let wishes = saved ? JSON.parse(saved) : [...defaultWishesHindi];

      // Add new blessing to the top with exact typed location as-is (no translation)
      wishes.unshift({
        name: name,
        relation: relationVal,
        location: loc,
        message: msg
      });

      localStorage.setItem('govind_kasturi_wishes_v4', JSON.stringify(wishes));
      renderWishes(wishes);

      // Reset form
      wishesForm.reset();
      if (relFamilyLabel) relFamilyLabel.classList.add('active');
      if (relFriendLabel) relFriendLabel.classList.remove('active');

      triggerPetalBurst(50);
      showToast('💌 आपका आशीर्वाद एवं सम्बन्ध सफलतापूर्वक दर्ज हो गया!');
    });
  }

  // Load and show messages instantly on screen
  loadWishes();

});
