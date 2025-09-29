import Swal from "sweetalert2"

export const errorPopup = (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        timer : 3000  
      })
}
export const successPopup = (message) => {
  return Swal.fire({
      icon: 'success',
      text: message,
      timer : 3000  
    })
}
export const confirmationDeletePopup = () => {
   return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
}
export const confirmationPopup = (message) => {
  return Swal.fire({
     title: message,
    //  text: "You won't be able to delete this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
   })
}

