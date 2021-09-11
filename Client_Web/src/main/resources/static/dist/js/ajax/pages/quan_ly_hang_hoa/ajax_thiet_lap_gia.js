var selectChiNhanh,inputSearch,btnSearch,table;
var arr  = [];
var donViHangHoaId = 0;
var mousedownHappened = false;
var tenHangHoa,hangHoaId;
var page;


function viewThoiGian(thoiGian){
    if(thoiGian != null){
        var tg = thoiGian.substring(11,19) + " " + thoiGian.substring(8,10) +"/"
            + thoiGian.substring(5,7) + "/" + thoiGian.substring(0,4);
        return tg;
    }else {
        return "";
    }
}

function viewGia(gia,tyLe,donVi){
    let giaNhap = gia * tyLe;
    return gia != null ? giaNhap + " VNĐ / " + donVi : "Chưa nhập hàng";
}

$(function () {

    uploadBtn = $("#btn-upload");
    box = $("#box-thongtin");
    selectChiNhanh=$("#bimo2");
    inputSearch=$("#bimo1");
    btnSearch=$("#btn-1");
    table=$("#table-hang-hoa");
    viewSelectChiNhanhFindByTongCongTy().then(rs => {
        selectChiNhanh.html(`<option value="0">Tất cả chi nhánh</option>`+rs);
        runSelect2();
        selectChiNhanh.change(function () {
            //change chi nhanh tong
            //reset text search
            inputSearch.val("");
            btnSearch.trigger("click");
            //recall data
        })
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Select Chi Nhanh",TIME_ALTER);
    })

    callSearch();
    clickSearch();
    searchHangHoa();
    chooseHHSearch();
    chooseDVSearch();
    updateGiaBan();
    uploadGiaBan();
    uploadDonViHangHoa();
    checkClick();
})

function checkClick() {
    $(document).on('blur',".giaBan" ,function () {
        let currentRow = $(this).closest("tr");
        let hang = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        let stt = hang -(page-1)*10 -1;
        console.log(hang);
        let giaBan = parseFloat($("td input")[stt].value);
        let giaBanCu = arr[stt].lichSuGiaBan.giaBan;
        let giaNhap = parseFloat($(".giaNhap")[stt].textContent);
        if(giaBan != giaBanCu){
            if(mousedownHappened){
                mousedownHappened = false;
            }else{
                $("#confirmModal2").modal();
                $("#confirm-btn2").click(function () {
                    if(giaBan < giaNhap){
                        $("#confirmModal").modal();
                        $("#confirm-btn").click(function () {
                            var lichSuGiaBan ={
                                id : arr[stt].lichSuGiaBan.id,
                                giaBan : giaBan
                            };
                            let dvhhId = arr[stt].lichSuGiaBan.donViHangHoa.id;
                            saveGiaBan(dvhhId, lichSuGiaBan).then(rs =>{
                                if (rs.message === "uploaded") {
                                    alterSuccess("Thay đổi giá bán thành công");
                                }else{
                                    alterDanger("Lỗi khi thay đổi giá bán");
                                }
                            })
                        })
                        $("#refuse-btn").click(function () {
                            giaBanCu = arr[stt].lichSuGiaBan.giaBan;
                            $("td input")[stt].val(giaBanCu);
                        })
                    }else{
                        var lichSuGiaBan ={
                            id : arr[stt].lichSuGiaBan.id,
                            giaBan : giaBan
                        };
                        let dvhhId = arr[stt].lichSuGiaBan.donViHangHoa.id;
                        saveGiaBan(dvhhId, lichSuGiaBan).then(rs =>{
                            if (rs.message === "uploaded") {
                                alterSuccess("Thay đổi giá bán thành công");
                            }else{
                                alterDanger("Lỗi khi thay đổi giá bán");
                            }
                        })
                    }
                });
                $("#refuse-btn2").click(function () {
                    $("td input")[stt].value(giaBanCu);
                });
            }
        }
    });
}

function updateGiaBan() {
    $(document).on('keypress', '.giaBan', function (e) {
        if(e.which === 13){
            mousedownHappened = true;
            let currentRow = $(this).closest("tr");
            let hang = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
            let stt = hang -(page-1)*10 -1;
            let giaBan = parseFloat($("td input")[stt].value);
            let giaNhap = parseFloat($(".giaNhap")[stt].textContent);
            if(giaBan < giaNhap){
                $("#confirmModal").modal();
                $("#confirm-btn").click(function () {
                    var lichSuGiaBan ={
                        id : arr[stt].lichSuGiaBan.id,
                        giaBan : giaBan
                    };
                    let dvhhId = arr[stt].lichSuGiaBan.donViHangHoa.id;
                    saveGiaBan(dvhhId, lichSuGiaBan).then(rs =>{
                        if (rs.message === "uploaded") {
                            alterSuccess("Thay đổi giá bán thành công");
                        }else{
                            alterDanger("Lỗi khi thay đổi giá bán");
                        }
                    })
                })
                $("#refuse-btn").click(function () {
                    giaBanCu = arr[stt].lichSuGiaBan.giaBan;
                    $("td input")[stt].val(giaBanCu);
                })
            }else{
                var lichSuGiaBan ={
                    id : arr[stt].lichSuGiaBan.id,
                    giaBan : giaBan
                };
                let dvhhId = arr[stt].lichSuGiaBan.donViHangHoa.id;
                saveGiaBan(dvhhId, lichSuGiaBan).then(rs =>{
                    if (rs.message === "uploaded") {
                        alterSuccess("Thay đổi giá bán thành công");
                    }else{
                        alterDanger("Lỗi khi thay đổi giá bán");
                    }
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
                let rs = [];
                if(data.message == "found"){
                    $.each(data.data.currentElements, function(idx, item) {
                        rs.push({
                            'id': item.id,
                            'text': item.tenHangHoa
                        });
                    });
                    return { results: rs };
                }else{
                    rs.push({
                        'text' : "Không tìm thấy hàng hóa"
                    });
                }
                return {
                    results: rs
                };
            }
        }
    });
}

function chooseHHSearch() {
    $("#search-hang-hoa").change(function () {
        var id = $("#search-hang-hoa").find(':selected')[0].value;
        let temp = $("#search-hang-hoa").find(':selected')[0].text;
        tenHangHoa = temp;
        hangHoaId = id;
        $('#search-don-vi').val(null).trigger('change');
        $("#search-don-vi").select2({
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
                    let rs = [];
                    if(data.message != "not found"){
                        $.each(data.data.currentElements, function(idx, item) {
                            rs.push({
                                'id': item.id,
                                'text': item.donVi.tenDonVi
                            });
                        });
                    }
                    rs.push({
                        'id': -1,
                        'text': "+ Lựa chọn đơn vị "
                    })
                    return { results: rs };
                }
            }
        });
    })
}

function chooseDVSearch(){
    $("#search-don-vi").change(function () {
        let id  = $("#search-don-vi").find(':selected')[0].value;
        if(id > 0){
            donViHangHoaId = id;
        }else if (id == -1){
            $("#subModal").modal("toggle");
            $("#ten-hang-hoa-moi").text(tenHangHoa);
            $("#search-don-vi-co-ban").select2({
                ajax:{
                    type: 'GET',
                    headers: {
                        "Authorization": ss_lg
                    },
                    dataType: "json",
                    url : "http://localhost:8181/api/v1/admin/don-vi/search-text",
                    timeout: 30000,
                    data: function (params) {
                        var query = {
                            text :  params.term != null ? params.term : "",
                            page : 1,
                            size : 5
                        };
                        return query;
                    },
                    processResults: function (data) {
                        if(data.message == "not found"){
                            let rs = {
                                'text': "Không tìm thấy đơn vị"
                            }
                            return {
                                results: rs
                            }
                        }else{
                            let rs = [];
                            $.each(data.data.currentElements, function(idx, item) {
                                rs.push({
                                    'id': item.id,
                                    'text': item.tenDonVi
                                });
                            });
                            return { results: rs };
                        }

                    }
                }
            });
        }
    });
}



function uploadDonViHangHoa() {
    $("#btn-upload-don-vi").click(function () {
        let donViId = $("#search-don-vi-co-ban").find(':selected')[0].value;
        let tyLe = parseFloat($("#tyLe")[0].value);
        let donViHangHoa = {
            tyLe : tyLe,
            xoa : false
        }
        saveDonViHangHoa(donViHangHoa,hangHoaId,donViId).then(rs => {
            if(rs.message == "uploaded"){
                alterSuccess("Thêm đơn vị hàng hóa mới thành công");
                let id = rs.data.id;
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    url: 'http://localhost:8181/api/v1/admin/don-vi-hang-hoa/find-by-id?id=' + id
                }).then(function (data) {
                    // create the option and append to Select2
                    var option = new Option(data.data.donVi.tenDonVi, data.data.id, true, true);
                    $('#search-don-vi').append(option).trigger('change');

                    // manually trigger the `select2:select` event
                    $('#search-don-vi').trigger({
                        type: 'select2:select',
                        params: {
                            data: data
                        }
                    });
                });
                donViHangHoaId = id;
                $("#subModal").modal("toggle");
            }else{
                alterDanger("Thêm đơn vị hàng hóa mới không thành công");
            }
        })
    })
}

function uploadGiaBan() {
    uploadBtn.click(function () {
        if(donViHangHoaId > 0){
            var giaBan = parseFloat($("#giaBanInput").val());
            if(giaBan == null){
                alterDanger("Bạn chưa nhập giá bán", TIME_ALTER);
            }else if(giaBan <= 0){
                alterDanger("Giá bán không hợp lệ", TIME_ALTER);
            }else{
                var lichSuGiaBan = {
                    giaBan : giaBan
                }
                saveGiaBan(donViHangHoaId,lichSuGiaBan).then(rs =>{
                    if (rs.message === "uploaded") {
                        alterSuccess("Thêm giá bán mới thành công", TIME_ALTER);
                        $('#myModal').modal('toggle');
                        console.log("GiaBan : " +rs.data);
                    }else{
                        console.log("Error : " + rs.message);
                        alterDanger("Thêm giá bán mới không thành công", TIME_ALTER);
                    }
                })
            }
        }else{
            alterDanger("Bạn chưa chọn hàng hóa", TIME_ALTER);
        }
    })
}

function clickSearch() {
    btnSearch.click(function () {
        let text = inputSearch.val();
        callSearch(text);
    })
}

function callSearch(text = "%") {
    let chiNhanhId = 1;
    searchGiaBan(chiNhanhId, text).then(rs => {
        if (rs.message === "found") {
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
                    page = pagination.pageNumber;
                    if (pagination.pageNumber == 1) {
                        arr = rs.data.currentElements;
                        setView(1);
                        return;
                    }
                    searchGiaBan(chiNhanhId,text, pagination.pageNumber).then(rs => {
                        arr = rs.data.currentElements;
                        setView(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            arr = [];
            setView(1);
            paginationReset();
        }
    }).catch(err => {
        alterDanger("Không tìm thấy danh sách thiết lập giá");
        setView(1);
    })
}

function setView(pageNumber) {
    let view = `<tr>
                <th>STT</th>
                <th>Mã hàng</th>
                <th>Tên hàng</th>
                <th>Đơn vị</th>
                <th>Giá nhập gần nhất</th>
                <th>Giá bán</th>
                </tr>`;
    let len = arr.length;
    if (len > 0) {
        view += arr.map((item, index) =>  `<tr data-index="${index}" class="click-thuong-hieu">
                    <td data-id="${viewField(item.id)}">${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.lichSuGiaBan.donViHangHoa.hangHoa.ma)}</td>
                    <td>${viewField(item.lichSuGiaBan.donViHangHoa.hangHoa.tenHangHoa)}</td>
                    <td>${viewField(item.lichSuGiaBan.donViHangHoa.donVi.tenDonVi)}</td>
                    <td class="giaNhap">${viewGia(item.giaNhapGanNhat,item.lichSuGiaBan.donViHangHoa.tyLe,item.lichSuGiaBan.donViHangHoa.donVi.tenDonVi)}
                    <br>${viewThoiGian(item.ngayNhapGanNhat)}
                    </td>
                    <td><input type="number" class="giaBan" value="${viewField(item.lichSuGiaBan.giaBan)}"></td>
                </tr>`
        );
        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td><td></td><td></td><td></td><td></td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="9">Không có thông tin phù hợp</td></tr>`
    }
    table.html(view);
}
