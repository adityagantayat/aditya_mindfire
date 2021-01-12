// var tableRowCount = 1;
var regArray=[];
var selectedIndex=-1;
// change to block letters
function changeToUpper(mystr){
    mystr.value=mystr.value.toUpperCase();
}
// check for first name
function inputFirstName(nameValue){
    document.getElementById("firstNameErrorMsg").style.display = "None";
    if(!/^[a-zA-Z]+$/.test(document.getElementById(nameValue).value))
    {
        document.getElementById("firstNameErrorMsg").style.display = "Block";
    }
    changeToUpper(document.getElementById(nameValue));
    
}
// check for last name
function inputLastName(nameValue){
    document.getElementById("lastNameErrorMsg").style.display = "None";
    if(!/^[a-zA-Z]+$/.test(document.getElementById(nameValue).value))
    {
        document.getElementById("lastNameErrorMsg").style.display = "Block";
    }
    changeToUpper(document.getElementById(nameValue));
    
}
// check for a valid phone number
function phoneNumber(phoneNumberValue){
    document.getElementById("phoneErrorMsg1").style.display = "None";
    document.getElementById("phoneErrorMsg2").style.display = "None";
    if(!/^[0-9]+$/.test(document.getElementById(phoneNumberValue).value))
    {
        document.getElementById("phoneErrorMsg1").style.display = "Block";
    }
    if(document.getElementById(phoneNumberValue).value.length!=10){
        document.getElementById("phoneErrorMsg2").style.display = "Block";
    }
}
// check for a valid email id
function validateEmail(mail) {
 document.getElementById("emailErrorMsg").style.display = "None";
 if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById(mail).value)) {
    document.getElementById("emailErrorMsg").style.display = "Block";
  }

}
// check the characters and length of the password
function passwordLengthCheck() {
    document.getElementById("passwordErrorMsg").style.display = "None";
    if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(document.getElementById("password").value)) {
        
    document.getElementById("passwordErrorMsg").style.display = "Block";

    }
    
}
// check if both passwords match
function passwordValidation() {    
    document.getElementById("confirmPasswordErrorMsg").style.display = "None";
    if(document.getElementById("password").value!= document.getElementById("confirmPassword").value) {
        document.getElementById("confirmPasswordErrorMsg").style.display = "Block";
    }   
}
// validate date of birth
function dateOfBirthValidation() {
    document.getElementById("dobErrorMsg").style.display="None";
    if(document.getElementById("dateOfbirth").value.length===0) {
        document.getElementById("dobErrorMsg").style.display="Block";
    }
    else {
        var y=parseInt(document.getElementById("dateOfbirth").value.substring(0,4));
        if(y>2004){
            document.getElementById("ageErrorMsg").style.display="Block";
        }
        else{
            document.getElementById("ageErrorMsg").style.display="None";

        }
    }
}

// check all the fields before submission

function validateForm(){
    var counter=0;
    var strFirstName ="";
    var changeconfirmPassword="";
    var passwordText="";
    if(document.getElementById("firstName").value.length===0){
        document.getElementById("firstNameErrorMsg").style.display="Block";
        document.getElementById("firstNameErrorMsg").textContent="Fill up your First Name";
        strFirstName = "First name & ";
        counter+=1;
    }
    if(document.getElementById("lastName").value.length===0){
        document.getElementById("lastNameErrorMsg").style.display="Block";
        document.getElementById("lastNameErrorMsg").textContent="Fill up your Last Name";
        counter+=1;
    }
    if(document.getElementById("email").value.length===0){
        document.getElementById("emailErrorMsg").style.display="Block";
        document.getElementById("emailErrorMsg").textContent="Fill up your Email";
        counter+=1;
    }
    if(document.getElementById("phoneNumber1").value.length===0){
        document.getElementById("phoneErrorMsg1").style.display="Block";
        document.getElementById("phoneErrorMsg1").textContent="Fill up your Primary Phone Number";
        counter+=1;
    }
    if(document.getElementById("password").value.length===0){
        passwordText = "Password"
        counter+=1;
    }
    if(document.getElementById("confirmPassword").value.length===0){
        changeconfirmPassword=" - Confirm Password"
        counter+=1;
        document.getElementById("confirmPasswordErrorMsg").style.display="Block";
        document.getElementById("confirmPasswordErrorMsg").textContent="Fill up your "+passwordText+changeconfirmPassword;
    }   
    
    
    dateOfBirthValidation();
    if(document.getElementById("dateOfbirth").value.length===0){
        document.getElementById("dobErrorMsg").style.display="Block";
        document.getElementById("dobErrorMsg").textContent="Fill up your Date of Birth";
        counter+=1;
    }
    else{
        var y=parseInt(document.getElementById("dateOfbirth").value.substring(0,4));
        if(y>2004){
            document.getElementById("ageErrorMsg").style.display="Block";
            counter+=1;
        }
        else{
            document.getElementById("ageErrorMsg").style.display="None";

        }
    }

    if(document.getElementById("course").value===""){
        document.getElementById("courseErrorMsg").style.display="Block";
        counter+=1;
    }
    else{
        document.getElementById("courseErrorMsg").style.display="None";
    }


    if(document.querySelector('input[name="gender"]:checked')==null){
        document.getElementById("genderErrorMsg").style.display="Block";
        counter+=1;
    }
    else{
        document.getElementById("genderErrorMsg").style.display="None";
    }

    if(document.querySelector('input[name="language"]:checked')==null){
        document.getElementById("languageErrorMsg").style.display="Block";
        counter+=1;
    }
    else{
        document.getElementById("languageErrorMsg").style.display="None";
    }
   
    if(counter===0){
        submitOnSuccess();
        
    }
    else {
        return 0;
    }
}
// Delete a record from the table
function deleteTableRow(index){
    regArray.splice(index,1);
    localStorage.regRecord=JSON.stringify(regArray);
    init();
    
}
// edit a record from the table
function editRow(index){
    selectedIndex= index;
    var newObj=regArray[index];
    document.getElementById("firstName").value=newObj.firstname;
    document.getElementById("lastName").value=newObj.lastname;
    document.getElementById("phoneNumber1").value=newObj.contactnumber;
    document.getElementById("email").value=newObj.email;
    document.getElementById("password").value=newObj.password;
    document.getElementById("confirmPassword").value=newObj.confirmpass;
    document.querySelector('input[name="gender"]').value=newObj.gender;
    document.getElementById(newObj.gender).checked= true;
    document.querySelector('input[name="language"]').value=newObj.language;
    document.getElementById(newObj.language).checked= true;
    document.getElementById("dateOfbirth").value=newObj.dob;
    document.getElementById("course").value=newObj.course;
    document.getElementById("submit").innerHTML="Update";

}
// fetch the updated table
function init(){
    document.getElementById("tableRow").innerHTML="";
    if(localStorage.regRecord){
        regArray=JSON.parse(localStorage.regRecord);
        for(var i=0; i<regArray.length; i++){
            prepareTable(i,regArray[i].firstname,regArray[i].lastname,regArray[i].contactnumber,regArray[i].email)
        }
    }
}
// submit the form data and apppend it to the table
function submitOnSuccess(){
        
    document.getElementById("dataTable").style.display = "Block";
    var firstName = document.getElementById("firstName").value ;
    var lastName =  document.getElementById("lastName").value;
    var contactNumber = document.getElementById("phoneNumber1").value;
    var email = document.getElementById("email").value;
    var gender=document.querySelector('input[name="gender"]:checked').value;
    var lang=document.querySelector('input[name="language"]:checked').value;
    var pass=document.getElementById("password").value;
    var dob= document.getElementById("dateOfbirth").value;
    var course=document.getElementById("course").value;
    var regObj={firstname: firstName, lastname: lastName, contactnumber: contactNumber, email: email, gender: gender,language: lang, password: pass, confirmpass: pass, dob: dob,course: course};
    if(selectedIndex===-1){
        regArray.push(regObj);
    }
    else{
        regArray.splice(selectedIndex,1,regObj);
    }
    localStorage.regRecord= JSON.stringify(regArray);
    init();
    
    document.getElementById('myform').reset();
    selectedIndex=-1;
    document.getElementById("submit").innerHTML="Submit";
    document.getElementsByClassName('errorMsg').display = "None";
}
// prepare the tble according to the updated data
function prepareTable(index,firstName,lastName,contactNumber,email){
    
    var table= document.getElementById("tableRow");
    var newRow= table.insertRow();
    var cell1=newRow.insertCell(0);
    var cell2=newRow.insertCell(1);
    var cell3=newRow.insertCell(2);
    var cell4=newRow.insertCell(3);
    cell1.innerHTML=firstName+" "+lastName;
    cell2.innerHTML= contactNumber;
    cell3.innerHTML=email;
    cell4.innerHTML='<button class="btnEdit" onclick="editRow('+index+')">edit</button><button class="btnDelete"  onclick="deleteTableRow('+index+')">delete</button>';
}