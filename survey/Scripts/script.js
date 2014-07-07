function postContactToGoogle() {
    var Language = $('input[name="Language"]:checked').val();
    var Question = $('#Question').text();
    var QuestionId = getQuestionId($('input[name=Interests]:checked').val());
    var Answer = $('#Answer').val();
    var Age = $('input[name="Age"]:checked').val();
    var Gender = $('input[name="Gender"]:checked').val();
    var Location = $('#Location').val();
    var Email = getEmail();
    var EmailFriend = getEmailFriend();
    var TestPageId = getActivePageId();

    $.ajax({
        url: "https://docs.google.com/forms/d/1R-b5cSkLV9zK4i8P5qyI3Mj9xyjTV0tUS1LLC04xbTw/formResponse",
        data: {
            "entry_1203314722": Language,
            "entry_185113739": QuestionId,
            "entry_131733371": Question,
            "entry_641039761": Answer,
            "entry_14591124": Age,
            "entry_336794213": Gender,
            "entry_2062063561": Location,
            "entry_950247682": Email,
            "entry_593599606": EmailFriend,
            "entry_593270006": TestPageId
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                postCompleted();
            },
            200: function () {
                postCompleted();
            }
        }
    });
}

function getActivePageId() {
    var result = "";
    try {
        var LastPageC4 = $('#c4').hasClass('pt-page-current');
        var LastPageC5 = $('#c5').hasClass('pt-page-current');
        var LastPageC6 = $('#c6').hasClass('pt-page-current');

        if (LastPageC4) {
            result = "C4"; 
        }
        if (LastPageC5) {
            result = "C5";
        }
        if (LastPageC6) {
            result = "C6";
        }

    } catch (e) {
        var result = "";
    }
    return result;
}

function postCompleted() {
    var LastPageC5 = $('#c5').hasClass('pt-page-current');
    var LastPageC6 = $('#c6').hasClass('pt-page-current');

    if (LastPageC5 == true || LastPageC6 == true) {
        if (LastPageC5 == true)
        {
            $('#c5_div_email').hide();
            $('#c5_div_emailSend').hide();
            $('#c5_div_tnx').show();
            
        }
        if (LastPageC6 == true)
        {
            $('#c6_div_email').hide();
            $('#c6_div_emailFriend').hide();
            $('#c6_div_emailSend').hide();
            $('#c6_div_tnx').show();
        }
    }
    else {
        var randomFinalPage = randomIntFromInterval(5, 6);
        if (randomFinalPage == 5)
        { 
            $('#c4').removeClass('pt-page-current');
            $('#c5').addClass('pt-page-current');
        }
        else if (randomFinalPage == 6)
        {
            $('#c4').removeClass('pt-page-current');
            $('#c6').addClass('pt-page-current');
        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

// init webpage
$(function () {
    
    $('input[name="Language"]').change(function () {
        var question = getQuestion();
        $("#Question").text(question);
    })

    $('input[name=Interests]').change(function () {
        var randomNumber = randomIntFromInterval(1, 9);
        var radio = $('input[name="Interests"]');
        var radioRandom = radio.filter('[value=10]').prop("checked");

        if (radioRandom)
        {
            //$('#c1_radio_random').toggle('btn');
            $("input[name=Interests][value=" + randomNumber + "]").click();
            $('#c1_radio_random').toggleClass('active');
        }
    })

    $('#c1_btn_start').click(function () {
        var question = getQuestion();
        $("#Question").text(question);

        $('#c1').removeClass('pt-page-current');
        $('#c2').addClass('pt-page-current');
    })

    $('#c2_btn_next').click(function () {
        $('#c2').removeClass('pt-page-current');
        $('#c4').addClass('pt-page-current');
    })

    $('#c5_btn_emailSend').click(function () {
        var isValidEmail = isValidEmailAddress($('#c5_input_email').val());

        if (!isValidEmail) {
            $('#c5_input_email').addClass('error');
            $('#c5_div_error').show();
        }
        else if (isValidEmail) {
            $('#c5_input_email').removeClass('error');
            $('#c5_div_error').hide();
            postContactToGoogle();
        }
    })

    $('#c6_btn_stayUpdated').click(function () {
        $('#c6_div_tnx').hide();
        $('#c6_div_email').show();
        $('#c6_div_emailFriend').hide();
        $('#c6_div_emailSend').show();
    })

    $('#c6_btn_share').click(function () {
        $('#c6_div_tnx').hide();
        $('#c6_div_email').show();
        $('#c6_div_emailFriend').show();
        $('#c6_div_emailSend').show();

    })

    $('#c6_btn_emailSend').click(function () {

        var isVisibleEmail = $('#c6_div_email').is(":visible");
        var isVisibleEmailFriend = $('#c6_div_emailFriend').is(":visible");

        var isValidEmail = isValidEmailAddress($('#c6_input_email').val());
        var isValidEmailFriend = isValidEmailAddress($('#c6_input_emailFriend').val());

        if (!isVisibleEmail) {
            isValidEmail = true;
            $('#c6_input_email').val('');
        }

        if (!isVisibleEmailFriend) {
            isValidEmailFriend = true;
            $('#c6_input_emailFriend').val('');
        }

        if (!isValidEmail) {
            $('#c6_input_email').addClass('error');
            $('#c6_div_error').show();
        }
        else if (isValidEmail) {
            if ($('#c6_input_email').hasClass('error')) {
                $('#c6_input_email').removeClass('error');
            }
        }
        
        if (!isValidEmailFriend) {
            $('#c6_input_emailFriend').addClass('error');
            $('#c6_div_error').show();
        }
        else if (isValidEmailFriend) {
            if ($('#c6_input_emailFriend').hasClass('error')) {
                $('#c6_input_emailFriend').removeClass('error');
            }
        }

        if (isValidEmail && isValidEmailFriend) {
            $('#c6_div_error').hide();
            $('#c6_input_email').removeClass('error');
            $('#c6_input_emailFriend').removeClass('error');
            postContactToGoogle();
        }
    })

});

function isValidEmailAddress(emailAddress) {
    var result = false;
    try {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        result = pattern.test(emailAddress);
    } catch (e) {
        result = false;
    }
    return result;
};

function getEmail() {
    var result = "";
    try {
        var LastPageC5 = $('#c5').hasClass('pt-page-current');
        var LastPageC6 = $('#c6').hasClass('pt-page-current');

        if (LastPageC5)
        {
            result = $('#c5_input_email').val();
        }

        if (LastPageC6)
        {
            result = $('#c6_input_email').val();
        }

    } catch (e) {
        result = "";
    }
    return result;
}

function getEmailFriend() {
    var result = "";
    try {
        var LastPageC6 = $('#c6').hasClass('pt-page-current');

        if (LastPageC6) {
            result = $('#c6_input_emailFriend').val();
        }

    } catch (e) {
        result = "";
    }
    return result;
}

function getQuestion()
{
    var result = "";
    try {

        var language = $('input[name=Language]:checked').val();
        var languageId = getLanguageId(language);
        var questionParameter = $('input[name=Interests]:checked').val();
        var questionId = getQuestionId(questionParameter);

        var questions = []; // double value array

        questions[0] = ["Was ist dein größtes Problem, wenn du in eine Website Hacken wilst?", "What is your biggest problem when you're hacking a website?"];
        questions[1] = ["DEU 1", "Would you order a home made meal or cook it for somebody else?"];
        questions[2] = ["DEU 2", "What is your biggest problem when you are searching for a job?"];
        questions[3] = ["DEU 3", "Would you Resonee?"];
        questions[4] = ["DEU 4", "What is your biggest problem when you are using mobile aplications?"];
        questions[5] = ["DEU 5", "Would it be easier for you if you could communicate your feelings through pictures with your friends, why?"];
        questions[6] = ["DEU 6", "Would you fulfill out a survey if it would look nice, easy to answer and more entertaining, why? "];
        questions[7] = ["DEU 7", "What is your biggest problem using email?"];
        questions[8] = ["DEU 8", "What is your biggest problem when managing email subscriptions?"];
        questions[9] = ["DEU 9", "What is your biggest problem when you are searching for an exciting event?"];

        if (questionId >= 0 && questionId < questions.length) {
            return questions[questionId][languageId];
        } 
        
    } catch (e) {
        return "What is your biggest problem when you're hacking a website?";
    }
    return result;
}

function getQuestionId(questionParameter) {
    var result = 0;
    try {
        if (questionParameter > 0 && questionParameter <= 9)
        {
            return questionParameter;
        }

    } catch (e) {
        result = 0;
    }
    return result;
}

function getLanguageId(language) {
    var result;
    try {
        switch (language) {
            case "Deutsch":
                result = 0;
                break;
            case "English":
                result = 1;
                break;
			default:
				result = 1;
				break;
        }
    } catch (e) {
		result = 1;
    }
    return result;
}

