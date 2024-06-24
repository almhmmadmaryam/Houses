let overlay = document.querySelector(".hero.overlay");
let about_hero = document.querySelector(".hero.about");
let capthcaInput = document.querySelector(".captcha .captchaInput");
let captchaUserInput = document.querySelector(".captcha .userInput");
let x = 0;
let y = 0;
let captchaText = null;

window.addEventListener("mousemove", (e) => {
  x = Math.round((e.clientX / window.innerWidth) * 100);
  y = Math.round((e.clientY / window.innerHeight) * 100);
  if (overlay) {
    gsap.to(overlay, {
      "--x": `${x}%`,
      "--y": `${y}%`,
      duration: 0.3,
      ease: "sine.out",
    });
  }
});

let hero_image = document.querySelector(".hero-image");

function showDetails(el) {
  let tr = document.querySelector(`#${el}`);
  if (tr.dataset.details === "true") {
    tr.dataset.details = "false";
    let details = document.querySelectorAll(`.${el}`);
    details.forEach((d) => {
      d.style.display = "none";
    });
  } else {
    tr.dataset.details = "true";
    let details = document.querySelectorAll(`.${el}`);
    details.forEach((d) => {
      d.style.display = "table-row";
    });
  }
}

function generateCaptcha() {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char
  );
  captchaText = changeString.join("   ");
  capthcaInput.value = captchaText;
}

function validateForm(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const nationalID = document.getElementById("nationalID").value;
  const birthDate = document.getElementById("birthDate").value;
  const mobileNumber = document.getElementById("mobileNumber").value;
  const email = document.getElementById("email").value;

  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join("");

  if (!fullName || !nationalID || !birthDate || !mobileNumber || !email) {
    alert("جميع الحقول واجبة الإدخال.");
    return false;
  }

  const nationalIDPattern = /^\d{11}$/;
  if (!nationalIDPattern.test(nationalID)) {
    alert("الرقم الوطني يجب أن يكون مكونًا من 11 رقمًا.");
    return false;
  }

  if (capthcaInput.value == "") {
    return (capthcaInput.style.borderColor = "red");
  }
  console.log(capthcaInput.value, captchaText);
  if (captchaUserInput.value != captchaText) {
    return (capthcaInput.style.borderColor = "#b63c3c");
  }

  capthcaInput.style.borderColor = "lightgray";
  alert("تم تقديم النموذج بنجاح!");
  let inputs = document.querySelectorAll(".form-section input");
  inputs.forEach((input) => {
    input.value = "";
  });
  return true;
}

document
  .getElementById("propertyForm")
  .addEventListener("submit", validateForm);
