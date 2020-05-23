// shortcut to get elements
var el = function(element){
    if(element.charAt(0)==='#'){// if element is an ID
        return document.querySelector(element); //returns single element
    }

        return document.querySelectorAll(element); //if element is not an ID, return a nodelist. 
}

//variables
var viewer = el('#display'),
    equals = el('#equals'),
    nums = el('.num'),
    ops = el('.ops')
    oldNum = '',
    theNum = '',
    resultNum = '',
    operator = '';

function getNum (){
    if(resultNum){
        theNum = this.getAttribute('data-num');
        resultNum = ''
    }else{
        theNum += this.getAttribute('data-num');
    }

    display.innerHTML = theNum;
}

function moveNum(){
    oldNum = theNum;
    theNum = '';
    operator = this.getAttribute('data-ops');

    equals.setAttribute('data-result', '');
}

function displayNum(){
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    switch (operator) {
        case 'plus':
            resultNum = oldNum + theNum;
            break;

        case 'minus':
            resultNum = oldNum - theNum;
            break;

        case 'multiply':
            resultNum = oldNum * theNum;
            break;

        case 'divide':
            resultNum = oldNum / theNum;
            break;

        default:
            resultNum = theNum;
    }

    if(!isFinite(resultNum)){
        resultNum = 'You broke it'
        el('#container').classList.add("animate__animated", "animate__hinge", "animate__delay-1.5s");
        el('#container').addEventListener('animationend', () => {
            el('#container').classList.add('remove')
            el('#message').classList.remove('remove')
          });
        // el('#reset').classList.add("show");
    }
    viewer.innerHTML = resultNum;
    equals.setAttribute('data-result', resultNum);

    oldNum = 0;
    theNum = resultNum;
};

function clearAll() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

//click events 

for(var i = 0; i< nums.length; i++){
    nums[i].onclick = getNum;
}

for(var i=0; i<ops.length; i++){
    ops[i].onclick = moveNum;
}

equals.onclick = displayNum

el("#clear").onclick = clearAll;
el("#message").onclick = function() {
    window.location = window.location;
  };
