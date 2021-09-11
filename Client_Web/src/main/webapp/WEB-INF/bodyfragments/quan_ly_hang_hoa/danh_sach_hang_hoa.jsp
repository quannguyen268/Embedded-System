<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/pages/quan_ly_hang_hoa/ajax_danh_sach_hang_hoa.js"></script>
<script src="resources/model/chi_nhanh/ajax_chi_nhanh.js"></script>
<script src="resources/model/hang_hoa/ajax_ds_hang_hoa.js" type="text/javascript"></script>

<!-- Main content -->
<section class="content">
    <div class="buifmaop">
        <div class="buifmaoptitle">
            <span class="page-title">Danh sách hàng hóa</span>
        </div>
        <div class="buifmaopct">
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
            </div>

    </div>
    <div class="buifmaoptb table-responsive">
        <table class="table table-hover">
            <tbody id="table-hang-hoa">
            <tr>
                <th>STT</th>
                <th>Mã hàng</th>
                <th>Tên hàng</th>
                <th>Giá bán</th>
                <th>Giá vốn </th>
                <th>Đơn vị</th>
                <th> Thương Hiệu</th>
                <th>  Nhóm hàng </th>
            </tr>

            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>3</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>4</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>5</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>6</td>
                <td></td>
                <td></td>
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
            </tr>
            <tr>
                <td>8</td>
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
            </tr>
            <tr>
                <td>10</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <div class="page-link">
            <a href="hang-hoa?id=0"><i class="fas fa-plus-circle"></i></a>
        </div>
    </div>

    <div class="receivepagi">
        <div class="pagi" id="pagination1">
            <div class="paginationjs">
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