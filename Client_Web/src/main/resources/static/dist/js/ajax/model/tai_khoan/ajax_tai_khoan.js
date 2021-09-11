
var url_tai_khoan = "v1/admin/tai-khoan/";

async function thongTinTaiKhoan(page = 1, size =99999) {
    return ajaxGet(`v1/admin/tai-khoan/find-all?page=${page}&size=${size}`,1);
}

function taiKhoanFindById(id) {
    return ajaxGet(`v1/admin/tai-khoan/find-by-id?id=${id}`,1);
}

function uploadTaiKhoan(taiKhoan , phongbanId , chucVuId =1 , vaiTroId =1) {
    return ajaxPost(`v1/admin/tai-khoan/upload?phong-ban-id=${phongbanId}&chuc-vu-id=${chucVuId}&vai-tro-id=${vaiTroId}`,taiKhoan, 1);
}

function taiKhoanUpdate(taiKhoan) {
    return ajaxPut(`v1/admin/tai-khoan/update`,taiKhoan, 1);
}



function themMoiTaiKhoan(taiKhoan) {
    return ajaxPost(`v1/admin/tai-khoan/upload`,taiKhoan, 1);
}

function xoaTaiKhoan(id) {
    return ajaxPut(`v1/admin/tai-khoan/delete?id=${id}`, 1);
}
function khoaTaiKhoan(id) {
    return ajaxPut(`v1/admin/tai-khoan/trang-thai?id=${id}&trang-thai=1`, 1);
}

function timTaiKhoan(search) {
    return ajaxPut(`v1/admin/tai-khoan/search?search=${search}`, 1);}


function findTaiKhoanByChiNhanhAndText(chiNhanhId = 0, text = "",page = 1, size = 5) {
    //console.log(`camera/search?chi-nhanh-id=${chiNhanhId}&nhom-id=${nhomId}&text=${text}&page=${page}&size=${size}`);
    return ajaxGet(`${url_tai_khoan}search?chi-nhanh-id=${chiNhanhId}&text=${text}&page=${page}&size=${size}`,1);
}