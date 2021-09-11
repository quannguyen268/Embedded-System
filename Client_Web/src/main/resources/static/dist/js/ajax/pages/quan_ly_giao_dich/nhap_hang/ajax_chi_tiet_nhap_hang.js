var selectNguoiNhap, selectNhaCungCap, inputGiamGia, inputGhiChu, selectHangHoa, btnThemHang, tableData, btnThanhToan, btnNhapHang, btnXoa, textTongTien, textTienPhaiTra, textTienDaTra, textPhieuNhapTitle, btnLuu;
var idPhieuNhap = null;
var phieuNhap = null;
var arr = [];
var count = 0;
var xoaCount = 0;
var nguoiDungId=window.sessionStorage.getItem("id");

$(function () {

    selectNguoiNhap = $("#bimo1");
    selectNhaCungCap = $("#bimo2");
    inputGiamGia = $("#bimo3");
    inputGhiChu = $("#bimo4");
    selectHangHoa = $("#bimo5");
    btnThemHang = $("#btn-them-hang");
    tableData = $("tbody");
    btnThanhToan = $("#btn-thanh-toan");
    btnNhapHang = $("#btn-nhap-hang");
    btnXoa = $("#btn-xoa-nhap-hang");
    textTongTien = $("#so-tong-tien");
    textTienPhaiTra = $("#tien-phai-tra");
    textTienDaTra = $("#tien-da-tra");
    textPhieuNhapTitle = $("#phieu-nhap-title");
    btnLuu = $("#btn-luu");

    table=$("#table-hang-hoa");

    let href = new URL(window.location.href);
    idPhieuNhap = href.searchParams.get("id");
    idPhieuNhap = idPhieuNhap === null ? 0 : idPhieuNhap;

    let arrAjax = [viewSelectNhanVien(selectNguoiNhap, false), viewSelectNhaCungCap(selectNhaCungCap, false), viewSelectHangHoa(selectHangHoa, false)];

    Promise.all(arrAjax).then(rs => {
        if(idPhieuNhap != 0) {
            viewPhieuNhap();
        }
    }).catch(err => {
        console.log(err);
    })

    clickButtonThanhToan();
    searchHangHoa();
    searchNhaCungCap();

    chooseHH();
    chooseNhaCungCap();
    saveNhaCungCap();
    clickThayDoiSoLuong();
    enterThayDoiSoLuong();
    enterGiaNhap();
    deleteHH();
    traTien();
})

function viewPhieuNhap() {
    phieuNhapHangFindById(idPhieuNhap).then(rs => {
        if(rs.message == "found") {
            rs = rs.data;
            phieuNhap = rs;
            textPhieuNhapTitle.html(`${rs.maPhieu} - ${viewDateTime(rs.thoiGian)}`);
            rs.nguoiDung != null ? selectNguoiNhap.val(viewField(rs.nguoiDung.id)).trigger("change") : 0;
            rs.nhaCungCap != null ? selectNhaCungCap.val(viewField(rs.nhaCungCap.id)).trigger("change") : 0;
            inputGiamGia.val(viewField(rs.giamGia));
            inputGhiChu.val(viewField(rs.ghiChu));
            textTongTien.html(formatNumber(viewField(rs.tongTien), ",", ".") + " VNĐ");
            textTienPhaiTra.html(formatNumber(viewField(rs.tienDaTra), ",", ".") + " VNĐ");
            textTienDaTra.html(formatNumber(viewField(rs.tienPhaiTra), ",", ".") + " VNĐ");
            if(rs.trangThai > 0) {
                $(selectNguoiNhap).prop('disabled', true);
                $(selectNhaCungCap).prop('disabled', true);
                $(inputGiamGia).prop('disabled', true);
                $(btnNhapHang).prop('disabled', true);
                $(btnThemHang).prop('disabled', true);
                $(btnXoa).prop('disabled', true);
                if(rs.trangThai == 2) $(btnThanhToan).prop('disabled', true);
            }
            phieuNhapChiTietFindByPhieuNhap(idPhieuNhap).then(rs => {
                if(rs.message == "found") {
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
                                setViewPhieuChiTiet( rs.data.currentElements, 1);
                                return;
                            }
                            // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                            phieuNhapChiTietFindByPhieuNhap(idPhieuNhap, pagination.pageNumber).then(rs => {
                                setViewPhieuChiTiet(rs.data.currentElements, pagination.pageNumber);
                            }).catch(err => console.log(err))
                        }
                    })
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }).catch(err => {
        console.log(err);
        alterDanger("Phiếu nhập không tồn tại", TIME_ALTER);
        // setTimeout(function () {
        //     window.location.href = "danh-sach-nhap-hang";
        // }, 4000);
    })
}

function disableQuanlity() {
    if(phieuNhap.trangThai == 2) {
        console.log("quantity");
        $(".quantity").prop("disabled", true);
    }
}

function setViewPhieuChiTiet(list, pageNumber) {
    let view = `<tr>
                <th>STT</th>
                <th>Hàng hóa</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
            </tr>`;
    let len = list.length;
    if (len > 0) {
        view += list.map((data, index) => `<tr>
                <td>${(pageNumber - 1)*5 + index + 1}</td>
                <td>
                    <div class="hang-hoa-phieu-nhap">
                        <img src="${viewField(data.chiNhanhHangHoa.hangHoa.urlHinhAnh1)}" class="img-hang-hoa-phieu-nhap">
                        <div class="ten-hang-hoa">${viewField(data.chiNhanhHangHoa.hangHoa.ma)} - ${viewField(data.chiNhanhHangHoa.hangHoa.tenHangHoa)}</div>
                    </div>
                </td>
                <td style="text-align: center; vertical-align: middle">
                    <input type="number" class="quantity" min="1" value="${viewField(data.soLuong)}" style="width: 40px">
                </td>
                <td style="text-align: center; vertical-align: middle">
                    ${formatNumber(viewField(data.tongTien), ",", ".")}
                </td>
            </tr>`).join("");
    } else {
        view += `<tr><td colspan="4">Không có thông tin phù hợp</td></tr>`
    }
    tableData.html(view);
    disableQuanlity();
}

function clickButtonThanhToan() {
    btnThanhToan.click(function () {
        let nhaCungCapId = $("#select-khach-hang").find(':selected')[0].value;
        let tienKhachTra = $("#tien-khach-tra")[0].value;
        if(nhaCungCapId <= 0){
            alterWarning("Bạn chưa chọn nhà cung cấp");
        }else if(tienKhachTra == ""){
            alterWarning("Bạn chưa điền số tiền phải trả");
        }else{
            {
                let tongTien = parseFloat($("#tong-tien")[0].value);
                let tienDaTra = $("#tien-khach-tra")[0].value;
                let tienPhaiTra = $("#tien-tra-lai")[0].value;
                let maPN = Math.floor(Math.random() * 10000);
                let ghiChu = $("#bimo4")[0].value;
                findNguoiDungPhongBanByNhanVienId(nguoiDungId).then(rs => {
                    let chiNhanhId = rs.data.phongBan.chiNhanh.id;
                    let phieuNhap = {
                        maPhieu : "PN-000" + maPN,
                        tongTien : tongTien,
                        tienDaTra : tienDaTra,
                        tienPhaiTra : tienPhaiTra,
                        ghiChu : ghiChu,
                        trangThai : 2
                    }
                    uploadPhieuNhap(phieuNhap,nguoiDungId,nhaCungCapId).then(rs => {
                        if(rs.message === "uploaded"){
                            let id = rs.data.id;
                            let count = 0;
                            let phieuNhapChiTietList = [];
                            for(i = 1; i <= arr.length;i++) {
                                if (arr[i - 1] != 0) {
                                    let sl = parseFloat($(`.soLuong${i}`)[0].value);
                                    let thanhTien = parseFloat($(`.tong${i}`)[0].textContent);
                                    let giaNhap = parseFloat($(`.giaNhap${i}`)[0].value);
                                    phieuNhapChiTietList[i - 1 - count] = {
                                        tongTien: thanhTien,
                                        soLuong: sl,
                                        giaNhap: giaNhap,
                                        xoa: false
                                    }
                                } else {
                                    count++;
                                }
                            }
                            let hangHoaIdList = [];
                            for(i = 0; i < arr.length;i++){
                                if(arr[i] != 0){
                                    hangHoaIdList.push(parseInt(arr[i]));
                                }
                            }
                            let phieuNhapForm = {
                                phieuNhapHangId : id,
                                chiNhanhId : chiNhanhId,
                                hangHoaIdList : hangHoaIdList,
                                phieuNhapHangChiTietList: phieuNhapChiTietList
                            }
                            uploadPhieuNhapChiTiet(phieuNhapForm).then(rs => {
                                if(rs.message === "success") {
                                    alterSuccess("Nhập hàng thành công");
                                }else {
                                    console.log(rs.message);
                                    alterDanger("Nhập hàng không thành công");
                                }
                            });
                        }else{
                            console.log(rs.message);
                            alterDanger("Nhập hàng không thành công");
                        }
                    });
                })
            }
        }
    })
}

function searchHangHoa() {
    $("#search-hang-hoa").select2({
        ajax:{
            type: 'GET',
            headers: {
                "Authorization": ss_lg
            },
            dataType: "json",
            url : "http://localhost:8181/api/v1/admin/hang-hoa/search-text",
            timeout: 30000,
            data: function (params) {
                var query = {
                    text : params.term != null ? params.term : "",
                    page : 1,
                    size : 5
                };
                return query;
                // Query parameters will be ?text=[term]&page=1&size=5
            },
            processResults: function (data) {
                var rs = [];
                $.each(data.data.currentElements, function(idx, item) {
                    rs.push({
                        'id': item.id,
                        'text': item.tenHangHoa
                    });
                });
                rs.push({
                    'id': -1,
                    'text': "+ Thêm hàng hóa mới"
                })
                return { results: rs };
            }
        }
    });
}

function searchNhaCungCap(){
    $("#select-khach-hang").select2({
        ajax:{
            type: 'GET',
            headers: {
                "Authorization": ss_lg
            },
            dataType: "json",
            url : "http://localhost:8181/api/v1/admin/nha-cung-cap/search-text",
            timeout: 30000,
            data: function (params) {
                var query = {
                    text : params.term != null ? params.term : "",
                    page : 1,
                    size : 5
                };
                return query;
            },
            processResults: function (data) {
                var rs = [];
                $.each(data.data.currentElements, function(idx, item) {
                    rs.push({
                        'id': item.id,
                        'text': item.ten
                    });
                });
                rs.push({
                    'id': 0,
                    'text': "+ Thêm mới nhà cung cấp"
                })
                return { results: rs };
            }
        }
    });
}

function chooseHH() {
    $("#search-hang-hoa").change(function () {
        var id = $(this).find(':selected')[0].value;
        if(id > 0){
            findDonViCoBan(id).then(rs =>{
                arr.push(id);
                let len = arr.length;
                let imgUrl = rs.data.hangHoa.urlHinhAnh1;
                if(imgUrl === null || imgUrl === ""){
                    imgUrl = "https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/24058951_893563900825779_3593682861528713749_n.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=NVVMeiTejuIAX8y4RZm&_nc_ht=scontent.fhan3-1.fna&oh=e04d1043ff741d0afa14943b80e7edfb&oe=5F1D59C9";
                }
                count++;
                let row = `<tr class="row-${len}">
                <td id="stt-${len}" style="padding-top: 40px;">${viewField(count)}</td>
                <td>
                    <div class="hang-hoa-phieu-nhap">
                        <img src="${imgUrl}" class="img-hang-hoa-phieu-nhap">
                        <div class="ten-hang-hoa">${viewField(rs.data.hangHoa.tenHangHoa)}</div>
                    </div>
                </td>
                <td style="padding-top: 45px">
                    ${viewField(rs.data.donVi.tenDonVi)}
                </td>
                 <td style="text-align: center; vertical-align: middle">
                    <input class="soLuong soLuong${len}" type="number" id="quantity" min="1" value="1" style="width: 60px">
                </td>
                <td  style="text-align: center; vertical-align: middle">
                    <input class="giaNhap giaNhap${len} none-arrow" type="number" id="quantity" min="0" value="0" style="width: 60px">
                </td>
                <td class="tong tong${len}" style="text-align: center; vertical-align: middle" > 0
                </td>
                <td>
                    <button class="btn btn-light xoa-btn" id="xoa-btn-${len}"  style="padding-top: 25px;">
                        <p><i class="fas fa-trash-alt" style="font-size: 24px;"></i></p>
                    </button>
                </td>
            </tr>`;
                table.append(row);
            });
        }else{
            // open modal to save new product
        }
    })
}

function chooseNhaCungCap() {
    $(document).on("change","#select-khach-hang",function () {
        var id = $(this).find(':selected')[0].value;
        if(id != 0){
            findNhaCungCapById(id).then(rs => {
                if(rs.message === "found"){
                    $("#bimo5").val(rs.data.diaChi);
                    $("#bimo6").val(rs.data.dienThoai);
                    $("#bimo2").val(rs.data.email);
                    $("#bimo5").prop('disabled', true);
                    $("#bimo2").prop('disabled', true);
                    $("#bimo6").prop('disabled', true);
                }else {
                    alterDanger("Xảy ra lỗi hệ thống");
                }
            })
        }else{
            $("#modal-khach-hang").modal();
        }
    });
}

function saveNhaCungCap() {
    $("#btn-save-khach-hang").click(function () {
        let tenKhachHang = $("#ten-khach-hang")[0].value;
        let sdtKhachHang = $("#sdt-khach-hang")[0].value;
        let emailKhachHang = $("#email-khach-hang")[0].value;
        let diaChiKhachHang = $("#dia-chi-khach-hang")[0].value;
        let nhaCungCap = {
            ten: tenKhachHang,
            dienThoai: sdtKhachHang,
            loaiKhach: "Bình thường",
            email: emailKhachHang,
            facebook: "",
            ghiChu: "",
            trangThai: 1,
            tongMua : 0,
            tongNo : 0,
            diaChi: diaChiKhachHang
        }
        uploadNhaCungCap(nhaCungCap).then(rs =>{
            if(rs.message === "uploaded") {
                $("#bimo5").val(diaChiKhachHang);
                $("#bimo6").val(sdtKhachHang);
                $("#bimo2").val(emailKhachHang);
                $("#bimo5").prop('disabled', true);
                $("#bimo2").prop('disabled', true);
                $("#bimo6").prop('disabled', true);
                let id = rs.data.id;
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    url: 'http://localhost:8181/api/v1/admin/nha-cung-cap/find-by-id?id=' + id
                }).then(function (data) {
                    var option = new Option(data.data.ten, data.data.id, true, true);
                    $('#select-khach-hang').append(option).trigger('change');

                    // manually trigger the `select2:select` event
                    $('#select-khach-hang').trigger({
                        type: 'select2:select',
                        params: {
                            data: data
                        }
                    });
                });
                $('#select-khach-hang').prop("disabled", true);
                alterSuccess("Thêm nhà cung cấp mới thành công");
                $("#modal-khach-hang").modal('toggle');
            }else{
                alterDanger("Lỗi hệ thống");
            }
        })
    })
}

function clickThayDoiSoLuong() {
    $(document).on('click', '.soLuong', function () {
        let currentRow = $(this).closest("tr");
        let hang = parseInt(currentRow.find("td:eq(0)").text()) + xoaCount; // get current row 1st TD value
        let stt = hang-1;
        let sl = $(`.soLuong${hang}`)[0].value;
        let giaNhap = $(`.giaNhap${hang}`)[0].value * sl;
        $(`.tong${hang}`).text(`${giaNhap}`);
        let tongTien = 0;
        for(i = 1; i <= arr.length ; i++){
            if(arr[i-1] != 0){
                let thanhTien = parseFloat($(`.tong${i}`)[0].textContent);
                if(i != hang){
                    tongTien = tongTien + thanhTien;
                }
                else{
                    tongTien = tongTien + giaNhap;
                }
            }
        }
        $("#tong-tien").val(tongTien);
        if($("#tien-khach-tra")[0].value != 0){
            let tienTraLaiKhach =  $("#tien-khach-tra")[0].value - tongTien;
            $("#tien-tra-lai").val(tienTraLaiKhach);
        }
    });
}

function enterThayDoiSoLuong() {
    $(document).on('keypress', '.soLuong', function (e) {
        if(e.which === 13){
            let currentRow = $(this).closest("tr");
            let hang = parseInt(currentRow.find("td:eq(0)").text()) + xoaCount; // get current row 1st TD value
            let sl = $(`.soLuong${hang}`)[0].value;
            let giaNhap = $(`.giaNhap${hang}`)[0].value * sl;
            $(`.tong${hang}`).text(`${giaNhap}`);
            let tongTien = 0;
            for(i = 1; i <= arr.length ; i++){
                if(arr[i-1] != 0) {
                    let thanhTien = parseFloat($(`.tong${i}`)[0].textContent);
                    if (i != hang) {
                        tongTien = tongTien + thanhTien;
                    } else {
                        tongTien = tongTien + giaNhap;
                    }
                }
            }
            $("#tong-tien").val(tongTien);
            if($("#tien-khach-tra")[0].value != 0){
                let tienTraLaiKhach =  $("#tien-khach-tra")[0].value - tongTien;
                $("#tien-tra-lai").val(tienTraLaiKhach);
            }
        }
    })
}

function enterGiaNhap(){
    $(document).on('keypress', '.giaNhap', function (e) {
        if(e.which === 13){
            let currentRow = $(this).closest("tr");
            let hang = parseInt(currentRow.find("td:eq(0)").text()) + xoaCount; // get current row 1st TD value
            let stt = hang-1;
            let sl = $(`.soLuong${hang}`)[0].value;
            let giaNhap = $(`.giaNhap${hang}`)[0].value * sl;
            $(`.tong${hang}`).text(`${giaNhap}`);
            let tongTien = 0;
            for(i = 1; i <= arr.length ; i++){
                if(arr[i-1] != 0) {
                    let thanhTien = parseFloat($(`.tong${i}`)[0].textContent);
                    if (i != hang) {
                        tongTien = tongTien + thanhTien;
                    } else {
                        tongTien = tongTien + giaNhap;
                    }
                }
            }
            $("#tong-tien").val(tongTien);
            if($("#tien-khach-tra")[0].value != 0){
                let tienTraLaiKhach = tongTien - $("#tien-khach-tra")[0].value;
                $("#tien-tra-lai").val(tienTraLaiKhach);
            }
        }
    })
}

function deleteHH() {
    $(document).on('click', '.xoa-btn', function () {
        let currentRow = $(this).closest("tr");
        let hang = parseInt(currentRow.find("td:eq(0)").text()) + xoaCount; // get current row 1st TD value
        let stt = currentRow[0].id.substring(4,5);
        $(currentRow[0]).hide();
        arr[stt-1] = 0;
        let tongTienCu = parseFloat($("#tong-tien")[0].value);
        if($(`.tong${hang}`)[0].text != undefined) {
            let tongTienMoi = tongTienCu - parseFloat($(`.tong${stt}`)[0].textContent);
            $("#tong-tien").val(tongTienMoi);
        }
        let temp = 1;
        for(i = 1; i <= arr.length; i++){
            if(arr[i-1] != 0){
                $(`#stt-${i}`).text(temp);
                temp++;
            }
        }
        count--;
        xoaCount++;
    })
}

function traTien() {
    $(document).on("keypress","#tien-khach-tra",function (e) {
        if(e.which === 13){
            let tienKhachTra = parseFloat($("#tien-khach-tra")[0].value);
            let tongTien = parseFloat($("#tong-tien")[0].value);
            let tienTraLaiKhach = tongTien - tienKhachTra;
            if(tienTraLaiKhach >= 0){
                $("#tien-tra-lai").val(tienTraLaiKhach);
            }else{
                // alterDanger("Số tiền khách đưa ít hơn hóa đơn");
            }
        }
    })
}