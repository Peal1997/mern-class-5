//store data in ls
function save(key , data) {
     let all_data = []
     if(localStorage.getItem(key)){
        const pre_data = JSON.parse(localStorage.getItem(key))
        pre_data.push(data)
        localStorage.setItem(key , JSON.stringify(pre_data))
     }else {
        all_data.push(data)
        localStorage.setItem(key , JSON.stringify(all_data))
     }
   
     
   
}

//get all data from ls
function allData(key){
    return JSON.parse(localStorage.getItem(key))
}


//get single data
function singleData (key , index) {
   const all_data = JSON.parse(localStorage.getItem(key))
   return all_data[index]
}

//delete data
function delete_data (key ,index) {
   let all_data = JSON.parse(localStorage.getItem(key))
   all_data.splice(index , 1)
   localStorage.setItem(key ,JSON.stringify(all_data) )
}


