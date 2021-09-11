var inputSearchThuongHieu, inputSearchNhomHang, inputSearchDonVi, btnSearchThuongHieu, btnSearchNhomHang, btnSearchDonVi, tableThuongHieu, tableNhomHang, tableDonVi, inputMoiThuongHieu, inputMoiNhomHang, inputMoiDonVi, btnThemThuongHieu, btnSuaThuongHieu, btnXoaThuongHieu, btnThemNhomHang, btnSuaNhomHang, btnXoaNhomHang, btnThemDonVi, btnSuaDonVi, btnXoaDonVi, inputMaNhomHang;
var arrThuongHieu = [];
var arrNhomHang = [];
var arrDonVi = [];
var elementThuongHieu = [];
var elementNhomHang = [];
var elementDonVi = [];
$(function() {
    inputSearchThuongHieu = $("#bimo1");
    inputSearchNhomHang = $("#bimo2");
    inputSearchDonVi = $("#bimo3");
    btnSearchThuongHieu = $("#btn-search-1");
    btnSearchNhomHang= $("#btn-search-2");
    btnSearchDonVi = $("#btn-search-3");
    tableThuongHieu = $("#table-thuong-hieu");
    tableNhomHang = $("#table-nhom-hang");
    tableDonVi = $("#table-don-vi");
    inputMoiThuongHieu = $("#text-thuong-hieu");
    inputMoiNhomHang = $("#text-nhom-hang");
    inputMoiDonVi = $("#text-don-vi");
    btnThemThuongHieu = $("#btn-them-thuong-hieu");
    btnSuaThuongHieu = $("#btn-sua-thuong-hieu");
    btnXoaThuongHieu = $("#btn-xoa-thuong-hieu");
    btnThemNhomHang = $("#btn-them-nhom-hang");
    btnSuaNhomHang = $("#btn-sua-nhom-hang");
    btnXoaNhomHang = $("#btn-xoa-nhom-hang");
    btnThemDonVi = $("#btn-them-don-vi");
    btnSuaDonVi = $("#btn-sua-don-vi");
    btnXoaDonVi = $("#btn-xoa-don-vi");
    inputMaNhomHang = $("#text-ma-nhom-hang");

    searchThuongHieu();
    searchNhomHang();
    searchDonVi();
    clickAddThuongHieu();
    clickSuaThuongHieu();
    clickXoaThuongHieu();
    clickAddNhomHang();
    clickSuaNhomHang();
    clickXoaNhomHang();
    clickAddDonVi();
    clickSuaDonVi();
    clickXoaDonVi();
    clickSearchThuongHieu();
    clickSearchNhomHang();
    clickSearchDonVi();
    viewHiddenChucNang();
})

function viewHiddenChucNang() {
    $(".danh-muc").click(function () {
        $(".view-chuc-nang").addClass("hidden");
        $(this).find(".view-chuc-nang").removeClass("hidden");
    })
}

function clickSearchThuongHieu() {
    btnSearchThuongHieu.click(function () {
        searchThuongHieu();
    })
}

function clickSearchNhomHang() {
    btnSearchNhomHang.click(function () {
        searchNhomHang();
    })
}

function clickSearchDonVi() {
    btnSearchDonVi.click(function () {
        searchDonVi();
    })
}

function searchThuongHieu() {
    let valSearchThuongHieu = inputSearchThuongHieu.val();
    thuongHieuSearch(valSearchThuongHieu).then(rs => {
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
                        arrThuongHieu = rs.data.currentElements;
                        setViewThuongHieu(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    thuongHieuSearch(valSearchThuongHieu, pagination.pageNumber).then(rs => {
                        arrThuongHieu = rs.data.currentElements;
                        setViewThuongHieu(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            arrThuongHieu = [];
            setViewThuongHieu(1);
            paginationReset();
        }
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Search Thuong Hieu");
        setViewThuongHieu(1);
    })
}

function setViewThuongHieu(pageNumber) {
    let view = `<tr>
                    <th>STT</th>
                    <th>Tên thương hiệu</th>
                </tr>`;
    let len = arrThuongHieu.length;
    if (len > 0) {
        view += arrThuongHieu.map((item, index) => `<tr data-index="${index}" class="click-thuong-hieu">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.tenThuongHieu)}</td>
                </tr>`);
        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="2">Không có thông tin phù hợp</td></tr>`
    }
    tableThuongHieu.html(view);
    clickThuongHieu();
}

function searchNhomHang() {
    let valSearchNhomHang = inputSearchNhomHang.val();
    nhomHangSearch(valSearchNhomHang, "").then(rs => {
        if(rs.message === "found") {
            $('#pagination2').pagination({
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
                        arrNhomHang = rs.data.currentElements;
                        setViewNhomHang(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    nhomHangSearch(valSearchNhomHang, "", pagination.pageNumber).then(rs => {
                        arrNhomHang = rs.data.currentElements;
                        setViewNhomHang(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            arrNhomHang = [];
            setViewNhomHang(1);
            paginationReset();
        }
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Search Nhom Hang", TIME_ALTER);
        setViewNhomHang(1);
    })
}

function setViewNhomHang(pageNumber) {
    let view = `<tr>
                    <th>STT</th>
                    <th>Tên nhóm hàng</th>
                    <th>Mã nhóm hàng</th>
                </tr>`;
    let len = arrNhomHang.length;
    if (len > 0) {
        view += arrNhomHang.map((item, index) => `<tr data-index="${index}" class="click-nhom-hang">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.tenNhomHang)}</td>
                    <td>${viewField(item.maNhomHang)}</td>
                </tr>`);
        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td><td></td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="3">Không có thông tin phù hợp</td></tr>`
    }
    tableNhomHang.html(view);
    clickNhomHang();
}

function searchDonVi() {
    let valSearchDonVi = inputSearchDonVi.val();
    donViSearch(valSearchDonVi).then(rs => {
        if(rs.message === "found") {
            $('#pagination3').pagination({
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
                        arrDonVi = rs.data.currentElements;
                        setViewDonVi(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    donViSearch(valSearchDonVi, pagination.pageNumber).then(rs => {
                        arrDonVi = rs.data.currentElements;
                        setViewDonVi(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            arrDonVi = [];
            setViewDonVi(1);
            paginationReset();
        }
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Search Don Vi", TIME_ALTER);
        setViewDonVi(1);
    })
}

function setViewDonVi(pageNumber) {
    let view = `<tr>
                    <th>STT</th>
                    <th>Tên đơn vị</th>
                </tr>`;
    let len = arrDonVi.length;
    if (len > 0) {
        view += arrDonVi.map((item, index) => `<tr data-index="${index}" class="click-don-vi">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.tenDonVi)}</td>
                </tr>`);
        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="2">Không có thông tin phù hợp</td></tr>`
    }
    tableDonVi.html(view);
    clickDonVi();
}

function clickThuongHieu() {
    tableThuongHieu.find("tr:not(.click-thuong-hieu)").unbind("click").click(function () {
        elementThuongHieu = {};
        inputMoiThuongHieu.val("");
    })
    $("tr.click-thuong-hieu").unbind("click").click(function () {
        elementThuongHieu = arrThuongHieu[$(this).attr("data-index")];
        inputMoiThuongHieu.val(viewField(elementThuongHieu.tenThuongHieu));
    })
}

function clickNhomHang() {
    tableNhomHang.find("tr:not(.click-nhom-hang)").unbind("click").click(function () {
        elementNhomHang = {};
        inputMoiNhomHang.val("");
        inputMaNhomHang.val("");
    })
    $("tr.click-nhom-hang").unbind("click").click(function () {
        elementNhomHang = arrNhomHang[$(this).attr("data-index")];
        inputMoiNhomHang.val(viewField(elementNhomHang.tenNhomHang));
        inputMaNhomHang.val(viewField(elementNhomHang.maNhomHang));
    })
}

function clickDonVi() {
    tableDonVi.find("tr:not(.click-don-vi)").unbind("click").click(function () {
        elementDonVi  = {};
        inputMoiDonVi.val("");
    })
    $("tr.click-don-vi").unbind("click").click(function () {
        elementDonVi = arrDonVi[$(this).attr("data-index")];
        inputMoiDonVi.val(viewField(elementDonVi.tenDonVi));
    })
}

function checkTen(selector) {
    let rs = false;
    let size = 255;
    let ten = selector.val();
    let selectorParent = selector.parent();
    if (checkSize(size,ten)) {
        rs = true;
        hiddenError(selectorParent);
    } else viewError(selectorParent,`Độ dài chưa phù hợp > 0 và < ${size}`);
    return {check : rs, val: ten};
}

function clickAddThuongHieu() {
    btnThemThuongHieu.click(function () {
        let {check: check, val: val} = checkTen(inputMoiThuongHieu);
        if(check) {
            let thuongHieu = {
                tenThuongHieu : val
            }
            thuongHieuUpload(thuongHieu).then(rs => {
                if(rs.message === "uploaded") {
                    elementThuongHieu = rs.data;
                    inputMoiThuongHieu.val(viewField(elementThuongHieu.tenThuongHieu));
                    alterSuccess("Thêm thương hiệu thành công", TIME_ALTER);
                    searchThuongHieu();
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Upload Thuong Hieu", TIME_ALTER);
            })
        }
    })
}

function clickSuaThuongHieu() {
    btnSuaThuongHieu.click(function () {
        let {check: check, val: val} = checkTen(inputMoiThuongHieu);
        if(check) {
            elementThuongHieu.tenThuongHieu = val;
            thuongHieuUpdate(elementThuongHieu).then(rs => {
                if(rs.message === "updated") {
                    alterSuccess("Sửa thương hiệu thành công", TIME_ALTER);
                    searchThuongHieu();
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Update Thuong Hieu", TIME_ALTER);
            })
        }
    })
}

function clickXoaThuongHieu() {
    btnXoaThuongHieu.click(function() {
        if(Object.keys(elementThuongHieu).length !== 0) {
            $('#modal-remove').modal('show');
            $("#confirm-yes").unbind("click").click(function () {
                thuongHieuDelete(elementThuongHieu.id).then(rs => {
                    if(rs.message = "deleted") {
                        alterSuccess(`Đã xóa thương hiệu ${elementThuongHieu.tenThuongHieu}`, TIME_ALTER);
                        searchThuongHieu();
                        elementThuongHieu = {};
                    }
                }).catch(err => {
                    console.log(err);
                    alterDanger("Server error - Delete Thuong Hieu")
                })
                // to do remove camera
            })
        } else {
            alterInfo("Vui lòng chọn một thương hiệu để thực hiện thao tác", TIME_ALTER);
        }
    })
}

function clickAddNhomHang() {
    btnThemNhomHang.click(function () {
        console.log("click add nhom hang");
        let {check: check, val: val} = checkTen(inputMoiNhomHang);
        let {check: checkMa, val: valMa} = checkTen(inputMaNhomHang);
        if(check && checkMa) {
            let nhomHang = {
                tenNhomHang : val,
                maNhomHang: valMa
            }
            nhomHangUpload(nhomHang).then(rs => {
                if(rs.message === "uploaded") {
                    elementNhomHang = rs.data;
                    inputMoiNhomHang.val(viewField(elementNhomHang.tenNhomHang));
                    inputMaNhomHang.val(viewField(elementNhomHang.maNhomHang));
                    alterSuccess("Thêm nhóm hàng thành công", TIME_ALTER);
                    searchNhomHang();
                }
            }).catch(err => {
                console.log(err);
                let {data} = err.responseJSON;
                if(data.indexOf("ma-nhom-hang-da-ton-tai") > -1) {
                    console.log("tồn tại");
                    viewError(inputMaNhomHang.parent(), "Mã nhóm hàng đã tồn tại");
                } else {
                    alterDanger("Server Error - Upload Nhom Hang", TIME_ALTER);
                }
            })
        }
    })
}

function clickSuaNhomHang() {
    btnSuaNhomHang.click(function () {
        let {check: check, val: val} = checkTen(inputMoiNhomHang);
        let {check: checkMa, val: valMa} = checkTen(inputMaNhomHang);
        if(check && checkMa) {
            elementNhomHang.tenNhomHang = val;
            elementNhomHang.maNhomHang = valMa;
            nhomHangUpdate(elementNhomHang).then(rs => {
                if(rs.message === "updated") {
                    alterSuccess("Sửa nhóm hàng thành công", TIME_ALTER);
                    searchNhomHang();
                }
            }).catch(err => {
                console.log(err);
                let {data} = err.responseJSON;
                if(data.indexOf("ma-nhom-hang-da-ton-tai") > -1) {
                    console.log("tồn tại");
                    viewError(inputMaNhomHang.parent(), "Mã nhóm hàng đã tồn tại");
                } else {
                    alterDanger("Server Error - Update Nhom Hang", TIME_ALTER);
                }
            })
        }
    })
}

function clickXoaNhomHang() {
    btnXoaNhomHang.click(function() {
        if(Object.keys(elementNhomHang).length !== 0) {
            $('#modal-remove').modal('show');
            $("#confirm-yes").unbind("click").click(function () {
                nhomHangDelete(elementNhomHang.id).then(rs => {
                    if(rs.message = "deleted") {
                        alterSuccess(`Đã xóa nhóm hàng ${elementNhomHang.tenNhomHang}`, TIME_ALTER);
                        searchNhomHang();
                        elementNhomHang = {};
                    }
                }).catch(err => {
                    console.log(err);
                    alterDanger("Server error - Delete Nhom Hang")
                })
                // to do remove camera
            })
        } else {
            alterInfo("Vui lòng chọn một nhóm hàng để thực hiện thao tác", TIME_ALTER);
        }
    })
}

function clickAddDonVi() {
    btnThemDonVi.click(function () {
        let {check: check, val: val} = checkTen(inputMoiDonVi);
        if(check) {
            let donVi = {
                tenDonVi : val
            }
            donViUpload(donVi).then(rs => {
                if(rs.message === "uploaded") {
                    elementDonVi = rs.data;
                    inputMoiDonVi.val(viewField(elementDonVi.tenDonVi));
                    alterSuccess("Thêm đơn vị thành công", TIME_ALTER);
                    searchDonVi();
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Upload Don Vi", TIME_ALTER);
            })
        }
    })
}

function clickSuaDonVi() {
    btnSuaDonVi.click(function () {
        let {check: check, val: val} = checkTen(inputMoiDonVi);
        if(check) {
            elementDonVi.tenDonVi = val;
            donViUpdate(elementDonVi).then(rs => {
                if(rs.message === "updated") {
                    alterSuccess("Sửa đơn vị thành công", TIME_ALTER);
                    searchDonVi();
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Update Don Vi", TIME_ALTER);
            })
        }
    })
}

function clickXoaDonVi() {
    btnXoaDonVi.click(function() {
        if(Object.keys(elementDonVi).length !== 0) {
            $('#modal-remove').modal('show');
            $("#confirm-yes").unbind("click").click(function () {
                donViDelete(elementDonVi.id).then(rs => {
                    if(rs.message = "deleted") {
                        alterSuccess(`Đã xóa đơn vị ${elementDonVi.tenDonVi}`, TIME_ALTER);
                        searchDonVi();
                        elementDonVi = {};
                    }
                }).catch(err => {
                    console.log(err);
                    alterDanger("Server error - Delete Don Vi")
                })
                // to do remove camera
            })
        } else {
            alterInfo("Vui lòng chọn một đơn vị để thực hiện thao tác", TIME_ALTER);
        }
    })
}


