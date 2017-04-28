//////////////////Полифил ClassList////////////////////////////////

;(function() {
    // helpers
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };

    // class list object with basic methods
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className += ' '+ name;
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className =
                    this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name) {
            return this.contains(name) 
                ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        // bonus..
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };

    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }

    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();

////////////////////Полифил ClassList закончился//////////////////////////////////////


////////////Модальное окно///////////////

let profile = document.querySelector(".menu-and-login-bar .profile");

profile.onclick = function(event) {

    let loginBlock = document.getElementsByClassName("half-transparent")[0];
    loginBlock.style.display = "block"

    loginBlock.onclick = function(event) {
        if(event.target == this || event.target == this.querySelector(".login-title .close-login-block")){
            this.style.display = "none";
        }
    }
};

/////////////////Модальное окно закончилось/////////////////////////////


///////////Режимы модального окна "Забыли пароль" и "Войти на сайт"////////////

let loginEtcWindow = document.getElementById("login-etc-block");

let forms = loginEtcWindow.getElementsByTagName("form");

let buttons = loginEtcWindow.querySelectorAll("form span")

let loginEtcTitle = loginEtcWindow.querySelectorAll(".login-title > span")

let inputReg = document.querySelector(".login-block .registration");
let inputLogin = document.querySelector(".login-block .login");
let inputRest = document.querySelector(".login-block .rest");

loginEtcWindow.onclick = function (event){
    if(event.target.dataset.btnTo == "registration-form"){
        forms[0].classList.add("active-form");
        for(var i = 0; i < inputReg.length; i++)
        inputReg[i].disabled = false;
        forms[1].classList.remove("active-form");
        for(var i = 0; i < inputLogin.length; i++)
        inputLogin[i].disabled = true;
        loginEtcTitle[0].classList.add("active-title");
        loginEtcTitle[1].classList.remove("active-title");
        loginEtcWindow.style.height = loginEtcWindow.offsetHeight + 110 + "px";
        return;
    }
    
    if(event.target.dataset.btnTo == "reset-form"){
        forms[2].classList.add("active-form");
        for(var i = 0; i < inputRest.length; i++)
        inputRest[i].disabled = false;
        forms[1].classList.remove("active-form");
        for(var i = 0; i < inputLogin.length; i++)
        inputLogin[i].disabled = true;
        loginEtcTitle[2].classList.add("active-title");
        loginEtcTitle[1].classList.remove("active-title");
        return;
    }
    
    if(event.target.dataset.btnTo == "login-form"){
        forms[1].classList.add("active-form");
        for(var i = 0; i < inputLogin.length; i++)
        inputLogin[i].disabled = false;
        loginEtcTitle[1].classList.add("active-title");
        loginEtcWindow.style.height = "270px";
        if(event.target.parentElement.classList.contains("rest")){
            forms[2].classList.remove("active-form");
            for(var i = 0; i < inputRest.length; i++)
            inputRest[i].disabled = true;
            loginEtcTitle[2].classList.remove("active-title");
            return;
        }
        forms[0].classList.remove("active-form");
        for(var i = 0; i < inputReg.length; i++)
        inputReg[i].disabled = true;
        loginEtcTitle[0].classList.remove("active-title");
        return;
        
    }
}


///////////////////////////Режимы закончились////////////////////////////////////



