const BACKEND_HOST = 'https://ragakita-backend.up.railway.app'

const waitlistFormEl = document.getElementById('email-row-emailForm')
const requestResultEl = document.getElementById('requestResult')

let isSubmitSuccess = false
let lastSubmitTime = 0

waitlistFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const nowTime = Date.now();
    if (isSubmitSuccess || (nowTime < lastSubmitTime + 2500)) return;
    lastSubmitTime = nowTime;

    const email = waitlistFormEl.elements.email.value;
    fetch(BACKEND_HOST + '/api/waitlist', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    }).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.success) {
            requestResultEl.textContent = 'Emailmu berhasil ditambahkan ke waitlist'
            isSubmitSuccess = true
        } else {
            requestResultEl.textContent = 'Gagal menambahkan email ke waitlist'
            console.error(data.error)
        }
    }).catch((err) => {
        requestResultEl.textContent = 'Unexpected error'
        console.error(err)
    })
});
