//Alert function

function Alert(msg , type = "warning") {
    return `<p class ="alert alert-${type} d-flex justify-content-between">${msg}<button class="btn-close" data-bs-dismiss="alert"></button></p>`
}

//checking email

function isEmail (email) {
    return email.match(/^[a-z0-9\.]{1,}@[a-z]{1,6}\.[a-z]{1,4}$/)
}



