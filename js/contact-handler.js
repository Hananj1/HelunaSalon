document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form'); 

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const form = e.target;
        const formData = new FormData(form);

        // تجميع البيانات - تأكدي أن هذه الأسماء (fname, mobile, إلخ) هي نفسها الموجودة في خاصية name=".." داخل الـ HTML
        const contactData = {
            first_name: formData.get('fname') || document.getElementById('fname')?.value,
            last_name: formData.get('lname') || document.getElementById('lname')?.value,
            gender: formData.get('gender') || document.getElementById('gender')?.value,
            mobile: formData.get('mobile') || document.getElementById('mobile')?.value,
            dob: formData.get('dob') || document.getElementById('dob')?.value,
            email: formData.get('email') || document.getElementById('email')?.value,
            language: formData.get('language') || document.getElementById('language')?.value,
            message_content: formData.get('message') || document.getElementById('message')?.value
        };

        // أهم خطوة: سنرى في الكونسول ما الذي سيُرسل فعلياً
        console.log("البيانات الذاهبة للسيرفر:", contactData);

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('✨ تم حفظ الرسالة بنجاح!');
                contactForm.reset(); 
            } else {
                // السيرفر سيخبرنا هنا بالسبب الدقيق
                alert('خطأ من السيرفر: ' + (result.error || 'تحقق من الحقول'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert("مشكلة في الاتصال بالسيرفر.");
        }
    });
});