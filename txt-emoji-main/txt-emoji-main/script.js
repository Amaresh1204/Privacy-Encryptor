const text = document.querySelector("#textmsg");
const password = document.querySelector("#password");
const result = document.querySelector("#result");
var clutter = "";
var parinam = "";

function encryption() {
  document.querySelector("#encrypt-btn").addEventListener("click", function () {
    // get the password
    var pass = document.getElementById("password").value;
    console.log(pass);

    // get the input
    var input = document.getElementById("textmsg").value;
    console.log(input);

    // converting it into a set of emojis
    var str = input.split("");
    str.forEach((element) => {
      clutter += `&#128${element.charCodeAt()} `;
    });

    // showing result
    document.querySelector("#result").innerHTML = clutter;

    // saving emojis in localstorage
    var dataarr = [];
    if (JSON.parse(localStorage.getItem("data1"))) {
      dataarr = JSON.parse(localStorage.getItem("data1"));
      dataarr.push({ pass: pass, input: input, clutter: clutter });
    } else {
      dataarr = [{ pass: pass, input: input, clutter: clutter }];
    }
    localStorage.setItem(`data1`, JSON.stringify(dataarr));
  });
}

function decryption() {
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    var clutter2 = "";
    var input2 = document.querySelector("#emojimsg").value;
    var finalPass = document.querySelector("#finalpassword").value;
    var user = JSON.parse(localStorage.getItem("data1"));

    var str2 = input2.split(" ");
    str2.forEach((element) => {
      clutter2 += `&#${element.codePointAt(0)} `;
    });

    var found;
    for (let i of user) {
      if (i.clutter === clutter2 && i.pass === finalPass) {
        found = i;
        break;
      }
    }

    if (found) {
      document.querySelector("#result").style.display = "block";
      document.querySelector("#result").style.color = "#eee";
      document.querySelector("#result").innerHTML = found.input;
    } else {
      document.querySelector("#result").style.display = "block";
      document.querySelector("#result").style.color = "red";
      document.querySelector("#result").innerHTML =
        "Wrong password or input!";
    }
  });
}

function btnClicking() {
  document.querySelector("button").addEventListener("click", function () {
    document.querySelector("#result").style.display = "block";
  });

  document.querySelector("#dec-btn").addEventListener("click", function () {
    document.querySelector("#result").style.display = "none";
    document.querySelector("#decryption").style.display = "block";
    document.querySelector("#encryption").style.display = "none";
    document.querySelector("#dec-btn").style.backgroundColor = "#333";
    document.querySelector("#enc-btn").style.backgroundColor = "#222";
    document.querySelector("#main>h1 span img").style.rotate = "270deg";
  });

  document.querySelector("#enc-btn").addEventListener("click", function () {
    document.querySelector("#decryption").style.display = "none";
    document.querySelector("#result").style.display = "none";
    document.querySelector("#encryption").style.display = "block";
    document.querySelector("#dec-btn").style.backgroundColor = "#222";
    document.querySelector("#enc-btn").style.backgroundColor = "#333";
    document.querySelector("#main>h1 span img").style.rotate = "90deg";
  });
}

encryption();
decryption();
btnClicking();
