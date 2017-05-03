    let inputs = [ document.getElementById('login'), document.getElementById('email'), document.getElementById('password'), document.getElementById('secondPassword') ];
        
    let passWords = [document.getElementById("password"), document.getElementById('secondPassword')];

    let btn = document.getElementById("registration-btn");

    addOnChangeInputEvent(inputs[0]);
    addOnChangeInputEvent(inputs[1]);
    addOnInputEvent(passWords);
    btnEvent(btn,inputs);
    var loginRequestComplite = false;
    var emailRequestComplite = false;
///////////////////////////////////////////


function checkSinglEmpty(inp){  
    if(inp.value.trim() == ""){
        return true;
    }else return false;
}

function redBorder (inp){
    inp.style.boxShadow = "0 0 0 2px rgb(185,74,72)";
}

function greenBorder(inp){
    inp.style.boxShadow = "0 0 0 2px rgb(72,185,112)";
}


function emptyInpAlert(inp){  
    inp.parentElement.dataset.error = "Заполните это поле";
    redBorder(inp);
}

function ocuppiedLoginAlert(inp){
    inp.parentElement.dataset.error = "Этот логин занят";
    redBorder(inp);
}

function ocuppiedEmailAlert(inp){
    inp.parentElement.dataset.error = "Email занят";
    redBorder(inp);
}

function differentInpAlert(inp){
    inp.parentElement.dataset.error = "Разные пароли";
    redBorder(inp);
}

function invalidFormatAlert(inp){
    inp.parentElement.dataset.error = "Неверный формат";
    redBorder(inp);
}

function removeAlert(inp){
    inp.parentElement.dataset.error = "";
}

function allEmptyStatus (inps){
    let isEmpty = true;
    for(let i = 0; i < inps.length; i++){
        if(checkSinglEmpty(inps[i])){
            emptyInpAlert(inps[i]);
            isEmpty = false;
        }else{
            removeAlert(inps[i]);
        }
            
    }
    if(isEmpty == true){
        return true;
    }else return false;
}

function checkDifferent(inpFirst, inpSecond){
    if(inpFirst.value == inpSecond.value){
        return true;
    }else{
        return false;
    } 
}

function differentStatus(inps){
    if(!checkDifferent(inps[0], inps[1])){
        differentInpAlert(inps[0]);
        differentInpAlert(inps[1]);
        return true;
    } else {
        removeAlert(inps[0]);
        removeAlert(inps[1]);
        greenBorder(inps[0]);
        greenBorder(inps[1]);
        return false;
    }
}

function checkLogin(inp, callback){
    let f = callback || function(result){};
    
    ajaxGet("php/checkLogin.php?" + inp.name + "=" + inp.value, function(data){
        if(data == "ocuppied"){
            ocuppiedLoginAlert(inp);
            f( false );
        }else{ 
            removeAlert(inp); 
            greenBorder(inp); 
            f(true); 
        }
    } );
    }

function checkEmail(inp, callback){
    let f = callback || function(result){};
    ajaxGet("php/checkEmail.php?" + inp.name +  "=" + inp.value, function(data){
        if(data == "invalidFormat"){
            invalidFormatAlert(inp);
            f(false);
        }else 
            if(data == "ocuppied"){
                ocuppiedEmailAlert(inp);
                f(false);
            }else{
                removeAlert(inp);
                greenBorder(inp); 
                f(true);
            } 
    });
}

function onInputPasswordEvent(inps){
    if(!checkSinglEmpty(inps[0]) && !checkSinglEmpty(inps[1])){
        return differentStatus(inps);
    }
}

function onChangeInputEvent(inp, callback){
    let f = callback || function(result){};
    
    if(!checkSinglEmpty(inp)){////////////////////////////////////////////////
        if(inp.name == "login"){
            checkLogin(inp, function(result){
                f(result);
            });
        }else 
            if(inp.name == "email"){
                checkEmail(inp, function(result){
                    f(result);
                });
            }
    }
}

function addOnInputEvent(inps){
    inps[1].oninput = function onInputPasswordEvent(){
    if(!checkSinglEmpty(inps[0]) && !checkSinglEmpty(inps[1])){
        return differentStatus(inps);
    }
};
}

function addOnChangeInputEvent(inp){
    inp.onchange = function onChangeInputEvent(){
        if(!checkSinglEmpty(inp)){
            if(inp.name == "login"){
                return checkLogin(inp);
            }else 
                if(inp.name == "email"){
                    return checkEmail(inp);
                }
        } else emptyInpAlert(inp);
    };
}

function btnEvent(btn, inps, callback){
    f = callback || function(data) {};
    
    btn.onclick = function onClickEvent(){
        let passwords = [inps[2], inps[3]];
        let boolka = true;
        if(!allEmptyStatus(inps))
                boolka = false;
        
         if(onInputPasswordEvent(passwords))
                boolka = false;

        
        onChangeInputEvent(inps[0], function(loginStat){
                onChangeInputEvent(inps[1], function(emailStat) {
                        if(loginStat && emailStat && boolka){
                            let params = parseForm(inps);
                            ajaxPost('php/addFormToDataBase.php', params, function(data){ alert(data); });
                        }
                })
        })
    };     
}


function addOnclickEvent(btn, inps){
    btn.onclick = function onClickEvent(){
        let passwords = [inps[2], inps[3]];
        let boolka = true;
        
        btnEvent(inps, function(result){
            alert(result);
            if(!allEmptyStatus(inps))
                boolka = false;
            
            if(onInputPasswordEvent(passwords)){
                boolka = false;
            } 
            
            if(result && boolka){
                let params = parseForm(inps);
                ajaxPost('php/addFormToDataBase.php', params, function(data){
                    alert(data);
                });
            }
        });
    }
};


function ajaxGet(url, callback){
        let f = callback || function (data){};
        let xhr = new XMLHttpRequest();
        
        xhr.onload = function (){
                f(this.responseText);
        }
        xhr.open("GET",url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.send();
    }

    function ajaxPost(url,param ,callback){
        let f = callback || function (data){};
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function (){
            if(this.readyState == '4' && this.status == '200'){
                f(this.responseText);
            }
        }
        xhr.open("POST",url, false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.send(param);
    }
    

    function parseForm (inps){
        let url = "";
        
        for(let i = 0; i < inps.length; i++){
            url += inps[i].name + "=" + encodeURIComponent(inps[i].value) + "&";
        }
        
        url = url.substring(0, url.length-1);
        return url;
    }