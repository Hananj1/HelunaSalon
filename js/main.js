const splashScreen = document.getElementById('splash');

if (splashScreen) {
    document.body.classList.add('no-scroll');

    window.addEventListener('load', () => {
        setTimeout(() => {
            splashScreen.classList.add('is-hidden');
            document.body.classList.remove('no-scroll');
        }, 3500);
    });
}

/* HOME SLIDER */
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (track && nextBtn && prevBtn) {
    let index = 0;
    const cardWidth = 390;
    const totalItems = track.children.length;

    function updateSlider() {
        if (index >= totalItems - 2) {
            index = 0;
        } else if (index < 0) {
            index = totalItems - 3;
        }

        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    let autoPlay = setInterval(() => {
        index++;
        updateSlider();
    }, 3000);

    nextBtn.addEventListener('click', () => {
        clearInterval(autoPlay);
        index++;
        updateSlider();
        autoPlay = setInterval(() => {
            index++;
            updateSlider();
        }, 3000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoPlay);
        index--;
        updateSlider();
        autoPlay = setInterval(() => {
            index++;
            updateSlider();
        }, 3000);
    });
}

/* HELPERS */
function showMessage(elementId, text, isSuccess) {
    const message = document.getElementById(elementId);
    if (!message) return;

    message.textContent = text;
    message.style.color = isSuccess ? '#2f7d4f' : '#8f1838';
}

function validateText(value, minimumLength) {
    return value && value.trim().length >= minimumLength;
}

/* CONTACT FORM */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(contactForm);
        const mobile = data.get('mobile').trim();
        const message = data.get('message').trim();

        if (!/^\d{10}$/.test(mobile)) {
            showMessage('contactMessage', 'Please enter a valid 10-digit mobile number.', false);
            return;
        }

        if (!validateText(message)) {
            showMessage('contactMessage', 'Message must be at least 10 characters.', false);
            return;
        }

        showMessage('contactMessage', 'Thank you.', true);
        contactForm.reset();
    });
}

/* SERVICES FILTER */
const serviceTabs = document.querySelectorAll('.tab');
const serviceCards = document.querySelectorAll('.service-box');

serviceTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;

        serviceTabs.forEach((item) => {
            item.classList.remove('active');
        });

        tab.classList.add('active');

        serviceCards.forEach((card) => {
            const category = card.dataset.category;
            card.style.display = filter === 'all' || category === filter ? '' : 'none';
        });

        document.querySelectorAll('.service-grid > .section-heading').forEach((heading) => {
            const category = heading.dataset.category;
            heading.style.display = filter === 'all' || category === filter ? 'flex' : 'none';
        });
    });
});

/* BOOKING SERVICES LIST */

// Service choice 
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    const list = document.getElementById('selectedServicesList');
    const hiddenInput = document.getElementById('serviceCheck');
    
    // التحقق إذا كانت القائمة تحتوي على خدمات فعلية
    const hasServices = list.querySelector('li:not(.empty)');
    
    if (!hasServices) {
        // 1. منع إرسال النموذج تماماً
        event.preventDefault(); 
        
        // 2. تفريغ الحقل المخفي للتأكد من تفعيل خاصية required في المتصفح
        hiddenInput.value = ""; 
        
        // 3. إظهار رسالة واضحة للمستخدم (متطلب أساسي للمشروع)
        alert("الرجاء اختيار خدمة واحدة على الأقل قبل إتمام الحجز!"); 
    } else {
        // إذا وجد خدمات، نملأ الحقل المخفي ليسمح بالمرور
        hiddenInput.value = "valid";
    }
});
//handling date
const dateInput = document.getElementById('bookDate'); 
const today = new Date().toISOString().split('T')[0];
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
const formattedMaxDate = maxDate.toISOString().split('T')[0];
dateInput.setAttribute('min', today); 
dateInput.setAttribute('max', formattedMaxDate);


const selectedServicesList = document.getElementById('selectedServicesList');
const bookButtons = document.querySelectorAll('.book-service');
let selectedServices = [];

bookButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const serviceName = button.dataset.name;
        const servicePrice = button.dataset.price;

        selectedServices.push({
            name: serviceName,
            price: servicePrice
        });

        if (selectedServicesList) {
            selectedServicesList.innerHTML = '';

            selectedServices.forEach((service) => {
                const item = document.createElement('li');
                item.classList.add('item');
                item.textContent = `${service.name} - ${service.price}`;
                selectedServicesList.appendChild(item);
            });
        }

        const bookingPanel = document.getElementById('bookingPanel');

        if (bookingPanel) {
            bookingPanel.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



/* APPOINTMENTS PAGE */
function refreshAppointments() {
    const listContainer = document.getElementById('appointmentsList');
    if (!listContainer) return;

    const savedAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];

    if (savedAppointments.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <p>No appointments found yet.</p>
                <a href="services.html" class="btn">Book Now</a>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = savedAppointments.map((app, index) => {
        const servicesText = app.services
    ? app.services.map(service => `
        <li>
            <span>${service.name}</span>
            <strong>${service.price}</strong>
        </li>
    `).join('')
    : `<li><span>${app.service}</span><strong>${app.price || ''}</strong></li>`;

        return `
    <div class="appointment-card">
        <div class="appointment-card__top">
            <span> Your Booking </span>
            <small>#${app.id}</small>
        </div>

<ul class="appointment-services">
    ${servicesText}
</ul>
        <div id="view-mode-${index}" class="appointment-details">
            <p><strong>Date</strong><span>${app.date}</span></p>
            <p><strong>Time</strong><span>${app.time}</span></p>
            <p><strong>Customer</strong><span>${app.customerName}</span></p>
            <p><strong>Phone</strong><span>${app.phone}</span></p>

            <div class="appointment-actions">
                <button class="appointment-btn appointment-btn--outline" onclick="showEditMode(${index})">Edit</button>
                <button class="appointment-btn appointment-btn--primary" onclick="cancelAppointment(${index})">Cancel</button>
            </div>
        </div>

        <div id="edit-mode-${index}" class="appointment-edit">
            <label>New Date:</label>
            <input type="date" id="edit-date-${index}" value="${app.date}">

            <label>New Time:</label>
            <input type="time" id="edit-time-${index}" value="${app.time}">

            <div class="appointment-actions">
                <button class="appointment-btn appointment-btn--primary" onclick="saveEdit(${index})">Save Changes</button>
                <button class="appointment-btn appointment-btn--outline" onclick="refreshAppointments()">Back</button>
            </div>
        </div>
    </div>
`;
    }).join('');
}

window.showEditMode = function(index) {
    document.getElementById(`view-mode-${index}`).style.display = 'none';
    document.getElementById(`edit-mode-${index}`).style.display = 'block';
};

window.saveEdit = function(index) {
    const appointments = JSON.parse(localStorage.getItem('myAppointments')) || [];

    appointments[index].date = document.getElementById(`edit-date-${index}`).value;
    appointments[index].time = document.getElementById(`edit-time-${index}`).value;

    localStorage.setItem('myAppointments', JSON.stringify(appointments));
    refreshAppointments();
};

window.cancelAppointment = function(index) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        const appointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
        appointments.splice(index, 1);
        localStorage.setItem('myAppointments', JSON.stringify(appointments));
        refreshAppointments();
    }
};

document.addEventListener('DOMContentLoaded', refreshAppointments);
