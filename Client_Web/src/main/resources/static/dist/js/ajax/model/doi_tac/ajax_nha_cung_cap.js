async function nhaCungCapSearch(tenNhaCungCap = "", diaChi = "", dienThoai = "", email = "", facebook = "", ghiChu = "" ,page = 1, size = 10) {
    return ajaxGet(`v1/admin/nha-cung-cap/search?ten=${tenNhaCungCap}&dia-chi=${diaChi}&dien-thoai=${dienThoai}&email=${email}&facebook=${facebook}&page=${page}&size=${size}`);
}

async function nhaCungCapUpload(nhaCungCap) {
    return ajaxPost(`v1/admin/nha-cung-cap/upload`, nhaCungCap,1);
}

async function nhaCungCapUpdate(nhaCungCap) {
    return ajaxPut(`v1/admin/nha-cung-cap/update`, nhaCungCap,1);
}

async function nhaCungCapDelete(nhaCungCapId) {
    return ajaxDelete(`v1/admin/nha-cung-cap/delete?id=${nhaCungCapId}`);
}

async function nhaCungCapFindAll() {
    return ajaxGet(`v1/admin/nha-cung-cap/find-all?size=9999`);
}

async function viewSelectNhaCungCap(selector, all = true) {
    let view = all ? `<option value="0">Tất cả</option>` : "";
    await nhaCungCapFindAll().then(rs => {
        if(rs.message == "found") {
            rs = rs.data.currentElements;
            view += rs.map(data => `<option value="${data.id}">${viewField(data.ten)}</option>`).join("");
        }
    }).catch(err => {
        alterDanger("Server error find all nha cung cap", TIME_ALTER);
        console.log(err);
    })
    selector.html(view);
}

