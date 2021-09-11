$(function () {
    monthChart = $("#chartjs_month");
    weekChart = $("#chartjs_week");
    yearChart = $("#chartjs_year");
    hourChart = $("#chartjs_hour");
    chooseDay = $("#choose_day");
    subTitle = $("#sub_title");
    // chooseMonth = $("#choose_month");
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let week = d.getWeek(0) - 1;
    let day = d.getDate();
    if(month < 10){
        month = '0' + month;
    }
    if(week < 10){
        week = '0' + week;
    }
    if(day < 10){
        day = '0' + day;
    }

    endDay = year + "-" + month + "-"
    startDay = year + "-" + month + "-01"
    switch (parseInt(month)){
        case 2:
            if(year % 4 == 0){
                endDay += "29";
            }else {
                endDay += "28";
            }
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            endDay += "30";
            break;
        default:
            endDay += "31";
            break;
    }
    startDay += "T00:00:00.000"
    endDay += "T00:00:00.000"

    countCustomerTrans(startDay,endDay);
    countNewCus(startDay,endDay);
    countBillByTime(startDay,endDay);
    sumBillByTime(startDay,endDay);

    // let str = year + "/" + month + "/" + day;
    let str = day + "/" + month + "/" + year;
    chooseDay.val(str);
    subTitle.text("TỔNG HỢP THÁNG " + month);
    clickChooseDay();
    callBieuDoDoanhThuThang(year,month);
    callBieuDoDoanhThuTuan(year,week);
    callBieuDoDoanhThuGioTrongThang(year,month);
    callBieuDoDoanhThuNam(year);
})

var months = ['January','February','March','April','May','June','July',
                    'August','September','October','November','December']

var weeks = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};

function countNewCus(startDay,endDay){
    countNewCustormer(startDay,endDay).then(rs => {
        if(rs.message == 'success'){
            $("#new_custormer").text(rs.data);
        }else {
            alterWarning("Server Error");
        }
    })
}

function countCustomerTrans(startDay,endDay){
    countCustormerTransaction(startDay,endDay).then(rs => {
        if(rs.message == 'success'){
            $("#visitor").text(rs.data);
        }else {
            alterWarning("Server Error");
        }
    })
}

function countBillByTime(startDay,endDay){
    countBill(startDay,endDay).then(rs => {
        if(rs.message == 'success'){
            $("#total_order").text(rs.data);
        }else {
            alterWarning("Server Error");
        }
    })
}

function sumBillByTime(startDay,endDay){
    sumBill(startDay,endDay).then(rs => {
        if(rs.message == 'success'){
            $("#sales").text(rs.data + " VNĐ");
        }else {
            alterWarning("Server Error");
        }
    })
}

function clickChooseDay(){
    chooseDay.change(function (){
        let from = chooseDay.val().split("/");
        let date = new Date(from[2], from[1] - 1, from[0]);
        let year = chooseDay.val().substr(6,4);
        let month = chooseDay.val().substr(3,2);
        let week = date.getWeek(0) - 1;
        subTitle.text("TỔNG HỢP THÁNG " + month);
        callBieuDoDoanhThuTuan(year,week);
        callBieuDoDoanhThuThang(year,month);
        callBieuDoDoanhThuNam(year);
        callBieuDoDoanhThuGioTrongThang(year,month);

        endDay = year + "-" + month + "-"
        startDay = year + "-" + month + "-01"

        switch (parseInt(month)){
            case 2:
                if(year % 4 == 0){
                    endDay += "29";
                }else {
                    endDay += "28";
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                endDay += "30";
                break;
            default:
                endDay += "31";
                break;
        }
        startDay += "T00:00:00.000"
        endDay += "T00:00:00.000"

        countCustomerTrans(startDay,endDay);
        countNewCus(startDay,endDay);
        countBillByTime(startDay,endDay);
        sumBillByTime(startDay,endDay);
    })
}




function callBieuDoDoanhThuThang(year,month){
    bieuDoDoanhThuThang(year,month).then(rs => {
        let label = [];
        if(month === 2){
            if(year % 4 === 0){
                label = ['01','02','03','04','05','06','07','08','09','10',
                    '11','12','13','14','15','16','17','18','19','20',
                    '21','22','23','24','25','26','27','28','29'];
            }else {
                label = ['01','02','03','04','05','06','07','08','09','10',
                    '11','12','13','14','15','16','17','18','19','20',
                    '21','22','23','24','25','26','27','28'];
            }
        }else if (month === 4 || month === 6 || month === 9 || month == 11){
            label = ['01','02','03','04','05','06','07','08','09','10',
                '11','12','13','14','15','16','17','18','19','20',
                '21','22','23','24','25','26','27','28','29','30'];
        }else{
            label = ['01','02','03','04','05','06','07','08','09','10',
                '11','12','13','14','15','16','17','18','19','20',
                '21','22','23','24','25','26','27','28','29','30','31'];
        }
        let revenue = [];
        let lastRevenue = [];
        lastMonth = month;
        lastYear = year;
        if(month > 1){
            lastMonth -= 1;
        }else{
            lastYear -= 1;
            lastMonth = 12;
        }
        if (rs.message === "found") {
            for(i = 0,j = 0; i < label.length; i++){
                if(j === rs.data.length){
                    revenue.push(0);
                }else{
                    let day = rs.data[j].x.substr(8,10);
                    if(label[i] === day){
                        revenue.push(rs.data[j].y);
                        j++;
                    }else {
                        revenue.push(0);
                    }
                }
            }
            bieuDoDoanhThuThang(lastYear,lastMonth).then(rs2 => {
                if(rs2.message == 'found'){
                    for(i = 0, j = 0; i < label.length; i++){
                        if(j === rs2.data.length){
                            lastRevenue.push(0);
                        }else{
                            let day = rs2.data[j].x.substr(8,10);
                            if(label[i] === day){
                                lastRevenue.push(rs2.data[j].y);
                                j++;
                            }else {
                                lastRevenue.push(0);
                            }
                        }
                    }
                }else if(rs2.message == 'not found'){
                    for(i = 0; i < label.length;i++){
                        lastRevenue[i] = 0;
                    }
                }
                let ctx = monthChart.get(0).getContext("2d");
                let myChar = new Chart(ctx, {
                    type : "line",
                    data : {
                        labels : label,
                        datasets : [{
                            label: 'Revenue in current month',
                            data: revenue,
                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 1
                        },{
                            label: 'Revenue in last month',
                            data: lastRevenue,
                            backgroundColor: "rgba(255, 255, 255,0.5)",
                            borderColor: "rgba(240,128,128,0.7)",
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: "Revenue in " + months[month-1],
                        },
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                    }
                });
            })
        }else if(rs.message === "not found"){
            for(i = 0; i < label.length;i++){
                revenue[i] = 0;
            }
            bieuDoDoanhThuThang(lastYear,lastMonth).then(rs2 => {
                if(rs2.message == 'found'){
                    for(i = 0, j = 0; i < label.length; i++){
                        if(j === rs2.data.length){
                            lastRevenue.push(0);
                        }else{
                            let day = rs2.data[j].x.substr(8,10);
                            if(label[i] === day){
                                lastRevenue.push(rs2.data[j].y);
                                j++;
                            }else {
                                lastRevenue.push(0);
                            }
                        }
                    }
                }else if(rs2.message == 'not found'){
                    for(i = 0; i < label.length;i++){
                        lastRevenue[i] = 0;
                    }
                }
                let ctx = monthChart.get(0).getContext("2d");
                let myChar = new Chart(ctx, {
                    type : "line",
                    data : {
                        labels : label,
                        datasets : [{
                            label: 'Revenue',
                            data: revenue,
                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 1
                        },{
                            label: 'Revenue in last month',
                            data: lastRevenue,
                            backgroundColor: "rgba(255, 255, 255,0.5)",
                            borderColor: "rgba(240,128,128,0.7)",
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: "Revenue in " + months[month-1] + " of " + year,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                    }
                });
            })
        }
    })
}

function callBieuDoDoanhThuTuan(year,week){
    bieuDoDoanhThuTuan(year,week).then(rs => {
        console.log("rs : "+JSON.stringify(rs));
        let revenue = [];
        let lastRevenue = [];
        lastYear = year;
        lastWeek = week;
        if(week > 1){
            lastWeek -= 1;
        }else{
            lastYear -= 1;
            lastWeek = 1;
        }
        if(rs.message === "found"){
            for(i = 0,j = 0 ; i < 7; i++){
                if(j === rs.data.length){
                    revenue.push(0);
                }else{
                    if(weeks[i] == rs.data[j].x){
                        revenue.push(rs.data[j].y);
                        j++;
                    }else{
                        revenue.push(0);
                    }
                }
            }
            bieuDoDoanhThuTuan(lastYear,lastWeek).then(rs2 => {
                if(rs2.message == 'found'){
                    for(i = 0,j = 0 ; i < 7; i++){
                        if(j === rs2.data.length){
                            lastRevenue.push(0);
                        }else{
                            if(weeks[i] == rs2.data[j].x){
                                lastRevenue.push(rs2.data[j].y);
                                j++;
                            }else{
                                lastRevenue.push(0);
                            }
                        }
                    }
                }else if(rs2.message == 'not found'){
                    for(i = 0,j = 0 ; i < 7; i++){
                        lastRevenue[i] = 0;
                    }
                }
                let ctx = weekChart.get(0).getContext("2d");
                let myChar = new Chart(ctx, {
                    type : "bar",
                    data : {
                        labels : weeks,
                        datasets : [{
                            label: 'Revenue',
                            data: revenue,
                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)"
                        },{
                            label: 'Revenue in last week',
                            data: lastRevenue,
                            backgroundColor: "rgba(240,128,128,0.5)",
                            borderColor: "rgba(240,128,128,0.7)"
                        }]
                    },
                    options: {
                        barValueSpacing : 20,
                        responsive: true,
                        title: {
                            display: true,
                            text: "Revenue in week " + week + " of " + year,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d'
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d'
                                }
                            }]
                        }
                    }
                });
            })
        }else if(rs.message === "not found"){
            for(i = 0; i < weeks.length;i++){
                revenue[i] = 0;
            }
            bieuDoDoanhThuTuan(lastYear,lastWeek).then(rs2 => {
                if(rs2.message == 'found'){
                    for(i = 0,j = 0 ; i < 7; i++){
                        if(j === rs2.data.length){
                            lastRevenue.push(0);
                        }else{
                            if(weeks[i] == rs2.data[j].x){
                                lastRevenue.push(rs2.data[j].y);
                                j++;
                            }else{
                                lastRevenue.push(0);
                            }
                        }
                    }
                }else if(rs2.message == 'not found'){
                    for(i = 0,j = 0 ; i < 7; i++){
                        lastRevenue[i] = 0;
                    }
                }
                let ctx = weekChart.get(0).getContext("2d");
                let myChar = new Chart(ctx, {
                    type : "bar",
                    data : {
                        labels : weeks,
                        datasets : [{
                            label: 'Revenue',
                            data: revenue,
                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)"
                        },{
                            label: 'Revenue in last week',
                            data: lastRevenue,
                            backgroundColor: "rgba(240,128,128,0.5)",
                            borderColor: "rgba(240,128,128,0.7)"
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: "Revenue in week " + week + " of " + year,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                    }
                });
            })
        }
    })
}

function callBieuDoDoanhThuNam(year){
    bieuDoDoanhThuNam(year).then(rs => {
        let revenue = [];
        let lastRevenue = [];
        let lastYear = year - 1;
        if(rs.message === "found"){
            for(i = 0,j = 0 ; i < 12; i++){
                if(j === rs.data.length){
                    revenue.push(0);
                }else{
                    if(i+1 == rs.data[j].x){
                        revenue.push(rs.data[j].y);
                        j++;
                    }else{
                        revenue.push(0);
                    }
                }
            }
            bieuDoDoanhThuNam(lastYear).then(rs2 => {
                if(rs2.message == 'found'){
                    for(i = 0,j = 0 ; i < 12; i++){
                        if(j === rs2.data.length){
                            lastRevenue.push(0);
                        }else{
                            if(i+1 == rs2.data[j].x){
                                lastRevenue.push(rs2.data[j].y);
                                j++;
                            }else{
                                lastRevenue.push(0);
                            }
                        }
                    }
                }else {
                    for(i = 0; i < 12;i++){
                        lastRevenue[i] = 0;
                    }
                }
                let ctx = yearChart.get(0).getContext("2d");
                let myChar = new Chart(ctx, {
                    type : "bar",
                    data : {
                        labels : months,
                        datasets : [{
                            label: 'Revenue in current year',
                            data: revenue,
                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 1
                        },{
                            label: 'Revenue in last year',
                            data: lastRevenue,
                            backgroundColor: "rgba(240,128,128,0.5)",
                            borderColor: "rgba(240,128,128,0.7)",
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: "Revenue in year " + year,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                    }
                });
            })

        }else if(rs.message === "not found"){
            for(i = 0; i < months.length;i++){
                revenue[i] = 0;
            }
            bieuDoDoanhThuNam(lastYear).then(rs2 => {
                if(rs2.message == 'found'){
                    for(i = 0,j = 0 ; i < 12; i++){
                        if(j === rs2.data.length){
                            lastRevenue.push(0);
                        }else{
                            if(i+1 == rs2.data[j].x){
                                lastRevenue.push(rs2.data[j].y);
                                j++;
                            }else{
                                lastRevenue.push(0);
                            }
                        }
                    }
                }else {
                    for(i = 0; i < 12;i++){
                        lastRevenue[i] = 0;
                    }
                }
                let ctx = yearChart.get(0).getContext("2d");
                let myChar = new Chart(ctx, {
                    type : "bar",
                    data : {
                        labels : months,
                        datasets : [{
                            label: 'Revenue in current year',
                            data: revenue,
                            backgroundColor: "rgba(89, 105, 255,0.5)"
                        },{
                            label: 'Revenue in last year',
                            data: lastRevenue,
                            backgroundColor: "rgba(240,128,128,0.5)"
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: "Revenue in year " + year,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                    }
                });
            })


        }
    })
}

function callBieuDoDoanhThuGioTrongThang(year,month){
    bieuDoDoanhThuGioTrongThang(year,month).then(rs => {
        let revenue = [];
        let lastRevenue = [];
        hours = [];
        for(i = 0; i < 24; i++){
            hours[i] = i;
        }
        lastMonth = month;
        lastYear = year;
        if(month > 1){
            lastMonth -= 1;
        }else{
            lastYear -= 1;
            lastMonth = 12;
        }
        if(rs.message === "found"){
            for(i = 0,j = 0 ; i < 24; i++){
                if(j === rs.data.length){
                    revenue.push(0);
                }else{
                    if(hours[i] == rs.data[j].x){
                        revenue.push(rs.data[j].y);
                        j++;
                    }else{
                        revenue.push(0);
                    }
                }
            }
            bieuDoDoanhThuGioTrongThang(lastYear,lastMonth).then(rs2 => {
                if(rs2.message == 'found'){
                    for(i = 0,j = 0 ; i < 24; i++){
                        if(j === rs2.data.length){
                            lastRevenue.push(0);
                        }else{
                            if(hours[i] == rs2.data[j].x){
                                lastRevenue.push(rs2.data[j].y);
                                j++;
                            }else{
                                lastRevenue.push(0);
                            }
                        }
                    }
                    for(i = 0; i < 10; i++){
                        hours[i] = '0' + hours[i];
                    }
                }else if(rs2.message === "not found"){
                    for(i = 0; i < hours.length; i++){
                        lastRevenue[i] = 0;
                    }
                }
                let ctx = hourChart.get(0).getContext("2d");
                let myChar = new Chart(ctx, {
                    type : "line",
                    data : {
                        labels : hours,
                        datasets : [{
                            label: 'Revenue in current month ',
                            data: revenue,
                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 1
                        },{
                            label: 'Revenue in last month',
                            data: lastRevenue,
                            backgroundColor: "rgba(255, 255, 255,0.5)",
                            borderColor: "rgba(240,128,128,0.7)",
                            borderWidth: 1
                        }]

                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: "Revenue by hour in " + months[month-1] + " of year " + year ,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                    }
                });
            })

        }else if(rs.message === "not found"){
            for(i = 0; i < hours.length;i++){
                revenue[i] = 0;
            }
            bieuDoDoanhThuGioTrongThang(lastYear,lastMonth).then(rs2 => {
                if(rs2.message == 'found'){
                    for(i = 0,j = 0 ; i < 24; i++){
                        if(j === rs2.data.length){
                            lastRevenue.push(0);
                        }else{
                            if(hours[i] == rs2.data[j].x){
                                lastRevenue.push(rs2.data[j].y);
                                j++;
                            }else{
                                lastRevenue.push(0);
                            }
                        }
                    }
                    for(i = 0; i < 10; i++){
                        hours[i] = '0' + hours[i];
                    }
                }else if (rs.message == 'not found'){
                    for(i = 0; i < hours.length;i++){
                        lastRevenue[i] = 0;
                    }
                }
                let ctx = hourChart.get(0).getContext("2d");
                let myChar = new Chart(ctx, {
                    type : "line",
                    data : {
                        labels : hours,
                        datasets : [{
                            label: 'Revenue in current month',
                            data: revenue,
                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 1
                        },{
                            label: 'Revenue in last month',
                            data: lastRevenue,
                            backgroundColor: "rgba(255, 255, 255,0.5)",
                            borderColor: "rgba(240,128,128,0.7)",
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: "Revenue by hour in " + months[month-1] + " of year " + year ,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                    }
                });
            })
        }
    })
}