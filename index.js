/* ---------- LOGIN LOGIC ---------- */
function login(){
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("loginMessage");

    msg.style.display = "block";
    if(!user && !pass){
        msg.innerText = "Please enter username and password";
        msg.style.background="red"; msg.style.color="white";
        return;
    }
    if(!user){
        msg.innerText = "Please enter username";
        msg.style.background="red"; msg.style.color="white";
        return;
    }
    if(!pass){
        msg.innerText = "Please enter password";
        msg.style.background="red"; msg.style.color="white";
        return;
    }
    if(user === "admin" && pass === "12345"){
        msg.innerText = "Login Successful!";
        msg.style.background="green"; msg.style.color="black";
        setTimeout(()=>{
            document.getElementById("loginContainer").style.display="none";
            document.getElementById("dashboardContainer").style.display="block";
        }, 1000);
    } else {
        msg.innerText = "Incorrect username or password";
        msg.style.background="red"; msg.style.color="white";
    }
}

/* ---------- LOGOUT ---------- */
function logout(){
    document.getElementById("dashboardContainer").style.display="none";
    document.getElementById("loginContainer").style.display="flex";
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    document.getElementById("loginMessage").style.display="none";
}

/* ---------- COLOR CHANGER ---------- */
function changeColor(color){
    document.getElementById("colorBox").style.background=color;
    document.getElementById("colorCode").innerText="Color: "+color;
}
function randomColor(){
    let rand="#"+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("colorBox").style.background=rand;
    document.getElementById("colorCode").innerText="Color: "+rand;
}

/* ---------- SWITCH CALCULATOR ---------- */
const display=document.getElementById("display");
const divBtn=document.getElementById("divBtn");
const modBtn=document.getElementById("modBtn");

let currentInput="";
let firstNumber=null;
let operator=null;

function handleClick(value){
    switch(value){
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
            currentInput+=value;
            display.value=currentInput;
            checkZeroForOperators();
            break;
        case 'add': case 'sub': case 'mul': case 'div': case 'mod':
            if(currentInput===""){display.value="❗ Enter a number first"; break;}
            firstNumber=Number(currentInput);
            operator=value;
            currentInput="";
            checkZeroForOperators();
            break;
        case '=':
            if(currentInput===""||operator===null){display.value="❗ Enter both numbers"; break;}
            let secondNumber=Number(currentInput);
            let result;
            switch(operator){
                case 'add': result=firstNumber+secondNumber; break;
                case 'sub': result=firstNumber-secondNumber; break;
                case 'mul': result=firstNumber*secondNumber; break;
                case 'div': result=secondNumber===0?"❗ Cannot divide by 0":firstNumber/secondNumber; break;
                case 'mod': result=secondNumber===0?"❗ Cannot modulus by 0":firstNumber%secondNumber; break;
            }
            display.value=result;
            currentInput=result.toString();
            firstNumber=null; operator=null;
            checkZeroForOperators();
            break;
        case 'C':
            currentInput=""; firstNumber=null; operator=null; display.value="";
            checkZeroForOperators();
            break;
        default: display.value="Invalid input";
    }
}
function checkZeroForOperators(){
    let disable=currentInput==="0"&&operator!==null;
    divBtn.disabled=disable; modBtn.disabled=disable;
}