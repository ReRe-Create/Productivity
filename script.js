const userInput = document.getElementById("userInput");
const list = document.getElementById("list");

 function addTask(){
    
    if(userInput.value === ""){
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
    userInput.value= "";
    updateProgress();
    saveData();
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
    }
},false);

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}

function showTask(){
    list.innerHTML = localStorage.getItem("data");
    updateProgress();
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
    
showTask();
