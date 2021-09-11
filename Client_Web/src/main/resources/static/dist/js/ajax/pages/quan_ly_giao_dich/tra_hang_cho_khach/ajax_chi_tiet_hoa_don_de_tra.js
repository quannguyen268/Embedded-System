var selectChiNhanh,inputSearch,btnSearch,table;
var arr  = [];
var searchParams = new URLSearchParams(window.location.search);
let tongTien;

var param = searchParams.get('hoa-don-id');
var nguoiDungId=window.sessionStorage.getItem("id");

$(function () {

    selectChiNhanh=$("#bimo2");
    inputSearch=$("#bimo1");
    btnSearch=$("#btn-1");
    btnUpload=$("#btn-tra-hang");
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

    callSearch(param);
    clickSearchHH();
    clickThayDoiSoLuong();
    enterThayDoiSoLuong();
    clickUpload();

    // $('td input').keyup(function (e) {
    //     if(e.keyCode == 13)
    //     {
    //         $(this).trigger("click");
    //     }
    // })

})

function clickUpload() {
    btnUpload.click(function () {
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-"
            + (currentdate.getMonth() < 10 ? "0" : "") + (currentdate.getMonth() + 1) + "-"
            + (currentdate.getDate() < 10 ? "0" : "") + currentdate.getDate() + "T"
            + (currentdate.getHours() < 10 ? "0" : "") + currentdate.getHours() + ":"
            + (currentdate.getMinutes() < 10 ? "0" : "") + currentdate.getMinutes() + ":"
            + (currentdate.getSeconds() < 10 ? "0" : "") + currentdate.getSeconds();
        let tienTraKhach = $("#canTra")[0].textContent;
        var phieuTraHang = {
            thoiGian: datetime,
            tienTraKhach: tienTraKhach,
            lyDo: "Hết hạn sử dụng",
            ghiChu: ""
        };
        console.log("Phieu Tra Hang" +JSON.stringify(phieuTraHang));
        uploadPhieuTraKhach(nguoiDungId, phieuTraHang).then(rs => {
            if (rs.message === "uploaded") {
                phieuTraKhachId = rs.data.id;
                console.log("Phieu Tra Hang Khach Chi Tiet : " + JSON.stringify(rs.data));
                var hoaDonIdList = [] ;
                var phieuTraKhachChiTietList = [];
                arr.map((item, index) => {
                    hoaDonIdList[index] = item.id;
                    let sl = $("td input")[index].value;
                    let giaBan = item.lichSuGiaBan.giaBan;
                    let thanhTien = sl * giaBan;
                    phieuTraKhachChiTietList[index] = {
                        soLuong: sl,
                        tongTien: thanhTien
                    };
                })
                var phieuTraKhachForm = {
                    phieuTraKhachId: phieuTraKhachId,
                    hoaDonChiTietId : hoaDonIdList,
                    phieuTraKhachChiTietList : phieuTraKhachChiTietList
                };
               uploadPhieuTraKhachChiTiet(phieuTraKhachForm).then(r => {
                    if (r.message === "success") {
                        alterSuccess("Thêm phiếu trả hàng cho khách thành công", TIME_ALTER);
                        clickPrintElement(".kth");
                    } else {
                        console.log("Error : " + r.message);
                        alterDanger("Thêm phiếu trả hàng cho khách không thành công", TIME_ALTER);
                    }
                })
            }else {
                alterDanger("Thêm phiếu trả hàng cho khách không thành công", TIME_ALTER);
            }
        })
    })
}

function clickThayDoiSoLuong() {
    $(document).on('click', '.soLuong ', function () {
        console.log("click vao day");
        //table 1
        let currentRow = $(this).closest("tr");
        let hang = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        let sl = $("td input")[hang - 1].value;
        let giaBan = currentRow.find("td:eq(3)").text();
        let giamGia = currentRow.find("td:eq(5)").text();
        tongTien = (sl * giaBan) * (1-giamGia);
        currentRow.find("td:eq(6)").text(tongTien);
        let tenHang = currentRow.find("td:eq(1)").text();
        let totals = [0, 0, 0, 0];
        let tongCha = 0;
        let $dataRows = $("#sum_table tr:not('th')");
        $dataRows.each(function () {
            $(this).find('.tong').each(function (i) {
                totals[i] = parseFloat($(this).html(), 3);
                tongCha = tongCha + totals[i];
            });
        });
        $("#phaiTra").text(`${tongCha}`);

        let stt=parseInt(hang)-1;
        $(`.tong${stt}`).each(function () {
            $(this).text(`${tongTien}`);
        });
        $("#canTra").text(`${tongCha}`);

    })
}

function enterThayDoiSoLuong() {
    $(document).on('keypress', '.soLuong ', function (e) {
        if(e.which === 13){
            let currentRow = $(this).closest("tr");
            let hang = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
            let stt = hang -1;
            let sl = parseInt($("td input")[stt].value);
            let slMax  = parseInt($('span.soLuongMax')[stt].textContent);
            if(sl <= slMax) {
                let giaBan = currentRow.find("td:eq(3)").text();
                console.log(giaBan);
                tongTien = (sl * giaBan);
                currentRow.find("td:eq(6)").text(tongTien);
                console.log(stt);
                let tongCha = 0;
                let len = arr.length;
                for(i = 0; i < len ; i++){
                    let thanhTien = parseFloat($('td.tong'+i)[1].textContent);
                    if(i != stt){
                        tongCha = tongCha + thanhTien;
                    }
                    else{
                        tongCha = tongCha + tongTien;
                    }
                    console.log("Lan " + i + " : " + thanhTien);
                }
                console.log(tongCha);
                $("#phaiTra").text(`${tongCha}`);

                $(`.tong${stt}`).each(function () {
                    $(this).text(`${tongTien}`);
                });
                $("#canTra").text(`${tongCha}`);
            }else{
                alert("Số lượng trả quá số lượng cho phép!");
                $("td input").eq(stt).val(slMax);
                let giaNhap = currentRow.find("td:eq(3)").text();
                let tongTien = (slMax * giaNhap);
                currentRow.find("td:eq(6)").text(tongTien);
                let totals = [0, 0, 0, 0];
                let tongCha = 0;
                let $dataRows = $("#sum_table tr:not('th')");
                $dataRows.each(function () {
                    $(this).find('.tong').each(function (i) {
                        totals[i] = parseFloat($(this).html(), 3);
                        tongCha = tongCha + totals[i];
                    });
                });
                $("#phaiTra").text(`${tongCha}`);

                $(`.tong${stt}`).each(function () {
                    $(this).text(`${tongTien}`);
                });
                $("#canTra").text(`${tongCha}`);
            }
        }
    })
}


function clickPrintElement(selector) {
    $('#btn-print').on("click", function () {
        console.log("vao day");
        $(selector).printThis({
            importCSS: true,
            printDelay: 333,
        });
    });
}


function clickSearchHH() {
    btnSearch.click(function () {
        console.log("search");
        let chiNhanhId = selectChiNhanh.val(), text = inputSearch.val();
        callSearch(chiNhanhId, text);
    })
}

function callSearch(hoaDonId) {
    danhSachHoaDonChiTiet(hoaDonId).then(rs => {
        if (rs.message === "found") {
            setPhieu(rs.data.currentElements);
            arr = rs.data.currentElements;
            setView();
            danhSachHoaDonChiTiet(hoaDonId).then(rs => {
                arr = rs.data.currentElements;
                        setView();
                    }).catch(err => console.log(err))
                }
            })
    .catch(err => {
        console.log(err);
        alterDanger("Server Error - Search Hoa Don");
        setView(1);
    })
}

function setPhieu(item) {
    $("#tenCongTy").append(`${item[0].hoaDon.chiNhanh.tongCongTy.tenDoanhNghiep}`);
    $("#tenChiNhanh").append(`${item[0].hoaDon.chiNhanh.diaChi}`);
    $("#khachHang").append(`${item[0].hoaDon.khachHang.tenKhachHang}`);
    $("#ngayBan").append(`${item[0].hoaDon.thoiGian}`);
    $("#diaChi").append(`${item[0].hoaDon.khachHang.diaChi}`);
    $("#tenNhanVien").append(`${item[0].hoaDon.nguoiDung.hoVaTen}`);
    $("#dienThoaiKhach").append(`${item[0].hoaDon.nguoiDung.soDienThoai}`);
    $("#maHoaDon").append(`${item[0].hoaDon.maHoaDon}`);
    $("#giaGoc").append(`${item[0].hoaDon.tongTien}`);
    $("#phaiTra").text(`${item[0].hoaDon.tongTien}`);
    $("#canTra").text(`${item[0].hoaDon.tongTien}`);
    tongTien = item[0].hoaDon.tongTien;
    console.log("Tong Tien : " + tongTien);
}

function setView() {
    let view = `<tr>
                <th>STT</th>
               <th>Tên hàng</th>
               <th>Số lượng</th>
               <th>Giá bán </th>
               <th>Đơn vị</th>
               <th>Giảm giá</th>
               <th>Tổng tiền</th>
                </tr>`;

    var view2 = `       <tr>
                             <th scope="col">STT</th>
                            <th scope="col">Tên hàng</th>
                            <th scope="col">Thành tiền</th>
                        </tr>`;
    let len = arr.length;

    //ko   view = `       <tr>
    //                             <th scope="col">Tên hàng</th>
    //                             <th scope="col">Thành tiền</th>
    //                         </tr>`;
    let pageNumber=1;
    if (len > 0) {
        view += arr.map((item, index) => `<tr data-index="${index}" id="giaTri" class="click-san-pham">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.lichSuGiaBan.donViHangHoa.hangHoa.tenHangHoa)}</td>
                    <td  style="text-align: center; vertical-align: middle">
                    <input type="number" class="soLuong" data-id="${viewField(item.soLuong)}"  max="${viewField(item.soLuong)}" min="0" value="${viewField(item.soLuong)}" style="width: 40px">
                    <span>/</span>
                    <span class="soLuongMax" >${viewField(item.soLuong)}</span></td>
                    <td class="giaBan">${viewField(item.lichSuGiaBan.giaBan)}</td>
                    <td>${viewField(item.lichSuGiaBan.donViHangHoa.donVi.tenDonVi)}</td>    
                    <td>${viewField(item.giamGia)}</td>    
                     <td class="tong tong${index}">${viewField(item.tongGia)}</td>  
                    
                </tr>`);

        view2 +=arr.map((item, index) => `<tr data-index="${index}">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.lichSuGiaBan.donViHangHoa.hangHoa.tenHangHoa)}</td>
                     <td class="tong${index}">${viewField(item.tongGia)}</td>   
                    
                </tr>`);

        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="9">Không có thông tin phù hợp</td></tr>`
    }
    table.html(view);
    $("#table_tra_hang").html(view2);
}

