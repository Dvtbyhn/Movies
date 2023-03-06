import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteAllFavorite } from '../redux/movies/moviesSlice';

export default function Modals() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    return (
        <div>
            <Button variant="danger" onClick={handleShow}>
                Hepsini Sil
            </Button>
            <Modal style={{
                opacity: "80%",
            }} show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body
                >Bütün filmler silinecek. Emin misiniz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Vazgeç
                    </Button>
                    <Button variant="danger" onClick={() => dispatch(deleteAllFavorite())}>
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
