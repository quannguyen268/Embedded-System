var selectChiNhanh,inputSearch,btnSearch,table;
var arr  = [];
const TRANG_THAI_PHIEU_NHAP_DE_TRA = ["Đang Chờ", "Đã trả"];
function viewTrangThai(phieuTraHang) {
    return TRANG_THAI_PHIEU_NHAP_DE_TRA[phieuTraHang.trangThai];
}
$(function () {


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
    clickSearchHH();
})


function clickSearchHH() {
    btnSearch.click(function () {
        let chiNhanhId = selectChiNhanh.val(), text = inputSearch.val();
        callSearch(chiNhanhId, text);
    })
}


function callSearch(chiNhanhId = 0 , text = "%") {
    phieuTraHangSearch(chiNhanhId, text).then(rs => {
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
                    if (pagination.pageNumber == 1) {
                        arr = rs.data.currentElements;
                        setView(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    phieuTraHangSearch(chiNhanhId,text, pagination.pageNumber).then(rs => {
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
        alterDanger("Server Error - Search Hang Hoa");
        setView(1);
    })
}

function setView(pageNumber) {
    let view = `<tr>
                <th>STT</th>
                <th>Mã nhập hàng</th>
                <th>Nhà cung cấp</th>
                <th>Thời gian</th>
                <th>Nhân viên </th>
                <th>Tổng tiền</th>
                <th>Tiền phải trả</th>
                <th>Tiền đã trả</th>
                <th>Trạng thái</th>
                <th></th>
                </tr>`;
    let len = arr.length;
    if (len > 0) {
        view += arr.map((item, index) => `<tr data-index="${index}" class="click-thuong-hieu">
                    <td data-id="${viewField(item.id)}">${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.maPhieu)}</td>
                    <td>${viewField(item.nhaCungCap.ten)}</td>
                    <td>${viewField(item.thoiGian)}</td>
                    <td>${viewField(item.nguoiDung.hoVaTen)}</td>
                    <td>${viewField(item.tongTien)}</td>
                    <td>${viewField(item.tienPhaiTra)}</td>
                    <td>${viewField(item.tienDaTra)}</td>
                    <td>${viewTrangThai(item)}</td>
                    <td><button><a href="/phieu-nhap-chi-tiet-de-tra?phieu-nhap-id=${item.id}" target="_blank">Chọn</a></button></td>
                </tr>`);
        if(len < 10) {
            len++;
            for (let i = len; i <= 10; i++) {
                view += `<tr><td>${(pageNumber - 1)*10 + i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`
            }
        }
    } else {
        view += `<tr><td colspan="9">Không có thông tin phù hợp</td></tr>`
    }
    table.html(view);
}


