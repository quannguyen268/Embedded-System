var selectChiNhanh, inputSearch, btnSearch, textSoLuongTaiKhoan, dataTable,
    inputMaTaiKhoan, inputHoVaTen, inputTaiKhoan,inputMatKhau, inputEmail, inputSDT,
    inputDiaChi,inputNgaySinh,inputTGKT,inputTGKH,inputTGHH,gioiTinh,trangThai,
    anhDaiDien , iconThemTaiKhoan , kichHoat , gTNam
    , btnLamMoi,
    btnThemMoi, btnCapNhap, btnXoa, btnThemMoiNhom,
    selectChiNhanhMoi,radioGT,
    btnThemMoiNhomThieBi;

var totalElementsTaiKhoan = 0;
var arrElements  = [];
var elementTaiKhoan = {};
var currentPageTaiKhoan = 0;
$(function () {
    selectChiNhanh = $("#select-1");
    inputSearch = $("#input-text-1");
    btnSearch = $("#btn-1");
    textSoLuongTaiKhoan = $("#text-1");
    dataTable = $("#data-table");
    inputMaTaiKhoan = $("#input-text-2");
    inputHoVaTen = $("#input-text-3");
    inputTaiKhoan = $("#input-text-4");
    inputMatKhau =$("#input-text-5");
    inputEmail = $("#input-text-6");
    inputSDT = $("#input-text-7");
    inputDiaChi = $("#input-text-8");
    inputNgaySinh = $("#input-date-1");
    inputTGKT =  $("#input-date-2");
    inputTGKH = $("#input-date-3");
    inputTGHH = $("#input-date-4");
     gioiTinh = $("input[name='gender']");
     trangThai = $("input[name='status']");
    anhDaiDien= $("#customFile-1");
    btnLamMoi = $(".them-moi");
    btnThemMoi = $("#btn-3");
    iconThemTaiKhoan = $(".them-moi-tk");
    btnCapNhap = $("#btn-4");
    btnXoa = $(".btn-xoa");
    btnThemMoiNhom = $("#btn-6");
    selectChiNhanhMoi = $("#select-4");
    btnThemMoiNhomThieBi = $("#btn-7");
   radioGT= $("#radio-1");
    gTNam=$("#gTNam");
    kichHoat=$("#kichHoat");

    //load chi nhanh
    viewSelectChiNhanhFindByTongCongTy().then(rs => {
        selectChiNhanh.html(`<option value="0">Tất cả chi nhánh</option>`+rs);
        selectChiNhanhMoi.html(rs);
        runSelect2();

        selectChiNhanh.change(function () {
            //change chi nhanh tong
            changeSelectChiNhanhMoi();
            //reset text search
            inputSearch.val("");
            btnSearch.trigger("click");
            //recall data
        })
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Select Chi Nhanh",TIME_ALTER);
    })

    //end load chi nhanh
    clickSearchTaiKhoan();
    callSearchTaiKhoan();
    clickRefeshInforTaiKhoan();
    uploadTaiKhoan();
    updateTaiKhoan();
    deleteTaiKhoan();
    clickThemTaiKhoan();
    lockTaiKhoan();
    taiExcelTK();
})

function changeSelectChiNhanhMoi() {
    let val = selectChiNhanh.val();
    if(val == 0) {
        selectChiNhanhMoi.prop("disabled", false);
    } else {
        selectChiNhanhMoi.prop("disabled", true);
        selectChiNhanhMoi.val(val);
    }
    selectChiNhanhMoi.trigger("change");
}


function callSearchTaiKhoan(chiNhanhId = 0, text = "") {
    findTaiKhoanByChiNhanhAndText(chiNhanhId, text).then(rs => {
        if(rs.message === "found") {
            rs = rs.data;
            totalElementsTaiKhoan = rs.totalElements;
            console.log(totalElementsTaiKhoan);
            arrElements = rs.content;
            console.log(arrElements);
            currentPageTaiKhoan = 1;
            viewDataTaiKhoan(1);
            $("#click-load-data").unbind("click").click(function () {
                console.log("click load data");
                if(arrElements.length >= totalElementsTaiKhoan) {
                    console.log("vao day");
                    loadEndData();
                 } else {
                    findTaiKhoanByChiNhanhAndText(chiNhanhId, text, ++currentPageTaiKhoan).then(rs => {
                        if(rs.message == "found") {
                            console.log(rs.data.currentElements);
                            arrElements = arrElements.concat(rs.data.content);
                            viewDataTaiKhoan(currentPageTaiKhoan);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        } else {
            totalElementsTaiKhoan = 0;
            arrElements = [];
            viewDataTaiKhoan( 1);
            loadEndData();
        }
        viewTongSoTaiKhoan();
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Search TaiKhoan",TIME_ALTER);
    })
}



function viewTongSoTaiKhoan() {
    let text = (totalElementsTaiKhoan+"").length == 1 && totalElementsTaiKhoan != 0 ? "0"+totalElementsTaiKhoan: totalElementsTaiKhoan;
    textSoLuongTaiKhoan.text(text);
}

function clickSearchTaiKhoan() {
    btnSearch.click(function () {
        let chiNhanhId = selectChiNhanh.val(),  text = inputSearch.val();
        callSearchTaiKhoan(chiNhanhId, text);
    })
}

function viewDataTaiKhoan(page) {
    let view = "";
    if (arrElements !== null && arrElements.length > 0) {
        view += arrElements.map((data, index) => `<tr data-index="${index}">
                                <td>${index + 1}</td>
                                <td>${viewField(data.nguoiDung.maTaiKhoan)}</td>
                                <td>${viewField(data.nguoiDung.taiKhoan)}</td>
                                <td>${viewTrangThaiTaiKhoan(data.nguoiDung)}</td>
                                <td>
                                  <div class="chucnang">
                                  <i class="fas fa-pen sua"></i>
                                 <i class="fas fa-lock btn-khoa" data-toggle="modal" data-target="#modal-change" ></i>
                                 <i class="fas fa-trash-alt btn-xoa" data-toggle="modal" data-target="#modal-remove"></i>
                                <i class="fas fa-print"></i>
                                <i class="fas fa-history"></i>
                                 <i class="fas fa-user-lock"></i>
                               </div>
                              </td>
                                    <td>
                                   <img src="http://localhost:8181/api/v1/admin/tai-khoan/qrcode?id=${data.nguoiDung.id}" width="100px" height="100px">
                                   </td>
                            </tr>`)
    } else {
        view = '<tr><td colspan="9"><strong>Không có thông tin thích hợp!</strong></td></tr>';
    }
    if(page == 1) resetIconLoadData();
    $(dataTable).find("tr:not(#click-load-data)").remove();
    $(view).insertBefore("#click-load-data");
    clickElementTableTaiKhoan();
}

function clickRefeshInforTaiKhoan() {
    btnLamMoi.click(function () {
        console.log("btn-lam moi");
        elementTaiKhoan = {};
        inputMaTaiKhoan.val("");
        inputHoVaTen.val("");
        inputTaiKhoan.val("");
        inputMatKhau.val("");
        inputEmail.val("");
        inputSDT.val("");
        inputDiaChi.val("");
        inputNgaySinh.val("");
        inputTGKH.val("");
        inputTGKT.val("");
        inputTGHH.val("");
        gioiTinh.prop('checked', false);
        trangThai.prop('checked', false);
        anhDaiDien.value = "";
    })
}

function clickThemTaiKhoan() {
    iconThemTaiKhoan.click(function () {
        clickRefeshInforTaiKhoan();
        $(".show-them-moi").toggle();
        $("#show-mat-khau").toggle();
        inputTaiKhoan.removeAttr('disabled');
        inputMatKhau.removeAttr('disabled');
        inputEmail.removeAttr('disabled');
    })
}



function clickElementTableTaiKhoan() {
    $(dataTable).find("tr:not(#click-load-data)").unbind("click").click(function () {
        inputHoVaTen.focus();
        btnCapNhap.toggle();
        console.log(this);
        let valIndex = $(this).attr("data-index");
        console.log(arrElements[valIndex - 0]);
        elementTaiKhoan = arrElements[valIndex - 0];

        viewInforelementTaiKhoan();
    })
}

//validate
function checkHoTen() {
    let rs = false;
    let size = 255;
    let val = inputHoVaTen.val();
    if (checkSize(size,val)) {
        rs = true;
        hiddenError(inputHoVaTen);
    } else viewError(inputHoVaTen,`Độ dài chưa phù hợp > 0 và < ${size}`);
    return {check : rs, val: val};
}

function checkTaiKhoan() {
    let rs = false;
    let size = 255;
    let val = inputTaiKhoan.val();
    if (checkSize(size,val)) {
        rs = true;
        hiddenError(inputTaiKhoan);
    } else viewError(inputTaiKhoan,`Độ dài chưa phù hợp > 0 và < ${size}`);
    return {check : rs, val: val};
}

function checkMatKhau() {
    let rs = false;
    let val = inputMatKhau.val();
    if (regexPassword(val)) {
        rs = true;
        hiddenError(inputMatKhau);
    } else viewError(inputMatKhau,`Mật khẩu phải có tối thiểu 8 kí tự , chứa chữ cái thường , số và kí tự đặc biệt`);
    return {check : rs, val: val};
}

function checkEmail(){
    let rs = false;
    let val = inputEmail.val();
    if (regexEmail(val)) {
        rs = true;
        hiddenError(inputEmail);
    } else viewError(inputEmail,`Email chưa đúng định dạng`);
    return {check : rs, val: val};
}


function checkSDT() {
    let rs = false;
    let val = inputSDT.val();
    if (regexDienThoai(val)) {
        rs = true;
        hiddenError(inputSDT);
    } else viewError(inputSDT,`Số điện thoại chưa đúng định dạng`);
    return {check : rs, val: val};
}


function checkDiaChi() {
    let rs = false;
    let size = 255;
    let val = inputDiaChi.val();
    if (checkSize(size,val)) {
        rs = true;
        hiddenError(inputDiaChi);
    } else viewError(inputDiaChi,`Độ dài chưa phù hợp > 0 và < ${size}`);
    return {check : rs, val: val};
}


function checkGT() {
    let rs = false;
    let size = 255;
    let val = $("input[name='gender']:checked").val();

    if (val==0 || val ==1) {
        rs = true;
        hiddenError(gTNam);
    } else if (val==undefined) {
        viewError(gTNam,`Chưa chọn giới tính`);}
    return {check : rs, val: val};
}

function checkNS() {
    let rs = false;
    let val = inputNgaySinh.val();
    console.log(val);
    console.log(isValidDate(val));
    if (isValidDate(val)) {
        rs = true;
        hiddenError(inputNgaySinh);
    } else viewError(inputNgaySinh,`Ngày không được để trống`);
    return {check : rs, val: val};
}
function checkTGT() {
    let rs = false;
    let val = inputTGKT.val();
    if (isValidDate(val)) {
        rs = true;
        hiddenError(inputTGKT);
    } else viewError(inputTGKT,`Ngày không được để trống`);
    return {check : rs, val: val};
}

function checkTGKH() {
    let rs = false;
    let val = inputTGKH.val();
    if (isValidDate(val)) {
        rs = true;
        hiddenError(inputTGKH);
    } else viewError(inputTGKH,`Ngày không được để trống`);
    return {check : rs, val: val};
}
function checkTGHH() {
    let rs = false;
    let val = inputTGHH.val();
    if (isValidDate(val)) {
        rs = true;
        hiddenError(inputTGHH);
    } else viewError(inputTGHH,`Ngày không được để trống`);
    return {check : rs, val: val};
}

function checkTT() {
    let rs = false;
    let val = $("input[name='status']:checked").val();
    if (val==0 || val ==1) {
        rs = true;
        hiddenError(kichHoat);
    } else if (val==undefined) {
        viewError(kichHoat,`Chưa chọn trạng thái`);}
    return {check : rs, val: val};
}


function checkAnhDaiDien() {
    let rs = false;
    let val = $(anhDaiDien);
    let  len = val[0].files.length;
    if (len > 0) {
        rs = true;
        hiddenError(anhDaiDien);
    } else alterWarning(`Vui lòng chọn ảnh đại diện`, TIME_ALTER);
    return {check : rs, val: val};
}
//end validate

function uploadTaiKhoan() {
    btnThemMoi.click(function() {
        let {check: checkHVT, val: valHVT} = checkHoTen();
        let {check: checkTk, val: valTk} = checkTaiKhoan();
        let {check: checkMk, val: valMk} = checkMatKhau();
        let {check: checkmail, val: valEmail} = checkEmail();
        let {check: checkSdt, val: valSdt} = checkSDT();
        let {check: checkDC, val: valDC} = checkDiaChi();
        let {check: checkns, val: valns} = checkNS();
        let {check: checktgt, val: valtgt} = checkTGT();
        let {check: checktgkh, val: valtgkh} = checkTGKH();
        let {check: checktghh, val: valttghh} = checkTGHH();
        let {check: checkgt, val: valgt} = checkGT();
        let {check: checktt, val: valtt} = checkTT();
        let {check: checkAnh, val: valAnh} = checkAnhDaiDien();
        let maTk = "TK-00" + Math.floor(Math.random() * 100) + 1 ;
        console.log(maTk);
        // console.log(rs[0]);
        if(checkHVT && checkTk && checkMk && checkmail && checkSdt && checkDC && checkgt
            && checkns && checktgt && checktgkh && checktghh && checktt && checkAnh ) {
            uploadFiles(valAnh).then(rs => {
                if(rs !== null && rs.length > 0) {
                    console.log(rs);
                    console.log(rs[0]);
                    let taiKhoanNew = {
                        maTaiKhoan : maTk ,
                        email: valEmail,
                        soDienThoai: valSdt,
                        taiKhoan: valTk,
                        matKhau: valMk,
                        hoVaTen: valHVT,
                        diaChi: valDC,
                        ngaySinh : valns,
                        gioiTinh: valgt,
                        thoiGianKhoiTao: valtgt,
                        thoiGianKichHoat: valtgkh,
                        thoiGianHetHan: valttghh,
                        trangThai: valtt,
                        urlAnhDaiDien: rs[0]
                    }

                    console.log(taiKhoanNew);
                    uploadTaiKhoan(taiKhoanNew, 1, 1,1).then(rs => {
                        if(rs.message === "uploaded") {
                            alterSuccess("Thêm tài khoản thành công", TIME_ALTER);
                            btnSearch.trigger("click");
                            elementTaiKhoan = rs.data;
                            viewInforelementTaiKhoan();
                        }
                    }).catch(err => {
                        console.log(err);
                        alterWarning("Server error - Upload TaiKhoan", TIME_ALTER);
                    })
                } else {
                    alterDanger("Server error - Upload file");
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server error - Upload file");
            })
        }
    })
}

function updateTaiKhoan() {
    btnCapNhap.click(async function () {
        if(Object.keys(elementTaiKhoan).length !== 0) {
            let {check: checkHVT, val: valHVT} = checkHoTen();
            let {check: checkTk, val: valTk} = checkTaiKhoan();
            let {check: checkMk, val: valMk} = checkMatKhau();
            let {check: checkmail, val: valEmail} = checkEmail();
            let {check: checkSdt, val: valSdt} = checkSDT();
            let {check: checkDC, val: valDC} = checkDiaChi();
            let {check: checkns, val: valns} = checkNS();
            let {check: checktgt, val: valtgt} = checkTGT();
            let {check: checktgkh, val: valtgkh} = checkTGKH();
            let {check: checktghh, val: valttghh} = checkTGHH();
            let {check: checkgt, val: valgt} = checkGT();
            let {check: checktt, val: valtt} = checkTT();
            let {check: checkAnh, val: valAnh} = checkAnhDaiDien();

            if(checkHVT && checkTk && checkMk && checkmail && checkSdt && checkDC && checkgt
                && checkns && checktgt && checktgkh && checktghh && checktt ) {
                if(checkAnh) {
                    await uploadFiles(valAnh).then(rs => {
                        if (rs !== null && rs.length > 0) {
                            console.log(rs);
                            elementTaiKhoan.urlAnhDaiDien = rs[0];
                        } else {
                            alterDanger("Server error - Upload file");
                        }
                    }).catch(err => {
                        console.log(err);
                        alterDanger("Server error - Upload file");
                    })
                } else {
                    hiddenError(anhDaiDien);
                }

                let taiKhoan = {
                    email: valEmail,
                    soDienThoai: valSdt,
                    taiKhoan: valTk,
                    matKhau: valMk,
                    hoVaTen: valHVT,
                    diaChi: valDC,
                    ngaySinh : valns,
                    gioiTinh: valgt,
                    thoiGianKhoiTao: valtgt,
                    thoiGianKichHoat: valtgkh,
                    thoiGianHetHan: valttghh,
                    trangThai: valtt,
                    urlAnhDaiDien: elementTaiKhoan.urlAnhDaiDien
                }
                console.log(taiKhoan);

                taiKhoanUpdate(taiKhoan).then(rs => {
                    if(rs.message === "updated") {
                        alterSuccess("Sửa thông tin tài khoản thành công", TIME_ALTER);
                        btnSearch.trigger("click");
                        elementTaiKhoan = rs.data;
                        viewInforelementTaiKhoan();
                    }
                }).catch(err => {
                    console.log(err);
                    alterDanger("Server error - Update tài khoản");
                })
            }
        } else {
            alterInfo("Vui lòng chọn một tài khoản để thực hiện thao tác", TIME_ALTER);
        }
    })
}

function deleteTaiKhoan() {
    // to do check element remove

            $("#confirm-yes").unbind("click").click(function () {
                console.log(elementTaiKhoan.id+ "click xoa tai khoan");
                xoaTaiKhoan(elementTaiKhoan.id).then(rs => {
                    console.log(elementTaiKhoan.id);
                    if(rs.message = "deleted") {
                        alterSuccess(`Đã xóa tài khoản ${elementTaiKhoan.maTaiKhoan}`, TIME_ALTER);
                        btnLamMoi.trigger("click");
                        btnSearch.trigger("click");
                    }
                }).catch(err => {
                    console.log(err);
                    alterDanger("Server error - Delete Account")
                })
                // to do remove TaiKhoan
            })

}

function lockTaiKhoan() {
    // to do check element remove

    $("#change-yes").unbind("click").click(function () {
        console.log(elementTaiKhoan.id+ "click xoa tai khoan");

        if(elementTaiKhoan.trangThai==1){
            alterDanger("Tài khoản đã ở trạng thái khóa")
        }
        else {
            khoaTaiKhoan(elementTaiKhoan.id).then(rs => {
                console.log(elementTaiKhoan.id);
                if(rs.message = "success") {
                    alterSuccess(`Đã khóa tài khoản ${elementTaiKhoan.maTaiKhoan}`, TIME_ALTER);
                    btnLamMoi.trigger("click");
                    btnSearch.trigger("click");
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server error - Lock Account")
            })
        }
        // to do remove TaiKhoan
    })
}



function viewInforelementTaiKhoan() {
    inputMaTaiKhoan.val(viewField(elementTaiKhoan.maTaiKhoan));
    inputHoVaTen.val(viewField(elementTaiKhoan.hoVaTen));
    inputTaiKhoan.val(viewField(elementTaiKhoan.taiKhoan));
    inputEmail.val(viewField(elementTaiKhoan.taiKhoan));
    inputSDT.val(viewField(elementTaiKhoan.soDienThoai));
    inputDiaChi.val(viewField(elementTaiKhoan.diaChi));
    inputNgaySinh.val(viewField(elementTaiKhoan.ngaySinh));
    inputTGKH.val(viewField(elementTaiKhoan.thoiGianKhoiTao));
    inputTGKT.val(viewField(elementTaiKhoan.thoiGianKichHoat));
    inputTGHH.val(viewField(elementTaiKhoan.thoiGianHetHan));

    if (elementTaiKhoan.gioiTinh==1){
        $('#gTNam').prop('checked', true);
        $('#gTNu').prop('checked', false);
    }
    else if(elementTaiKhoan.gioiTinh==0){
        $('#gTNam').prop('checked', false);
        $('#gTNu').prop('checked', true);
    }
    else {
        $('#gTNam').prop('checked', false);
        $('#gTNu').prop('checked', false);
    }

    if (elementTaiKhoan.trangThai==0){
        $('#kichHoat').prop('checked', true);
        $('#khoa').prop('checked', false);
    }
    else if(elementTaiKhoan.trangThai==1){
        $('#kichHoat').prop('checked', false);
        $('#khoa').prop('checked', true);
    }
    else {
        $('#kichHoat').prop('checked', false);
        $('#khoa').prop('checked', false);
    }

    let viewQR = `<img src="http://localhost:8181/api/v1/admin/tai-khoan/qrcode/${elementTaiKhoan.id}" width="100px" height="100px">`;
    $("#qrcode").html(viewQR);

    anhDaiDien.value = "";
}

function taiExcelTK() {
    $('#btn-excel').on('click', function () {
        console.log("dstk");
        ajaxGet('v1/admin/tai-khoan/excel?list-tai-khoan=' + arrElements.map(taiKhoan => taiKhoan.id))
            .then(rs => {
                window.open(rs.data, '_blank');
            }).catch(ex => {
            console.log(ex);
            alterDanger("Tạo file excel thất bại");
        })
    });
    clickPrintElement(".ttcttk");
}

