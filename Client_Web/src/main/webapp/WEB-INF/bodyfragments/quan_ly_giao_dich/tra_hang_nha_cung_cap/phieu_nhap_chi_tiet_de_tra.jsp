<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/model/chi_nhanh/ajax_chi_nhanh.js"></script>
<script src="resources/model/phieu_nhap_de_tra/ajax_nhap_chi_tiet_de_tra.js"></script>
<script src="resources/model/phieu_nhap_de_tra/ajax_nhap_de_tra.js"></script>
<script src="resources/pages/quan_ly_giao_dich/tra_hang_cho_nha_cung_cap/ajax_chi_tiet_phieu_nhap_de_tra.js"></script>
<script src="resources/model/nhan_vien/ajax_nhan_vien.js"></script>

<!-- Main content -->
<section class="content">
    <div class="buifmaop">
        <div class="buifmaoptitle">
            <span class="page-title">Danh sách trả hàng cho nhà cung cấp</span>
        </div>

        <div class="buifmaopct">
            <div class="row">
                <div class="col-md-8">

                    <div class="row">
                        <div class="col-md-5">
                            <div class="caifop1li">
                                <label for="bimo2">Thuộc chi nhánh</label>
                                <select class="js-example-basic-single" name="state" id="bimo2">
                                    <option value=0>Tất cả</option>
                                    <option value=1>Cocacola</option>
                                    <option value=2>Pepsi</option>
                                    <option value=3>Fanta</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="caifop1li form-group">
                                <label for="bimo1">Nhập thông tin tìm kiếm</label>
                                <input type="text" class="form-control" id="bimo1">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <label style="opacity: 0">btn</label>
                            <button class="btn btn-primary" id="btn-1" style="display: block">Tìm Kiếm</button>
                        </div>
                    </div>
                    <style>
                        .my-custom-scrollbar {
                            position: relative;
                            height: 600px;
                            overflow: auto;
                        }
                        .table-wrapper-scroll-y {
                            display: block;
                        }
                    </style>
                    <div class="row">
                        <div class="buifmaoptb my-custom-scrollbar table-wrapper-scroll-y">
                            <table class="table table-hover" id="sum_table">
                                <tbody id="table-hang-hoa">
                                <tr>
                                    <th>STT</th>
                                    <th>Mã hàng hóa</th>
                                    <th>Tên hàng hóa</th>
                                    <th>Số lượng </th>
                                    <th>Giá nh</th>
                                    <th>Thành tiền</th>
                                </tr>

                                <td>1</td>
                                <td></td>
                                <td></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="receivepagi">
                            <div class="pagi" id="pagination1">
                                <div class="paginationjs">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-md-4">
                    <h3 id="tenCongTy" class="text-center">Công ty : </h3>
                    <h4 id="maPhieuNhap">MÃ PHIẾU NHẬP :</h4>

                    <div class="row">
                        <div class="col-md-6">
                            <label id="tenChiNhanh">Chi nhánh :</label>
                        </div>

                        <div class="col-md-6">
                            <label id="nhaCungCap">Nhà cung cấp:</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label id="ngayNhap">Ngày nhập :</label>
                        </div>
                        <div class="col-md-6">
                            <label id="diaChi">Địa chỉ :</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label id="tenNhanVien">Nhân Viên :</label>
                        </div>
                        <div class="col-md-6">
                            <label id="dienThoaiNhaCungCap">Điện thoại:</label>
                        </div>
                    </div>
                    <h3 class="text-center">Thông tin trả hàng</h3>

                    <table class="table table-borderless" id="table_tra_hang">
                        <tbody >
                        <tr>
                            <th>Tên hàng</th>
                            <th>Tổng tiền</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>

                        </tbody>
                    </table>

                    <div class="row">
                        <div class="col-md-6">
                            <label >Tổng giá gốc hàng mua</label>
                        </div>
                        <div class="col-md-6 text-center">
                            <p id="giaGoc"></p>
                        </div>
                    </div>

                    <div class="row ">
                        <div class="col-md-6 ml-3">
                            <label>Tổng tiền hàng trả  </label>
                        </div>
                        <div class="col-md-6 text-center">
                            <p id="phaiTra"></p>
                        </div>
                    </div>




                    <div class="row ">
                        <div class="col-md-6">
                            <label>Cần trả khách</label>
                        </div>
                        <div class="col-md-6 text-center">
                            <p id="canTra">10000</p>
                        </div>
                    </div>

                    <div class="row" >
                        <div class="col-md-4">
                            <button class="btn btn-success" style="width: 100px" id="btn-tra-hang">Trả hàng</button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-primary" style="width: 100px" id="btn-sua-nhom-hang">In </button>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-danger" style="width: 100px" id="btn-xoa-nhom-hang">Xuất excel</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    </div>





</section>
<!-- /.content -->
<script>
    $(document).ready(function () {
        $('.js-example-basic-single').select2({ width: 'resolve' });
        $('.js-example-basic-multiple').select2({ width: 'resolve' });
    });
</script>