<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/model/hang_hoa/ajax_thuong_hieu.js" type="text/javascript"></script>
<script src="resources/model/hang_hoa/ajax_nhom_hang.js" type="text/javascript"></script>
<script src="resources/model/hang_hoa/ajax_don_vi.js" type="text/javascript"></script>
<script src="resources/pages/quan_ly_hang_hoa/ajax_danh_muc_hang_hoa.js" type="text/javascript"></script>
<div class="modal fade in" id="modal-remove">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Xác nhận thao tác</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="text-confirm">
                        Bạn có chắc chắn xóa danh mục này không ?
                    </div>
                </div>
            </div>
            <div class="modal-footer text-right">
                <button type="button" class="btn btn-danger mgr-10" data-dismiss="modal" id="confirm-yes">Đồng ý xóa</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Không xóa</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-lg-4 danh-muc">
            <div class="buifmaop">
                <div class="buifmaoptitle">
                    <span class="page-title">Danh mục thương hiệu</span>
                </div>
                <div class="buifmaopct">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="caifop1li form-group">
                                <label>Tên thương hiệu:</label>
                                <input type="text" class="form-control" id="bimo1">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label style="opacity: 0">btn</label>
                            <button class="btn btn-primary" style="display: block" id="btn-search-1">Tìm Kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buifmaoptb">
                <table class="table table-hover pointer">
                    <tbody id="table-thuong-hieu">
                    <tr>
                        <th>STT</th>
                        <th>Tên thương hiệu</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10</td>
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
            <div class="chuc-nang-thuong-hieu view-chuc-nang hidden">
                <div class="row">
                    <div class="col-xs-12">
                        <hr/>
                        <div class="caifop1li form-group">
                            <label><strong>Tên thương hiệu:</strong></label>
                            <input type="text" class="form-control" id="text-thuong-hieu">
                            <span class="help-block">Help block with error</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 text-center">
                        <button class="btn btn-success" style="width: 100px" id="btn-them-thuong-hieu">Thêm</button>
                        <button class="btn btn-primary" style="width: 100px" id="btn-sua-thuong-hieu">Sửa</button>
                        <button class="btn btn-danger" style="width: 100px" id="btn-xoa-thuong-hieu">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 danh-muc">
            <div class="buifmaop">
                <div class="buifmaoptitle">
                    <span class="page-title">Danh mục nhóm hàng</span>
                </div>
                <div class="buifmaopct">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="caifop1li form-group">
                                <label>Tên, mã nhóm hàng:</label>
                                <input type="text" class="form-control" id="bimo2">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label style="opacity: 0">btn</label>
                            <button class="btn btn-primary" id="btn-search-2" style="display: block">Tìm Kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buifmaoptb">
                <table class="table table-hover pointer">
                    <tbody id="table-nhom-hang">
                    <tr>
                        <th>STT</th>
                        <th>Tên nhóm hàng</th>
                        <th>Mã nhóm hàng</th>
                    </tr>
                    <tr>
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
                    </tr>
                    <tr>
                        <td>6</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="receivepagi">
                <div class="pagi" id="pagination2">
                    <div class="paginationjs">
                    </div>
                </div>
            </div>
            <div class="chuc-nang-nhom-hang view-chuc-nang hidden">
                <div class="row">
                    <div class="col-lg-6">
                        <hr/>
                        <div class="caifop1li form-group">
                            <label><strong>Tên nhóm hàng:</strong></label>
                            <input type="text" class="form-control" id="text-nhom-hang">
                            <span class="help-block">Help block with error</span>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <hr>
                        <div class="caifop1li form-group">
                            <label><strong>Mã nhóm hàng:</strong></label>
                            <input type="text" class="form-control" id="text-ma-nhom-hang">
                            <span class="help-block">Help block with error</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 text-center">
                        <button class="btn btn-success" style="width: 100px" id="btn-them-nhom-hang">Thêm</button>
                        <button class="btn btn-primary" style="width: 100px" id="btn-sua-nhom-hang">Sửa</button>
                        <button class="btn btn-danger" style="width: 100px" id="btn-xoa-nhom-hang">Xóa</button>
                    </div>
                </div>
            </div>
            </div>
        <div class="col-lg-4 danh-muc">
            <div class="buifmaop">
                <div class="buifmaoptitle">
                    <span class="page-title">Danh mục đơn vị</span>
                </div>
                <div class="buifmaopct">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="caifop1li form-group">
                                <label>Tên đơn vị:</label>
                                <input type="text" class="form-control" id="bimo3">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label style="opacity: 0">btn</label>
                            <button class="btn btn-primary" id="btn-search-3" style="display: block">Tìm Kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buifmaoptb">
                <table class="table table-hover pointer">
                    <tbody id="table-don-vi">
                    <tr>
                        <th>STT</th>
                        <th>Tên đơn vị</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="receivepagi">
                <div class="pagi" id="pagination3">
                    <div class="paginationjs">
                    </div>
                </div>
            </div>
            <div class="chuc-nang-don-vi view-chuc-nang hidden">
                <div class="row">
                    <div class="col-xs-12">
                        <hr/>
                        <div class="caifop1li form-group">
                            <label><strong>Tên đơn vị:</strong></label>
                            <input type="text" class="form-control" id="text-don-vi">
                            <span class="help-block">Help block with error</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 text-center">
                        <button class="btn btn-success" style="width: 100px" id="btn-them-don-vi">Thêm</button>
                        <button class="btn btn-primary" style="width: 100px" id="btn-sua-don-vi">Sửa</button>
                        <button class="btn btn-danger" style="width: 100px" id="btn-xoa-don-vi">Xóa</button>
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