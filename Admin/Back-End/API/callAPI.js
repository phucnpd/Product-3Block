fetch(
    "https://admin3blockapi.herokuapp.com/db/api/system/3block/createBlackList",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            url: "google.com",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibG9uZ25tIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkiLCJpYXQiOjE2NDc4NTgwNzUsImV4cCI6MTY0Nzg1OTg3NX0.tsfpYdSo0ot8tdoZDmuTeRDU-jEvU1XOST3m7ag6Cds",
        }),
    }
)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    });

// fetch(
//     "https://api3blockserver.herokuapp.com/db/api/system/3block/updateBlackList",
//     {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             _id: "61efeb953b1e12646bc046f6",
//             url: "http://google.com/",
//             level: "high",
//             title: "Google",
//             categories: [
//                 "search engines and portals",
//                 "search engines",
//                 "searchengines",
//                 "Search Engines/Portals",
//             ],
//             deleted: false,
//             createdAt: "2022-01-25T12:22:45.893Z",
//             updatedAt: "2022-02-28T13:08:25.464Z",
//             deletedAt: "2022-02-22T13:33:29.829Z",
//         }),
//     }
// )
//     .then((response) => response.json())
//     .then((jsosn) => console.log(jsosn));
// // });
