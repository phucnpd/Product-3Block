function welcome() {
    return new Promise((resolve, reject) => {
        const accesstoken = localStorage.getItem("accesstoken");
        fetch("https://admin3blockserver.herokuapp.com/welcome", {
            method: "GET",
            headers: { "x-access-token": accesstoken },
        })
            .then((res) => {
                const checkTokenValid = res.ok;
                // console.log(checkTokenValid);
                if (checkTokenValid) {
                    resolve(true);
                } else {
                    resolve(false);
                    refreshtoken();
                }
            })
            .catch((err) => {
                refreshtoken();
            });
    });
}

function refreshtoken() {
    var refreshtoken = localStorage.getItem("refreshtoken");
    fetch("https://admin3blockserver.herokuapp.com/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: refreshtoken,
        }),
    })
        .then((data) => {
            localStorage.setItem("accesstoken", data.accesstoken);
        })
        .catch(function (err) {
            console.log(err);
        });
}

//Black
function getBlack() {
    document
        .getElementById("RefreshButton")
        .setAttribute("class", "fa fa-spinner fa-pulse fa-3x fa-fw");
    fetch(
        "https://admin3blockapi.herokuapp.com/db/api/system/3block/getAllBlackPublic",
        {
            method: "GET",
        }
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temp = 0;
            for (var i of data) {
                i.stt = temp++;
            }
            localStorage.setItem("blacklist", JSON.stringify(data));
            window.location.pathname = "./BlackList/";
            document
                .getElementById("RefreshButton")
                .setAttribute("class", "fa fa-refresh fa-spin fa-3x fa-fw");
        })
        .catch(() => {
            window.location.reload();
        });
}
//White
function getWhite() {
    document
        .getElementById("RefreshButton")
        .setAttribute("class", "fa fa-spinner fa-pulse fa-3x fa-fw");
    const accesstoken = localStorage.getItem("accesstoken");
    //White
    fetch(
        "https://admin3blockapi.herokuapp.com/db/api/system/3block/getAllWhitePublic",
        // "http://localhost:3000/whitelist/getAllWhitePublic",
        {
            method: "GET",
            // headers: { "x-access-token": accesstoken },
        }
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temp = 0;
            for (var i of data) {
                i.stt = temp++;
            }
            localStorage.setItem("whitelist", JSON.stringify(data));
            window.location.pathname = "./WhiteList/";
            document
                .getElementById("RefreshButton")
                .setAttribute("class", "fa fa-refresh fa-spin fa-3x fa-fw");
        })
        .then(() => {
            console.log("reload");
            //
        })
        .catch((err) => {
            window.location.reload();
            console.log("Lỗi");
        });
}
//Gray
function getGray() {
    document
        .getElementById("RefreshButton")
        .setAttribute("class", "fa fa-spinner fa-pulse fa-3x fa-fw");
    fetch(
        "https://admin3blockapi.herokuapp.com/user/gray/system/3block/getAll",
        {
            method: "GET",
        }
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temp = 0;
            for (var i of data) {
                i.stt = temp++;
            }
            localStorage.setItem("graylist", JSON.stringify(data));
            window.location.pathname = "../../GrayList";
            document
                .getElementById("RefreshButton")
                .setAttribute("class", "fa fa-refresh fa-spin fa-3x fa-fw");
        })
        .catch(() => {
            window.location.reload();
        });
}

function redirecBlack() {
    window.location.pathname = "../../BlackList/";
}
function redirecWhite() {
    window.location.pathname = "../../WhiteList/";
}
function redirecGray() {
    window.location.pathname = "../../GrayList";
}
function redirecPlus18() {
    window.location.pathname = "../../18+NotFound";
}
function redirecLocal18() {
    window.location.pathname = "../../Cache18";
}
function redirecMess() {
    window.location.pathname = "../../Messages";
}
function mainpage() {
    window.location.pathname = "../../MainPage/";
}

function logout() {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("_grecaptcha");
    window.location.pathname = "../";
}
/// alo 1 2 3 4 khác nè má ơi
