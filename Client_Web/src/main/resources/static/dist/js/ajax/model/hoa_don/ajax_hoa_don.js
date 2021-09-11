function hoaDonSearch(chiNhanhId = 0, text = "%",page = 1, size = 10) {
    return ajaxGet(`v1/admin/hoa-don/search-by-chi-nhanh-and-text?chi-nhanh-id=${chiNhanhId}&text=${text}&page=${page}&size=${size}`,1);
}
function danhSachHoaDonChiTiet(hoaDonId = 0 ,page=1 ,size=99999){
    return ajaxGet(`v1/admin/hoa-don-chi-tiet/find-all-by-id-hoa-don?hoa-don-id=${hoaDonId}&page=${page}&size=${size}`,1);
}

