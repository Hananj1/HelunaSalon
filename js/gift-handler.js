document.addEventListener('submit', async (e) => {
    if (e.target && e.target.id === 'giftForm') {
        e.preventDefault();
        e.stopImmediatePropagation(); 

        const form = e.target;
        const formData = new FormData(form);

        const giftData = {
            booking_type: 'gift',
            full_name: formData.get('giftFrom'),
            recipient_name: formData.get('giftTo'),
            recipient_phone: formData.get('recipientPhone'),
            service_name: formData.get('giftPackage'),
            message_content: formData.get('giftMessage'),
            appointment_date: '2026-05-06',
            appointment_time: '12:00:00',
            phone_number: formData.get('recipientPhone'),
            email_address: 'N/A'
        };

        console.log("البيانات المستخرجة بنجاح:", giftData);

        try {
            const response = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(giftData)
            });

            if (response.ok) {
                alert('✨ تم حجز الهدية بنجاح!');
                location.reload(); 
            } else {
                alert('خطأ في السيرفر، تأكدي من تعبئة الخانات');
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Connection error: Please check your internet or server status.");
        }
    }
});