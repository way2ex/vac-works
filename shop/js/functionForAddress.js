function isValueExist(select,value){
    var isExist = false;
    var length = select.options.length;
    for(var i = 0; i< length;i++){
        if(value == select.options[i].value){
            isExist = true;
            break;
        }
    }
    return isExist;
}

function trigOnChange(select){
    if(select.fireEvent){
        select.fireEvent("onchange");
    }else{
        select.onchange();
    }
}

// according to the text ,choose an option to select
function selectOption(select,text){
    var state = false;
    var length = select.options.length;
    for(var i = 0;i < length; i++){
        if(select.options[i].text == text){
            select.options[i].selected = true;
            state = true;
            break;
        }
    }
    return state;
}
//the function to confirm the index and value according to text of the option
//index and the value of the option in the same select  are the same
function returnIndexOfText(select,text){
    var length = select.options.length;
    var index = 0;
    for(var i = 0;i < length;i++){
        if(select.options[i].text == text){
            index = i;
            break;
        }
    }
    return index;
}
//the function to insert an array to the select,this operation will remove all the child before
function insertArrayToSelect(select,valueArray){
    var optionsLength = select.options.length;
    for(var j = optionsLength - 1;j >= 0;j--){
        select.options.remove(j);
    }
    var length = valueArray.length;
    for(var i = 0;i < length;i++){
        var optionItem = new Option(valueArray[i],i); //text ,value
        select.options.add(optionItem);
    }
}
//get the checked text of the select
function getCheckedText(select){
    var index = select.selectedIndex;
    var text = select.options[index].text;
    return text;
}
