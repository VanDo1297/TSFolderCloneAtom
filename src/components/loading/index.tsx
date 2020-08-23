import React from 'react';
import Modal from 'react-bootstrap/Modal'
export default function Loading(props: any) {
    return (
        <Modal
            show={props.isLoading}
            size="sm"
        >
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <i className="fas fa-spinner fa-3x fa-spin text-rose" />
                </div>
                <h4 className="text-rose text-center mt-3">Loading ... </h4>
            </Modal.Body>
        </Modal>
    )
}

