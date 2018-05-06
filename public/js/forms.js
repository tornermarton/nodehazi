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

function addGroup() {
    if (!checkAddGroup())
        return false;

    $.ajax({
        url: '/groups/add',
        method: 'post',
        dataType: 'json',
        data: {
            'name': $('#addGroupName').val().trim(),
            'description': $('#addGroupDescription').val().trim()
        }
    }).done( function (result){
        if (!result.success){
            alert(result.error);
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

function checkAddGroup() {
    if ($('#addGroupName').val().trim() === "") {
        $('#addGroupName').addClass('is-invalid');
    }
    if ($('#addGroupDescription').val().trim() === "") {
        $('#addGroupDescription').addClass('is-invalid');
    }

    return $('#addGroupName').val().trim() !== "" && $('#addGroupDescription').val().trim() !== "";
}

function addMember(form) {
    $.ajax({
        url: form.getAttribute('action'),
        method: 'post',
        dataType: 'json',
        data: {
            'user_id': $(form).children('input')[0].getAttribute('value')
        }
    }).done( function (result){
        if (!result.success){

            alert(result.error);
            return false;
        }

        $(form).parent().parent().remove();
        return false;
    });

    return false;
}

function addTask(form) {
    let time = $('input[name="deadline"]');
    if (time.val() === '' || new Date(time.val()) < Date.now() ) {
        time.addClass('is-invalid');
        return false;
    }

    $.ajax({
        url: form.getAttribute('action'),
        method: 'post',
        dataType: 'json',
        data: {
            'type' : $('#taskType').val(),
            'deadline': time.val(),
            'description': $('#taskDescription').val().trim()
        }
    }).done( function (result){
        if (!result.success){

            alert(result.error);
            return false;
        }

        time.val('');
        $('#taskDescription').val('');

        return false;
    });

    return false;
}

function editTaskCheck(form){
    let time = $('input[name="deadline"]');
    if (time.val() === '' || new Date(time.val()) < Date.now() ) {
        time.addClass('is-invalid');
        return false;
    }

    return true;
}

function taskCompleted(element){
    element.disabled = true;

    $.ajax({
        url: element.getAttribute('data-action'),
        method: 'post',
        dataType: 'json',
        data: {}
    }).done( function (result){
        if (!result.success){
            alert(result.error);
            element.disabled = false;
            element.checked = false;
            return false;
        }

        $(element).parent().parent().parent().parent().remove();
        return false;
    });
}