import { Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeToastr } from '../redux/actions/toastr'

const Toastr = (props) => {
  const toastr = useSelector((state) => state.toastr)
  const dispatch = useDispatch()
  return (
    <ToastContainer position="top-end" style={{ zIndex: 9 }}>
      <Toast
        onClose={() => dispatch(closeToastr())}
        show={toastr.show}
        bg={toastr.variant}
        delay={toastr.delay}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{toastr.header}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{toastr.body}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Toastr
