var inputMaHang, inputTenHangHoa, selectNhomHang, selectThuongHieu, inputGiaVon, inputGiaBan, inputTichDiem, inputMaGiamGia, selectDonViCoBan, inputSoLuong, img1, formFile1, img2, formFile2, img3, formFile3, img4, formFile4, img5, formFile5, listDonVi, addRowDonVi, inputGiamGia, textAreaMoTa, btnLuuHangHoa, btnThemMoiNhomHang, btnThemMoiThuongHieu, btnSaveThuongHieu, btnSaveNhomHang, inputTenThuongHieu, inputTenNhomHang, inputMaNhomHang;
var idHangHoa = null;
var hangHoa = null;
var viewListDonVi = "";
var countListDonVi = 1;
const MAX_INT = 2147483647;
$(function() {
    inputMaHang = $("#text-1");
    inputTenHangHoa = $("#text-2");
    selectNhomHang = $("#select-1");
    selectThuongHieu = $("#select-2");
    inputGiaVon = $("#text-3");
    inputGiaBan = $("#text-4");
    inputTichDiem = $("#text-5");
    selectDonViCoBan = $("#select-3");
    inputSoLuong = $("#text-6");
    inputGiamGia = $("#text-7");
    inputMaGiamGia = $("#text-8");
    inputTenNhomHang = $("#text-9");
    inputTenThuongHieu= $("#text-10");
    inputMaNhomHang= $("#text-11");
    img1 = "#file-1";
    img2 = "#file-2";
    img3 = "#file-3";
    img4 = "#file-4";
    img5 = "#file-5";
    formFile1 = "#form-file";
    formFile2 = "#form-file1";
    formFile3 = "#form-file2";
    formFile4 = "#form-file3";
    formFile5 = "#form-file4";
    btnLuuHangHoa = $("#luu-hang-hoa");
    btnThemMoiNhomHang = $("#btn-them-nhom-hang");
    btnThemMoiThuongHieu = $("#btn-them-thuong-hieu");
    btnSaveThuongHieu = $("#btn-save-thuong-hieu");
    btnSaveNhomHang = $("#btn-save-nhom-hang");
    // listDonVi = $("#list-don-vi");
    // addRowDonVi = $("#add-row-don-vi");

    let href = new URL(window.location.href);
    idHangHoa = href.searchParams.get("id");
    idHangHoa = idHangHoa === null ? 0 : idHangHoa;
    buttonBackHistory();

    //run nicedit
    bkLib.onDomLoaded(function() { new nicEditor({fullPanel : true, maxHeight : 300}).panelInstance('mo-ta'); });
    textAreaMoTa ="#mo-ta-hang-hoa .nicEdit-main";
    //end run nicedit

    viewSelectNhomHang(selectNhomHang)
    viewSelectThuongHieu(selectThuongHieu);
    viewSelectDonViHangHoa(selectDonViCoBan);
    clickLuuHangHoa();
    clickAddNhomHang();
    clickAddThuongHieu();
    clickBtnSaveNhomHang();
    clickBtnSaveThuongHieu();

    hiddenErrorWhenChange();
})

function hiddenErrorWhenChange() {
    inputMaNhomHang.change(function () {
        hiddenError(inputMaNhomHang.parent());
    })
}


function clickAddNhomHang() {
    $(selectNhomHang).change(function () {
        let val = $(this).val();
        if(val == -1) {
            btnThemMoiNhomHang.trigger("click");
            $(selectNhomHang).val(selectNhomHang.find("option:nth-child(1)").val()).trigger("change");
        }
    })
}

function clickAddThuongHieu() {
    $(selectThuongHieu).change(function () {
        let val = $(this).val();
        if(val == -1) {
            btnThemMoiThuongHieu.trigger("click");
            $(selectThuongHieu).val(selectThuongHieu.find("option:nth-child(1)").val()).trigger("change");
        }
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

function checkNumber(selector, max) {
    let rs = false;
    let number = selector.val();
    let selectorParent = selector.parent();
    if (number >= 0 && number < max) {
        rs = true;
        hiddenError(selectorParent);
    } else viewError(selectorParent,`Vui lòng nhập số lượng lớn hơn 0 và bé hơn ${max}`);
    return {check : rs, val: number};
}

function checkImg() {
    let rs = false;
    let selectorParent = $(img1).parents(".form-group");
    let val = $(img1);
    let lenFile = val[0].files.length;
    if(lenFile > 0) {
        rs = true;
        hiddenError(selectorParent);
    } else viewError(selectorParent,`Vui lòng chọn ít nhất 1 ảnh`);
    return {check : rs, val: val};
}

function checkMaGiamGia() {
    let rs = false;
    let selectorParent = inputMaGiamGia.parents(".form-group");
    let val = inputMaGiamGia.val();
    let len = val.length;
    if(len < 255) {
        rs = true;
        hiddenError(selectorParent);
    } else viewError(selectorParent,`Độ dài chưa phù hợp < 255`);
    return {check : rs, val: val};
}

function setMaxLengthNicedit() {

}

function clickLuuHangHoa() {
    btnLuuHangHoa.click(function () {
        let {check: checkTHH, val: valTHH} = checkTen(inputTenHangHoa);
        let {check: checkGV, val: valGV} = checkNumber(inputGiaVon, MAX_INT);
        let {check: checkGB, val: valGB} = checkNumber(inputGiaBan, MAX_INT);
        let {check: checkTD, val: valTD} = checkNumber(inputTichDiem, MAX_INT);
        let {check: checkSL, val: valSL} = checkNumber(inputSoLuong, MAX_INT);
        let {check: checkGG, val: valGG} = checkNumber(inputGiamGia, 100);
        let {check: checkMGG, val: valMGG} = checkMaGiamGia();
        if(checkTHH && checkTD && checkGG && checkMGG) {
            console.log("run");
            if(idHangHoa == 0) {
                let {check: checkAnh, val: valAnh} = checkImg();
                if(checkAnh) {
                    uploadFileHangHoa().then(rs => {
                        console.log(rs);
                        hangHoa = {
                            maGiamGia: valMGG,
                            moTa: $(".nicEdit-main").html(),
                            phanTramGiamGia: valGG,
                            tenHangHoa: valTHH,
                            tichDiem: valTD,
                            urlHinhAnh1: rs[0][0],
                            urlHinhAnh2: rs[1][0],
                            urlHinhAnh3: rs[2][0],
                            urlHinhAnh4: rs[3][0],
                            urlHinhAnh5: rs[4][0]
                        }
                        uploadHangHoa(hangHoa, selectThuongHieu.val(), selectNhomHang.val()).then(rs => {
                            if(rs.message = "uploaded") {
                                alterSuccess(`Thêm hàng hóa ${valTHH} thành công`, TIME_ALTER)
                                console.log(rs);
                            }
                        }).catch(err => {
                            console.log(err);
                            alterDanger("Upload Hang Hoa error, Server Error", TIME_ALTER);
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }
            } else {
                console.log("sửa hàng hóa");
            }
        }
    })
}

async function uploadFileHangHoa() {
    let arrUpload = [uploadMultiFile(img1, formFile1), uploadMultiFile(img2, formFile2), uploadMultiFile(img3, formFile3),uploadMultiFile(img4, formFile4), uploadMultiFile(img5, formFile5)];
    let val = [];
    await Promise.all(arrUpload).then(rs => {
        val = rs;
        console.log(rs);
    }).catch(err => {
        console.log(err);
    })
    return val;
}

function clickBtnSaveThuongHieu() {
    btnSaveThuongHieu.click(function () {
        let {check, val} = checkTen(inputTenThuongHieu);
        if(check) {
            let thuongHieu = {
                tenThuongHieu : val
            }
            thuongHieuUpload(thuongHieu).then(rs => {
                if(rs.message === "uploaded") {
                    elementThuongHieu = rs.data;
                    alterSuccess("Thêm thương hiệu thành công", TIME_ALTER);
                    viewSelectThuongHieu(selectThuongHieu);
                }
            }).catch(err => {
                console.log(err);
                alterDanger("Server Error - Upload Thuong Hieu", TIME_ALTER);
            })
        }
    })
}

function clickBtnSaveNhomHang() {
    btnSaveNhomHang.click(function () {
        let {check, val} = checkTen(inputTenNhomHang);
        let {check: checkMa, val: valMa} = checkTen(inputMaNhomHang);
        if(check && checkMa) {
            let nhomHang = {
                tenNhomHang : val,
                maNhomHang: valMa
            }
            nhomHangUpload(nhomHang).then(rs => {
                if(rs.message === "uploaded") {
                    elementNhomHang = rs.data;
                    alterSuccess("Thêm nhóm hàng thành công", TIME_ALTER);
                    viewSelectNhomHang(selectNhomHang);
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
// function addRowDonViHangHoa() {
//     addRowDonVi.click(function () {
//         let view = listDonVi.find(".row:nth-child(1)").html();
//         view += `<div class="col-xs-1">
//                         <div class="view-mid">
//                             <label style="visibility: hidden">remove:</label>
//                             <i class="far fa-trash-alt text-red xoa-ty-le-don-vi"></i>
//                         </div>
//                     </div>`;
//         view = `<div class="row ty-le-don-vi" data-id="${countListDonVi}">${view}</div>`;
//         listDonVi.append(view);
//         countListDonVi++;
//         clickRemoveTyLeDonVi();
//     })
// }
//
// function clickRemoveTyLeDonVi() {
//     $(".xoa-ty-le-don-vi").unbind("click").click(function () {
//         console.log($(this).parents(".ty-le-don-vi"));
//         $(this).parents(".ty-le-don-vi").remove();
//     })
// }