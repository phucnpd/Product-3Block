function calculatePercent(temp) {
    //todo Lấy thông tin của trang web
    const URLcheck = temp.url;
    const URLcategories = temp.categories;
    const URLtitle = temp.title;

    var listCategories = [];
    for (var i in URLcategories) {
        listCategories.push(URLcategories[i]);
    }

    // const info = { url: URLcheck, categories: listCategories, title: URLtitle };

    temp = temp.last_analysis_results;
    //Lấy tất cả engineName name lưu vào 1 mảng
    var engineName = [];
    for (var k in temp) engineName.push(k);

    //Tạo 1 cái map chứa tất cả cái type quét ra đc
    //{ 'clean' => 1, 'unrated' => 1, 'spam' => 1 }
    const type = new Map();
    for (var k in engineName) {
        type.set(temp[engineName[k]].result, 0);
    }

    //chuyển đổi map thành 1 cái array, với mỗi phần tử là 1 Object có key và value đc map theo cú pháp đã đặt trước
    let array = Array.from(type, ([name, value]) => ({
        name,
        value,
    }));

    //Get result for each engineName
    const value = new Map();
    for (var index in engineName) {
        //Get number of type
        for (let count = 0; count < array.length; count++) {
            //kiểm tra lại object nếu có phần tử nào trùng thì cộng thêm 1
            if (temp[engineName[index]].result == array[count].name) {
                value.set(array[count].name, array[count].value++);
            }
        }
    }
    //console.log(array);suspicious
    let phishingValue = 0,
        maliciousValue = 0,
        suspiciousValue = 0,
        spamValue = 0;
    HighLevel = false;
    for (var childArray in array) {
        const childName = array[childArray].name;

        if (childName == "phishing") {
            phishingValue = array[childArray].value;
        } else if (childName == "malicious") {
            maliciousValue = array[childArray].value;
        } else if (childName == "spam") {
            spamValue = array[childArray].value;
        } else if (childName == "suspicious") {
            suspiciousValue = array[childArray].value;
        } else if (childName != "clean" && childName != "unrated") {
            HighLevel = true;
        }
    }
    let level = "none";
    if (HighLevel) {
        level = "high";
    } else if (phishingValue + maliciousValue + spamValue == 1) {
        level = "low";
    } else if (phishingValue + maliciousValue + spamValue >= 3) {
        level = "high";
    } else if (phishingValue + maliciousValue + spamValue >= 2) {
        level = "medium";
    } else if (suspiciousValue != 0) {
        level = "low";
    }

    //todo lấy tên engineName của những thằng có lỗ hổng
    var resultEngineName = {};
    // console.log(
    //     Object.keys(resultEngineName).length === 0 &&
    //         resultEngineName.constructor === Object
    // );//todo Nó là {detail} trong finalResult
    for (var engine of engineName) {
        const result = temp[engine].result;
        if (result != "clean" && result != "unrated") {
            resultEngineName[engine] = result;
        }
    }

    var ketqua = {};
    for (let count = 0; count < array.length; count++) {
        const name = array[count].name;
        const value = ((array[count].value / engineName.length) * 100).toFixed(
            2
        );
        ketqua[name] = value;
    }
    var FinalResult = {};
    //url: URLcheck, categories: listCategories, title: URLtitle
    FinalResult.url = URLcheck;
    FinalResult.level = level;
    FinalResult.result = ketqua;
    FinalResult.detail = resultEngineName;
    FinalResult.title = URLtitle;
    FinalResult.categories = listCategories;

    return FinalResult;
}

module.exports = calculatePercent;
