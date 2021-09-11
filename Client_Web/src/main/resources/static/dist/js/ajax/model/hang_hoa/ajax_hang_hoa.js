async function uploadHangHoa(hangHoa, thuongHieuId, nhomHangId) {
    return ajaxPost(`v1/admin/hang-hoa/upload?thuong-hieu-id=${thuongHieuId}&nhom-hang-id=${nhomHangId}`, hangHoa, 1);
}

async function hangHoaFindAll() {
    return ajaxGet(`v1/admin/hang-hoa/find-all?size=9999`);
}

async function viewSelectHangHoa(selector, all = true) {
    let view = all ? `<option value="0">Tất cả</option>` : "";
    var result = [];
    await hangHoaFindAll().then(rs => {
        if(rs.message == "found") {
            rs = rs.data.currentElements;
            result = rs;
            view += rs.map(data => `<option value="${data.id}">${viewField(data.ma)} - ${viewField(data.tenHangHoa)}</option>`).join("");
        }
    }).catch(err => {
        alterDanger("Server error find all hang hoa", TIME_ALTER);
        console.log(err);
    })
    selector.html(view);
    return result;
}

async function hangHoaChiNhanhFindAll(id) {
    return ajaxGet(`v1/admin/chi-nhanh-hang-hoa/find-by-chi-nhanh?chi-nhanh-id=${id}&size=9999`);
}

async function viewSelectHangHoaChiNhanh(selector, id, all = true) {
    let view = all ? `<option value="0">Tất cả</option>` : "";
    var result = [];
    await hangHoaChiNhanhFindAll(id).then(rs => {
        if(rs.message == "found") {
            console.log(rs);
            rs = rs.data.currentElements;
            result = rs;
            view += rs.map(data => `<option value="${data.hangHoa.id}">${viewField(data.hangHoa.ma)} - ${viewField(data.hangHoa.tenHangHoa)}</option>`).join("");
        }
    }).catch(err => {
        alterDanger("Server error find all hang hoa", TIME_ALTER);
        console.log(err);
    })
    selector.html(view);
    return result;
}