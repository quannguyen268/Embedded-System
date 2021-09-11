var arr  = [];
var inputMaHoaDon, inputTenKhachHang, inputTenNhanVien, inputTuNgay,    inputDenNgay, btnTimKiem, selectTrangThai;
const TRANG_THAI_HOA_DON = ["Lưu Tạm", "Đang Giao","Đã Giao","Đang Đóng Gói","Khách Hủy", "Đơn Vị Giao Hủy"];

function viewTrangThai(hoaDon) {
    return TRANG_THAI_HOA_DON[hoaDon.trangThai];
}

function viewThoiGian(thoiGian){
    var tg = thoiGian.substring(11,19) + " " + thoiGian.substring(8,10) +"/"
        + thoiGian.substring(5,7) + "/" + thoiGian.substring(0,4);
    return tg;
}

$(function () {
    table=$("#table-hoa-don");
    selectChiNhanh = $("#bimo0");
    inputMaHoaDon = $("#bimo1");
    inputTenKhachHang = $("#bimo2");
    inputTenNhanVien = $("#bimo3");
    selectTrangThai = $("#bimo4");
    inputTuNgay = $("#bimo5");
    inputDenNgay = $("#bimo6");
    btnTimKiem = $("#btn-search");

    viewSelectChiNhanhFindByTongCongTy().then(rs => {
        selectChiNhanh.html(`<option value="0">Tất cả chi nhánh</option>`+rs);
        runSelect2();
        selectChiNhanh.change(function () {
            //change chi nhanh tong
            //reset text search
            let chiNhanhId = selectChiNhanh.val()
            callSearchHoaDonByChiNhanh(chiNhanhId);
            //recall data
        })
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Select Chi Nhanh",TIME_ALTER);
    })

    callSearchHoaDon("","","",null,null,-1,1,10);
    clickSearchPhieuNhapHang();
    checkThoiGianTHDN();
    changeTrangThai();
    taiExcelTK();
});

function clickSearchPhieuNhapHang() {
    btnTimKiem.click(function () {
        let maHoaDon = inputMaHoaDon.val();
        let tenKhachHang = inputTenKhachHang.val();
        let tenNhanVien = inputTenNhanVien.val();
        let trangThai = selectTrangThai.val();
        let {check, valTuNgay, valDenNgay} = checkThoiGianTHDN();
        if(check) {
            valTuNgay = valTuNgay === '' ? null : convertDateISO(valTuNgay).toISOString();
            valDenNgay = valDenNgay === '' ? null : convertDateISO(valDenNgay).toISOString();
            callSearchHoaDon(maHoaDon,tenKhachHang,tenNhanVien,valTuNgay, valDenNgay, trangThai ,1, 10);
        }
    });
}

function callSearchHoaDon(maHoaDon,tenKhachHang,tenNhanVien,valTuNgay, valDenNgay, trangThai,page=1,size=10) {
    searchHoaDon(maHoaDon,tenKhachHang,tenNhanVien,valTuNgay, valDenNgay, trangThai).then(rs => {
        if (rs.message === "found") {
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
                        setViewHoaDon(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    searchHoaDon(maHoaDon,tenKhachHang,tenNhanVien,valTuNgay, valDenNgay, trangThai, pagination.pageNumber,10).then(rs => {
                        arr = rs.data.currentElements;
                        setViewHoaDon(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            arr = [];
            setViewHoaDon(1);
            paginationReset();
        }
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Không tìm thấy hóa đơn");
        setViewHoaDon(1);
    })
}

function callSearchHoaDonByChiNhanh(chiNhanhId=0) {
    searchHoaDonByChiNhanh(chiNhanhId).then(rs =>{
        if (rs.message === "found") {
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
                        setViewHoaDon(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    searchHoaDonByChiNhanh(chiNhanhId,"", pagination.pageNumber,10).then(rs => {
                        arr = rs.data.currentElements;
                        setViewHoaDon(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        }else {
            arr = [];
            setViewHoaDon(1);
            paginationReset();
        }
    })
}

function setViewHoaDon(pageNumber) {
    let view = `<tr>
                <th>STT</th>
                <th>Mã hóa đơn</th>
                <th>Thời gian</th>
                <th>Nhân viên</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Tiền khách trả</th>
                <th>Tiền trả lại khách</th>
                <th>Trạng thái</th>
                </tr>`;
    let len = arr.length;
    if (len > 0) {
        view += arr.map((item, index) => `<tr data-index="${index}" class="click-thuong-hieu">
                    <td data-id="${viewField(item.id)}">${(pageNumber - 1)*10 + index + 1}</td>
                    <td><a href="hoa-don-chi-tiet?id=${item.id}" target="_blank">${viewField(item.ma)}</a></td>
                    <td>${viewThoiGian(item.thoiGian)}</td>
                    <td>${viewField(item.nguoiDung.hoVaTen)}</td>
                    <td>${viewField(item.khachHang.tenKhachHang)}</td>
                    <td>${viewField(item.tongTien)}</td>
                    <td>${viewField(item.tienKhachTra)}</td>
                    <td>${viewField(item.tienTraLaiKhach)}</td>
                    <td><button type="button" class="trang-thai-btn trang-thai-btn-${index} btn btn-default" style="width: 120px">
                            ${viewTrangThai(item)}
                        </button>
                    </td>
                </tr>`);
        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td>  <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="9">Không có thông tin phù hợp</td></tr>`
    }
    table.html(view);
}

function changeTrangThai() {
    $(document).on('click', '.trang-thai-btn', function () {
        let trangThaiCu = $.trim($(this).text());
        let currentRow = $(this).closest("tr");
        let hoaDonId = currentRow.find("td:eq(0)").attr("data-id");
        let valueCu = TRANG_THAI_HOA_DON.indexOf(trangThaiCu);
        $("#trang-thai-cu").text(`Trạng thái cũ : ${trangThaiCu}`);
        $("#select-trang-thai").val(valueCu);
        $('#select-trang-thai').trigger('change');
        $("#modal-trang-thai").modal('toggle');
        $("#confirm-btn").click(function () {
            let valueMoi = $("#select-trang-thai").find(':selected')[0].value;
            if(valueCu != valueMoi){
                setTrangThaiHoaDon(hoaDonId,valueMoi).then(rs => {
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

//tai excel va in thong tin hoa don
function taiExcelTK() {
    let arrExcel  = [];
    $('#btn-excel').on('click', function () {

        excelHoaDon().then(rs => {
            arrExcel = rs.data;
            console.log(arrExcel);
        ajaxGet('v1/admin/hoa-don/excel?list-hoa-don=' + arrExcel.map(hoaDon => hoaDon.id))
            .then(rs => {
                // window.open(rs.data, '_blank');
            }).catch(ex => {
            console.log(ex);
            alterDanger("Tạo file excel thất bại");
        })
        alterSuccess("Created Excel Success");
        });
        console.log(arrExcel);
    });
    clickPrintElement(".ttcttk");
}

