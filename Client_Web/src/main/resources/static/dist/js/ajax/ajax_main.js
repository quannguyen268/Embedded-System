//var url_api = "http://localhost:8181/api/";
 var url_api = "http://lab.kiotmpecbk.cloud:8080/api/";
var url_img = "http://localhost:8181/resources/file_upload/";
var perfixPrintThis = "";

var ss_lg = null; //token login
const TRANG_THAI_Tai_Khoan = ["kích hoạt", "khóa"];
const TRANG_THAI_PHE_DUYET = ["Chưa duyệt", "Đã duyệt/ Đồng ý", "Đã duyệt/ Không đồng ý"];

const TIME_ALTER = 3000;
const MAX = 99999;
const URL_FILE = "http://localhost:8181/resources/file_upload/";

function StaticVariable(){
    var current_page = ""
}

$(function () {
    ss_lg = sessionStorage.getItem("token");
    checkLogin();
    buttonBackHistory();
    viewDateVn();
    runSelect2();
})

function viewTrangThaiPheDuyet(trangThai) {
    let view = "";
    if(trangThai >0  && trangThai < 3) view = TRANG_THAI_PHE_DUYET[trangThai - 1];
    return view;
}

function viewTrangThaiTaiKhoan(taiKhoan) {
    return TRANG_THAI_Tai_Khoan[taiKhoan.trangThai];
}

function checkLogin() {
    let pathName = window.location.pathname;
    if(pathName.indexOf("/dang-nhap") === -1 ) {
        if(ss_lg === null) {
            window.sessionStorage.setItem("current_page",pathName);
            location.replace("/dang-nhap")
        }
    }
}

//url link get api, option select url_api (1) or url_api_cms (2)
async function ajaxGet(url, option = 1) {
    let rs = null;
    let urlBack = option === 1 ? url_api : url_api_cms;
    await $.ajax({
        type: 'GET',
        headers: {
            "Authorization": ss_lg
        },
        dataType: "json",
        url: urlBack + url,
        timeout: 30000,
        success: function (result) {
            rs = result;
        }
    })
    return rs;
}

//url link get api, option select url_api (1) or url_api_cms (2)
async function ajaxPost(url, data ,option = 1) {
    let rs = null;
    let urlBack = option === 1 ? url_api : url_api_cms;
    await $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Authorization": ss_lg
        },
        url: urlBack + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            rs = result
        }
    })
    return rs;
}

async function ajaxPut(url, data ,option = 1) {
    let rs = null;
    let urlBack = option === 1 ? url_api : url_api_cms;
    await $.ajax({
        type: 'PUT',
        data: JSON.stringify(data),
        headers: {
            "Authorization": ss_lg
        },
        url: urlBack + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            rs = result
        }
    })
    return rs;
}

async function ajaxDelete(url, data ,option = 1) {
    let rs = null;
    let urlBack = option === 1 ? url_api : url_api_cms;
    await $.ajax({
        type: 'DELETE',
        data: JSON.stringify(data),
        headers: {
            "Authorization": ss_lg
        },
        url: urlBack + url,
        timeout: 30000,
        contentType: "application/json",
        success: function (result) {
            rs = result
        }
    })
    return rs;
}

async function ajaxUploadFile(url, file, option = 1) {
    let rs = null;
    let urlBack = option === 1 ? url_api : url_api_cms;
    await $.ajax({
        type: "POST",
        url: urlBack + url,
        data: file,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (result) {
            rs = result;
        }
    });
    return rs;
}

async function ajaxCall(url) {
    let rs = null;
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: url,
        timeout: 30000,
        success: function (result) {
            rs = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return rs;
}

//view Field
function viewField(data) {
    return data !== null ? data : "";
}

//view error
function viewError(selector, message) {
    selector.addClass("has-error");
    selector.find(".help-block").text(`${message}. Mời nhập lại!`);
}

//hidden error
function hiddenError(selector) {
    selector.removeClass("has-error");
}

//regex field

function removeAscent (str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

function regexTen(name) {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(removeAscent(name));
}

function regexEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

function regexDienThoai(soDienThoai) {
    return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(soDienThoai)
}

function checkSize(size, text) {
    return text.length > 0 && text.length <= size;
}

function regexUsername(text) {
    return /^[A-Za-z0-9]+/.test(text);
}

function regexPassword(text) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/.test(text);
}

function regexBienSoXe(text) {
    return true;
}

function regexDate(text) {
    return /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/.test(text);
}
//end regex field

//set disable button save
function setDisabledButton(selector, check) {
    selector.prop('disabled', check);
}
//end set disable button save

//back-history
function buttonBackHistory() {
    $("#back-history").click(function () {
        window.history.back();
    })
}
//end-back-history


//format date iso backend
function formatDate(date) {
    if (date !== null) {
        let format = date.trim().split("-");
        console.log(format[2]+"/"+format[1]+"/"+format[0]);
        return format[2]+"/"+format[1]+"/"+format[0];
    }
}

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

function compareDate(date1, date2) {
    return convertDateISO(date1).getTime() < convertDateISO(date2).getTime();
}

function convertDateISO(date) {
    date = date.split("/");
    date = date.reverse().join("/");
    return new Date(date);
}
//end format date

//alter
function alterImage(text) {
    $.notify({
        icon: 'resources/dist/img/Logo.png',
        title: 'Tavi MRS',
        message: text
    }, {
        delay: 3000,
        offset: {x: 15, y:15},
        icon_type: 'image',
        type: 'minimalist',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<img data-notify="icon" class="img-circle pull-left">' +
            '<div class="text-mess">' +
            '<span data-notify="title">{1}</span>' +
            '<span data-notify="message">{2}</span>' +
            '</div>' +
            '</div>'
    });
}

function alterSuccess(text, time = 2000) {
    $.notify({
        icon: 'far fa-check-circle',
        message: text
    }, {
        delay: time,
        offset: {x: 15, y: 15},
        type: 'success',
    });
}

function alterInfo(text, time = 2000) {
    $.notify({
        icon: 'fas fa-info-circle',
        message: text
    }, {
        delay: time,
        offset: {x: 15, y: 15},
        type: 'info',
    });
}

function alterWarning(text, time = 2000) {
    $.notify({
        icon: 'fas fa-exclamation',
        message: text
    }, {
        delay: time,
        offset: {x: 15, y: 15},
        type: 'warning',
    });
}

function alterDanger(text, time = 2000) {
    $.notify({
        icon: 'fas fa-exclamation-triangle',
        message: text
    }, {
        delay: time,
        offset: {x: 15, y: 15},
        type: 'danger',
    });
}

function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}

//end alter
function viewDateVn() {
    if ($(".date-vn").length > 0) {
        $(".date-vn").datepicker({
            language: "vi"
        });
    }
}

function viewDateTime(date) {
    // if(date !== null) date = new Date(date).toLocaleString();
    if(date !== null) date = moment(new Date(date)).format("DD/MM/YYYY HH:mm:ss");
    return date;
}

function viewSrc(src, check) {
    return src.indexOf("http") == 0 ? src : url_img + src;
}

function runOwlCarousel() {
    let selector = $(".owl-carousel");
    selector.owlCarousel({
        loop:true,
        dots:true,
        nav:true,
        margin:10,
        autoHeight:true,
        responsive:{
            0:{
                items:1
            }
        }
    });
    selector.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY>0) {
            selector.trigger('next.owl');
        } else {
            selector.trigger('prev.owl');
        }
        e.preventDefault();
    });
}

function replaceOwlCarousel(html) {
    $('.owl-carousel').trigger('replace.owl.carousel', html).trigger('refresh.owl.carousel');
}

function viewNgayBaoCao(valTuNgay, valDenNgay) {
    let text = "";
    if (valTuNgay !== "")  text += `Từ ngày ${valTuNgay}`;
    if (valDenNgay !== "") text += ` đến ${valDenNgay}`;
    return text !== "" ? `(${text})` : "Từ trước đến nay";
}

function textToIconFile(nameFile) {
    if((/(.doc|.docx)$/ig).test(nameFile)) return '<i class="fas fa-file-word text-primary"></i>';
    if((/(xls|xlsx)$/ig).test(nameFile)) return '<i class="fas fa-file-excel text-success"></i>';
    if((/(ppt|pptx)$/ig).test(nameFile)) return '<i class="fas fa-file-powerpoint text-danger"></i>';
    if((/(zip|rar|tar|gzip|gz|7z)$/ig).test(nameFile)) return '<i class="fas fa-file-archive text-muted"></i>';
    if((/(htm|html)$/ig).test(nameFile)) return '<i class="fas fa-file-code text-info"></i>';
    if((/(txt|ini|csv|java|php|js|css)$/ig).test(nameFile)) return '<i class="fas fa-file-text text-info"></i>';
    if((/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/ig).test(nameFile)) return '<i class="fas fa-file-movie-o text-warning"></i>';
    if((/(mp3|wav)$/ig).test(nameFile)) return '<i class="fas fa-file-audio text-warning"></i>';
    if((/(.jpg|.png|.gif)$/ig).test(nameFile)) return '<i class="fas fa-file-image text-primary"></i>';
    if((/(.pdf)$/ig).test(nameFile)) return '<i class="fas fa-file-pdf text-danger"></i>';
    return '<i class="fas fa-file"></i>'
}

function clickPrintElement(selector) {
    $('#btn-print').on("click", function () {
        $(selector).printThis({
            importCSS: true,
            printDelay: 333,
        });
    });
}

function getMonthAndYear() {
    let date = new Date();
    return {
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }
}

function drawChart(selector, options) {
    $(selector).CanvasJSChart(options);
}

function paginationReset() {
    $('#pagination').pagination({
        dataSource: [0],
        locator: 'items',
        totalNumber: 0,
        pageSize: 1,
        showPageNumbers: true,
        showPrevious: true,
        showNext: true,
        // showNavigator: true,
        showFirstOnEllipsisShow: true,
        showLastOnEllipsisShow: true
    })
}

function runSelect2() {
    $('.select2bs4').select2({ width: 'resolve' });
}

function loadEndData() {
    $("#click-load-data td").html(`<i class="fas fa-arrow-circle-up"></i>`);
    $("#click-load-data").unbind("click");
}

function resetIconLoadData() {
    $("#click-load-data td").html(`<i class="fas fa-arrow-circle-down"></i>`);
}

function paginationReset() {
    $('#pagination').pagination({
        dataSource: [0],
        locator: 'items',
        totalNumber: 0,
        pageSize: 1,
        showPageNumbers: true,
        showPrevious: true,
        showNext: true,
        // showNavigator: true,
        showFirstOnEllipsisShow: true,
        showLastOnEllipsisShow: true
    })
}
