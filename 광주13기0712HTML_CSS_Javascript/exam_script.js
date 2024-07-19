/*
javascript작성 가이드라인 참고
https://github.com/tipjs/javascript-style-guide 한글번역
https://github.com/airbnb/javascript            원문사이트
*/

// javascript 작성
// 1. HTML 문서가 완전히 로드되고 파싱되었을 때 발생.
//      이는 모든 DOM 요소에 안전하게 접근할 수 있게 해준다
document.addEventListener("DOMContentLoaded", function () {
    // 몇 가지 주요 DOM 요소를 변수로 선언
    const inputContainer = document.getElementById("input-container");
    const calculateButton = document.getElementById("calculate");
    const footer = document.getElementById("footer");
    const resultInfo = document.getElementById("result-info");
    const resultLabel = document.getElementById("result-label").firstElementChild;
    const regex = /[^0-9]/g;        // 숫자가 아닌 모든 글자를 찾는 정규식

    // 2. 유효성 검사 함수 생성 validateAndCalculate
    function validateAndCalculate(param) {
        let value = param.value;
        let intValue = parseInt(value);
        if (intValue > 20 || value.length == 0) {
            alert("각 과목 당 맞은 문제수(0~20)를 입력하세요.");
            return false;
        } else if (regex.test(value)) {
            alert("숫자만 입력 가능합니다.")
            return false;
        } else if (isNaN(intValue)) {
            alert("각 과목 당 맞은 문제수(0~20)를 입력하세요.");
            return false;
        }
        return true;
    }

    // 3. 이벤트 위임을 사용하여 inputContainer에 이벤트 리스너를 추가
    inputContainer.addEventListener("keyup", function (event) {
        // 이벤트가 발생한 요소를 찾음
        const targetElementId = event.target.id;
        const element = document.getElementById(targetElementId);
        const childElementId = "subject" + targetElementId.replace(regex, "");
        const childElement = document.getElementById(childElementId);
        if (element.value != '') {
            if (validateAndCalculate(element)) {
                childElement.style.display = "inline";
                childElement.textContent = element.value * 5;
            } else {
                element.value = "";
                childElement.style.display = "none";
            }
        } else {
            childElement.style.display = "none";
        }
    })

    // 4. 최종결과 함수 생성 (버튼에 이벤트 리스너)
    calculateButton.addEventListener("click", function () {
        const scoreElements = document.getElementsByClassName("score-input");
        let sum = 0;
        let count = 0;
        for (let i = 0; i < scoreElements.length; i++) {
            let score = 0;
            let scoreElement = scoreElements[i];
            let validate = validateAndCalculate(scoreElement);

            if (validate) {
                score = parseInt(scoreElement.nextElementSibling.textContent);
                sum += score;
            } else {
                footer.style.display = "none";
                return;
            }
            if (score < 40) { count++ };
        }
        let average = sum / scoreElements.length;
        let result = average < 60 || count > 0 ? '불합격' : '합격';

        resultInfo.getElementsByTagName("li").item(0).textContent = `평균: ${average}`;
        resultInfo.getElementsByTagName("li").item(1).textContent = `과락된 과목 수: ${count}`;
        resultLabel.textContent = result;
        footer.style.display = "block";
    })

});

