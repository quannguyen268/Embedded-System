var selectChiNhanh,inputSearch,btnSearch,table;
var arr  = [];
var searchParams = new URLSearchParams(window.location.search);

var param = searchParams.get('id');

$(function () {

    table=$("#table-hang-hoa");
    selectChiNhanh=$("#bimo2");

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
    taiExcelTK();
})

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
    let thoiGian = viewThoiGian(item[0].hoaDon.thoiGian);
    $("#ngayBan").append(`${thoiGian}`);
    $("#diaChi").append(`${item[0].hoaDon.khachHang.diaChi}`);
    $("#tenNhanVien").append(`${item[0].hoaDon.nguoiDung.hoVaTen}`);
    $("#dienThoaiKhach").append(`${item[0].hoaDon.nguoiDung.dienThoai}`);
    $("#maHoaDon").append(`${item[0].hoaDon.ma}`);
    $("#tong-tien").append(`${item[0].hoaDon.tongTien}`);
    $("#tien-khach-tra").text(`${item[0].hoaDon.tienKhachTra}`);
    $("#tien-tra-khach").text(`${item[0].hoaDon.tienTraLaiKhach}`);
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
                    <span >${viewField(item.soLuong)}</span></td>
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

function viewThoiGian(thoiGian){
    var tg = thoiGian.substring(11,19) + " " + thoiGian.substring(8,10) +"/"
        + thoiGian.substring(5,7) + "/" + thoiGian.substring(0,4);
    return tg;
}

function taiExcelTK() {
    $('#btn-excel').on('click', function () {
        ajaxGet('v1/admin/hoa-don-chi-tiet/excel?list-hoa-don-chi-tiet=' + arr.map(hoaDonChiTiet => hoaDonChiTiet.id))
            .then(rs => {
                window.open(rs.data, '_blank');
            }).catch(ex => {
            console.log(ex);
            alterDanger("Tạo file excel thất bại");
        })
    });
    clickPrintElement(".ttcttk");
}