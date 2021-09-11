<%--
  Created by IntelliJ IDEA.
  User: QUY
  Date: 31/07/2020
  Time: 9:36 CH
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link href="resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="resources/dist/css/style2.css">

<script src="resources/pages/tong_quan/ajax_bieu_do_doanh_thu.js"></script>
<script src="resources/model/tong_quan/ajax_bieu_do_doanh_thu.js"></script>

<div class="dashboard-main-wrapper">
    <div class="container-fluid dashboard-content">
        <div class="row">
            <div class="span12 text-center" id="sub_title" style="font-size: 36px;">
                TỔNG HỢP THÁNG 01
            </div>
<%--            <span id="sub_title" style="font-size: 36px;">TỔNG HỢP THÁNG 01</span>--%>
        </div>
        <div class="row">

            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div class="card border-3 border-top border-top-primary">
                    <div class="card-body">
                        <h5 class="text-muted">Sales</h5>
                        <div class="metric-value d-inline-block">
                            <h1 class="mb-1" id="sales">$12099</h1>
                        </div>
                        <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                            <span class="icon-circle-small icon-box-xs text-success bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">5.86%</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- end sales  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- new customer  -->
            <!-- ============================================================== -->
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div class="card border-3 border-top border-top-primary">
                    <div class="card-body">
                        <h5 class="text-muted">New Customer</h5>
                        <div class="metric-value d-inline-block">
                            <h1 class="mb-1" id="new_custormer">1245</h1>
                        </div>
                        <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                            <span class="icon-circle-small icon-box-xs text-success bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">10%</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- end new customer  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- visitor  -->
            <!-- ============================================================== -->
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div class="card border-3 border-top border-top-primary">
                    <div class="card-body">
                        <h5 class="text-muted">Visitor</h5>
                        <div class="metric-value d-inline-block">
                            <h1 class="mb-1" id="visitor">13000</h1>
                        </div>
                        <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                            <span class="icon-circle-small icon-box-xs text-success bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1">5%</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- end visitor  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- total orders  -->
            <!-- ============================================================== -->
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div class="card border-3 border-top border-top-primary">
                    <div class="card-body">
                        <h5 class="text-muted">Total Orders</h5>
                        <div class="metric-value d-inline-block">
                            <h1 class="mb-1" id="total_order">1340</h1>
                        </div>
                        <div class="metric-label d-inline-block float-right text-danger font-weight-bold">
                            <span class="icon-circle-small icon-box-xs text-danger bg-danger-light bg-danger-light "><i class="fa fa-fw fa-arrow-down"></i></span><span class="ml-1">4%</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- end total orders  -->
            <!-- ============================================================== -->
            <div class="row">
                <!-- ============================================================== -->
                <!-- line chart  -->
                <!-- ============================================================== -->
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="caifop1li form-group">
                                <label class="control-label">Chọn ngày</label>
                                <div class="input-group date">
                                    <input type="text" class="form-control border-gray date-vn" id="choose_day">
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <span class="help-block">Help block with success</span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <h5 class="card-header">Doanh thu trong tuần</h5>
                        <div class="card-body">
                            <canvas id="chartjs_week"></canvas>
                        </div>
                    </div>
                </div>
                <!-- ============================================================== -->
                <!-- end line chart  -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->
                <!-- bar chart  -->
                <!-- ============================================================== -->
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <br>
                    <br>
                    <br>
                    <div class="card">
                        <h5 class="card-header">Doanh thu trong tháng </h5>
                        <div class="card-body">
                            <canvas id="chartjs_month"></canvas>
                        </div>
                    </div>
                </div>
                <!-- ============================================================== -->
                <!-- end bar chart  -->
                <!-- ============================================================== -->
            </div>

            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="card">
                        <h5 class="card-header">Doanh thu trong năm</h5>
                        <div class="card-body">
                            <canvas id="chartjs_year"></canvas>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="card">
                        <h5 class="card-header">Doanh thu theo giờ trong tháng </h5>
                        <div class="card-body">
                            <canvas id="chartjs_hour"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<%--        <div class="row">--%>
            <!-- ============================================================== -->

        <!-- pie chart  -->
            <!-- ============================================================== -->
<%--            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">--%>
<%--                <div class="card">--%>
<%--                    <h5 class="card-header">Pie Charts</h5>--%>
<%--                    <div class="card-body">--%>
<%--                        <canvas id="chartjs_pie"></canvas>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            </div>--%>
            <!-- ============================================================== -->
            <!-- end pie chart  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->

            <!-- doughnut chart  -->
            <!-- ============================================================== -->
<%--            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">--%>
<%--                <div class="card">--%>
<%--                    <h5 class="card-header">Doughnut Charts</h5>--%>
<%--                    <div class="card-body">--%>
<%--                        <canvas id="chartjs_doughnut"></canvas>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            </div>--%>
            <!-- ============================================================== -->
            <!-- end doughnut chart  -->

            <!-- ============================================================== -->
<%--        </div>--%>
    </div>
</div>


<div class="row">
    <!-- ============================================================== -->

    <!-- ============================================================== -->

    <!-- recent orders  -->
    <!-- ============================================================== -->
    <div class="col-xl-9 col-lg-12 col-md-6 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Recent Orders</h5>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table">
                        <thead class="bg-light">
                        <tr class="border-0">
                            <th class="border-0">#</th>
                            <th class="border-0">Image</th>
                            <th class="border-0">Product Name</th>
                            <th class="border-0">Product Id</th>
                            <th class="border-0">Quantity</th>
                            <th class="border-0">Price</th>
                            <th class="border-0">Order Time</th>
                            <th class="border-0">Customer</th>
                            <th class="border-0">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <div class="m-r-10"><img src="assets/images/product-pic.jpg" alt="user" class="rounded" width="45"></div>
                            </td>
                            <td>Product #1 </td>
                            <td>id000001 </td>
                            <td>20</td>
                            <td>$80.00</td>
                            <td>27-08-2018 01:22:12</td>
                            <td>Patricia J. King </td>
                            <td><span class="badge-dot badge-brand mr-1"></span>InTransit </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                <div class="m-r-10"><img src="assets/images/product-pic-2.jpg" alt="user" class="rounded" width="45"></div>
                            </td>
                            <td>Product #2 </td>
                            <td>id000002 </td>
                            <td>12</td>
                            <td>$180.00</td>
                            <td>25-08-2018 21:12:56</td>
                            <td>Rachel J. Wicker </td>
                            <td><span class="badge-dot badge-success mr-1"></span>Delivered </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                <div class="m-r-10"><img src="assets/images/product-pic-3.jpg" alt="user" class="rounded" width="45"></div>
                            </td>
                            <td>Product #3 </td>
                            <td>id000003 </td>
                            <td>23</td>
                            <td>$820.00</td>
                            <td>24-08-2018 14:12:77</td>
                            <td>Michael K. Ledford </td>
                            <td><span class="badge-dot badge-success mr-1"></span>Delivered </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                <div class="m-r-10"><img src="assets/images/product-pic-4.jpg" alt="user" class="rounded" width="45"></div>
                            </td>
                            <td>Product #4 </td>
                            <td>id000004 </td>
                            <td>34</td>
                            <td>$340.00</td>
                            <td>23-08-2018 09:12:35</td>
                            <td>Michael K. Ledford </td>
                            <td><span class="badge-dot badge-success mr-1"></span>Delivered </td>
                        </tr>
                        <tr>
                            <td colspan="9"><a href="#" class="btn btn-outline-light float-right">View Details</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- ============================================================== -->
    <!-- end recent orders  -->


</div>

<div class="row">
    <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12">
        <!-- ============================================================== -->
        <!-- social source  -->
        <!-- ============================================================== -->
        <div class="card">
            <h5 class="card-header"> Sales By Social Source</h5>
            <div class="card-body p-0">
                <ul class="social-sales list-group list-group-flush">
                    <li class="list-group-item social-sales-content"><span class="social-sales-icon-circle facebook-bgcolor mr-2"><i class="fab fa-facebook-f"></i></span><span class="social-sales-name">Facebook</span><span class="social-sales-count text-dark">120 Sales</span>
                    </li>
                    <li class="list-group-item social-sales-content"><span class="social-sales-icon-circle twitter-bgcolor mr-2"><i class="fab fa-twitter"></i></span><span class="social-sales-name">Twitter</span><span class="social-sales-count text-dark">99 Sales</span>
                    </li>
                    <li class="list-group-item social-sales-content"><span class="social-sales-icon-circle instagram-bgcolor mr-2"><i class="fab fa-instagram"></i></span><span class="social-sales-name">Instagram</span><span class="social-sales-count text-dark">76 Sales</span>
                    </li>
                    <li class="list-group-item social-sales-content"><span class="social-sales-icon-circle pinterest-bgcolor mr-2"><i class="fab fa-pinterest-p"></i></span><span class="social-sales-name">Pinterest</span><span class="social-sales-count text-dark">56 Sales</span>
                    </li>
                    <li class="list-group-item social-sales-content"><span class="social-sales-icon-circle googleplus-bgcolor mr-2"><i class="fab fa-google-plus-g"></i></span><span class="social-sales-name">Google Plus</span><span class="social-sales-count text-dark">36 Sales</span>
                    </li>
                </ul>
            </div>
            <div class="card-footer text-center">
                <a href="#" class="btn-primary-link">View Details</a>
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- end social source  -->
        <!-- ============================================================== -->
    </div>
    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
        <!-- ============================================================== -->
        <!-- sales traffice source  -->
        <!-- ============================================================== -->
        <div class="card">
            <h5 class="card-header"> Sales By Traffic Source</h5>
            <div class="card-body p-0">
                <ul class="traffic-sales list-group list-group-flush">
                    <li class="traffic-sales-content list-group-item "><span class="traffic-sales-name">Direct</span><span class="traffic-sales-amount">$4000.00  <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1 text-success">5.86%</span></span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span class="traffic-sales-name">Search<span class="traffic-sales-amount">$3123.00  <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1 text-success">5.86%</span></span>
                                                </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span class="traffic-sales-name">Social<span class="traffic-sales-amount ">$3099.00  <span class="icon-circle-small icon-box-xs text-success ml-4 bg-success-light"><i class="fa fa-fw fa-arrow-up"></i></span><span class="ml-1 text-success">5.86%</span></span>
                                                </span>
                    </li>
                    <li class="traffic-sales-content list-group-item"><span class="traffic-sales-name">Referrals<span class="traffic-sales-amount ">$2220.00   <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light"><i class="fa fa-fw fa-arrow-down"></i></span><span class="ml-1 text-danger">4.02%</span></span>
                                                </span>
                    </li>
                    <li class="traffic-sales-content list-group-item "><span class="traffic-sales-name">Email<span class="traffic-sales-amount">$1567.00   <span class="icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light"><i class="fa fa-fw fa-arrow-down"></i></span><span class="ml-1 text-danger">3.86%</span></span>
                                                </span>
                    </li>
                </ul>
            </div>
            <div class="card-footer text-center">
                <a href="#" class="btn-primary-link">View Details</a>
            </div>
        </div>
    </div>
    <!-- ============================================================== -->
    <!-- end sales traffice source  -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- sales traffic country source  -->
    <!-- ============================================================== -->


</div>
</div>
</div>
</div>





</div>
    <!-- ============================================================== -->
    <!-- end footer -->
    <!-- ============================================================== -->
</div>
<!-- ============================================================== -->
<!-- end main wrapper -->
<!-- ============================================================== -->
<!-- Optional JavaScript -->



<script>
    (function(window, document, $, undefined) {
        "use strict";
        $(function() {

            if ($('#chartjs_line').length) {
                var ctx = document.getElementById('chartjs_line').getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'line',

                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Almonds',
                            data: [12, 19, 3, 17, 6, 3, 7],

                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 2
                        }, {
                            label: 'Cashew',
                            data: [2, 29, 5, 5, 2, 3, 10],
                            backgroundColor: "rgba(255, 64, 123,0.5)",
                            borderColor: "rgba(255, 64, 123,0.7)",
                            borderWidth: 2
                        }]

                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },

                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                    }



                });
            }


            if ($('#chartjs_bar').length) {
                var ctx = document.getElementById("chartjs_bar").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["M", "T", "W", "R", "F", "S", "S"],
                        datasets: [{
                            label: 'Almonds',
                            data: [12, 19, 3, 17, 28, 24, 7],
                            backgroundColor: "rgba(89, 105, 255,0.5)",
                            borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 2
                        }, {
                            label: 'Cashew',
                            data: [30, 29, 5, 5, 20, 3, 10],
                            backgroundColor: "rgba(255, 64, 123,0.5)",
                            borderColor: "rgba(255, 64, 123,0.7)",
                            borderWidth: 2
                        }]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',

                            labels: {
                                fontColor: '#71748d',
                                fontFamily: 'Circular Std Book',
                                fontSize: 14,
                            }
                        },

                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontSize: 14,
                                    fontFamily: 'Circular Std Book',
                                    fontColor: '#71748d',
                                }
                            }]
                        }
                    }


                });
            }



        });

    })(window, document, window.jQuery);
</script>

<script src="resources/plugins/chart.js/Chart.bundle.js"></script>
<script src="resources/plugins/chart.js/Chart.css"></script>
<script src="resources/plugins/chart.js/Chart.js"></script>