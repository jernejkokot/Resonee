var ModalAchieverForm;

function postContactToGoogle(Event) {
    
        var MentorAreaOfExpertise = $('#MentorAreaOfExpertise').val();
        var MentorNumPeople = $('#MentorNumPeople').val();
        var Goal = $('#Goal').val();
        var Contact = getContact();
        var test = ModalAchieverForm;
        var userId = getUser();

        if (userId != "94.180.104.7") {
            $.ajax({
                url: "https://docs.google.com/forms/d/13k1RI3imO4c0R6c-rhPHkuzZXux8a1k593rlNPP8kco/formResponse",
                data: {
                    "entry_1366658802": MentorAreaOfExpertise,
                    "entry_1022791929": MentorNumPeople,
                    "entry_633901515": Goal,
                    "entry_361554818": Contact,
                    "entry_1064863439": Event,
                    "entry_1058723906": userId,
                    "entry_832297084": test
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
}

function getUser() {
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET", "http://api.hostip.info/get_html.php", false);
    xmlhttp.send();

    hostipInfo = xmlhttp.responseText.split("\n");

    for (i = 0; hostipInfo.length >= i; i++) {
        ipAddress = hostipInfo[i].split(":");
        if (ipAddress[0] == "IP") return ipAddress[1];
    }

    return false;
}

function postCompleted(Event) {
    if (Event == 'btn_submit_mentor' || Event == 'btn_submit_achiever') {
        if ($("#modal_mentor").attr("aria-hidden") == 'false') {
            $('#div_modal_mentor_form').hide();
            $('#div_modal_mentor_tnx').show();
        }
        if ($("#modal_achiever").attr("aria-hidden") == 'false') {
            $(ModalAchieverForm).hide();
            $('#div_modal_achiever_tnx').show();
        }

        $('#MentorAreaOfExpertise').val('');
        $('#MentorNumPeople').val('');
        $('#Goal').val('');
        $('#ContactMentor').val('');
        $('#ContactAchiever').val('');
    }
}

$('#modal_achiever').on('show.bs.modal', function (e) {
    $(ModalAchieverForm).show();
})

$('#modal_achiever').on('hidden.bs.modal', function (e) {
    $(ModalAchieverForm).show();
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
    var result = "User-" + Math.floor((Math.random() * 10000) + 1);
    return result;
}

function getEmail() {
    var emailriddlerarray = [105, 110, 102, 111, 64, 114, 101, 115, 111, 110, 101, 101, 46, 99, 111, 109]
    var encryptedemail_id26 = '' //variable to contain encrypted email 
    for (var i = 0; i < emailriddlerarray.length; i++)
        encryptedemail_id26 += String.fromCharCode(emailriddlerarray[i])
    return encryptedemail_id26;
}

//init webpage
$(function () {
    $('#Email').attr('href', "mailto:"+getEmail());
    if (typeof ModalAchieverForm === "undefined") {
        ModalAchieverForm = "#div_modal_achiever_form_" + Math.round(Math.random());
    }
    postContactToGoogle('pageVisit');
})