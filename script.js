function addTask(){
    const userInput = document.getElementById("userInput");
    const list = document.getElementById("list");
    
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
    saveData();
}

userInput.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        addTask();
        saveData();
    }
  });

list.addEventListener("click", function (e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle ("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data", list.innerHTML);
    updateProgress();
}

function showTask(){
    list.innerHTML = localStorage.getItem("data");
}
showTask();


//progress bar
