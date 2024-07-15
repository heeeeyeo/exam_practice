// javascript 작성
function calculateScore(elementId) {
    const element = document.querySelector("#" + elementId);
    const result = element.value * 5;

    const regex = /[^0-9]/g;
    const childElementId = "subject" + elementId.replace(regex, "");
    document.getElementById(childElementId).innerHTML = `${result}`;
}
function showResult() {
    document.getElementById('footer').style.display = "block";
    const matches = document.getElementsByClassName("d");
    var sum = 0;
    var count = 0;
    for (var i = 0; i < matches.length; i++) {
        let num = parseInt(matches[i].innerHTML)
        sum += num;
        if (num < 40) {
            count++;
        }
    }
    var average = sum / matches.length;

    document.getElementById('resultBox').innerHTML = `<ul><li>평균${average}</li><li>과락된 과목 수${count}</li></ul>`;
}