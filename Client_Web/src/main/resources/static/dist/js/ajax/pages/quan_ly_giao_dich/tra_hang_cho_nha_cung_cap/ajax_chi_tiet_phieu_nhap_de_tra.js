var selectChiNhanh,inputSearch,btnSearch,table;
let tongTien, chiNhanhId;
var arr  = [];
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

    let searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get('phieu-nhap-id');
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


function clickThayDoiSoLuong() {
    $(document).on('click', '.soLuong ', function () {
        //table 1
        let currentRow = $(this).closest("tr");
        let hang = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        let sl = $("td input")[hang - 1].value;
        let stt = hang -1;
        let giaNhap = currentRow.find("td:eq(4)").text();
        let tongTien = (sl * giaNhap);
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
        $("#phaiTra").text(`${tongCha}`);

        $(`.tong${stt}`).each(function () {
            $(this).text(`${tongTien}`);
        });
        $("#canTra").text(`${tongCha}`);

    })
}

function enterThayDoiSoLuong() {
    $(document).on('keypress', '.soLuong', function (e) {
        if(e.which === 13){
            let currentRow = $(this).closest("tr");
            let hang = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
            let stt = hang -1;
            let sl = parseInt($("td input")[stt].value);
            let slMax  = parseInt($('span.soLuongMax')[stt].textContent);
            if(sl <= slMax) {
                let giaNhap = currentRow.find("td:eq(4)").text();
                let tongTien = (sl * giaNhap);
                currentRow.find("td:eq(6)").text(tongTien);
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
                let giaNhap = currentRow.find("td:eq(4)").text();
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

function clickUpload() {
    btnUpload.click(function () {
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() + "-"
            + (currentdate.getMonth() < 10 ? "0" : "") + (currentdate.getMonth() + 1) + "-"
            + (currentdate.getDate() < 10 ? "0" : "") + currentdate.getDate() + "T"
            + (currentdate.getHours() < 10 ? "0" : "") + currentdate.getHours() + ":"
            + (currentdate.getMinutes() < 10 ? "0" : "") + currentdate.getMinutes() + ":"
            + (currentdate.getSeconds() < 10 ? "0" : "") + currentdate.getSeconds();
        console.log(datetime);
        let tong = $("#canTra")[0].textContent;
        var phieuTraHang = {
            thoiGian: datetime,
            tongTien: tong,
            tienPhaiTra: tong,
            tienDaTra: tong
        };
        let phieuNhapHangId = 0;
        chiNhanhId = 1 ;
        uploadPhieuTraHangNhap(nguoiDungId, chiNhanhId, phieuTraHang).then(rs => {
            if (rs.message === "uploaded") {
                phieuNhapHangId = rs.data.id;
                var hangHoaIdList = [] ;
                var phieuTraHangNhapChiTietList = [];
                arr.map((item, index) => {
                    hangHoaIdList[index] = item.chiNhanhHangHoa.hangHoa.id;
                    let sl = $("td input")[index].value;
                    let giaNhap = item.giaNhap;
                    let tongTien = sl * giaNhap;
                    phieuTraHangNhapChiTietList[index] = {
                        soLuong: sl,
                        tongTien: tongTien
                    };
                })
                var phieuTraHangNhapForm = {
                    phieuTraHangNhapId: phieuNhapHangId,
                    chiNhanhId: 1,
                    hangHoaIdList : hangHoaIdList,
                    phieuTraHangNhapChiTietList : phieuTraHangNhapChiTietList
                };
                uploadPhieuTraHangNhapChiTiet(phieuTraHangNhapForm).then(r => {
                    if (r.message === "success") {
                        alterSuccess("Thêm phiếu trả hàng thành công", TIME_ALTER);
                        console.log("Form : " +r.data);
                    } else {
                        console.log("Error : " + r.message);
                        alterDanger("Thêm phiếu trả hàng không thành công", TIME_ALTER);
                    }
                })
            }else {
                alterDanger("Thêm phiếu trả hàng không thành công", TIME_ALTER);
            }
        })
    })
}


function clickSearchHH() {
    btnSearch.click(function () {
        console.log("search");
        let chiNhanhId = selectChiNhanh.val(), text = inputSearch.val();
        callSearch(chiNhanhId, text);
    })
}

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
    $("#ngayNhap").append(`${item[0].phieuNhapHang.thoiGian}`);
    $("#diaChi").append(`${item[0].phieuNhapHang.nhaCungCap.diaChi}`);
    $("#tenNhanVien").append(`${item[0].phieuNhapHang.nguoiDung.hoVaTen}`);
    $("#dienThoaiNhaCungCap").append(`${item[0].phieuNhapHang.nhaCungCap.dienThoai}`);
    $("#maPhieuNhap").append(`${item[0].phieuNhapHang.maPhieu}`);
    $("#giaGoc").append(`${item[0].phieuNhapHang.tongTien}`);
    $("#phaiTra").text(`${item[0].phieuNhapHang.tongTien}`);
    $("#canTra").text(`${item[0].phieuNhapHang.tongTien}`);
    tongTien = item[0].phieuNhapHang.tongTien;
    chiNhanhId = item[0].chiNhanhHangHoa.chiNhanh.id;
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
                     <input type="number" class="soLuong" data-id="${viewField(item.soLuong)}"  max="${viewField(item.soLuong)}" min="0" value="${viewField(item.soLuong)}" style="width: 40px">
                     <span>/</span>
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

