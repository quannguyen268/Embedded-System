<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" href="resources/dist/css/qlttdn.css">
<script src="resources/model/hang_hoa/ajax_nhom_hang.js" type="text/javascript"></script>
<script src="resources/model/hang_hoa/ajax_don_vi.js" type="text/javascript"></script>
<script src="resources/model/hang_hoa/ajax_thuong_hieu.js" type="text/javascript"></script>
<script src="resources/model/hang_hoa/ajax_hang_hoa.js" type="text/javascript"></script>
<script src="resources/model/upload_file/ajax_upload_file.js" type="text/javascript"></script>
<script src="resources/pages/quan_ly_hang_hoa/ajax_thong_tin_hang_hoa.js" type="text/javascript"></script>
<script type="text/javascript" src="http://js.nicedit.com/nicEdit-latest.js"></script>

<div class="modal fade" id="modal-nhom-hang" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thêm mới nhóm hàng</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="caifop1li form-group">
                    <label>Tên nhóm hàng:</label>
                    <input type="text" class="form-control" id="text-9">
                    <span class="help-block">Help block with error</span>
                </div>
                <div class="caifop1li form-group">
                    <label>Mã nhóm hàng:</label>
                    <input type="text" class="form-control" id="text-11">
                    <span class="help-block">Help block with error</span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary" id="btn-save-nhom-hang">Lưu</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal-thuong-hieu" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thên mới thương hiệu</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="caifop1li form-group">
                    <label>Tên thương hiệu:</label>
                    <input type="text" class="form-control" id="text-10">
                    <span class="help-block">Help block with error</span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary" id="btn-save-thuong-hieu">Lưu</button>
            </div>
        </div>
    </div>
</div>


<!-- Main content -->
<section class="content">
    <div class="buifmaop">
        <div class="buifmaoptitle">
            <span class="page-title">Thêm hàng hóa</span>
        </div>
        <div class="buifmaopct">
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label>Mã hàng:</label>
                        <input type="text" class="form-control" id="text-1" disabled>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label>Tên hàng hóa:</label>
                        <input type="text" class="form-control" id="text-2">
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li">
                        <label>Nhóm hàng:</label>
                        <select class="js-example-basic-single" name="state" id="select-1">
                            <option value=1>Sữa</option>
                            <option value=2>Bánh</option>
                            <option value=3>Mì gói</option>
                            <option value=0>+ Thêm nhóm hàng</option>
                        </select>
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="caifop1li">
                        <label>Thương hiệu:</label>
                        <select class="js-example-basic-single" name="state" id="select-2">
                            <option value=1>Vinamilk</option>
                            <option value=2>AFC</option>
                            <option value=3>Omachi</option>
                            <option value=0>+ Thêm thương hiệu</option>
                        </select>
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
                <%--                <div class="col-md-6">--%>
                <%--                    <div class="caifop1li">--%>
                <%--                        <label for="bimo3">Loại hàng:</label>--%>
                <%--                        <select class="js-example-basic-multiple" name="state" id="bimo3" multiple="multiple">--%>
                <%--                            <option value="NN">Bánh kẹo</option>--%>
                <%--                            <option value="II">Đồ uống</option>--%>
                <%--                            <option value="VV">Hàng tạp hóa</option>--%>
                <%--                        </select>--%>
                <%--                    </div>--%>
                <%--                </div>--%>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label>Tích điểm: </label>
                        <input type="number" class="form-control" min="0" id="text-5" value="0">
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
<%--                <div class="col-md-6">--%>
<%--                    <div class="caifop1li">--%>
<%--                        <label>Đơn vị cơ bản:</label>--%>
<%--                        <select class="js-example-basic-single" name="state" id="select-3">--%>
<%--                            <option value=1>Hộp</option>--%>
<%--                            <option value=2>Gói</option>--%>
<%--                            <option value=3>Kg</option>--%>
<%--                            <option value=0>+ Thêm đơn vị</option>--%>
<%--                        </select>--%>
<%--                    </div>--%>
<%--                </div>--%>
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label>Giảm giá:  </label>
                        <input type="number" class="form-control" min="0" id="text-7" value="0">
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
            </div>
<%--            <div class="row">--%>
<%--                <div class="col-md-6">--%>
<%--                    <div class="caifop1li form-group">--%>
<%--                        <label>Số lượng:  </label>--%>
<%--                        <input type="number" class="form-control" min="0" id="text-6">--%>
<%--                        <span class="help-block">Help block with error</span>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--                <div class="col-md-6">--%>
<%--                    <div class="caifop1li form-group">--%>
<%--                        <label>Giảm giá:  </label>--%>
<%--                        <input type="number" class="form-control" min="0" id="text-7">--%>
<%--                        <span class="help-block">Help block with error</span>--%>
<%--                    </div>--%>
<%--                </div>--%>

<%--            </div>--%>


            <div class="row">
                <div class="col-md-6">
                    <div class="caifop1li form-group">
                        <label>Mã giảm giá: </label>
                        <input type="text" class="form-control" min="0" id="text-8">
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="view-gach-ngang">
                        <label>Hình ảnh:</label><hr/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="caifop1li form-group">
                        <label>Hình ảnh 1:</label>
                        <form id="form-file">
                            <input type="file" class="form-control" id="file-1" name="files" >
                        </form>
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="caifop1li form-group">
                        <label>Hình ảnh 2:</label>
                        <form id="form-file1">
                            <input type="file" class="form-control" id="file-2" name="files">
                        </form>
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="caifop1li form-group">
                        <label>Hình ảnh 3:</label>
                        <form id="form-file2">
                            <input type="file" class="form-control" id="file-3" name="files">
                        </form>
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="caifop1li form-group">
                        <label>Hình ảnh 4:</label>
                        <form class="custom-file" id="form-file3">
                            <input type="file" class="form-control" id="file-4" name="files">
                        </form>
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="caifop1li form-group">
                        <label>Hình ảnh 5:</label>
                        <form id="form-file4">
                            <input type="file" class="form-control" id="file-5" name="files">
                        </form>
                        <span class="help-block">Help block with error</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="view-gach-ngang">
                        <label>Mô tả</label><hr/>
                    </div>
                </div>
            </div>
            <div class="row " id="mo-ta-hang-hoa">

                <div class="col-xs-12">
                    <textarea name="mo-ta" id="mo-ta" style="width: 100%"></textarea>
                </div>
            </div>
<%--            <div class="row">--%>
<%--                <div class="col-xs-12">--%>
<%--                    <div class="view-gach-ngang">--%>
<%--                        <label>Đơn vị hàng hóa:</label><hr/>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            </div>--%>
<%--            <div id="list-don-vi">--%>
<%--                <div class="row ty-le-don-vi">--%>
<%--                    <div class="col-xs-3">--%>
<%--                        <div class="caifop1li form-group">--%>
<%--                            <label>Tỉ lệ:</label>--%>
<%--                            <input type="text" class="form-control ti-le-don-vi">--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                    <div class="col-xs-4">--%>
<%--                        <div class="caifop1li form-group">--%>
<%--                            <label>Giá bán:</label>--%>
<%--                            <input type="number" class="form-control gia-ban-don-vi" min="0">--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                    <div class="col-xs-4">--%>
<%--                        <div class="caifop1li">--%>
<%--                            <label>Đơn vị:</label>--%>
<%--                            <select class="select2 js-example-basic-single ten-don-vi" name="state">--%>
<%--                                <option value=1>Hộp</option>--%>
<%--                                <option value=2>Gói</option>--%>
<%--                                <option value=3>Kg</option>--%>
<%--                                <option value=0>+ Thêm đơn vị</option>--%>
<%--                            </select>--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                    &lt;%&ndash;                    <div class="col-xs-1">&ndash;%&gt;--%>
<%--                    &lt;%&ndash;                        <div class="view-mid">&ndash;%&gt;--%>
<%--                    &lt;%&ndash;                            <label style="visibility: hidden">remove:</label>&ndash;%&gt;--%>
<%--                    &lt;%&ndash;                            <i class="far fa-trash-alt text-red"></i>&ndash;%&gt;--%>
<%--                    &lt;%&ndash;                        </div>&ndash;%&gt;--%>
<%--                    &lt;%&ndash;                    </div>&ndash;%&gt;--%>
<%--                </div>--%>
<%--            </div>--%>
<%--            <div class="row">--%>
<%--                <div class="col-xs-12">--%>
<%--                    <i class="fas fa-plus text-green" id="add-row-don-vi"></i>--%>
<%--                </div>--%>
<%--            </div>--%>
            <div class="row mgtb-20">
                <div class="col-xs-12 text-center">
                    <button class="btn btn-primary" id="luu-hang-hoa">Lưu lại</button>
                    <button class="btn btn-default" id="back-history">Quay lại</button>
                    <button class="btn btn-primary hidden" data-toggle="modal" data-target="#modal-nhom-hang" id="btn-them-nhom-hang">
                        Thêm nhóm hàng
                    </button>
                    <button class="btn btn-primary hidden" data-toggle="modal" data-target="#modal-thuong-hieu" id="btn-them-thuong-hieu">
                        Thêm thương hiệu
                    </button>
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