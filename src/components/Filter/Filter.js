import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';


export default function Filter({ filterKind }) {



  return (
    <>

      <Accordion defaultActiveKey="0"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "20px",
        }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtreleme</Accordion.Header>
          <Accordion.Body>
            <div>
              <h4>Puan</h4>
              <Form.Check
                label="5 üzeri"
                value={5}
              />
              <Form.Check
                label="6 üzeri"
                value={6}
              />
              <Form.Check
                label="7 üzeri"
                value={7}
              />
              <Form.Check
                label="8 üzeri"
                value={8}
              />
            </div>

            <div>
              <h4>Tür</h4>
              <Form.Check
                label="Komedi"
              />
              <Form.Check
                label="Dram"
              />
              <Form.Check
                label="Tarih"
              />
              <Form.Check
                label="Aksiyon"
              />
              <Form.Check
                label="Romantik"
              />
            </div>
            <button onClick={filterKind} className='btn btn-success mt-3'>Filtrele</button>
          </Accordion.Body>

        </Accordion.Item>
      </Accordion>

    </>


  )
}
