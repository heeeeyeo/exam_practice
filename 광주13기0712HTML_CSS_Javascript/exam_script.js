// javascript 작성
function calculateScore(elementId) {
    const element = document.querySelector("#" + elementId);
    const result = element.value * 5;

    const regex = /[^0-9]/g;        // 숫자가 아닌 모든 글자를 찾는 정규식
    const childElementId = "subject" + elementId.replace(regex, "");
    const childElement = document.getElementById(childElementId);
    if ((regex.test(element.value))) {
        alert("숫자만 입력 가능합니다.");
        element.value = null;
        return false;
    } else if (element.value > 20) {
        alert("각 과목 당 맞은 문제수(0~20)를 입력하세요.");
        element.value = null;
        childElement.style.display = "none";
        return false;
    } else {
        childElement.style.display = "inline";
        childElement.innerHTML = `${result}`;
    }
}

function showResult() {
    const matches = document.getElementsByClassName("d");
    var sum = 0;
    var count = 0;
    for (var i = 0; i < matches.length; i++) {
        let num = parseInt(matches[i].innerHTML)
        if (isNaN(num)) {
            alert("각 과목 당 맞은 문제수(0~20)를 입력하세요.");
            return false;
        }
        sum += num;
        if (num < 40) {
            count++;
        }
    }
    var average = sum / matches.length;
    var result = "";
    if (average < 60 || count > 0) {
        result = "불합격";
    } else {
        result = "합격";
    }
    document.getElementById('footer').style.display = "block";
    document.getElementById('result-info').innerHTML = `<ul><li>평균: ${average}</li><li>과락된 과목 수: ${count}</li></ul>`;
    document.getElementById('result-label').innerHTML = `<strong>${result}</strong>`;
}