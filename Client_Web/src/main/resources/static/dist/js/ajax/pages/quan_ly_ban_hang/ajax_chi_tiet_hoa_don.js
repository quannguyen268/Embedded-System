
var arr = [];
var count = 0;
var xoaCount = 0;
var nguoiDungId=window.sessionStorage.getItem("id");
$(function () {
    table=$("#table-hang-hoa");
    btnThanhToan = $("#btn-thanh-toan");
    btnSaveKhachHang = $("#btn-save-khach-hang");
    btnDeleteHD = $("#btn-xoa-hoa-don");
    searchHangHoa();
    searchkhachHang();
    chooseHH();
    chooseDv();
    chooseKH();
    clickThayDoiSoLuong();
    enterThayDoiSoLuong();
    saveKhachHang();
    deleteHH();
    khachTraTien();
    thanhToan();
    deleteHD();
})


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
                let query = {
                    text : params.term != null ? params.term : "",
                    page : 1,
                    size : 5
                };
                return query;
                // Query parameters will be ?text=[term]&page=1&size=5
            },
            processResults: function (data) {
                if(data.message == "not found"){
                    let rs = {
                        'text' : "Không tìm thấy hàng hóa"
                    }
                    return {
                        results: rs
                    };
                }else{
                    let rs = [];
                    $.each(data.data.currentElements, function(idx, item) {
                        rs.push({
                            'id': item.id,
                            'text': item.tenHangHoa
                        });
                    });
                    return { results: rs };
                }
            }
        }
    });
}

function searchkhachHang(){
    $("#select-khach-hang").select2({
        ajax:{
            type: 'GET',
            headers: {
                "Authorization": ss_lg
            },
            dataType: "json",
            url : "http://localhost:8181/api/v1/admin/khach-hang/search-text",
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
                if(data.message == "not found"){
                    let rs = {
                        'text' : "Không tìm thấy khách hàng"
                    }
                    return {
                        results: rs
                    };
                }else{
                    var rs = [];
                    $.each(data.data.currentElements, function(idx, item) {
                        rs.push({
                            'id': item.id,
                            'text': item.tenKhachHang
                        });
                    });
                    rs.push({
                        'id': -1,
                        'text': "+ Thêm mới khách hàng"
                    })
                    return { results: rs };
                }
            }
        }
    });
}
var urlAnh= "localhost:8181/BackEnd/resources/file_upload"

function chooseHH() {
    $("#search-hang-hoa").change(function () {
        let id = $(this).find(':selected')[0].value;
        findFirstHH(id).then(sample => {
            if(sample.message == "found"){
                arr.push(sample.data.id);
                findHangHoa(id).then(rs =>{
                    let len = arr.length;
                    let imgUrl = rs.data.urlHinhAnh1;
                    if(imgUrl === null || imgUrl === ""){
                        imgUrl = "https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/24058951_893563900825779_3593682861528713749_n.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=NVVMeiTejuIAX8y4RZm&_nc_ht=scontent.fhan3-1.fna&oh=e04d1043ff741d0afa14943b80e7edfb&oe=5F1D59C9";
                    }
                    count++; // stt san pham
                    let row = `<tr id="row-${len}">
                    <td data-id="${viewField(rs.id)}" id="stt-${len}" style="padding-top: 40px;">${viewField(count)}</td>
                    <td>
                        <div class="hang-hoa-phieu-nhap">
                            <img src="${viewSrc(imgUrl)}" class="img-hang-hoa-phieu-nhap">
                            <div class="ten-hang-hoa">${viewField(rs.data.tenHangHoa)}</div>
                        </div>
                    </td>
                    <td style="padding-top: 31px">
                        <select class = "select2 choose-don-vi select-don-vi-${len}" id="search-don-vi-${len}" placeholder="Chọn đơn vị" style="width: 75%"> 
                        <option></option>
                        </select>
                    </td>
                     <td style="text-align: center; vertical-align: middle">
                        <input class="soLuong soLuong${len}" type="number" id="quantity" min="1" value="1" style="width: 40px">
                    </td>
                    <td data-id="${sample.data.id}" class="giaBan${len}" style="padding-top: 40px;">
                        ${viewField(sample.data.giaBan)}
                    </td>
                    <td class="tong tong${len}" style="text-align: center; vertical-align: middle" data-id = "${sample.data.id}">
                        ${viewField(sample.data.giaBan)}
                    </td>
                    <td>
                        <button class="btn btn-light xoa-btn" id="xoa-btn-${len}"  style="padding-top: 25px;">
                            <p><i class="fas fa-trash-alt" style="font-size: 24px;"></i></p>
                        </button>
                    </td>
                </tr>`;
                    let tongTienCurr = parseFloat($("#tong-tien")[0].value);
                    let tongTien = tongTienCurr + sample.data.giaBan;
                    $("#tong-tien").val(tongTien);
                    table.append(row);
                    $(`.select-don-vi-${len}`).select2({
                        placeholder: 'Chọn đơn vị',
                        ajax:{
                            type: 'GET',
                            headers: {
                                "Authorization": ss_lg
                            },
                            dataType: "json",
                            url : "http://localhost:8181/api/v1/admin/don-vi-hang-hoa/find-by-hang-hoa-id",
                            timeout: 30000,
                            data: function () {
                                var query = {
                                    hangHoaId : id,
                                    page : 1,
                                    size : 5
                                };
                                return query;
                            },
                            processResults: function (data) {
                                if(data.message == "found"){
                                    let rs = [];
                                    $.each(data.data.currentElements, function(idx, item) {
                                        rs.push({
                                            'id': item.id,
                                            'text': item.donVi.tenDonVi
                                        });
                                    });
                                    return { results: rs };
                                }else{
                                    let rs = {
                                        'text' : "Không tìm đơn vị phù hợp"
                                    }
                                    return {
                                        results: rs
                                    };
                                }
                            }
                        }
                    });
                    $.ajax({
                        type: 'GET',
                        dataType: "json",
                        url: 'http://localhost:8181/api/v1/admin/don-vi-hang-hoa/find-by-id?id=' + sample.data.donViHangHoa.id
                    }).then(function (data) {
                        // create the option and append to Select2
                        var option = new Option(data.data.donVi.tenDonVi, data.data.id, true, true);
                        $(`.select-don-vi-${len}`).append(option).trigger('change');

                        // manually trigger the `select2:select` event
                        $(`.select-don-vi-${len}`).trigger({
                            type: 'select2:select',
                            params: {
                                data: data
                            }
                        });
                    });
                });
            }else{
                console.log(sample.message );
                alterDanger("Sản phầm chưa được thiết lập giá");
            }
        });
    });
}

function chooseDv() {
    $(document).on("change",".choose-don-vi",function () {
        let currentRow = $(this).closest("tr");
        let hang = currentRow.find("td:eq(0)").text();  // get current row 1st TD value
        let stt = currentRow[0].id.substring(4,5);  // lay stt trong arr
        let id = $(this).find(':selected')[0].value;
        findGiaBanByHangHoaId(id).then(rs => {
            if(rs.message === "found"){
                let giaBan = rs.data.giaBan;
                let thanhTienCu = $(`.tong${stt}`)[0].textContent;
                let sl = $("td input")[stt-1].value;
                $(`.giaBan${stt}`).text(giaBan);
                $(`.tong${stt}`).text(giaBan * sl);
                $(`.giaBan${stt}`).data('id',rs.data.id);
                let tongTienCurr = parseFloat($("#tong-tien")[0].value);
                let tongTien = tongTienCurr + rs.data.giaBan * sl - thanhTienCu;
                $("#tong-tien").val(tongTien);
                arr[stt-1] = rs.data.id;
            }else{
                alterDanger("Sản phầm chưa được thiết lập giá");
            }
        })
    })
}

function chooseKH() {
    $(document).on("change","#select-khach-hang",function () {
        var id = $(this).find(':selected')[0].value;
        if(id > 0){
            findKhachHangById(id).then(rs => {
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

function clickThayDoiSoLuong() {
    $(document).on('click', '.soLuong', function () {
        let currentRow = $(this).closest("tr");
        let hang = parseInt(currentRow.find("td:eq(0)").text()) + xoaCount; // get current row 1st TD value
        let stt = hang -1;
        let sl = $("td input")[stt].value;
        let giaBan = currentRow.find("td:eq(4)").text() * sl;
        $(`.tong${stt+1}`).text(`${giaBan}`);
        let tongTien = 0;
        for(i = 1; i <= arr.length ; i++){
            if(arr[i-1] != 0){
                let thanhTien = parseFloat($(`.tong${i}`)[0].textContent);
                if(i != hang){
                    tongTien = tongTien + thanhTien;
                }
                else{
                    tongTien = tongTien + giaBan;
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
            let hang = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
            let stt = hang -1;
            let sl = $("td input")[stt].value;
            let giaBan = currentRow.find("td:eq(4)").text() * sl;
            $(`.tong${stt+1}`).text(`${giaBan}`);
            console.log()
            let tongTien = 0;
            for(i = 1; i <= arr.length ; i++){
                if(arr[i-1] != 0) {
                    let thanhTien = parseFloat($(`.tong${i}`)[0].textContent);
                    if (i != hang) {
                        tongTien = tongTien + thanhTien;
                    } else {
                        tongTien = tongTien + giaBan;
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

function deleteHH() {
    $(document).on('click', '.xoa-btn', function () {
        let currentRow = $(this).closest("tr");
        let stt = currentRow[0].id.substring(4,5);
        $(currentRow[0]).hide();
        arr[stt-1] = 0;
        let tongTienCu = parseFloat($("#tong-tien")[0].value);
        let tongTienMoi = tongTienCu - parseFloat($(`.tong${stt}`)[0].textContent);
        $("#tong-tien").val(tongTienMoi);
        if($("#tien-khach-tra")[0].value != 0){
            let tienTraLaiKhach =  $("#tien-khach-tra")[0].value - tongTienMoi;
            $("#tien-tra-lai").val(tienTraLaiKhach);
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

function khachTraTien() {
    $(document).on("keypress","#tien-khach-tra",function (e) {
        if(e.which === 13){
            let tienKhachTra = parseFloat($("#tien-khach-tra")[0].value);
            let tongTien = parseFloat($("#tong-tien")[0].value);
            let tienTraLaiKhach = tienKhachTra - tongTien;
            if(tienTraLaiKhach < 0){
                alterWarning("Số tiền khách đưa ít hơn tổng tiền của hóa đơn");
            }
            $("#tien-tra-lai").val(tienTraLaiKhach);
        }
    })
}


function thanhToan() {
    btnThanhToan.on("click", function () {
        let khachHangId = $("#select-khach-hang").find(':selected')[0].value;
        if(khachHangId <= 0){
            alterWarning("Bạn chưa chọn khách Hàng");
        }else{
            let tongTien = parseFloat($("#tong-tien")[0].value);
            let tienKhachTra = $("#tien-khach-tra")[0].value;
            if(tienKhachTra === ""){
                alterWarning("Vui lòng điền số tiền khách trả");
            }else{
                let tienTraKhach = $("#tien-tra-lai")[0].value;
                let tienNo = tienTraKhach.substr(1,tienTraKhach.length);
                if(tienTraKhach < 0){
                    $("#modal-cho-no .modal-body").text(`Số tiền khách trả ít hơn tổng tiền hóa đơn. Bạn có chắc chắn cho khách hàng nợ số tiền ${tienNo} không?`);
                    $("#modal-cho-no").modal('toggle');
                    $("#confirm-btn").click(function () {
                        let ghiChu = $("#bimo4")[0].value;
                        var hoaDon = {
                            maHoaDon : "",
                            tongTien : tongTien,
                            tienKhachTra : tienKhachTra,
                            tienTraLaiKhach : tienTraKhach,
                            ghiChu: ghiChu,
                            trangThai : 1
                        }
                        uploadData(hoaDon,false);
                        let phieuNo = {
                            tongNo : parseFloat(tienNo)
                        }
                    })
                }else{
                    let ghiChu = $("#bimo4")[0].value;
                    var hoaDon = {
                        maHoaDon : "",
                        tongTien : tongTien,
                        tienKhachTra : tienKhachTra,
                        tienTraLaiKhach : tienTraKhach,
                        ghiChu: ghiChu,
                        trangThai : 1
                    }
                    uploadData(hoaDon,true);
                }
            }
        }
    })
}

function uploadData(hoaDon = {}, check) {
    let khachHangId = $("#select-khach-hang").find(':selected')[0].value;
    findNguoiDungPhongBanByNhanVienId(nguoiDungId).then(rs => {
        let chiNhanhId = rs.data.phongBan.chiNhanh.id;
        uploadHoaDon(nguoiDungId,khachHangId,chiNhanhId,hoaDon).then(rs =>{
            if(rs.message === "uploaded"){
                let id = rs.data.id;
                let giaBanList = [];
                for(i = 0; i < arr.length;i++){
                    if(arr[i] != 0){
                        giaBanList.push(arr[i]);
                    }
                }
                let hoaDonChiTietList = [];
                let count = 0;
                for(i = 1; i <= arr.length;i++){
                    if(arr[i-1] != 0 ){
                        let sl = $(`.soLuong${i}`)[0].value;
                        let thanhTien = parseFloat($(`.tong${i}`)[0].textContent);
                        hoaDonChiTietList[i-1-count] = {
                            soLuong: sl,
                            tongGia: thanhTien,
                            xoa : false
                        }
                    }else{
                        count++;
                    }
                }
                let hoaDonForm = {
                    hoaDonId : id,
                    lichSuGiaBanIdList : giaBanList,
                    hoaDonChiTietList: hoaDonChiTietList
                }
                uploadHoaDonChiTiet(hoaDonForm).then(rs2 => {
                    if(check === false){
                        let tienNo = parseFloat(hoaDon.tienTraLaiKhach.substr(1,hoaDon.tienTraLaiKhach.length));
                        let phieuNo ={
                            tongNo : tienNo
                        }
                        uploadPhieuNo(khachHangId,rs.data.id,nguoiDungId,phieuNo).then(rsPhieuNo => {
                            sumPhieuNo(khachHangId).then(rsSum =>{
                                let tenKhachHang = $("#ten-khach-hang")[0].value;
                                let text = `<span>Khách hàng ${tenKhachHang} nợ thêm số tiền là ${tienNo}</span>
                                             <br>
                                            <span>Tổng số nợ hiện tại là : ${rsSum.data} VNĐ</span>`;
                                $("#modal-display-no .modal-body").html(text);
                                $("#modal-display-no").modal('toggle');
                            })
                        })
                    }else {
                        if(rs2.message === "success"){
                            alterSuccess("Thêm hóa đơn mới thành công");
                            clickPrintElement(".tttk");
                        }else{
                            console.log(rs.message);
                            alterDanger("Thêm hóa đơn mới không thành công");
                        }
                    }
                });
                btnThanhToan.attr('disabled',true);
                $("#btn-xoa-hoa-don").attr('disabled',true);
            }else{
                console.log(rs.message);
                alterDanger("Thêm hóa đơn mới không thành công");
            }
        })
    });
}

function saveKhachHang() {
    btnSaveKhachHang.click(function () {
        let tenKhachHang = $("#ten-khach-hang")[0].value;
        let sdtKhachHang = $("#sdt-khach-hang")[0].value;
        let emailKhachHang = $("#email-khach-hang")[0].value;
        let diaChiKhachHang = $("#dia-chi-khach-hang")[0].value;
        let ngaySinh = $("#birthday").value;
        let khachHang = {
            taiKhoan: "",
            tenKhachHang: tenKhachHang,
            dienThoai: sdtKhachHang,
            loaiKhach: "Bình thường",
            ngaySinh: ngaySinh,
            gioiTinh: null,
            email: emailKhachHang,
            facebook: "",
            ghiChu: "",
            trangThai: 1,
            diaChi: diaChiKhachHang
        }
        uploadKhachHang(khachHang).then(rs =>{
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
                    url: 'http://localhost:8181/api/v1/admin/khach-hang/find-by-id?id=' + id
                }).then(function (data) {
                    // create the option and append to Select2
                    var option = new Option(data.data.tenKhachHang, data.data.id, true, true);
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
                alterSuccess("Thêm khách hàng mới thành công");
                $("#modal-khach-hang").modal('toggle');
            }else{
                alterDanger("Lỗi hệ thống");
            }
        })
    })
}



function clickPrintElement(selector) {
    $('#btn-print').on("click", function () {
        $(selector).printThis({
            importCSS: true,
            printDelay: 333,
        });
    });
}

function deleteHD() {
    $("#btn-xoa-hoa-don").on("click",function () {
        for(i=0;i<arr.length;i++){
            $(`#row-${i+1}`).remove();
        }
        arr = [];
        count = 0;
        xoaCount=0;
        $("select").val('').trigger('change');
        $("#bimo5").val("");
        $("#bimo6").val("");
        $("#bimo2").val("");
        $("#bimo3").val("");
        $("#bimo4").val("");
        $("#bimo5").prop('disabled', false);
        $("#bimo2").prop('disabled', false);
        $("#bimo6").prop('disabled', false);
        $("#tong-tien").val(0);
        $("#tien-khach-tra").val("");
        $("#tien-tra-lai").val("");
    })
}

