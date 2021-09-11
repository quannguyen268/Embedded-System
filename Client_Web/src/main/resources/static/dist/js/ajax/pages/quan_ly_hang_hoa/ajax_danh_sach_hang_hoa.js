var selectChiNhanh,inputSearch,btnSearch,tableHangHoa;
var arrHangHoa  = [];
$(function () {
    selectChiNhanh=$("#bimo2");
    inputSearch=$("#bimo1");
    btnSearch=$("#btn-1");
    tableHangHoa=$("#table-hang-hoa");
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

    callSearchHangHoa();
    clickSearchHH();
})


function clickSearchHH() {
    btnSearch.click(function () {
        console.log("search");
        let chiNhanhId = selectChiNhanh.val(), text = inputSearch.val();
        callSearchHangHoa(chiNhanhId, text);
    })
}

function callSearchHangHoa(chiNhanhId = 0 , text = "%") {
    hangHoaSearch(chiNhanhId, text).then(rs => {
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
                        arrHangHoa = rs.data.currentElements;
                        setViewHangHoa(1);
                        return;
                    }
                    // console.log(pagination.pageNumber); // khi click sẽ đọc ra số trang click
                    hangHoaSearch(chiNhanhId,text, pagination.pageNumber).then(rs => {
                        arrHangHoa = rs.data.currentElements;
                        setViewHangHoa(pagination.pageNumber);
                    }).catch(err => console.log(err))
                }
            })
        } else {
            arrHangHoa = [];
            setViewHangHoa(1);
            paginationReset();
        }
    }).catch(err => {
        console.log(err);
        alterDanger("Server Error - Search Hang Hoa");
        setViewHangHoa(1);
    })
}

function setViewHangHoa(pageNumber) {
    let view = `<tr>
                    <th>STT</th>
                <th>Mã hàng</th>
                <th>Tên hàng</th>
                <th>Mô tả </th>
                <th>Tồn kho </th>
                 <th> Thương Hiệu</th>
                <th>  Nhóm hàng </th>
                </tr>`;
    let len = arrHangHoa.length;
    if (len > 0) {
        view += arrHangHoa.map((item, index) => `<tr data-index="${index}" class="click-thuong-hieu">
                    <td>${(pageNumber - 1)*10 + index + 1}</td>
                    <td>${viewField(item.hangHoa.ma)}</td>
                    <td>${viewField(item.hangHoa.tenHangHoa)}</td>
                    <td>${viewField(item.hangHoa.moTa)}</td>
                    <td>${viewField(item.tonKho)}</td>
 
                     <td>${viewField(item.hangHoa.thuongHieu.tenThuongHieu)}</td>
                      <td>${viewField(item.hangHoa.nhomHang.tenNhomHang)}</td>
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
    tableHangHoa.html(view);
}

