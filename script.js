function calcTimeDif(){
    let time1 = document.getElementById("time1").value;
    let time2 = document.getElementById("time2").value;
    let currentHours = parseInt(document.getElementById("hours").textContent);
    let currentMinutes = parseInt(document.getElementById("minutes").textContent);
    let errorMessage;

    let d1 = new Date("Wed, 27 July " + time1);
    let d2 = new Date("Wed, 27 July " + time2);

    console.log(d1.getTime());
    console.log(d2.getTime());

    let [hour1, minute1] = time1.split(":").map(Number);
    let [hour2, minute2] = time2.split(":").map(Number);

    console.log(hour1);
    console.log(hour2);
    console.log(minute1);
    console.log(minute2);

    if (minute1 === undefined || minute2 === undefined) {
        errorMessage = "All input fields must not be empty. Please enter a valid time.";
        errorPrompt3(errorMessage);
        return;
    }

    if (hour1 > hour2 || (hour1 == hour2 && minute1 > minute2)) {
        errorMessage = "First input must not be greater than the second input.";
        errorPrompt1(errorMessage);
        return;
    }

    if (hour1 == hour2 && minute1 == minute2) {
        errorMessage = "Inputs must not be equal.";
        errorPrompt2(errorMessage);
        return;
    }

    let hours = Math.abs((d2.getTime() - d1.getTime()) / (1000 * 60 * 60));
    let minutes  = (hours - Math.floor(hours)) * 60 + currentMinutes;

    if(minutes >= 60){
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }

    hours += currentHours;

    document.getElementById('hours').innerHTML = Math.floor(hours);
    document.getElementById('minutes').innerHTML = Math.round(minutes);

    console.log(hours);
    console.log(minutes);
}

function resetProgress(){
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("time1").value = "--:--";
    document.getElementById("time2").value = "--:--";

    Swal.fire({
        title: "Reset Complete!",
        icon: "success"
    });
}

function errorPrompt1(errorMessage){
    Swal.fire({
        title: "Invalid Time Range",
        text: errorMessage,
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}

function errorPrompt2(errorMessage){
    Swal.fire({
        title: "Equal Time Values",
        text: errorMessage,
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}

function errorPrompt3(errorMessage){
    Swal.fire({
        title: "Empty Input Fields",
        text: errorMessage,
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}

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