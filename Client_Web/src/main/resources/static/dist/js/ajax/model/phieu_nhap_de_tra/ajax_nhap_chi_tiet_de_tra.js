function danhSachNhapHangChiTiet(phieuNhapId,page = 1, size = 10) {
    return ajaxGet(`v1/admin/phieu-nhap-hang-chi-tiet/find-by-phieu-nhap?phieu-nhap-id=${phieuNhapId}&page=${page}&size=${size}`,1);
}

function uploadPhieuTraHangNhapChiTiet(phieuTraHangNhapForm){
    return ajaxPost(`v1/admin/phieu-tra-hang-nhap-chi-tiet/upload-by-form`, phieuTraHangNhapForm);
}