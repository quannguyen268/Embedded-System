var selectChiNhanh,inputSearch,btnSearch,table;
let tongTien, chiNhanhId;
var arr  = [];

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

    let searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get('id');
    callSearch(param);
    taiExcelTK();

})

function callSearch(phieuNhapId) {
    danhSachNhapHangChiTiet(phieuNhapId).then(rs => {
        if (rs.message === "found") {
            setPhieu(rs.data.currentElements);
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
                        arr = rs.data.currentElements;
                        setView(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    danhSachNhapHangChiTiet(phieuNhapId, pagination.pageNumber).then(rs => {
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
        console.log(err);
        alterDanger("Server Error - Search Phieu Nhap");
        setView(1);
    })
}

function setPhieu(item) {
    $("#tenCongTy").append(`${item[0].chiNhanhHangHoa.chiNhanh.tongCongTy.tenDoanhNghiep}`);
    $("#tenChiNhanh").append(`${item[0].chiNhanhHangHoa.chiNhanh.diaChi}`);
    $("#nhaCungCap").append(`${item[0].phieuNhapHang.nhaCungCap.ten}`);
    let thoiGian = viewThoiGian(item[0].phieuNhapHang.thoiGian);
    $("#ngayNhap").append(`${thoiGian}`);
    $("#diaChi").append(`${item[0].phieuNhapHang.nhaCungCap.diaChi}`);
    $("#tenNhanVien").append(`${item[0].phieuNhapHang.nguoiDung.hoVaTen}`);
    $("#dienThoaiNhaCungCap").append(`${item[0].phieuNhapHang.nhaCungCap.dienThoai}`);
    $("#maPhieuNhap").append(`${item[0].phieuNhapHang.maPhieu}`);
    $("#giaGoc").append(`${item[0].phieuNhapHang.tongTien}`);
    $("#phaiTra").text(`${item[0].phieuNhapHang.tienDaTra}`);
    $("#canTra").text(`${item[0].phieuNhapHang.tienPhaiTra}`);
}

function setView() {
    let view = `<tr>
                <th>STT</th>
                <th>Mã hàng hóa</th>
                <th>Tên hàng hóa</th>
                <th>Số lượng</th>
                <th>Giá nhập </th>
                <th>Thành tiền </th>
                </tr>`;
    var view2 = `       <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên hàng</th>
                            <th scope="col">Thành tiền</th>
                        </tr>`;
    let len = arr.length;
    let pageNumber=1;
    if (len > 0) {
        view += arr.map((item, index) => `<tr data-index="${index}" class="click-thuong-hieu">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.chiNhanhHangHoa.hangHoa.ma)}</td>
                    <td>${viewField(item.chiNhanhHangHoa.hangHoa.tenHangHoa)}</td>
                     <td  style="text-align: center; vertical-align: middle">
                     <span class="soLuongMax soLuongMax${index}" value="${viewField(item.soLuong)}">${viewField(item.soLuong)}</span>
                     </td>
                    <td class="giaNhap"> ${viewField(item.giaNhap)} </td>   
                     <td class="tong tong${index}">${viewField(item.tongTien)} </td>    
                </tr>`);

        view2 +=arr.map((item, index) => `<tr data-index="${index}">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.chiNhanhHangHoa.hangHoa.tenHangHoa)}</td>
                    <td class="tong${index}">${viewField(item.tongTien)}</td>   
                </tr>`);

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
    $("#table_tra_hang").html(view2);
}

function viewThoiGian(thoiGian){
    var tg = thoiGian.substring(11,19) + " " + thoiGian.substring(8,10) +"/"
        + thoiGian.substring(5,7) + "/" + thoiGian.substring(0,4);
    return tg;
}

function taiExcelTK() {
    $('#btn-excel').on('click', function () {
        console.log("inds");
        ajaxGet('v1/admin/phieu-nhap-hang-chi-tiet/excel?list-phieu-nhap-hang-chi-tiet=' + arr.map(hoaDonChiTiet => hoaDonChiTiet.id))
            .then(rs => {
                window.open(rs.data, '_blank');
            }).catch(ex => {
            console.log(ex);
            alterDanger("Tạo file excel thất bại");
        })
    });
    clickPrintElement(".ttcttk");
}

