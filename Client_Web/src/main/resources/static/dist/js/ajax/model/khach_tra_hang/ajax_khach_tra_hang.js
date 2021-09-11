
function traHangSearch(chiNhanhId = 0, text = "%",page = 1, size = 10) {
    return ajaxGet(`v1/admin/phieu-tra-khach-chi-tiet/search?chi-nhanh-id=${chiNhanhId}&text=${text}&page=${page}&size=${size}`, 1);
}

function uploadPhieuTraKhachChiTiet(phieuTraKhachForm) {
    return ajaxPost(`v1/admin/phieu-tra-khach-chi-tiet/upload-by-form`,phieuTraKhachForm);
}

function uploadPhieuTraKhach(nguoiDungId,phieuTraKhach) {
    return ajaxPost(`v1/admin/phieu-tra-khach/upload?nguoi-dung-id=${nguoiDungId}`, phieuTraKhach);
}


