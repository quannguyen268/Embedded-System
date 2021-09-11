let taxCodeInput, phoneNumberInput, emailInput, websiteInput, presentingPersonInput, addressInput;


$(function(){
    //inject Input
    taxCodeInput = $("#input-text-1");
    emailInput = $("#input-text-2");
    presentingPersonInput = $("#input-text-3");
    phoneNumberInput = $("#input-text-4");
    websiteInput = $("#input-text-5");
    addressInput = $("#input-text-7");

    loadCompanyData(1);
});


function loadCompanyData(idCompany) {

    findCompanyById1(idCompany).then(rs => {
        if (rs.message === "found") {
            rs = rs.data;
            $("#vnCompanyName").text(rs.tenDoanhNghiep);
            $("#enCompanyName").text(rs.tenTiengAnh);
            taxCodeInput.val(rs.maDoanhNghiep);
            phoneNumberInput.val(rs.soDienThoai);
            emailInput.val(rs.email);
            addressInput.val(rs.diaChi);
            presentingPersonInput.val(rs.nguoiDaiDien);
            websiteInput.val(rs.website);
        }
    }).catch(er => console.log(er));

}