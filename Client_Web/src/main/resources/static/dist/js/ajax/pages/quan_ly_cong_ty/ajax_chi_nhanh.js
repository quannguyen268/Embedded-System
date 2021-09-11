let inputTaxCode, inputEmail, inputPresentingPerson, inputAddress, inputPhoneNumber, inputWebsite, inputDeviceInfo;
let btnEditBranch;
let btnRemoveBranch;
let btnSyncBranch;
let btnAddBranch;
let btnConfirmYes;
let selectedChiNhanh = 0;

$(function () {
    selectChiNhanh = $("#select-1");
    inputTaxCode = $("#input-text-taxCode");
    inputEmail = $("#input-text-email");
    inputPresentingPerson = $("#input-text-presentingPerson");
    inputAddress = $("#input-text-address");
    inputPhoneNumber = $("#input-text-phoneNumber");
    inputWebsite = $("#input-text-website");
    inputDeviceInfo = $("#input-text-deviceInfo");

    //button
    btnEditBranch = $("#btnEditBranch");
    btnSyncBranch = $("#btnSyncBranch");
    btnRemoveBranch = $("#btnRemoveBranch");
    btnConfirmYes = $("#confirm-yes");
    btnAddBranch = $("#btn-addBranch");

    loadCompanyData(1);
    confirmUploadBranch();

    confirmRemoveBranch();
    loadBranchesData(1);
    confirmUpdateBranch();

});


function clickEditEvent() {
    //event when click on edit, remove or sync branch
    $('.editBranchInfoBtn').off('click').on('click', function () {
        let idChiNhanh = $(this).attr('id-branch');
        selectedChiNhanh = idChiNhanh;
        loadExistBranchDataFromTableToModal(selectedChiNhanh);
    })
}

function clickRemoveEvent(){
    $('.deleteBranchInfoBtn').off('click').on('click', function () {
        let idChiNhanh = $(this).attr('id-branch');
        selectedChiNhanh = idChiNhanh;
    })
}

function confirmUploadBranch() {

    $("#btn-confirmedBranch").off().click(function () {
        let address = $("#input-text-addressBranch").val();
        let connectiveStt = $("#connectiveStatusSelect").children("option:selected").val();
        let activeStt = $("#activeStatusSelect").children("option:selected").val();
        let ipAddress = $("#input-text-ipAddressBranch").val();
        let chiNhanh = {};
        chiNhanh.diaChi = address;
        chiNhanh.trangThaiKetNoi = parseInt(connectiveStt);
        chiNhanh.trangThaiHoatDong = parseInt(activeStt);
        chiNhanh.diaChiIp = ipAddress;

        uploadBranch(chiNhanh, 1).then(r => {
            loadBranchesData(1)
        }).catch(err => {
            console.log(err);
        });
    });
}

function confirmRemoveBranch() {
    btnConfirmYes.click(function () {
        if(selectedChiNhanh!==0){
            deleteBranch(selectedChiNhanh, 1).then(r=>{
                loadBranchesData(1);
            }).catch(err=>console.log(err));
        }
    });
}

function loadBranchesData(idCompany) {
    let dataTableTemplate = $("#data-table");

    findAllBranchesByIdCompany(idCompany).then(rs => {
        if (rs.message === "found") {
            rs = rs.data;
            let totalBranch = rs.length;
            console.log(totalBranch);
            $("#text-totalBranch").text(totalBranch);
            let tableBodyTemplate;
            // mapping data
            console.log(rs);
            let index = 0;

            rs.map(value => {
                let activeStatus;
                index += 1;
                if (value.trangThaiHoatDong === 1) {
                    activeStatus = "Đang hoạt động";

                } else {
                    activeStatus = "Không hoạt động";
                }
                tableBodyTemplate += `<tr class="detailsBranchRow">
                                    <td >${index}</td>
                                    <td>${value.maChiNhanh}</td>
                                    <td>${value.diaChi}</td>
                                    <td>${value.diaChiIp}</td>
                                    <td>${activeStatus}</td>
                                    <td id="${value.id}">
                                        <button class="editBranchInfoBtn" style="background: transparent;border: none; margin-right: 12px;" id-branch="${value.id}" id="btnEditBranch-${value.id}" data-toggle="modal" data-target = "#modal-editBranch"><i class="fas fa-pen"></i></button>
                                        <button class="syncBranchInfoBtn" style="background: transparent;border: none; margin-right: 12px;" id="btnSyncBranch-${value.id}"><i class="fas fa-sync"></i></button>
                                        <button class="deleteBranchInfoBtn" style="background: transparent;border: none;" id-branch="${value.id}" id="btnRemoveBranch-${value.id}" data-toggle="modal" data-target="#modal-remove"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>`;

            });
            dataTableTemplate.html(tableBodyTemplate);
            clickEditEvent();
            clickRemoveEvent();
        }

    }).catch(err => console.log(err));

}

function confirmUpdateBranch() {

    $("#btn-confirmedEditedBranch").click(function () {
        let address = $("#input-text-addressEditedBranch").val();
        let ipAddress = $("#input-text-ipAddressEditedBranch").val();
        let connectiveStt = $("#connectiveStatusEditedBranchSelect").children("option:selected").val();
        let activeStt = $("#activeStatusEditedBranchSelect").children("option:selected").val();

        let chiNhanh = {};
        chiNhanh.id = selectedChiNhanh;
        chiNhanh.diaChi = address;
        chiNhanh.trangThaiKetNoi = parseInt(connectiveStt);
        chiNhanh.trangThaiHoatDong = parseInt(activeStt);
        chiNhanh.diaChiIp = ipAddress;

        updateBranch(chiNhanh, 1).then(r => {
            loadBranchesData(1);
        }).catch(err => {
            console.log(err);
        });
    });
}

function loadExistBranchDataFromTableToModal(idBranch) {
    findBranchById(idBranch).then(rs => {
        if (rs.message === "found") {
            rs = rs.data;
            $("#input-text-addressEditedBranch").val(rs.diaChi);
            $("#input-text-ipAddressEditedBranch").val(rs.diaChiIp);
        }
    }).catch(er => console.log(er));

}

function loadCompanyData(idCompany) {
    findCompanyById(idCompany).then(rs => {
        if (rs.message === "found") {
            rs = rs.data;
            $("#vnCompanyName").text(rs.tenDoanhNghiep);
            $("#enCompanyName").text(rs.tenTiengAnh);
            inputTaxCode.val(rs.maDoanhNghiep);
            inputPhoneNumber.val(rs.soDienThoai);
            inputEmail.val(rs.email);
            inputAddress.val(rs.diaChi);
            inputPresentingPerson.val(rs.nguoiDaiDien);
            inputWebsite.val(rs.website);
        }

    }).catch(er => console.log(er));
}