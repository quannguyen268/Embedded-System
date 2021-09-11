var inputSearchTenkhachHang, inputSearchDiaChi, inputSearchDienThoai, inputSearchEmail, inputSearchFacebook, inputSearchGhiChu, btnSearchkhachHang ,tablekhachHang, inputMoiTenkhachHang, inputMoiDiaChi, inputMoiDienThoai, inputMoiEmail, inputMoiFacebook, inputMoiGhiChu, btnThemkhachHang, btnSuakhachHang, btnXoakhachHang;
var arrkhachHang = [];
var elementkhachHang = [];
$(function() {
    inputSearchTenkhachHang = $("#bimo1");
    inputSearchDiaChi = $("#bimo2");
    inputSearchDienThoai = $("#bimo3");
    inputSearchEmail = $("#bimo4");
    inputSearchFacebook = $("#bimo5");
    inputSearchGhiChu = $("#bimo6");
    btnSearchkhachHang = $("#btn-search-1");
    tablekhachHang = $("#table-nha-cung-cap");
    inputMoiTenkhachHang = $("#text-ten-nha-cung-cap");
    inputMoiDiaChi = $("#text-dia-chi");
    inputMoiDienThoai = $("#text-dien-thoai");
    inputMoiEmail = $("#text-email");
    inputMoiFacebook = $("#text-facebook");
    inputMoiGhiChu = $("#text-ghi-chu");
    btnThemkhachHang = $("#btn-them-thuong-hieu");
    btnSuakhachHang = $("#btn-sua-thuong-hieu");
    btnXoakhachHang = $("#btn-xoa-thuong-hieu");

    searchkhachHang();
    clickAddkhachHang();
    clickSuakhachHang();
    clickXoakhachHang();
    clickSearchkhachHang();
    taiExcelTK();
})

function clickSearchkhachHang() {
    btnSearchkhachHang.click(function () {
        searchkhachHang();
    })
}

function searchkhachHang() {
    let valSearchTen= inputSearchTenkhachHang.val();
    let valSearchDiaChi= inputSearchDiaChi.val();
    let valSearchDienThoai= inputSearchDienThoai.val();
    let valSearchEmail= inputSearchEmail.val();
    let valSearchFacebook= inputSearchFacebook.val();
    let valSearchGhiChu= inputSearchGhiChu.val();
    khachHangSearch(valSearchTen, valSearchDienThoai, valSearchEmail,valSearchFacebook,valSearchDiaChi).then(rs => {
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
                        arrkhachHang = rs.data.currentElements;
                        setViewkhachHang(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    khachHangSearch(valSearchTen,  valSearchDienThoai, valSearchEmail, valSearchFacebook, valSearchDiaChi,pagination.pageNumber).then(rs => {
                        arrkhachHang = rs.data.currentElements;
                        setViewkhachHang(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            arrkhachHang = [];
            setViewkhachHang(1);
            paginationReset();
        }
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Search Nha Cung Cap");
        setViewkhachHang(1);
    })
}

function setViewkhachHang(pageNumber) {
    let view = `<tr>
                    <th>STT</th>
                    <th>Tên khách hàng</th>
                    <th>Địa chỉ</th>
                    <th>Điện thoại</th>
                    <th>Email</th>
                    <th>Facebook</th>
                    <th>Ghi chú</th>
                </tr>`;
    let len = arrkhachHang.length;
    if (len > 0) {
        view += arrkhachHang.map((item, index) => `<tr data-index="${index}" class="click-nha-cung-cap">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.tenKhachHang)}</td>
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
    tablekhachHang.html(view);
    clickkhachHang();
}

function clickkhachHang() {
    tablekhachHang.find("tr:not(.click-nha-cung-cap)").unbind("click").click(function () {
        elementkhachHang = {};
        resetViewInputMoi();
    })
    $("tr.click-nha-cung-cap").unbind("click").click(function () {
        elementkhachHang = arrkhachHang[$(this).attr("data-index")];
        setViewInputMoi();
    })
}

function setViewInputMoi() {
    inputMoiTenkhachHang.val(viewField(elementkhachHang.tenKhachHang));
    inputMoiDiaChi.val(viewField(elementkhachHang.diaChi));
    inputMoiDienThoai.val(viewField(elementkhachHang.dienThoai));
    inputMoiEmail.val(viewField(elementkhachHang.email));
    inputMoiFacebook.val(viewField(elementkhachHang.facebook));
    inputMoiGhiChu.val(viewField(elementkhachHang.ghiChu));
}

function resetViewInputMoi() {
    inputMoiTenkhachHang.val("");
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

function clickAddkhachHang() {
    btnThemkhachHang.click(function () {
        let {check: checkTen, val: valTen} = checkText(inputMoiTenkhachHang);
        let {check: checkDC, val: valDC} = checkText(inputMoiDiaChi);
        let {check: checkDT, val: valDT} = checkSoDienthoai();
        let {check: checkMail, val: valMail} = checkEmail();
        let valFacebook = inputMoiFacebook.val();
        let valGhiChu = inputMoiGhiChu.val();
        if(checkTen & checkDC & checkDT & checkMail) {
            let khachHang = {
                tenKhachHang: valTen,
                diaChi: valDC,
                dienThoai: valDT,
                email: valMail,
                facebook: valFacebook,
                ghiChu: valGhiChu
            }
            khachHangUpload(khachHang).then(rs => {
                if(rs.message === "uploaded") {
                    elementkhachHang = rs.data;
                    setViewInputMoi();
                    alterSuccess("Thêm khách hàng thành công", TIME_ALTER);
                    searchkhachHang();
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Upload Nha Cung Cap", TIME_ALTER);
            })
        }
    })
}

function clickSuakhachHang() {
    btnSuakhachHang.click(function () {
        let {check: checkTen, val: valTen} = checkText(inputMoiTenkhachHang);
        let {check: checkDC, val: valDC} = checkText(inputMoiDiaChi);
        let {check: checkDT, val: valDT} = checkSoDienthoai();
        let {check: checkMail, val: valMail} = checkEmail();
        let valFacebook = inputMoiFacebook.val();
        let valGhiChu = inputMoiGhiChu.val();
        if(checkTen & checkDC & checkDT & checkMail) {
            elementkhachHang.tenKhachHang = valTen;
            elementkhachHang.diaChi = valDC;
            elementkhachHang.dienThoai = valDT;
            elementkhachHang.email = valMail;
            elementkhachHang.facebook = valFacebook;
            elementkhachHang.ghiChu = valGhiChu;
            khachHangUpdate(elementkhachHang).then(rs => {
                if(rs.message === "updated") {
                    alterSuccess("Sửa khách hàng thành công", TIME_ALTER);
                    searchkhachHang();
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Update Nha Cung Cap", TIME_ALTER);
            })
        }
    })
}

function clickXoakhachHang() {
    btnXoakhachHang.click(function() {
        if(Object.keys(elementkhachHang).length !== 0) {
            $('#modal-remove').modal('show');
            $("#confirm-yes").unbind("click").click(function () {
                khachHangDelete(elementkhachHang.id).then(rs => {
                    if(rs.message = "deleted") {
                        alterSuccess(`Đã xóa khách hàng ${elementkhachHang.tenKhachHang}`, TIME_ALTER);
                        searchkhachHang();
                        elementkhachHang = {};
                    }
                }).catch(err => {
                    console.log(err);
                    alterDanger("Server error - Delete Nha Cung Cap")
                })
                // to do remove camera
            })
        } else {
            alterInfo("Vui lòng chọn một khách hàng để thực hiện thao tác", TIME_ALTER);
        }
    })
}

function taiExcelTK() {
    $('#btn-excel').on('click', function () {
        console.log("inds");
        ajaxGet('v1/admin/khach-hang/excel?list-khach-hang=' + arrkhachHang.map(khachHang => khachHang.id))
            .then(rs => {
                window.open(rs.data, '_blank');
            }).catch(ex => {
            console.log(ex);
            alterDanger("Tạo file excel thất bại");
        })
    });
    clickPrintElement(".ttcttk");
}


