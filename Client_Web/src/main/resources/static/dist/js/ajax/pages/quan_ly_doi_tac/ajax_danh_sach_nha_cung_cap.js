var inputSearchTenNhaCungCap, inputSearchDiaChi, inputSearchDienThoai, inputSearchEmail, inputSearchFacebook, inputSearchGhiChu, btnSearchNhaCungCap ,tableNhaCungCap, inputMoiTenNhaCungCap, inputMoiDiaChi, inputMoiDienThoai, inputMoiEmail, inputMoiFacebook, inputMoiGhiChu, btnThemNhaCungCap, btnSuaNhaCungCap, btnXoaNhaCungCap;
var arrNhaCungCap = [];
var elementNhaCungCap = [];
$(function() {
    inputSearchTenNhaCungCap = $("#bimo1");
    inputSearchDiaChi = $("#bimo2");
    inputSearchDienThoai = $("#bimo3");
    inputSearchEmail = $("#bimo4");
    inputSearchFacebook = $("#bimo5");
    inputSearchGhiChu = $("#bimo6");
    btnSearchNhaCungCap = $("#btn-search-1");
    tableNhaCungCap = $("#table-nha-cung-cap");
    inputMoiTenNhaCungCap = $("#text-ten-nha-cung-cap");
    inputMoiDiaChi = $("#text-dia-chi");
    inputMoiDienThoai = $("#text-dien-thoai");
    inputMoiEmail = $("#text-email");
    inputMoiFacebook = $("#text-facebook");
    inputMoiGhiChu = $("#text-ghi-chu");
    btnThemNhaCungCap = $("#btn-them-thuong-hieu");
    btnSuaNhaCungCap = $("#btn-sua-thuong-hieu");
    btnXoaNhaCungCap = $("#btn-xoa-thuong-hieu");

    searchNhaCungCap();
    clickAddNhaCungCap();
    clickSuaNhaCungCap();
    clickXoaNhaCungCap();
    clickSearchNhaCungCap();
    taiExcelTK();
})

function clickSearchNhaCungCap() {
    btnSearchNhaCungCap.click(function () {
        searchNhaCungCap();
    })
}

function searchNhaCungCap() {
    let valSearchTen= inputSearchTenNhaCungCap.val();
    let valSearchDiaChi= inputSearchDiaChi.val();
    let valSearchDienThoai= inputSearchDienThoai.val();
    let valSearchEmail= inputSearchEmail.val();
    let valSearchFacebook= inputSearchFacebook.val();
    let valSearchGhiChu= inputSearchGhiChu.val();
    nhaCungCapSearch(valSearchTen, valSearchDiaChi, valSearchDienThoai, valSearchEmail, valSearchFacebook, valSearchGhiChu).then(rs => {
        if(rs.message === "found") {
            $('#pagination1').pagination({
                dataSource: function (done) {
                    let result = [];
                    for (let i = 1; i <= rs.data.totalPages; i++) result.push(1);
                    done(result);
                },
                locator: 'items',
                totalNumber: rs.data.totalPages,
                pageSize: 1,
                showPageNumbers: true,
                showPrevious: true,
                showNext: true,
                // showNavigator: true,
                showFirstOnEllipsisShow: true,
                showLastOnEllipsisShow: true,
                callback: function (response, pagination) {
                    if (pagination.pageNumber == 1) {
                        arrNhaCungCap = rs.data.currentElements;
                        setViewNhaCungCap(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    nhaCungCapSearch(valSearchTen, valSearchDiaChi, valSearchDienThoai, valSearchEmail, valSearchFacebook, valSearchGhiChu, pagination.pageNumber).then(rs => {
                        arrNhaCungCap = rs.data.currentElements;
                        setViewNhaCungCap(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            arrNhaCungCap = [];
            setViewNhaCungCap(1);
            paginationReset();
        }
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Search Nha Cung Cap");
        setViewNhaCungCap(1);
    })
}

function setViewNhaCungCap(pageNumber) {
    let view = `<tr>
                    <th>STT</th>
                    <th>Tên nhà cung cấp</th>
                    <th>Địa chỉ</th>
                    <th>Điện thoại</th>
                    <th>Email</th>
                    <th>Facebook</th>
                    <th>Ghi chú</th>
                </tr>`;
    let len = arrNhaCungCap.length;
    if (len > 0) {
        view += arrNhaCungCap.map((item, index) => `<tr data-index="${index}" class="click-nha-cung-cap">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.ten)}</td>
                    <td>${viewField(item.diaChi)}</td>
                    <td>${viewField(item.dienThoai)}</td>
                    <td>${viewField(item.email)}</td>
                    <td>${viewField(item.facebook)}</td>
                    <td>${viewField(item.ghiChu)}</td>
                </tr>`);
        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="7">Không có thông tin phù hợp</td></tr>`
    }
    tableNhaCungCap.html(view);
    clickNhaCungCap();
}

function clickNhaCungCap() {
    tableNhaCungCap.find("tr:not(.click-nha-cung-cap)").unbind("click").click(function () {
        elementNhaCungCap = {};
        resetViewInputMoi();
    })
    $("tr.click-nha-cung-cap").unbind("click").click(function () {
        elementNhaCungCap = arrNhaCungCap[$(this).attr("data-index")];
        setViewInputMoi();
    })
}

function setViewInputMoi() {
    inputMoiTenNhaCungCap.val(viewField(elementNhaCungCap.ten));
    inputMoiDiaChi.val(viewField(elementNhaCungCap.diaChi));
    inputMoiDienThoai.val(viewField(elementNhaCungCap.dienThoai));
    inputMoiEmail.val(viewField(elementNhaCungCap.email));
    inputMoiFacebook.val(viewField(elementNhaCungCap.facebook));
    inputMoiGhiChu.val(viewField(elementNhaCungCap.ghiChu));
}

function resetViewInputMoi() {
    inputMoiTenNhaCungCap.val("");
    inputMoiDiaChi.val("");
    inputMoiDienThoai.val("");
    inputMoiEmail.val("");
    inputMoiFacebook.val("");
    inputMoiGhiChu.val("");
}

function checkText(selector) {
    let rs = false;
    let size = 255;
    let text = selector.val();
    let selectorParent = selector.parent();
    if (checkSize(size,text)) {
        rs = true;
        hiddenError(selectorParent);
    } else viewError(selectorParent,`Độ dài chưa phù hợp > 0 và < ${size}`);
    return {check : rs, val: text};
}

function checkSoDienthoai() {
    let rs = false;
    let size = 10;
    let ten = inputMoiDienThoai.val();
    let selector = inputMoiDienThoai.parent();
    if (regexDienThoai(ten)) {
        if (checkSize(size,ten)) {
            rs = true;
            hiddenError(selector);
        } else viewError(selector,`Độ dài chưa phù hợp > 0 và < ${size}`);
    } else viewError(selector,"Số điện thoại chưa đúng định dạng");
    return {check : rs, val: ten};
}

function checkEmail() {
    let rs = false;
    let size = 100;
    let ten = inputMoiEmail.val();
    let selector = inputMoiEmail.parent();
    if (regexEmail(ten)) {
        if (checkSize(size,ten)) {
            rs = true;
            hiddenError(selector);
        } else viewError(selector,`Độ dài chưa phù hợp > 0 và < ${size}`);
    } else viewError(selector,"Email chưa đúng định dạng");
    return {check : rs, val: ten};
}

function clickAddNhaCungCap() {
    btnThemNhaCungCap.click(function () {
        let {check: checkTen, val: valTen} = checkText(inputMoiTenNhaCungCap);
        let {check: checkDC, val: valDC} = checkText(inputMoiDiaChi);
        let {check: checkDT, val: valDT} = checkSoDienthoai();
        let {check: checkMail, val: valMail} = checkEmail();
        let valFacebook = inputMoiFacebook.val();
        let valGhiChu = inputMoiGhiChu.val();
        if(checkTen & checkDC & checkDT & checkMail) {
            let nhaCungCap = {
                ten: valTen,
                diaChi: valDC,
                dienThoai: valDT,
                email: valMail,
                facebook: valFacebook,
                ghiChu: valGhiChu
            }
            nhaCungCapUpload(nhaCungCap).then(rs => {
                if(rs.message === "uploaded") {
                    elementNhaCungCap = rs.data;
                    setViewInputMoi();
                    alterSuccess("Thêm nhà cung cấp thành công", TIME_ALTER);
                    searchNhaCungCap();
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Upload Nha Cung Cap", TIME_ALTER);
            })
        }
    })
}

function clickSuaNhaCungCap() {
    btnSuaNhaCungCap.click(function () {
        let {check: checkTen, val: valTen} = checkText(inputMoiTenNhaCungCap);
        let {check: checkDC, val: valDC} = checkText(inputMoiDiaChi);
        let {check: checkDT, val: valDT} = checkSoDienthoai();
        let {check: checkMail, val: valMail} = checkEmail();
        let valFacebook = inputMoiFacebook.val();
        let valGhiChu = inputMoiGhiChu.val();
        if(checkTen & checkDC & checkDT & checkMail) {
            elementNhaCungCap.ten = valTen;
            elementNhaCungCap.diaChi = valDC;
            elementNhaCungCap.dienThoai = valDT;
            elementNhaCungCap.email = valMail;
            elementNhaCungCap.facebook = valFacebook;
            elementNhaCungCap.ghiChu = valGhiChu;
            nhaCungCapUpdate(elementNhaCungCap).then(rs => {
                if(rs.message === "updated") {
                    alterSuccess("Sửa nhà cung cấp thành công", TIME_ALTER);
                    searchNhaCungCap();
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Update Nha Cung Cap", TIME_ALTER);
            })
        }
    })
}

function clickXoaNhaCungCap() {
    btnXoaNhaCungCap.click(function() {
        if(Object.keys(elementNhaCungCap).length !== 0) {
            $('#modal-remove').modal('show');
            $("#confirm-yes").unbind("click").click(function () {
                nhaCungCapDelete(elementNhaCungCap.id).then(rs => {
                    if(rs.message = "deleted") {
                        alterSuccess(`Đã xóa nhà cung cấp ${elementNhaCungCap.tenNhaCungCap}`, TIME_ALTER);
                        searchNhaCungCap();
                        elementNhaCungCap = {};
                    }
                }).catch(err => {
                    console.log(err);
                    alterDanger("Server error - Delete Nha Cung Cap")
                })
                // to do remove camera
            })
        } else {
            alterInfo("Vui lòng chọn một nhà cung cấp để thực hiện thao tác", TIME_ALTER);
        }
    })
}

function taiExcelTK() {
    $('#btn-excel').on('click', function () {
        console.log("inds");
        ajaxGet('v1/admin/nha-cung-cap/excel?list-nha-cung-cap=' + arrNhaCungCap.map(hoaDon => hoaDon.id))
            .then(rs => {
                window.open(rs.data, '_blank');
            }).catch(ex => {
            console.log(ex);
            alterDanger("Tạo file excel thất bại");
        })
    });
    clickPrintElement(".ttcttk");
}
