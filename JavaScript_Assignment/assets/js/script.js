//Declarations

var regArray = [];
var selectedIndex = -1;

$(document).ready(function () {

    $('.errorMsg').hide();

    init();

    // First Name
    $("#firstName").blur(function () {
        $("#firstNameErrorMsg").hide();
        if (!/^[a-zA-Z]+$/.test(this.value)) {
            $("#firstNameErrorMsg").show();
        }
    });

    // Last Name
    $("#lastName").blur(function () {
        $("#lastNameErrorMsg").hide();
        if (!/^[a-zA-Z]+$/.test(this.value)) {
            $("#lastNameErrorMsg").show();
        }
    });

    $("#phoneNumber1").blur(function () {
        $("#phoneErrorMsg1").hide();
        $("#phoneErrorMsg2").hide();
        if (!/^[0-9]+$/.test(this.value)) {
            $("#phoneErrorMsg1").show();
        }
        if (this.value.length != 10) {
            $("#phoneErrorMsg2").show();
        }
    });
    $("#email").blur(function () {
        $("#emailErrorMsg").hide();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value)) {
            $("#emailErrorMsg").show();
        }
    });
    $("#password").blur(function () {
        $("#passwordErrorMsg").hide();
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(this.value)) {

            $("#passwordErrorMsg").show();

        }

    });
    $("#confirmPassword").blur(function () {
        $("#confirmPasswordErrorMsg").hide();
        if ($("#password").val() != $("#confirmPassword").val()) {
            $("#confirmPasswordErrorMsg").show();
        }
    });
    $("#dateOfbirth").blur(function () {
        $("#dobErrorMsg").hide();
        if (this.value.length === 0) {
            $("#dobErrorMsg").show();
        }
        else {
            var y = parseInt(this.value.substring(0, 4));
            if (y > 2004) {
                $("#ageErrorMsg").show();
            }
            else {
                $("#ageErrorMsg").hide();

            }
        }
    });
    $('#submit').click(function () {
        validateForm();
    });
});
// $("#").blur(function () { });
// $("#").blur(function () { });
// $("#").blur(function () { });
// check all the fields before submission

function validateForm() {
    var counter = 0;
    var changeconfirmPassword = "";
    var passwordText = "";
    if (!/^[a-zA-Z]+$/.test($("#firstName").value)) {
        $("#firstNameErrorMsg").show();
        counter += 1;
    }
    if (!/^[a-zA-Z]+$/.test($("#lastName").value)) {
        $("#lastNameErrorMsg").show();
        counter += 1;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("#email").val())) {
        $("#emailErrorMsg").show();
        $("#emailErrorMsg").textContent = "Example= yourname@example.com ";
        counter += 1;
    }
    if (!/^[0-9]+$/.test($("#phoneNumber1").val()) || $("#phoneNumber1").val().length != 10) {
        $("#phoneErrorMsg1").show();
        $("#phoneErrorMsg1").textContent = "Phone number should be only digits and should be of length 10";
        counter += 1;
    }
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test($("#password").val())) {
        // passwordText = "Password"
        $("#passwordErrorMsg").show();
        counter += 1;
    }
    if ($("#password").val() != $("#confirmPassword").val()) {
        changeconfirmPassword = " - Confirm Password"
        counter += 1;
        $("#confirmPasswordErrorMsg").show();
        // $("#confirmPasswordErrorMsg").textContent = "Fill up your " + passwordText + changeconfirmPassword;
    }


    // dateOfBirthValidation();
    if ($("#dateOfbirth").val().length === 0) {
        $("#dobErrorMsg").show();
        $("#dobErrorMsg").textContent = "Fill up your Date of Birth";
        counter += 1;
    }
    else {
        var y = parseInt($("#dateOfbirth").val().substring(0, 4));
        if (y > 2004) {
            $("#ageErrorMsg").show();
            counter += 1;
        }
        else {
            $("#ageErrorMsg").hide();

        }
    }

    if ($("#course").val() == this.undefined) {
        $("#courseErrorMsg").show();
        counter += 1;
    }
    else {
        $("#courseErrorMsg").hide();
    }


    if ($("input[name='gender']:checked").val() == this.undefined) {
        $("#genderErrorMsg").show();
        counter += 1;
    }
    else {
        $("#genderErrorMsg").hide();
    }

    if ($('input[name="language"]:checked').val() == this.undefined) {
        $("#languageErrorMsg").show();
        counter += 1;
    }
    else {
        $("#languageErrorMsg").hide();
    }

    if (counter === 0) {
        submitOnSuccess();

    }
    else {
        return 0;
    }
}

//Delete a record from the table based on a specific index
function deleteTableRow(index) {
    regArray.splice(index, 1);
    localStorage.regRecord = JSON.stringify(regArray);
    init();

}
// edit a record from the table based on a specific index
function editRow(index) {
    $('.errorMsg').hide();

    selectedIndex = index;
    var newObj = regArray[index];
    $("#firstName").val(newObj.firstname);
    $("#lastName").val(newObj.lastname);
    $("#phoneNumber1").val(newObj.contactnumber);
    $("#email").val(newObj.email);
    $("#password").val(newObj.password);
    $("#confirmPassword").val(newObj.confirmpass);
    $("#" + newObj.gender + "").attr('checked', true);
    $("#" + newObj.language + "").attr('checked', true);
    $("#dateOfbirth").val(newObj.dob);
    $("#course").val(newObj.course);
    $("#submit").html("Update");
    $("#submit").attr("class", "btn btn-primary");

}
// fetch the updated table(send the object data to the prepareTable() function)
function init() {
    $("#tableRow").empty();
    if (localStorage.regRecord) {
        regArray = JSON.parse(localStorage.regRecord);
        for (var i = 0; i < regArray.length; i++) {
            prepareTable(i, regArray[i].firstname, regArray[i].lastname, regArray[i].contactnumber, regArray[i].email)
        }
    }
}
// submit the form data and apppend form data to the array for appending it to the table
function submitOnSuccess() {

    $("#dataTable").show();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var contactNumber = $("#phoneNumber1").val();
    var email = $("#email").val();
    var gender = $('input[name="gender"]:checked').val();
    var lang = $('input[name="language"]:checked').val();
    var pass = $("#password").val();
    var dob = $("#dateOfbirth").val();
    var course = $("#course").val();
    var regObj = { firstname: firstName, lastname: lastName, contactnumber: contactNumber, email: email, gender: gender, language: lang, password: pass, confirmpass: pass, dob: dob, course: course };
    if (selectedIndex === -1) {
        regArray.push(regObj);
    }
    else {
        regArray.splice(selectedIndex, 1, regObj);
    }
    localStorage.regRecord = JSON.stringify(regArray);
    init();

    $('#myform').trigger("reset");
    $('input[name="gender"]').prop('checked', false);
    $('input[name="language"]').prop('checked', false);
    selectedIndex = -1;
    $("#submit").html("Submit");
    $("#submit").attr("class", "btn btn-success");
    $('.errorMsg').hide();
}
// prepare the tble according to the updated data
function prepareTable(index, firstName, lastName, contactNumber, email) {

    $("#tableRow").append("<tr>");
    $("#tableRow").append("<td scope='row'>" + firstName + " " + lastName + "</td><td>" + contactNumber + "</td><td>" + email);
    $("#tableRow").append("</td><td>" + '<button class="btnEdit btn btn-primary btn-sm mr-1" onclick="editRow(' + index + ')">edit</button><button class="btnDelete btn btn-danger btn-sm"  onclick="deleteTableRow(' + index + ')">delete</button></td>');


}