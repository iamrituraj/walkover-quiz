let correctotp;


function otp_set(otp) {
    correctotp = otp;
}

async function email_send(email) {
    const data = {
        email
    };
    console.log(data);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    input_change();
    document.getElementById('custId').value = 'otp';

    const response = await fetch('/otp', options);
    const json = await response.json();
    console.log(json);
    otp_set(json)

}

function input_change() {
    let otp_tag = document.getElementById('otp');
    let email_tag = document.getElementById('email');
    email_tag.style.display = '';
    otp_tag.style.display = 'block';
}

function otp_check(user_otp) {
    console.log(correctotp.otp)
    if (user_otp == correctotp.otp) {
        window.location.href = '/adminMainPage.html'
    }
}

function handleLoginSubmit(event) {
    console.log(event.target)
    let element = document.getElementById('admin_email');
    email = element.value;
    event.preventDefault();
    console.log(email)
    email_send(email);
}


function handleOtpSubmit(event) {
    console.log(event.target)
    let element = document.getElementById('admin_otp');
    otp = element.value;
    event.preventDefault();
    console.log(otp)
    otp_check(otp);
}


(function () {
    const forms = document.querySelectorAll('.admin-signin');
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (e) {
                let value = document.getElementById('custId').value;
                if (value == "email") {
                    handleLoginSubmit(e)
                } else {
                    handleOtpSubmit(e)
                }
            });
        });
})()