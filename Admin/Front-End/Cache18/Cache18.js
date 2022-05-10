var state = {
    page: 1,
    window: 5,
};
var PAGE_SIZE = 20;
//Get all URL

/*------------------------------------------------GrayList------------------------------------------------*/

function show(number) {
    state.page = number;
    document
        .getElementById("RefreshButton")
        .setAttribute("class", "fa fa-spinner fa-pulse fa-3x fa-fw");
    fetch("https://admin3blockapi.herokuapp.com/api/3block/system/getCache18", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            const start = (number - 1) * PAGE_SIZE;
            const end = number * PAGE_SIZE;
            appendData(data.slice(start, end), data.length);
            pageButton(Math.ceil(data.length / PAGE_SIZE));
            document
                .getElementById("page" + number)
                .setAttribute("class", "page-item active");
            var SearchURL = [];
            data.forEach((t) => {
                SearchURL.push(t.url);
            });
            autocomplete(document.getElementById("searching"), SearchURL);
            document
                .getElementById("page" + number)
                .setAttribute("class", "page-item active");
            document
                .getElementById("RefreshButton")
                .setAttribute("class", "fa fa-refresh fa-spin fa-3x fa-fw");
        })
        .catch(function (err) {
            // window.location.reload();
        });
}
function nextPage() {
    state.page++;
    show(state.page);
}
function prePage() {
    state.page--;
    show(state.page);
}
//Show URL
function appendData(data, length) {
    let text =
        "<table class='container'>" +
        "<thead><tr><th><h1>No.</h1><th><h1>URL</h1></th><th><h1>CreatedAt</h1></th>" +
        "<th><h1>UpdatedAt</h1></th></tr></thead>" +
        "<tbody><tr>";
    for (var i = 0; i < data.length; i++) {
        text +=
            "<td>" +
            ((state.page - 1) * PAGE_SIZE + i + 1) +
            "</td>" +
            "<td><a>" +
            data[i].url +
            "</a></td>";
        var timeCreate = new Date(data[i].createdAt);
        text += "<td>" + timeCreate.toLocaleString() + "</td>";
        var timeUpdate = new Date(data[i].updatedAt);
        text += "<td>" + timeUpdate.toLocaleString() + "</td></tr>";
        // + "<td>" + data[i].createAt + "</td>"
    }
    text += "</tbody></table>";
    //There is at least 1 URL
    if (data.length > 0 && state.page >= 1) {
        document.getElementById("RenderData").innerHTML = text;
        document.getElementById("Total").innerHTML = length;
        document.getElementById("Render").innerHTML = data.length;
    }
    //No Data
    else if (data.length < 1 && state.page == 1) {
        document.getElementById("RenderData").innerHTML =
            "<img src='NoData.png' style='border-radius: 8px; width: 25%; display: block;margin-left: auto;margin-right: auto;'>";
        document.getElementById("Total").innerHTML = 0;
        document.getElementById("Render").innerHTML = 0;
    }
    //All URLs on the current page has been deleted
    else if (data.length < 1 && state.page > 1) {
        //Redirect to previous page
        show(state.page - 1);
    }
}
//Page Button
function pageButton(pages) {
    total = pages;
    var wrapper = document.getElementById("pagination-wrapper");
    wrapper.innerHTML = "";

    var maxLeft = state.page - Math.floor(state.window / 2);
    var maxRight = state.page + Math.floor(state.window / 2);
    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.window;
    }
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1);

        if (maxLeft < 1) {
            maxLeft = 1;
        }
        maxRight = pages;
    }
    if (state.page != 1) {
        wrapper.innerHTML +=
            '<li class="page-item"><a class="page-link" href="#" onclick="show(1)">First</a></li>';
        wrapper.innerHTML +=
            '<li class="page-item"><a class="page-link" href="#" onclick="prePage()">Previous</a></li>';
    }

    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML +=
            "<li id=page" +
            page +
            ' class="page-item"><a class="page-link" href="#" onclick="show(' +
            page +
            ')">' +
            page +
            "</a></li>";
    }

    if (state.page != pages) {
        wrapper.innerHTML +=
            '<li class="page-item"><a class="page-link" href="#" onclick="nextPage()">Next</a></li>';
        wrapper.innerHTML +=
            '<li class="page-item"><a class="page-link" href="#" onclick="show(' +
            pages +
            ')">Last</a></li>';
    }
}

/*------------------------------------------------Search------------------------------------------------*/

// Search URL with keyword
function searchurl(number) {
    keyword = document.getElementById("searching").value;
    state.page = number;
    // document.getElementById('RefreshButton').setAttribute("class", "fa fa-spinner fa-pulse fa-3x fa-fw")
    fetch("https://admin3blockapi.herokuapp.com/api/3block/system/getCache18", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            var URLFilter = [];
            if (data) {
                data.forEach((t) => {
                    if (t.url.includes(keyword)) {
                        URLFilter.push(t);
                    }
                });
                if (URLFilter.length > 0) {
                    const start = (number - 1) * PAGE_SIZE;
                    const end = number * PAGE_SIZE;
                    appendDataSearch(
                        URLFilter.slice(start, end),
                        URLFilter.length
                    );
                    pageButtonSearch(Math.ceil(URLFilter.length / PAGE_SIZE));
                    document
                        .getElementById("page" + number)
                        .setAttribute("class", "page-item active");
                } else {
                    document.getElementById("RenderData").innerHTML =
                        "<img src='NoData.png' style='border-radius: 8px; width: 25%;  display: block;margin-left: auto;margin-right: auto;'>";
                    document.getElementById("Total").innerHTML = 0;
                    document.getElementById("Render").innerHTML = 0;
                }
            }
        })
        .catch(function (err) {
            // window.location.reload();
        });
}
function nextPageSearch() {
    state.page++;
    searchurl(state.page);
}
function prePageSearch() {
    state.page--;
    searchurl(state.page);
}
function appendDataSearch(data, length) {
    let text =
        "<table class='container'>" +
        "<thead><tr><th><h1>No.</h1><th><h1>URL</h1></th><th><h1>CreatedAt</h1></th>" +
        "<th><h1>UpdatedAt</h1></th></tr></thead>" +
        "<tbody><tr>";
    for (var i = 0; i < data.length; i++) {
        text +=
            "<td>" +
            ((state.page - 1) * PAGE_SIZE + i + 1) +
            "</td>" +
            "<td><a>" +
            data[i].url +
            "</a></td>";
        var timeCreate = new Date(data[i].createdAt);
        text += "<td>" + timeCreate.toLocaleString() + "</td>";
        var timeUpdate = new Date(data[i].updatedAt);
        text += "<td>" + timeUpdate.toLocaleString() + "</td></tr>";
        // + "<td>" + data[i].createAt + "</td>"
    }
    text += "</tbody></table>";
    //There is at least 1 URL
    if (data.length > 0 && state.page >= 1) {
        document.getElementById("RenderData").innerHTML = text;
        document.getElementById("Total").innerHTML = length;
        document.getElementById("Render").innerHTML = data.length;
    }
    //No Data
    else if (data.length < 1 && state.page == 1) {
        document.getElementById("RenderData").innerHTML =
            "<img src='NoData.png' style='border-radius: 8px; width: 25%; display: block;margin-left: auto;margin-right: auto;'>";
        document.getElementById("Total").innerHTML = 0;
        document.getElementById("Render").innerHTML = 0;
    }
    //All URLs on the current page has been deleted
    else if (data.length < 1 && state.page > 1) {
        //Redirect to previous page
        show(state.page - 1);
    }
}
//Search
function pageButtonSearch(pages) {
    total = pages;
    var wrapper = document.getElementById("pagination-wrapper");
    wrapper.innerHTML = "";

    var maxLeft = state.page - Math.floor(state.window / 2);
    var maxRight = state.page + Math.floor(state.window / 2);
    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.window;
    }
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1);

        if (maxLeft < 1) {
            maxLeft = 1;
        }
        maxRight = pages;
    }
    if (state.page != 1) {
        wrapper.innerHTML +=
            '<li class="page-item"><a class="page-link" href="#" onclick="searchurl(1)">First</a></li>';
        wrapper.innerHTML +=
            '<li class="page-item"><a class="page-link" href="#" onclick="prePageSearch()">Previous</a></li>';
    }

    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML +=
            "<li id=page" +
            page +
            ' class="page-item"><a class="page-link" href="#" onclick="searchurl(' +
            page +
            ')">' +
            page +
            "</a></li>";
    }

    if (state.page != pages) {
        wrapper.innerHTML +=
            '<li class="page-item"><a class="page-link" href="#" onclick="nextPageSearch()">Next</a></li>';
        wrapper.innerHTML +=
            '<li class="page-item"><a class="page-link" href="#" onclick="searchurl(' +
            pages +
            ')">Last</a></li>';
    }
}

/*--------------------------------------------------API--------------------------------------------------*/

function addURL() {
    var newurl = document.getElementById("newURL").value;
    // document.getElementById("newURL").value = ''
    if (validURL(newurl)) {
        document.getElementById("notification").innerHTML =
            "<a href='#' class='center'>" +
            "<i class='fa fa-cog fa-spin fa-3x fa-fw'" +
            "data-toggle='tooltip')></i>" +
            "<i class='fa fa-cog fa-spin fa-3x fa-fw'" +
            "data-toggle='tooltip')></i>" +
            "<i class='fa fa-cog fa-spin fa-3x fa-fw'" +
            "data-toggle='tooltip')></i></a>";
        newurl = domain(newurl);
        // API Create New URL
        fetch(
            "https://admin3blockapi.herokuapp.com/api/3block/system/postCache18",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: newurl,
                }),
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                $("#addEmployeeModal").modal("hide");
                $(".modal-backdrop").remove();
                document.getElementById("notification").innerHTML = " ";
                document.getElementById("newURL").value = " ";
            })
            .catch(function (err) {
                console.log("error: " + err);
            });
    }
}

/*----------------------------------------------Function----------------------------------------------*/

//Search Real Time
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a,
            b,
            i,
            val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].includes(val)) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML =
                    "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
                searchurl(1);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            searchurl(1);
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
function validURL(str) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
}
function domain(url) {
    var result;
    var match;
    if (
        (match = url.match(
            /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
        ))
    ) {
        result = match[1];
        // if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
        //     result = match[1]
        // }
    }
    return result;
}
function refresh() {
    show(state.page);
}
