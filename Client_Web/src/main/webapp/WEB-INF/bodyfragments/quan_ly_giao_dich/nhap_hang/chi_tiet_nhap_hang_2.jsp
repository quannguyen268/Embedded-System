<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/model/giao_dich/nhap_hang/ajax_phieu_nhap_hang.js" type="text/javascript"></script>
<script src="resources/model/doi_tac/ajax_nha_cung_cap.js" type="text/javascript"></script>
<script src="resources/model/nhan_vien/ajax_nhan_vien.js" type="text/javascript"></script>
<script src="resources/model/hang_hoa/ajax_hang_hoa.js" type="text/javascript"></script>
<script src="resources/dist/js/ajax/pages/quan_ly_giao_dich/nhap_hang/ajax_chi_tiet_nhap_hang_2.js" type="text/javascript"></script>
<style>
    .thong-tin-phieu {
        font-size: 15px ;
    }
</style>
<div id="modal-thanh-toan" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thanh toán phiếu nhập hàng</h4>
            </div>
            <div class="modal-body">
                <div class="caifop1li form-group">
                    <label for="bimo1">Nhập số tiền:</label>
                    <input type="number" class="form-control" id="bimo6" min="0" value="0">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary mgr-10" data-dismiss="modal" id="confirm-thanh-toan">Thanh toán</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
            </div>
        </div>

    </div>
</div>
<!-- Modal -->
<div id="modal-remove" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Xác nhận thao tác</h4>
            </div>
            <div class="modal-body">
                <div class="col-xs-12" id="text-confirm">
                    Bạn có chắc chắn xóa phiếu này không ?
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger mgr-10" data-dismiss="modal" id="confirm-yes-remove">Đồng ý xóa</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Không xóa</button>
            </div>
        </div>

    </div>
</div>
<!-- Main content -->
<section class="content">
    <div class="buifmaop">
        <div class="buifmaoptitle">
            <span class="page-title">Thông tin phiếu nhập hàng</span>
            <h4 id="phieu-nhap-title" style="color: rgb(0,153,255);"></h4>
        </div>
        <div class="buifmaopct">
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li">
                        <label>Người nhập:</label>
                        <select class="js-example-basic-multiple" name="state" id="bimo1">
                            <option value="NN">Bánh kẹo</option>
                            <option value="II">Đồ uống</option>
                            <option value="VV">Hàng tạp hóa</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li">
                        <label>Nhà cung cấp:</label>
                        <select class="js-example-basic-multiple" name="state" id="bimo2">
                            <option value="NN">Bánh kẹo</option>
                            <option value="II">Đồ uống</option>
                            <option value="VV">Hàng tạp hóa</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label for="bimo1">Giảm giá:</label>
                        <input type="text" class="form-control" id="bimo3">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label for="bimo1">Ghi chú:</label>
                        <input type="text" class="form-control" id="bimo4">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="buifmaoptb">
        <hr/>
        <div class="row thong-tin-phieu" style="margin-bottom: 5px">
            <div class="col-lg-6 text-left">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="caifop1li">
                            <label>Hàng hóa:</label>
                            <%--                            <select class="js-example-basic-multiple" name="state" id="bimo5" multiple="multiple">--%>
                            <select class="js-example-basic-multiple" name="state" id="bimo5">
                                <option value="NN">Bánh kẹo</option>
                                <option value="II">Đồ uống</option>
                                <option value="VV">Hàng tạp hóa</option>
                            </select>
                        </div>
                    </div>
                    <div class="co-lg-6">
                        <div class="caifop1li">
                            <label style="visibility: hidden">text:</label>
                            <button class="btn btn-success" style="width: 100px" id="btn-them-hang">Thêm hàng</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 text-right">
                <div class="caifop1li">
                    <label style="visibility: hidden">text:</label>
                    <div>
                        <strong class="m-r-1">Tổng tiền:</strong> <span id="so-tong-tien">100.000 VNĐ</span> -
                        <strong class="m-r-1">Tiền phải trả:</strong> <span id="tien-phai-tra">80.000 VNĐ</span> -
                        <strong class="m-r-1">Tiền đã trả:</strong> <span id="tien-da-tra">0 VNĐ</span>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-hover">
            <tbody>
            <tr>
                <th>STT</th>
                <th>Hàng Hóa</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
            </tr>
            <tr>
                <td>1</td>
                <td>
                    <div class="hang-hoa-phieu-nhap">
                        <img src="data:image/jpeg;base64,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" class="img-hang-hoa-phieu-nhap">
                        <div class="ten-hang-hoa">Sữa 1</div>
                    </div>
                </td>
                <td style="text-align: center; vertical-align: middle">
                    <input type="number" id="quantity" min="1" value="1" style="width: 40px">
                </td>
                <td style="text-align: center; vertical-align: middle">
                    100.000 VNĐ
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <div class="receivepagi">
            <div class="pagi" id="pagination">
                <div class="paginationjs">
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 text-center">
            <button class="btn btn-success" style="width: 100px" id="btn-thanh-toan">Thanh Toán</button>
            <button class="btn btn-primary" style="width: 100px" id="btn-nhap-hang">Nhập Hàng</button>
            <button class="btn btn-primary" style="width: 100px" id="btn-luu">Lưu</button>
            <button class="btn btn-danger" style="width: 100px" id="btn-xoa-nhap-hang">Xóa</button>
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