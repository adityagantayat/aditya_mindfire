var tableRowCount = 1;
function changeToUpper(mystr){
    mystr.value=mystr.value.toUpperCase();
    // formProgress(10)
}
function inputFirstName(nameValue){
    document.getElementById("firstNameErrorMsg").style.display = "None";
    if(!/^[a-zA-Z]+$/.test(document.getElementById(nameValue).value))
    {
        document.getElementById("firstNameErrorMsg").style.display = "Block";
    }
    changeToUpper(document.getElementById(nameValue));
    
}
function inputLastName(nameValue){
    document.getElementById("lastNameErrorMsg").style.display = "None";
    if(!/^[a-zA-Z]+$/.test(document.getElementById(nameValue).value))
    {
        document.getElementById("lastNameErrorMsg").style.display = "Block";
    }
    changeToUpper(document.getElementById(nameValue));
    
}
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
function validateEmail(mail) 
{
    document.getElementById("emailErrorMsg").style.display = "None";
 if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById(mail).value))
  {
    document.getElementById("emailErrorMsg").style.display = "Block";
  }

}
function passwordLengthCheck(){
    document.getElementById("passwordErrorMsg").style.display = "None";
    if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(document.getElementById("password").value)){
        
    document.getElementById("passwordErrorMsg").style.display = "Block";

    }
    
}
function passwordValidation(){
    // document.getElementById("confirmPasswordErrorMsg").textContent="";
    
    document.getElementById("confirmPasswordErrorMsg").style.display = "None";
    if(document.getElementById("password").value!=document.getElementById("confirmPassword").value){
        document.getElementById("confirmPasswordErrorMsg").style.display = "Block";
    }   

}
function dateOfBirthValidation(){
    document.getElementById("dobErrorMsg").style.display="None";
    if(document.getElementById("dateOfbirth").value.length===0){
        document.getElementById("dobErrorMsg").style.display="Block";
    }
    else{
        var y=parseInt(document.getElementById("dateOfbirth").value.substring(0,4));
        if(y>2004){
            document.getElementById("ageErrorMsg").style.display="Block";
        }
    }
}





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
    
    
    // dateOfBirthValidation();
    if(document.getElementById("dateOfbirth").value.length===0){
        document.getElementById("dobErrorMsg").style.display="Block";
        document.getElementById("dobErrorMsg").textContent="Fill up your Date of Birth";
        counter+=1;
    }
    else{
        var y=parseInt(document.getElementById("dateOfbirth").value.substring(0,4));
        if(y>2004){
            document.getElementById("ageErrorMsg").style.display="Block";
        }
        counter+=1;
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
    if(counter>0){
        return 0;
    }
}
function submitOnSuccess(){
        
    document.getElementById("dataTable").style.display = "Block";
    var name = document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
    var contact = document.getElementById("phoneNumber1").value;
    var email = document.getElementById("email").value;
    var table= document.getElementsByClassName("dataTable")[0];
    var newRow= table.insertRow(tableRowCount);
    var cell1=newRow.insertCell(0);
    var cell2=newRow.insertCell(1);
    var cell3=newRow.insertCell(2);
    cell1.innerHTML=name;
    cell2.innerHTML=contact;
    cell3.innerHTML=email;
    tableRowCount+=1;

    document.getElementById('myform').reset();
    document.getElementsByClassName('errorMsg').display = "None";
}