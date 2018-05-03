function registration() {
    //run all validation (feedback to user)
    let isOK = true;
    isOK &= checkEmailConfirmation();
    isOK &= checkPasswordConfirmation();
    isOK &= checkDOB();
    isOK &= checkName();

    if( !isOK )
        return false;

    $.ajax({
        url: '/auth/register',
        method: 'post',
        dataType: 'json',
        data: {
            'firstname': $('#regFirstname').val().trim(),
            'lastname': $('#regLastname').val().trim(),
            'email': $('#regEmail').val().trim(),
            'password': $('#regPassword').val().trim(),
            'status': $('input[name="status"]:checked').val(),
            'DOByear': $('#regDOByear').val(),
            'DOBmonth': $('#regDOBmonth').val(),
            'DOBday': $('#regDOBday').val()
        }
    }).done( function (result){
        if (!result.success){
            if (result.error === "AlreadyRegistered")
                $('#regEmail').addClass('is-invalid');
            else
                alert('Unexpected error at registration, please contact us!');

            return false;
        }

        window.location.reload(true);
    });

    return false;
}

function login() {
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val().trim();

    if ( email === '' || password === '')
        $('#loginAlert').show();

    $.ajax({
        url: '/auth/login',
        method: 'post',
        dataType: 'json',
        data: { 'email': email, 'password': password }
    }).done( function (result){
        if (!result.success){
            $('#loginPassword').val('');
            $('#loginAlert').show();
            return false;
        }

        window.location.reload(true);
    });

    return false;
}

function checkEmailConfirmation() {
    const email = $('#regEmail');
    const emailConf = $('#regEmailAgain');

    if ( email.val().trim() === '' || emailConf.val().trim() === '')
        return false;

    if ( email.val().trim() !== emailConf.val().trim() ) {
        emailConf.addClass('is-invalid');
        return false;
    }
    else{
        emailConf.removeClass('is-invalid');
        emailConf.addClass('is-valid');
        return true;
    }
}

function checkPasswordConfirmation() {
    const pass = $('#regPassword');
    const passConf = $('#regPasswordAgain');

    if ( pass.val().trim() === '' || passConf.val().trim() === '')
        return false;

    if ( pass.val().trim() !== passConf.val().trim() ) {
        pass.addClass('is-invalid');
        passConf.addClass('is-invalid');
        return false;
    }
    else{
        pass.removeClass('is-invalid');
        passConf.removeClass('is-invalid');
        pass.addClass('is-valid');
        passConf.addClass('is-valid');
        return true;
    }
}

function checkDOB() {
    if ($('#regDOByear').val() === "0") {
        $('#regDOByear').addClass('is-invalid');
    }
    if ($('#regDOBmonth').val() === "0") {
        $('#regDOBmonth').addClass('is-invalid');
    }
    if ($('#regDOBday').val() === "0"){
        $('#regDOBday').addClass('is-invalid');
    }

    return ($('#regDOByear').val() !== "0" && $('#regDOBmonth').val() !== "0" && $('#regDOBday').val() !== "0");
}

function checkName() {
    if ($('#regFirstname').val().trim() === "") {
        $('#regFirstname').addClass('is-invalid');
    }
    if ($('#regLastname').val().trim() === "") {
        $('#regLastname').addClass('is-invalid');
    }

    return $('#regFirstname').val().trim() !== "" && $('#regLastname').val().trim() !== "";
}