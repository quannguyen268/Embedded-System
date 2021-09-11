var url_chi_nhanh = "v1/admin/chi-nhanh/";
function chinhNhanhFindByTongCongTy(tongCongTyId = 1) {
    return ajaxGet(`${url_chi_nhanh}tong-cty?tong-cty-id=${tongCongTyId}`,1);
}

async function viewSelectChiNhanhFindByTongCongTy(tongCongTyId = 1) {
    let view = ``;
    await chinhNhanhFindByTongCongTy(tongCongTyId).then(rs => {
        if(rs.message === "found") {
            rs = rs.data;
            view += rs.map(data => `<option value="${data.id}">${data.diaChi}</option>`)
        }
    }).catch(err => {
        console.log(err);
    })
    return view;
}