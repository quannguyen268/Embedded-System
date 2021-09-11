async function donViFindAll(page = 1, size = 10) {
    return ajaxGet(`v1/admin/don-vi/find-all?page=${page}&size=${size}`);
}

async function donViHangHoaFindAll() {
    return ajaxGet(`v1/admin/don-vi-hang-hoa/find-all`);
}

async function donViSearch(tenDonVi, page = 1, size = 10) {
    return ajaxGet(`v1/admin/don-vi/search?ten-don-vi=${tenDonVi}&page=${page}&size=${size}`);
}


async function donViUpload(donVi) {
    return ajaxPost(`v1/admin/don-vi/upload`, donVi,1);
}

async function donViUpdate(donVi) {
    return ajaxPut(`v1/admin/don-vi/update`, donVi,1);
}

async function donViDelete(donViId) {
    return ajaxDelete(`v1/admin/don-vi/delete?id=${donViId}`);
}

function viewSelectDonVi(selector) {
    let view = ``;
     donViFindAll(1, MAX).then(rs => {
        if(rs.result === "found") {
            rs = rs.data;
            view = rs.map(data => `<option value=${rs.id}>${rs.tenDonVi}</option>`).join("") + `<option value=0>+ Thêm nhóm hàng</option>`;
            selector.html(view);
        }
    }).catch(err => {
        alterDanger("Server Error", TIME_ALTER);
        console.log(err);
    })
}

function viewSelectDonViHangHoa(selector) {
    let view = ``;
    donViHangHoaFindAll(1, MAX).then(rs => {
        if(rs.result === "found") {
            rs = rs.data;
            view = rs.map(data => `<option value=${rs.id}>${rs.tenDonVi}</option>`).join("") + `<option value=0>+ Thêm nhóm hàng</option>`;
            selector.html(view);
            console.log(rs);
        }
    }).catch(err => {
        alterDanger("Server Error", TIME_ALTER);
        console.log(err);
    })
}

function setClickThemDonVi(selector) {
    selector.find("option[value='0']").click(function () {
        console.log("Thêm đơn vị");
    })
}