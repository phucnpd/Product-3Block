document
    .getElementById("my_captcha_form")
    .addEventListener("submit", async function (evt) {
        evt.preventDefault();
        UserName = document.getElementById("UserName").value;
        PassWord = document.getElementById("password-field").value;
        var response = grecaptcha.getResponse();
        if (PassWord.length < 8) {
            document.getElementById("notification").innerHTML =
                "Password must be at least 8 characters";
            return false;
        } else if (response.length == 0 && PassWord.length >= 8) {
            document.getElementById("notification").innerHTML =
                "Please click Google reCAPTCHA";
            return false;
        } else {
            // evt.preventDefault();
            // await authentication(UserName, PassWord);
            fetch("https://admin3blockserver.herokuapp.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: UserName,
                    password: PassWord,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    if (data?.error == "Invalid Credentials") {
                        document.getElementById("notification").innerHTML =
                            "Username or Password Incorrect!!!";
                        localStorage.removeItem("_grecaptcha");
                        grecaptcha.reset();
                        return;
                    }
                    localStorage.setItem("accesstoken", data.accessToken);
                    localStorage.setItem("refreshtoken", data.refreshToken);
                    window.location.pathname = "./MainPage/";
                })
                .catch((err) => {
                    document.getElementById("notification").innerHTML =
                        "Username or Password Incorrect!!!";
                    localStorage.removeItem("_grecaptcha");
                    grecaptcha.reset();
                });
        }
    });
function authentication(UserName, PassWord) {
    fetch("https://admin3blockserver.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: UserName,
            password: PassWord,
        }),
    })
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("accesstoken", data.accessToken);
            localStorage.setItem("refreshtoken", data.refreshToken);
            window.location.pathname = "./MainPage/";
        });
}

//add test
