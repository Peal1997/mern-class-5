const form = document.querySelector('form')
const msg = document.querySelector('.msg')
const tbody = document.querySelector('tbody')
const single_view = document.querySelector('#single_data')
const profile_name = document.querySelector('#profile_name')
const edit_form = document.querySelector('#edit_form')
const edit_name = document.querySelector('#edit_name')

form.onsubmit = (e) => {
    e.preventDefault()
    const form_data = new FormData(e.target)
    const data = Object.fromEntries(form_data.entries())
    

    if(!data.name || !data.cell || !data.email || !data.photo){
        msg.innerHTML = Alert(`All fields are required`)    
    }else if(data.email){
        if(!isEmail(data.email)){
            msg.innerHTML = Alert(`Invalid email`)
        }else{
            save('student' , data)
            form.reset()
            getAllData()
            
        }
    }
    
   
}

//get all data
 getAllData = () => {
    const all_data =  allData('student')

      if (all_data.length > 0) {
        let text = ''
        all_data.forEach((data , index) => {
              text += ` <tr>
              <td>${index + 1}</td>
              <td>${data.name}</td>
              <td>${data.email}</td>
              <td>${data.cell}</td>
              <td><img style="width: 80px;object-fit: cover;" src = "${data.photo}"></td>
              <td class="d-flex">
                  <a index = "${index}" class="btn btn-sm btn-info" data-bs-toggle = "modal" href="#single_view"><i class="fas fa-eye"></i></a>
                  <a index = "${index}" class="btn btn-sm btn-primary" data-bs-toggle = "modal" href="#single_edit"><i class="fas fa-edit"></i></a>
                  <a index = "${index}" class="btn btn-sm btn-danger" href=""><i class="fas fa-trash"></i></a>
              </td>
          </tr>
             `
             
        })
       
       
        tbody.innerHTML = text;
      } else {
        text = ` <tr clospan = "6">
              <td>No records found</td>
          </tr>`
          tbody.innerHTML = text;
      }
 
 }
 getAllData()

  const rows = tbody.children
  for(let x of rows){
      let view_button = x.lastElementChild.firstElementChild
      view_button.onclick = (e) => {
        e.preventDefault()
          let index = view_button.getAttribute('index')
          let single_data = singleData('student' , index)
          profile_name.innerHTML = `${single_data.name}'s profile`
          single_view.innerHTML = ` <img src="${single_data.photo}" alt="">
          <h1>${single_data.name}</h1>
          <p>${single_data.email}</p>`
         
          
         
      }
     }

 //delete data
 for(let x of rows){
    let delete_button = x.lastElementChild.lastElementChild
    delete_button.onclick = (e) => {
       e.preventDefault()
       let index = delete_button.getAttribute('index') 
       const conf  = confirm(`Are you sure`) 
       if(conf == true){
         delete_data('student' , index)
         msg.innerHTML = Alert('Data has been deleted successful' , 'success')
         getAllData()
       }else{
          return false;
       }
    }
 }

 //edit data
 for(let x of rows){
    let edit_button = x.lastElementChild.firstElementChild.nextElementSibling
    edit_button.onclick = (e) => {
       e.preventDefault()
       
       let index = edit_button.getAttribute('index') 
       let single_data = singleData('student' , index)
       edit_name.innerHTML = `${single_data.name}'s profile edit`
        edit_form.innerHTML = ` <div class="my-3">
        <input name="name" class="form-control" type="text" value="${single_data.name}">
    </div>
    <div class="my-3">
        <input name="cell" class="form-control" type="text" value="${single_data.cell}">
    </div>
    <div class="my-3">
        <input name="email" class="form-control" type="text" value="${single_data.email}">
    </div>
    <div class="my-3">
        <input name="photo" class="form-control" type="text" value="${single_data.photo}">
    </div>
    <div class="my-3">
        <input class="btn btn-primary w-100" type="submit"  value="Edit">
    </div>`
     
    edit_form.onsubmit = (e) => {
       e.preventDefault()
       
       const form_data = new FormData(e.target)
       const edit_data = Object.fromEntries(form_data.entries())
         edit('student' , index , edit_data)
         getAllData()
         
    }
       
    }
   

 }
     







