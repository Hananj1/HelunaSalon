document.getElementById('searchBtn').addEventListener('click', async () => {
    const phone = document.getElementById('userPhoneSearch').value;
    const appointmentsList = document.getElementById('appointmentsList');

    if (!phone) {
        alert("لطفاً أدخلي رقم الجوال أولاً");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/my-appointments/${phone}`);
        const appointments = await response.json();

        appointmentsList.innerHTML = ''; // مسح النتائج السابقة

        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<p>لا توجد مواعيد مرتبطة بهذا الرقم.</p>';
            return;
        }

        appointments.forEach(app => {
            const card = document.createElement('div');
            card.className = 'appointment-card';
            
            card.style = "border: 1px solid #eee; padding: 15px; border-radius: 10px; margin: 10px; background: #fff8f9;";
            const isCanceled = app.status === 'Canceled';

            card.innerHTML = `
                <h4>${app.service_name}</h4>
                <p>🗓️ <strong>التاريخ:</strong> ${app.appointment_date}</p>
                <p>⏰ <strong>الوقت:</strong> ${app.appointment_time}</p>
                <p>📌 <strong>الحالة:</strong> ${isCanceled ? '<span style="color:red">ملغي ❌</span>' : '<span style="color:green">مؤكد ✅</span>'}</p>
                ${!isCanceled ? `<button onclick="cancelApp(${app.id})" class="btn" style="background: #e63946; margin-top: 10px;">إلغاء الموعد</button>` : ''}
            `;
            appointmentsList.appendChild(card);
        });
    } catch (error) {
        console.error('Error:', error);
        alert("تأكدي أن السيرفر شغال!");
    }
});

async function cancelApp(appointmentId) {
    if (confirm("هل أنتِ متأكدة من إلغاء هذا الموعد؟")) {
        try {
            const response = await fetch(`http://localhost:3000/api/cancel-appointment/${appointmentId}`, {
                method: 'PUT'
            });

            if (response.ok) {
                alert("تم إلغاء الموعد بنجاح! ✅");
                document.getElementById('searchBtn').click(); // تحديث القائمة تلقائياً
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}