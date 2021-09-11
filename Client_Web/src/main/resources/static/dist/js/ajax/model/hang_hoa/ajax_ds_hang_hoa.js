
function hangHoaSearch(chiNhanhId = 0, text = "%",page = 1, size = 10) {
    return ajaxGet(`v1/admin/chi-nhanh-hang-hoa/search?chi-nhanh-id=${chiNhanhId}&text=${text}&page=${page}&size=${size}`,1);
}

