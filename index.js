const form = document.querySelector('form')
const msg = document.querySelector('.msg')
const tbody = document.querySelector('tbody')
const single_view = document.querySelector('#single_data')
const profile_name = document.querySelector('#profile_name')

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
           <a index = "${index}" class="btn btn-sm btn-primary" href=""><i class="fas fa-edit"></i></a>
           <a index = "${index}" class="btn btn-sm btn-danger" href=""><i class="fas fa-trash"></i></a>
       </td>
   </tr>
      `
      
 })


 tbody.innerHTML = text;
 
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
     







