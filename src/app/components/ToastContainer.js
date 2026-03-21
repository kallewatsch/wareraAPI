import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Toast from "react-bootstrap/Toast"
import { setToast } from "../slices/toastSlice"


export const ToastContainer = (props) => {

    const { toast: { show, content, bg } } = useSelector(state => state.app)

    const dispatch = useDispatch()

    const handleClose = event => {
        dispatch(setToast({ show: false, content, bg }))
    }

    return (
        <div>
            <Toast show={show} bg={bg} onClose={handleClose} style={{width: "100%"}}>
                <Toast.Header>
                </Toast.Header>
                <Toast.Body><pre>{content}</pre></Toast.Body>
            </Toast>
        </div>
    )

}


export default ToastContainer