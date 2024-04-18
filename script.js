function calcTimeDif(){
    let timeInputs = document.querySelectorAll("input");
    let amTime1 = document.getElementById("am-time1").value;
    let amTime2 = document.getElementById("am-time2").value;
    let pmTime1 = document.getElementById("pm-time1").value;
    let pmTime2 = document.getElementById("pm-time2").value;
    let currentHours = parseInt(document.getElementById("hours").textContent);
    let currentMinutes = parseInt(document.getElementById("minutes").textContent);
    let errorMessage;

    let d1Am = new Date("Wed, 27 July " + amTime1);
    let d2Am = new Date("Wed, 27 July " + amTime2);
    let d1Pm = new Date("Wed, 27 July " + pmTime1);
    let d2Pm = new Date("Wed, 27 July " + pmTime2);

    let [hour1, minute1] = amTime1.split(":").map(Number);
    let [hour2, minute2] = amTime2.split(":").map(Number);
    let [hour1Pm, minute1Pm] = pmTime1.split(":").map(Number);
    let [hour2Pm, minute2Pm] = pmTime2.split(":").map(Number);
    let error = false;

    // check for empty fields
    timeInputs.forEach(element => {
        if (element.value === "") {
            element.classList.remove("success");
            element.classList.add("error");
            error = true;
        }
        else{
            element.classList.remove("success");
            element.classList.remove("error");
        }
    });
    
    // prompt message if empty fields are found
    if (error) {
        errorMessage = "All input fields must not be empty. Please enter a valid time.";
        errorPrompt3(errorMessage);
        return;
    }

    // check for 1st input greater than 2nd input am and pm time
    if (hour1 > hour2 || (hour1 == hour2 && minute1 > minute2)) {
        errorMessage = "First input must not be greater than the second input.";
        errorPrompt1(errorMessage);

        if (hour1Pm > hour2Pm || (hour1Pm == hour2Pm && minute1Pm > minute2Pm)) {
            timeInputs.forEach(element => {
                element.classList.remove("success");
                element.classList.add("error");
            });
        }
        else{
            timeInputs.forEach(element => {
                if (element.id == "am-time1" || element.id == "am-time2") {
                    element.classList.remove("success");
                    element.classList.add("error");
                }
            });
        }
        return;
    }
    else if(hour1Pm > hour2Pm || (hour1Pm == hour2Pm && minute1Pm > minute2Pm)){
        errorMessage = "First input must not be greater than the second input.";
        errorPrompt1(errorMessage);
        
        timeInputs.forEach(element => {
            if (element.id == "pm-time1" || element.id == "pm-time2") {
                element.classList.remove("success");
                element.classList.add("error");
            }
        });
        return;
    }

    // check for equal inputs
    for (let index = 0; index < timeInputs.length; index += 2) {
        if (timeInputs[index].value == timeInputs[index+1].value) {
            timeInputs[index].classList.remove("success");
            timeInputs[index].classList.add("error");
            timeInputs[index+1].classList.remove("success");
            timeInputs[index+1].classList.add("error");
            error = true;
        }
    }

    if (error) {
        errorMessage = "Inputs must not be equal.";
        errorPrompt2(errorMessage);
        return;
    } //end of error validation

    //getting current total hours and minutes and calculating new total
    let hours = Math.abs((d2Am.getTime() - d1Am.getTime()) / (1000 * 60 * 60));
    let hoursPm = Math.abs((d2Pm.getTime() - d1Pm.getTime()) / (1000 * 60 * 60));
    let minutes  = (hours - Math.floor(hours)) * 60;
    let minutesPm  = (hoursPm - Math.floor(hoursPm)) * 60;

    let totalHours = Math.floor(hours) + Math.floor(hoursPm) + currentHours;
    let totalMinutes = minutes + minutesPm + currentMinutes;

    console.log("Total Hours before add: " + totalHours);
    // converting minutes to hours if necessary
    if(totalMinutes >= 60){
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;
    }

    console.log("Hours AM: " + hours);
    console.log("Minutes AM: " + minutes);
    console.log("Hours PM: " + hoursPm);
    console.log("Minutes PM: " + minutesPm);
    console.log("Total Hours: " + totalHours);
    console.log("Total Minutes: " + totalMinutes);
    console.log("-----------------------------------------------------------------");

    //displaying new total on page
    document.getElementById('hours').innerHTML = Math.floor(totalHours);
    document.getElementById('minutes').innerHTML = Math.round(totalMinutes);

    //adding success class
    timeInputs.forEach(element => {
        element.classList.remove("error");
        element.classList.add("success");
    });

    addSuccess();
}

//time range error message
function errorPrompt1(errorMessage){
    Swal.fire({
        title: "Invalid Time Range",
        text: errorMessage,
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}

//equal value error message
function errorPrompt2(errorMessage){
    Swal.fire({
        title: "Equal Time Values",
        text: errorMessage,
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}

//empty fields error message
function errorPrompt3(errorMessage){
    Swal.fire({
        title: "Empty Input Fields",
        text: errorMessage,
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}

//reset progress confirmation
function confirmResetMessage(){
    Swal.fire({
        title: "Reset all progress?",
        text: "Progress that has been made will not be saved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#76ABAE",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        allowOutsideClick: false,
        allowEscapeKey: false,
        }).then((result) => {
        if (result.isConfirmed) {
            resetProgress();
        }
    });
}

//resetting all input fields to empty strings
function resetProgress(){
    let timeInputs = document.querySelectorAll("input");
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    timeInputs.forEach(element => {
        element.value = "--:--";
        element.classList.remove("success");
        element.classList.remove("error");
    });

    Swal.fire({
        title: "Reset Complete!",
        icon: "success"
    });
}

function addSuccess(){
    let addButton = document.querySelector(".add-button");

    addButton.setAttribute("disabled", true);
    console.log("yeah");
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully added!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        toast: true,
    }).then((result) => {
        addButton.removeAttribute("disabled");
        console.log(result);
    });
}