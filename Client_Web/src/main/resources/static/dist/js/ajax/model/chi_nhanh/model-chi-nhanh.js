
const urlChiNhanh = "v1/admin/chi-nhanh/";
const urlCompany = "v1/admin/doanh-nghiep/";

let findBranchById = function(id){
    return ajaxGet(`${urlChiNhanh}findById?id=${id}`, 1);
};

let uploadBranch = function(data, idCompany){
    return ajaxPost(`${urlChiNhanh}upload?cong-ty-id=${idCompany}`, data, 1);
};
let updateBranch = function(data, idCompany){
    return ajaxPut(`${urlChiNhanh}update-info?cong-ty-id=${idCompany}`, data, 1);
};
let updateImageBranch = function(data){
    return ajaxPut("v1/admin/chi-nhanh/update-image", data, 1);
};

function deleteBranch(id) {
    return ajaxPut(`v1/admin/chi-nhanh/delete?chi-nhanh-id=${id}`, 1);
}

let findAllBranchesByIdCompany = function(idCompany){
    return ajaxGet(`${urlChiNhanh}findAllBranchesByCompanyId?cong-ty-id=${idCompany}`, 1);
};
let findCompanyById = function(idCompany){
    return ajaxGet(`${urlCompany}findById?cong-ty-id=${idCompany}`, 1);
};




