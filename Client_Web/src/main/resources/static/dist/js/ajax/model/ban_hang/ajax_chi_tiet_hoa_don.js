async function findHangHoa(id = 0) {
    return ajaxGet(`v1/admin/hang-hoa/find-by-id?id=${id}`);
}

async function findFirstHH(hangHoaId=0) {
    return ajaxGet(`v1/admin/lich-su-gia-ban/find-distinct-by-hang-hoa-id?hangHoaId=${hangHoaId}`);
}

async function findGiaBanByHangHoaId(donViHangHoaId=0) {
    return ajaxGet(`v1/admin/lich-su-gia-ban/find-gia-ban-hien-tai?don-vi-hang-hoa-id=${donViHangHoaId}`);
}

async function findKhachHangById(id= 0) {
    return ajaxGet(`v1/admin/khach-hang/find-by-id?id=${id}`);
}

async function findHoaDonById(id= 0) {
    return ajaxGet(`v1/admin/hoa-don/find-by-id?id=${id}`);
}

async function uploadHoaDon(nguoiDungId,khachHangId,chiNhanhId,hoaDon) {
    return ajaxPost(`v1/admin/hoa-don/upload?nguoi-dung-id=${nguoiDungId}&khach-hang-id=${khachHangId}&chi-nhanh-id=${chiNhanhId}`, hoaDon);
}


async function uploadHoaDonChiTiet(hoaDonChiTietForm) {
    return ajaxPost(`v1/admin/hoa-don-chi-tiet/upload-by-form`, hoaDonChiTietForm);
}

async function uploadKhachHang(khachHang) {
    return ajaxPost(`v1/admin/khach-hang/upload`,khachHang);
}