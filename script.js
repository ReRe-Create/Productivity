//For to-do's
const userInput = document.getElementById("userInput");
const list = document.getElementById("list");

//for timer
let mintimer_interval;

 function addTask(){
    
    if(userInput.value == ""){
            alert ("You must include a task!");
        }
    
    else{
        let li = document.createElement("li");
        li.innerHTML = userInput.value;
        list.appendChild(li);
        let span = document.createElement ("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    // userInput.value= "";
    updateProgress();
    saveData();
    clear();
}

userInput.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        addTask();
    }
  });

list.addEventListener("click", function (e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle ("checked");
        saveData();
        updateProgress();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateProgress();
        clear();
    }
},false);

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}

function showTask(){
    list.innerHTML = localStorage.getItem("data");
    updateProgress();
    clear();
}

//update progress bar

function count_Checked(){
    const task = list.getElementsByTagName("LI");
    let count = 0;
    for (let i = 0; i < task.length; i++){
        if(task[i].classList.contains("checked")){
            count++;
        }
    }
    return count;
}

function updateProgress(){
    const task = list.getElementsByTagName("LI");
    const checked= count_Checked();

    if (task.length == 0){
        updateProgressBar(0);
        return;
    }

    else{

        const progress_val=(checked/task.length)*100;
        updateProgressBar(progress_val);
    }
}

function updateProgressBar(value){
    value=Math.round(value);

    const progressFill= document.querySelector(".progress_fill");
    const progressNum= document.querySelector(".progress_num");

    progressFill.style.width= `${value}%`;
    progressNum.textContent= `${value}% completed`;
    }
    
function clear(){
    const task = list.getElementsByTagName("LI").length;
    let clearbtn = document.querySelector("#Clear");

    //creates a clear button when task is present
    if(task>0){
        if (!clearbtn){ 
        clearbtn = document.createElement("button");
        clearbtn.id = "Clear";
        clearbtn.textContent = "Clear";
        list.insertBefore(clearbtn, list.firstChild);

        //when clicked on all tasks are removed
        clearbtn.addEventListener ("click", function () {
            while(list.firstChild){
                list.removeChild(list.firstChild);
            
            }
            updateProgress();
            saveData();
        });
        }
    }

    //removes clearbtn when task isn't present
    else{
        clearbtn.remove();

    }

}

showTask();


//Pomodoro Functions

//add or minus time button
function add_minus_time(click){
    const time = document.querySelector("#set_time h5");
    const sum_value = parseInt(time.innerText) + click;
    time.innerText= sum_value;

    if (sum_value<0){
        time.innerText = 0;    
    }

//reset session time button
    if (click === 0){
        time.innerText = 0;
    }
    settime_display();
}


//Timer countdown
function countdown(){
        mintimer_interval = setInterval(() => {
        const minElement = document.getElementById("minutes");
        let minutes = parseInt(minElement.textContent);
        const secElement = document.getElementById("seconds");
        let seconds = parseInt(secElement.textContent);
        document.querySelector(".reset_container").style.display = 'flex'; //restart button appears during that time

            if (minutes > 0 || seconds>0){
                if(seconds > 0){
                   seconds--; 
                } else {
                    minutes--;
                    seconds = 59;
                }
            minElement.textContent = minutes;
            secElement.textContent = seconds;

            } else {
                clearInterval(mintimer_interval);
                completed();
                document.querySelector(".reset_container").style.display = 'none';

            }
    }, 1000);
            
}

//start button
function start_btn(){
    const timeElement = document.querySelector("#set_time h5");
    const time = parseInt(timeElement.innerText);

    //alert user when they did not set time
    if (time==0){
        alert ("Please set time!");

    } else{
        //removes elements from session_container and start_stop container
        const session_container = document.getElementsByClassName("session-container");
        const start_stop_container = document.getElementsByClassName("start-stop-container");
        document.getElementById("session").style.display = 'none';

        for (let i = 0; i < session_container.length; i++) {
            session_container[i].style.display = 'none';
        }
        
        for (let i = 0; i < start_stop_container.length; i++) {
            start_stop_container[i].style.display = 'none';
        }

        //countdown begins
        countdown();
    }
}

// Reset Button Function
function reset() {
    document.querySelector(".reset_container").style.display = 'none';
    clearInterval(mintimer_interval); // Stop the ongoing timer
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    // Show session controls again
    const session_container = document.getElementsByClassName("session-container");
    const start_stop_container = document.getElementsByClassName("start-stop-container");
    document.getElementById("session").style.display = '';


    for (let i = 0; i < session_container.length; i++) {
        session_container[i].style.display = '';
    }

    for (let i = 0; i < start_stop_container.length; i++) {
        start_stop_container[i].style.display = '';
    }

    const time = document.querySelector("#set_time h5");
    time.innerText = 0;
}

//shows time
function settime_display(){
    const timeElement = document.querySelector("#set_time h5");
    const time = parseInt(timeElement.innerText);
    document.getElementById("minutes").textContent = time;

    if (time ==0){
        document.getElementById("minutes").textContent = "00";
    }

}

function completed(){
    const session_container = document.getElementsByClassName("session-container");
    const start_stop_container = document.getElementsByClassName("start-stop-container");

    // var sound = new Audio('Assets/lofi-alarm-clock.mp3');
    // sound.play();
    alert ("Session completed");
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("session").style.display = '';

    for (let i = 0; i < session_container.length; i++) {
        session_container[i].style.display = '';
    }
    
    for (let i = 0; i < start_stop_container.length; i++) {
        start_stop_container[i].style.display = '';
    }

    const time = document.querySelector("#set_time h5");
    time.innerText = 0;
    
}

