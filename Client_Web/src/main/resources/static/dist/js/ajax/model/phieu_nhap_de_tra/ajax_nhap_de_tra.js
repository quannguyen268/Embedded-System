function phieuTraHangSearch(chiNhanhId = 0, text = "%",page = 1, size = 10) {
    return ajaxGet(`v1/admin/phieu-nhap-hang-chi-tiet/search-by-chi-nhanh-and-text?chi-nhanh-id=${chiNhanhId}&text=${text}&page=${page}&size=${size}`,1);
}

function uploadPhieuTraHangNhap(nguoiDungId,nhaCungCapId, phieuTraHangNhap){
    return ajaxPost(`v1/admin/phieu-tra-hang-nhap/upload?nguoi-dung-id=${nguoiDungId}&nha-cung-cap-id=${nhaCungCapId}`, phieuTraHangNhap,1);
}

