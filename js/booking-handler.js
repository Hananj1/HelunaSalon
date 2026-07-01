document.addEventListener('submit', async (e) => {
  
    if (e.target && e.target.id === 'bookingForm') {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

      
        const selectedService = document.querySelector('#selectedServicesList li:not(.empty)')?.innerText || "General Service";

        const personalData = {
            booking_type: 'personal',
            service_name: selectedService,
            appointment_date: formData.get('bookDate') || document.getElementById('bookDate').value,
            appointment_time: formData.get('bookTime') || document.getElementById('bookTime').value,
            full_name: formData.get('fullName') || document.getElementById('fullName').value,
            phone_number: formData.get('phone') || document.getElementById('phone').value,
            email_address: formData.get('email') || document.getElementById('email').value,
            message_content: formData.get('notes') || document.getElementById('notes').value,
            recipient_name: null
        };

        console.log("جاري إرسال حجز شخصي آمن:", personalData);

        try {
            const response = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(personalData)
            });

            if (response.ok) {
                alert('✨ تم تأكيد حجزك الشخصي بنجاح  !');
                location.reload();
            } else {
                alert('فشل الإرسال، تأكدي من تعبئة جميع الخانات');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        alert("Connection error: Please check your internet or server status.");
        }
    }
});