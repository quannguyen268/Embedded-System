var inputMaNhapHang, selectNhaCungCap, inputTuNgay, inputDenNgay, btnTimKiem, tableData, selectTrangThai;
var arr=[];

const TRANG_THAI_PHIEU_NHAP = ["Lưu Tạm", "Đang Giao","Đã Giao","Đang Đóng Gói","Nhà Cung Cấp Hủy", "Đơn Vị Giao Hủy"];

function viewTrangThai(phieuNhap) {
    return TRANG_THAI_PHIEU_NHAP[phieuNhap.trangThai];
}

$(function(){
    inputMaNhapHang = $("#bimo1");
    selectNhaCungCap = $("#bimo2");
    selectTrangThai = $("#bimo5");
    selectChiNhanh = $("#bimo0");
    inputTuNgay = $("#bimo3");
    inputDenNgay = $("#bimo4");
    btnTimKiem = $("#btn-search");
    tableData = $("tbody");

    viewSelectChiNhanhFindByTongCongTy().then(rs => {
        selectChiNhanh.html(`<option value="0">Tất cả chi nhánh</option>`+rs);
        runSelect2();
        selectChiNhanh.change(function () {
            //change chi nhanh tong
            //reset text search
            let chiNhanhId = selectChiNhanh.val()
            callSearchPhieuNhapHangByChiNhanh(chiNhanhId);
            //recall data
        })
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Select Chi Nhanh",TIME_ALTER);
    })

    viewSelectNhaCungCap(selectNhaCungCap);
    clickSearchPhieuNhapHang();
    searchDanhSachNhapHang("",null, null, 0, 1, 1, 10);
    changeTrangThai();
    checkThoiGianTHDN();
    taiExcelTK();
})


function clickSearchPhieuNhapHang() {
    btnTimKiem.click(function () {
        let maPhieuNhap = inputMaNhapHang.val();
        let nhaCungCap = selectNhaCungCap.val();
        let trangThai = selectTrangThai.val();
        let {check, valTuNgay, valDenNgay} = checkThoiGianTHDN();
        if(check) {
            valTuNgay = valTuNgay === '' ? null : convertDateISO(valTuNgay).toISOString();
            valDenNgay = valDenNgay === '' ? null : convertDateISO(valDenNgay).toISOString();
            searchDanhSachNhapHang(maPhieuNhap,valTuNgay, valDenNgay,nhaCungCap, trangThai ,1, 10);
        }
    })
}

function searchDanhSachNhapHang(maPhieuNhap,valTuNgay, valDenNgay,nhaCungCap, trangThai ,page = 1, size = 10) {
    phieuNhapHangSearch(maPhieuNhap, valTuNgay, valDenNgay, nhaCungCap, -1, page ,size).then(rs => {
        if(rs.message === "found") {
            $('#pagination').pagination({
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
                        arr = rs.data.currentElements;
                        setViewDanhSachNhapHang( rs.data.currentElements, 1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    phieuNhapHangSearch(maPhieuNhap, valTuNgay, valDenNgay, nhaCungCap, -1, pagination.pageNumber).then(rs => {
                        arr = rs.data.currentElements;
                        setViewDanhSachNhapHang(rs.data.currentElements, pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            setViewDanhSachNhapHang([], 1);
        }
    }).catch(err => {
        alterDanger("Server search error danh sach nhap hang", TIME_ALTER);
        console.log(err);
    })
}

function callSearchPhieuNhapHangByChiNhanh(chiNhanhId) {
    searchPhieuNhapHangByChiNhanh(chiNhanhId).then(rs => {
        if(rs.message === "found") {
            $('#pagination').pagination({
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
                        arr = rs.data.currentElements;
                        setViewDanhSachNhapHang( rs.data.currentElements, 1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    searchPhieuNhapHangByChiNhanh(chiNhanhId,"", pagination.pageNumber).then(rs => {
                        arr = rs.data.currentElements;
                        setViewDanhSachNhapHang(rs.data.currentElements, pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            setViewDanhSachNhapHang([], 1);
        }
    }).catch(err => {
        alterDanger("Server search error danh sach nhap hang", TIME_ALTER);
        console.log(err);
    })
}

function setViewDanhSachNhapHang(list, pageNumber) {
    let view = `<tr>
                <th>STT</th>
                <th>Mã nhập hàng</th>
                <th>Thời gian</th>
                <th>Nhà cung cấp</th>
                <th>Cần trả NCC</th>
                <th>Trạng thái</th>
            </tr>`;
    let len = list.length;
    if (len > 0) {
        view += list.map((data, index) => `<tr>
                <td data-id="${viewField(data.id)}">${(pageNumber - 1)*10 + index + 1}</td>
                <td><a href="nhap-hang-chi-tiet?id=${data.id}" target="_blank">${viewField(data.maPhieu)}</a></td>
                <td>${viewDateTime(data.thoiGian)}</td>
                <td>${data.nhaCungCap == null ? "" : viewField(data.nhaCungCap.ten)}</td>
                <td>${viewField(data.tienPhaiTra)}</td>
                <td><button type="button" class="trang-thai-btn trang-thai-btn-${index} btn btn-default" style="width: 120px">
                            ${viewTrangThai(data)}
                    </button>
                </td>
            </tr>`).join("");
        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td><td></td><td></td><td></td><td></td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="6">Không có thông tin phù hợp</td></tr>`
    }
    tableData.html(view);
}

function changeTrangThai() {
    $(document).on('click', '.trang-thai-btn', function () {
        let trangThaiCu = $.trim($(this).text());
        let currentRow = $(this).closest("tr");
        let phieuNhapId = currentRow.find("td:eq(0)").attr("data-id");
        let valueCu = TRANG_THAI_PHIEU_NHAP.indexOf(trangThaiCu);
        $("#trang-thai-cu").text(`Trạng thái cũ : ${trangThaiCu}`);
        $("#select-trang-thai").val(valueCu);
        $('#select-trang-thai').trigger('change');
        $("#modal-trang-thai").modal('toggle');
        $("#confirm-btn").click(function () {
            let valueMoi = $("#select-trang-thai").find(':selected')[0].value;
            if(valueCu != valueMoi){
                setTrangThaiPhieuNhapHang(phieuNhapId,valueMoi).then(rs => {
                    if(rs.message === "success"){
                        let hang = parseInt(currentRow.find("td:eq(0)").text());
                        $(`.trang-thai-btn-${hang-1}`).text($("#select-trang-thai").find(':selected')[0].text);
                        $("#modal-trang-thai").modal('hide');
                        alterSuccess("Thay đổi trạng thái hóa đơn thành công");
                    }else{
                        alterDanger("Thay đổi trạng thái hóa đơn không thành công")
                    }
                });
            }else{
                alterSuccess("Bạn không có thay đổi gì");
                $("#modal-trang-thai").modal('hide');
            }
        })

    })
}

function checkThoiGianTHDN() {
    let rs = true;
    let {check: checkTuNgay, val: valTuNgay} = checkNgayTKDSDN(inputTuNgay);
    let {check: checkDenNgay, val: valDenNgay} = checkNgayTKDSDN(inputDenNgay);
    let selectorDenNgay = inputDenNgay.parents(".form-group");
    if (valTuNgay !== "" && valDenNgay !== "" && !compareDate(valTuNgay, valDenNgay)) {
        rs = false;
        viewError(selectorDenNgay, "Thời gian giới hạn phải lớn hơn");
    } else hiddenError(selectorDenNgay);
    return {check: rs, valTuNgay: valTuNgay, valDenNgay: valDenNgay};
}

function checkNgayTKDSDN(selectorNgay) {
    let rs = false;
    let val = selectorNgay.val();
    let selector = selectorNgay.parents(".form-group");
    if (val === '' || regexDate(val)) {
        rs = true;
        hiddenError(selector);
    } else viewError(selector, "Chưa đúng định dạng ngày");
    return {check: rs, val: val};
}

function taiExcelTK() {
    $('#btn-excel').on('click', function () {
        console.log("inds");
        ajaxGet('v1/admin/phieu-nhap-hang/excel?list-phieu-nhap-hang=' + arr.map(hoaDon => hoaDon.id))
            .then(rs => {
                window.open(rs.data, '_blank');
            }).catch(ex => {
            console.log(ex);
            alterDanger("Tạo file excel thất bại");
        })
    });
    clickPrintElement(".ttcttk");
}