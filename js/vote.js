let voteForm = document.getElementById("vote");

let radios = voteForm.elements;

let sendVote = radios[4];

sendVote.onclick = function(){
    for(i = 0; i < radios.length-1; i++){
        if(radios[i].checked){
            ajaxGet("php/vote.php?" + radios[i].name + "=" + radios[i].value, function(res){ alert(res); });
        }
    }
}
