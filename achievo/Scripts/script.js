var UserId = "";

function postContactToGoogle(Event) {
    var MentorAreaOfExpertise = $('#MentorAreaOfExpertise').val();
    var MentorNumPeople = $('#MentorNumPeople').val();
    var Goal = $('#Goal').val();
    var Contact = getContact();

    $.ajax({
        url: "https://docs.google.com/forms/d/13k1RI3imO4c0R6c-rhPHkuzZXux8a1k593rlNPP8kco/formResponse",
        data: {
            "entry_1366658802": MentorAreaOfExpertise,
            "entry_1022791929": MentorNumPeople,
            "entry_633901515": Goal,
            "entry_361554818": Contact,
            "entry_1064863439": Event,
            "entry_1058723906": UserId
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                postCompleted(Event);
            },
            200: function () {
                postCompleted(Event);
            }
        }
    });
}

function postCompleted(Event) {
    if (Event == 'btn_submit_mentor' || Event == 'btn_submit_achiever') {
        if ($("#modal_mentor").attr("aria-hidden") == 'false') {
            $('#div_modal_mentor_form').hide();
            $('#div_modal_mentor_tnx').show();
        }
        if ($("#modal_achiever").attr("aria-hidden") == 'false') {
            $('#div_modal_achiever_form').hide();
            $('#div_modal_achiever_tnx').show();
        }

        $('#MentorAreaOfExpertise').val('');
        $('#MentorNumPeople').val('');
        $('#Goal').val('');
        $('#ContactMentor').val('');
        $('#ContactAchiever').val('');
    }
}

$('#modal_achiever').on('hidden.bs.modal', function (e) {
    $('#div_modal_achiever_form').show();
    $('#div_modal_achiever_tnx').hide();
})

$('#modal_mentor').on('hidden.bs.modal', function (e) {
    $('#div_modal_mentor_form').show();
    $('#div_modal_mentor_tnx').hide();
})

function getContact() {
    if ($("#modal_mentor").attr("aria-hidden") == 'false') {
        return $('#ContactMentor').val();
    }
    if ($("#modal_achiever").attr("aria-hidden") == 'false') {
        return $('#ContactAchiever').val();
    }
}

function getUserID() {
    if (UserId == "") {
        UserId = "User-" + Math.floor((Math.random() * 10000) + 1);
    }
}

//init webpage
$(function () {
    getUserID();
    alert(UserId);
    postContactToGoogle('pageVisit');
})