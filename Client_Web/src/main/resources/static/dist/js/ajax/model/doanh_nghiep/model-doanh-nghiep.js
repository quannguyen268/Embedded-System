const urlCompany = "v1/admin/doanh-nghiep/";
let CompanyUpload = function(data){
    let postCompanyInfo = ajaxPost("v1/admin/doanh-nghiep/upload", data, 1);
    return postCompanyInfo;
};

let CompanyUpdata = function(data){
    let putCompanyInfo = ajaxPut("v1/admin/doanh-nghiep/update", data, 1);
    return putCompanyInfo;
};

let findCompanyById1 = function(idCompany){
    return ajaxGet(`${urlCompany}findById?cong-ty-id=${idCompany}`, 1);
};

let deleteCompany = function(id){
    let companyInfo = ajaxPut("v1/admin/doanh-nghiep/delete", id, 1);
};
