import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Modals({ deleteAllFavorite }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>

            <Button variant="danger" onClick={handleShow}>
                Hepsini Sil
            </Button>

            <Modal  show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body style={{backgroundColor:"black",color:"white"}}>Bütün filmler silinecek. Emin misiniz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Vazgeç
                    </Button>
                    <Button variant="danger" onClick={deleteAllFavorite}>
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
