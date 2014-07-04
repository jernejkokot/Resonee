function postContactToGoogle() {
    var Language = $('input[name="Language"]:checked').val();
    var Question = $('#Question').text();
    var QuestionId = getQuestionId(getUrlParameter("q"));
    var Answer = $('#Answer').val();
    var Age = $('input[name="Age"]:checked').val();
    var Gender = $('input[name="Gender"]:checked').val();
    var Location = $('#Location').val();
    var Email = $('#Email').val();
    var LastPage = $('#c5').hasClass('pt-page-current');

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
            "entry_950247682": Email
            
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                if (LastPage == true) {
                    $('#c5_text_tnx').show();
                    $('#Email').prop('disabled', true);
                    $('#c5_btn_mail').prop('disabled', true);
                }
                else {
                    $('#c4').removeClass('pt-page-current');
                    $('#c5').addClass('pt-page-current');
                }
            },
            200: function () {
                if (LastPage == true) {
                    $('#c5_text_tnx').show();
                    $('#Email').prop('disabled', true);
                    $('#c5_btn_mail').prop('disabled', true);
                }
                else {
                    $('#c4').removeClass('pt-page-current');
                    $('#c5').addClass('pt-page-current');
                }
            }
        }
    });
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

    var question = getQuestion();
    $("#Question").text(question);

    $('#c1_btn_start').click(function () {
        $('#c1').removeClass('pt-page-current');
        $('#c2').addClass('pt-page-current');
    })

    $('#c2_btn_next').click(function () {
        $('#c2').removeClass('pt-page-current');
        $('#c4').addClass('pt-page-current');
    })

    $('#c5_btn_mail').click(function () {
        if (!isValidEmailAddress($('#Email').val())) {
            $('#c5_text_error').show();
        }
        else {
            $('#c5_text_error').hide();
            postContactToGoogle();
        }
    })

    //
    
});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};


function getQuestion()
{
    var result = "";
    try {

        var language = $('input[name=Language]:checked').val();
        var languageId = getLanguageId(language);
        var questionParameter = getUrlParameter("q");
        var questionId = getQuestionId(questionParameter);
        var question = getQuestion(languageId, questionId);

        var questions = []; // double value array

        questions[0] = ["Was ist dein größtes Problem, wenn du in eine Website Hacken wilst?", "What is your biggest problem when you're hacking a website?"];
        questions[1] = ["Vprasanje 1 - DEU", "Vprasanje 1 - ANG"];
        questions[2] = ["Vprasanje 2 - DEU", "Vprasanje 2 - ANG"];

        if (questionId >= 0 && questionId < questions.length) {
            return questions[questionId][languageId];
        } 
        
    } catch (e) {
        return "What is your biggest problem when you're hacking a website?";
    }
    return result;
}

function getQuestionParameter(questionParameter) {
    var result;
    try {
        switch (switch_on) {
            case "1":
                result = 1;
                break;
            case "2":
                result = 2;
                break;
            default:
                result = 0;
                break;
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

