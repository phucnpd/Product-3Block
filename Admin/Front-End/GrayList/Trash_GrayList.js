var state = {
    page: 1, //Start & Current Page
    window: 5,
};
var PAGE_SIZE = 20; //number of URLs per page

//Show Trash GrayList URL
function show(number) {
    state.page = number; //Current Page
    //GET data from localstorage
    var GrayListTrash = JSON.parse(localStorage.getItem("trash"));
    if (GrayListTrash == null) {
        refresh();
        show(state.page);
    } else {
        //Start URL and end URL of current page
        const start = (number - 1) * PAGE_SIZE; //0,20,40,60,...
        const end = number * PAGE_SIZE; //19,39,59,79,...
        //No Data
        if (GrayListTrash.length < 1) {
            document.getElementById("RenderData").innerHTML =
                "<img class='center' src='../../MainPage/images/NoData.png'" +
                " style='border-radius: 8px; width: 25%; display: block;margin-left: auto;" +
                " margin-right: auto;'>";
            document.getElementById("Total").innerHTML = 0;
            document.getElementById("Render").innerHTML = 0;
        } else {
            //Set 20 URLs to render
            appendData(GrayListTrash.slice(start, end), GrayListTrash.length);
            //Calculate the maximum number of pages
            pageButton(Math.ceil(GrayListTrash.length / PAGE_SIZE));
            //Bold current page
            document
                .getElementById("page" + state.page)
                .setAttribute("class", "page-item active");
        }
        //Array containing all URL for Real Time Search
        var urlfilterrealtime = [];
        GrayListTrash.forEach((t) => {
            urlfilterrealtime.push(t.url);
            //URL only
        });
        //Real Time Search Function
        autocomplete(document.getElementById("searching"), urlfilterrealtime);
    }
}
//Button go to next page
function nextPage() {
    state.page++;
    show(state.page);
}
//Button go to previous page
function prePage() {
    state.page--;
    show(state.page);
}
function appendData(data, length) {
    let text =
        "<table class='container'>" +
        "<thead><tr><th><h1>No.</h1></th><th><h1>URL</h1></th><th><h1>Level</h1></th>" +
        "<th><h1 style='margin-left: 11em'>Title</h1></th><th><h1>User</h1></th><th><h1>isCheck</h1></th>" +
        "<th><h1>Action</h1></th></tr></thead>" +
        "<tbody><tr>";
    for (var i = 0; i < data.length; i++) {
        text +=
            "<td>" +
            ((state.page - 1) * PAGE_SIZE + i + 1) +
            "</td>" +
            "<td><a href=#>" +
            data[i].url +
            "</a></td>";
        if (data[i].level == "low") {
            text += "<td><span class='badge badge-success'>";
        } else if (data[i].level == "medium") {
            text += "<td><span class='badge badge-warning'>";
        } else if (data[i].level == "high") {
            text += "<td><span class='badge badge-danger'>";
        } else {
            text += "<td><span class='badge badge-light'>";
        }
        text +=
            data[i].level +
            "</span></td><td>" +
            data[i].title +
            "</td><td><a href='#'>" +
            data[i].user;
        if (data[i].isCheck == "none") {
            text +=
                "</a></td><td><form><i class='fa fa-check-square-o'></i><input type='radio' id='yes' name='isCheck'" +
                " value='Yes' onclick=editYES('" +
                data[i].url +
                "') disabled>" +
                "<label for='" +
                data[i]._id +
                "yes'>Yes</label><br>" +
                "<i class='fa fa-window-close-o'></i></i><input type='radio' id='no' name='isCheck'" +
                "value='No'onclick=editNo('" +
                data[i].url +
                "') disabled>" +
                "<label for='" +
                data[i]._id +
                "no'>No</label></form></td>";
        } else if (data[i].isCheck == "true") {
            text +=
                "</a></td><td><form><i class='fa fa-check-square-o'></i><input type='radio' id='yes' name='isCheck'" +
                " value='Yes' onclick=editYES('" +
                data[i].url +
                "') checked disabled>" +
                "<label for='" +
                data[i]._id +
                "yes'>Yes</label><br>" +
                "<i class='fa fa-window-close-o'></i></i><input type='radio' id='no' name='isCheck'" +
                "value='No'onclick=editNo('" +
                data[i].url +
                "') disabled>" +
                "<label for='" +
                data[i]._id +
                "no'>No</label></form></td>";
        } else {
            text +=
                "</a></td><td><form><i class='fa fa-check-square-o'></i><input type='radio' id='yes' name='isCheck'" +
                " value='Yes' onclick=editYES('" +
                data[i].url +
                "') disabled>" +
                "<label for='" +
                data[i]._id +
                "yes'>Yes</label><br>" +
                "<i class='fa fa-window-close-o'></i></i><input type='radio' id='no' name='isCheck'" +
                "value='No'onclick=editNo('" +
                data[i].url +
                "') checked disabled>" +
                "<label for='" +
                data[i]._id +
                "no'>No</label></form></td>";
        }
        text +=
            "<td><a href='#' class='edit' data-toggle='modal'>" +
            "<i class='material-icons' data-toggle='tooltip' title='Restore' onclick=findnumber('" +
            data[i].url +
            "','" +
            data[i].stt +
            "','" +
            data[i]._id +
            "','1')>&#xE8B3;</i></a><a href='#' class='edit' data-toggle='modal'>" +
            "<i class='material-icons' data-toggle='tooltip' title='Restore' onclick=confirmdelete('" +
            data[i].url +
            "','" +
            data[i].stt +
            "','" +
            data[i]._id +
            "')>&#xE872;</i></a></td></tr>";
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
            "<img class='center' src='../main/assets/NoData.png' style='border-radius: 8px; width: 25%;'>";
        document.getElementById("Total").innerHTML = 0;
        document.getElementById("Render").innerHTML = 0;
    }
    //All URLs on the current page has been deleted
    else if (data.length < 1 && state.page > 1) {
        //Redirect to previous page
        show(state.page - 1);
    }
}
//Button for Trash GrayList
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
//Find URL location on localstorage
function findnumber(URLEDIT, STT, ID, index) {
    //GET data from localstorage
    var pageGrayList = JSON.parse(localStorage.getItem("trash"));
    for (var i = STT; i >= 0; i--) {
        if (pageGrayList[i] != null) {
            //Matching URL
            if (pageGrayList[i].url == URLEDIT && pageGrayList[i]._id == ID) {
                //GET data from localstorage
                var GrayListTrash = JSON.parse(localStorage.getItem("trash"));
                //Remove the corresponding URL in object
                GrayListTrash.splice(i, 1);
                //Upload to localstorage
                localStorage.setItem("trash", JSON.stringify(GrayListTrash));
                break;
            }
        }
    }
    if (index == 1) {
        restore(URLEDIT);
    } else {
        destroy(URLEDIT);
    }
    show(state.page);
}
//Confirm real delete
function confirmdelete(URLDES, STT, ID) {
    var result = confirm("Are you sure to delete?");
    if (result) {
        findnumber(URLDES, STT, ID, 2);
    }
}

//Search URL with keyword
function searchurl(number) {
    state.page = number;
    //User input keyword
    keyword = document.getElementById("searching").value;
    //GET data from localstorage
    var GrayListTrash = JSON.parse(localStorage.getItem("trash"));
    if (GrayListTrash == null) {
        refresh();
        show(state.page);
    } else {
        //Array containing URLs that match keywords
        var urlfilter = [];
        //If there is data on Localstorage
        if (GrayListTrash) {
            //Find URLs that match keywords
            GrayListTrash.forEach((t) => {
                if (t.url.includes(keyword)) {
                    urlfilter.push(t); //URL match
                }
            });
            //There is at least 1 matching URL
            if (urlfilter.length > 0) {
                //Start URL and end URL of current page (Search)
                const start = (number - 1) * PAGE_SIZE;
                const end = number * PAGE_SIZE;
                //Set 20 URLs to render (Search)
                appendDataSearch(urlfilter.slice(start, end), urlfilter.length);
                //Calculate the maximum number of pages (Search)
                pageButtonSearch(Math.ceil(urlfilter.length / PAGE_SIZE));
                //Bold current page
                document
                    .getElementById("page" + state.page)
                    .setAttribute("class", "page-item active");
            }
            //No matching URLs
            else {
                //Render "No Data"
                document.getElementById("RenderData").innerHTML =
                    "<img class='center' src='../../MainPage/images/NoData.png'" +
                    " style='border-radius: 8px; width: 25%; display: block;margin-left: auto;" +
                    " margin-right: auto;'>";
                document.getElementById("Total").innerHTML = 0;
                document.getElementById("Render").innerHTML = 0;
            }
        }
    }
}
//Button go to next page (Search)
function nextPageSearch() {
    state.page++;
    searchurl(state.page);
}
//Button go to previous page (Search)
function prePageSearch() {
    state.page--;
    searchurl(state.page);
}
//Show URL delete (Search)
function appendDataSearch(data, length) {
    let text =
        "<table class='container'>" +
        "<thead><tr><th><h1>No.</h1></th><th><h1>URL</h1></th><th><h1>Level</h1></th>" +
        "<th><h1 style='margin-left: 11em'>Title</h1></th><th><h1>User</h1></th><th><h1>isCheck</h1></th>" +
        "<th><h1>Action</h1></th></tr></thead>" +
        "<tbody><tr>";
    for (var i = 0; i < data.length; i++) {
        text +=
            "<td>" +
            ((state.page - 1) * PAGE_SIZE + i + 1) +
            "</td>" +
            "<td><a href=#>" +
            data[i].url +
            "</a></td>";
        if (data[i].level == "low") {
            text += "<td><span class='badge badge-success'>";
        } else if (data[i].level == "medium") {
            text += "<td><span class='badge badge-warning'>";
        } else if (data[i].level == "high") {
            text += "<td><span class='badge badge-danger'>";
        } else {
            text += "<td><span class='badge badge-light'>";
        }
        text +=
            data[i].level +
            "</span></td><td>" +
            data[i].title +
            "</td><td><a href='#'>" +
            data[i].user;
        if (data[i].isCheck == "none") {
            text +=
                "</a></td><td><form><i class='fa fa-check-square-o'></i><input type='radio' id='yes' name='isCheck'" +
                " value='Yes' onclick=editYES('" +
                data[i].url +
                "') disabled>" +
                "<label for='" +
                data[i]._id +
                "yes'>Yes</label><br>" +
                "<i class='fa fa-window-close-o'></i></i><input type='radio' id='no' name='isCheck'" +
                "value='No'onclick=editNo('" +
                data[i].url +
                "') disabled>" +
                "<label for='" +
                data[i]._id +
                "no'>No</label></form></td>";
        } else if (data[i].isCheck == "true") {
            text +=
                "</a></td><td><form><i class='fa fa-check-square-o'></i><input type='radio' id='yes' name='isCheck'" +
                " value='Yes' onclick=editYES('" +
                data[i].url +
                "') checked disabled>" +
                "<label for='" +
                data[i]._id +
                "yes'>Yes</label><br>" +
                "<i class='fa fa-window-close-o'></i></i><input type='radio' id='no' name='isCheck'" +
                "value='No'onclick=editNo('" +
                data[i].url +
                "') disabled>" +
                "<label for='" +
                data[i]._id +
                "no'>No</label></form></td>";
        } else {
            text +=
                "</a></td><td><form><i class='fa fa-check-square-o'></i><input type='radio' id='yes' name='isCheck'" +
                " value='Yes' onclick=editYES('" +
                data[i].url +
                "') disabled>" +
                "<label for='" +
                data[i]._id +
                "yes'>Yes</label><br>" +
                "<i class='fa fa-window-close-o'></i></i><input type='radio' id='no' name='isCheck'" +
                "value='No'onclick=editNo('" +
                data[i].url +
                "') checked disabled>" +
                "<label for='" +
                data[i]._id +
                "no'>No</label></form></td>";
        }
        text +=
            "<td><a href='#' class='edit' data-toggle='modal'>" +
            "<i class='material-icons' data-toggle='tooltip' title='Restore' onclick=findnumberSearch('" +
            data[i].url +
            "','" +
            data[i].stt +
            "','" +
            data[i]._id +
            "','1')>&#xE8B3;</i></a><a href='#' class='edit' data-toggle='modal'>" +
            "<i class='material-icons' data-toggle='tooltip' title='Restore' onclick=confirmdeleteSearch('" +
            data[i].url +
            "','" +
            data[i].stt +
            "','" +
            data[i]._id +
            "')>&#xE872;</i></a></td></tr>";
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
            "<img class='center' src='../main/assets/NoData.png' style='border-radius: 8px; width: 25%;'>";
        document.getElementById("Total").innerHTML = 0;
        document.getElementById("Render").innerHTML = 0;
    }
    //All URLs on the current page has been deleted
    else if (data.length < 1 && state.page > 1) {
        //Redirect to previous page
        show(state.page - 1);
    }
}
//Button for Trash GrayList
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
//Find URL location on localstorage
function findnumberSearch(URLEDIT, STT, ID, index) {
    //GET data from localstorage
    var pageGrayList = JSON.parse(localStorage.getItem("trash"));
    for (var i = STT; i >= 0; i--) {
        if (pageGrayList[i] != null) {
            //Matching URL
            if (pageGrayList[i].url == URLEDIT && pageGrayList[i]._id == ID) {
                //GET data from localstorage
                var GrayListTrash = JSON.parse(localStorage.getItem("trash"));
                //Remove the corresponding URL in object
                GrayListTrash.splice(i, 1);
                //Upload to localstorage
                localStorage.setItem("trash", JSON.stringify(GrayListTrash));
                break;
            }
        }
    }
    if (index == 1) {
        restore(URLEDIT);
    } else {
        destroy(URLEDIT);
    }
    searchurl(state.page);
}
//Confirm real delete
function confirmdeleteSearch(URLDES, STT, ID) {
    var result = confirm("Are you sure to delete?");
    if (result) {
        findnumber(URLDES, STT, ID, 2);
    }
}

//Real Delete
function destroy(urldestroy) {
    //API Real Delete
    fetch(
        "https://admin3blockapi.herokuapp.com/user/gray/system/3block/realDeleteGray",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("accesstoken"),
            },
            body: JSON.stringify({
                url: urldestroy,
            }),
        }
    ).catch(function (err) {
        console.log("error: " + err);
    });
}
// Restore URL
function restore(urlrestore) {
    //API Restore
    fetch(
        "https://admin3blockapi.herokuapp.com/user/gray/system/3block/restoreGray",
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("accesstoken"),
            },
            body: JSON.stringify({
                url: urlrestore,
            }),
        }
    ).catch(function (err) {
        console.log("error: " + err);
    });
}

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
            if (
                arr[i].substr(0, val.length).toUpperCase() ==
                    val.toUpperCase() ||
                arr[i].substr(7, val.length).toUpperCase() == val.toUpperCase()
            ) {
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
function refresh() {
    document
        .getElementById("RefreshButton")
        .setAttribute("class", "fa fa-spinner fa-pulse fa-3x fa-fw");
    //API Trash GrayList
    fetch(
        "https://admin3blockapi.herokuapp.com/user/gray/system/3block/getGrayTrash",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("accesstoken"),
            },
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
            // Upload to localstorage
            localStorage.setItem("trash", JSON.stringify(data));
            document
                .getElementById("RefreshButton")
                .setAttribute("class", "fa fa-refresh fa-spin fa-3x fa-fw");
            //Render
            show(1);
        })
        .catch(function (err) {
            console.log("error: " + err);
        });
}
