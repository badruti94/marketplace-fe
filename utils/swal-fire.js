import Swal from 'sweetalert2'

export const SwalFire = (type, text) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: type,
        title: text
    })
}


export const SwalLoading = () => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Loading...',
        showConfirmButton: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });

    return Swal
}

export const SwalConfirm = (funcToExec, text) => {
    Swal.fire({
        title: 'Apa kamu yakin?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            funcToExec()
            SwalFire('success', text)
        }
    })

    // const swalWithBootstrapButtons = Swal.mixin({
    //     customClass: {
    //         confirmButton: 'btn btn-success ms-4',
    //         cancelButton: 'btn btn-danger'
    //     },
    //     buttonsStyling: false
    // })

    // swalWithBootstrapButtons.fire({
    //     title: 'Apa kamu yakin?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Ya',
    //     cancelButtonText: 'Tidak',
    //     reverseButtons: true
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         funcToExec()
    //         SwalFire('success', text)
    //     }
    // })

}

