async function uploadFiles(selectorInput) {
    let result = null;
    let files = selectorInput.get(0).files;
    if(files.length > 0) {
        let formData  = new FormData($("#form-file")[0]);
        await ajaxUploadFile("v1/public/upload-multi", formData, 1).then(rs => {
            if(rs.message === "uploaded") result = rs.data;
        }).catch(err => {
            // alterDanger("Lỗi tải tập đính kèm", TIME_ALTER);
            console.log(err);
        })
    } else {
        result = [];
    }
    return result;
}

async function uploadMultiFile(selectorInput, selectorFormFile) {
    let result = null;
    let files = $(selectorInput).get(0).files;
    if(files.length > 0) {
        let formData  = new FormData($(selectorFormFile)[0]);
        console.log(formData);
        await ajaxUploadFile("v1/public/upload-multi-files", formData, 1).then(rs => {
            console.log(rs);
            if(rs.message === "uploaded") result = rs.data;
        }).catch(err => {
            // alterDanger("Lỗi tải tập đính kèm", TIME_ALTER);
            console.log(err);
        })
    } else {
        result = [];
    }
    return result;
}

