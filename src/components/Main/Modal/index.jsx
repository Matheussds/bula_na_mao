import { Button, Modal } from "react-bootstrap"
import fileDownload from 'js-file-download'
import { api } from "../../../services/api/anvisa"
import { useState } from "react"
import { toast } from "react-toastify"



export default function ModalDetails(props) {
    const [isLoading, setIsloading] = useState(false);

    const nomeComercial = props.details.nomeComercial ? props.details.nomeComercial : ""
    const principioAtivo = props.details.principioAtivo ? props.details.principioAtivo : ""
    const medicamentoReferencia = props.details.medicamentoReferencia ? props.details.medicamentoReferencia : ""
    const categoriaRegulatoria = props.details.categoriaRegulatoria ? props.details.categoriaRegulatoria : ""
    const razaoSocial = props.details.empresa.razaoSocial ? props.details.empresa.razaoSocial : ""

    function download() {
        setIsloading(true)
        api.get('/pdf', {
            params: { id: props.pdf },
            responseType: 'arraybuffer',
        }).then(res => {
            fileDownload(res.data, `${nomeComercial}.pdf`);
            setIsloading(false)
        }).catch((error) => {
            toast.error(`Erro no dowload: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIsloading(false)
        })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {nomeComercial}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Classes Terapêuticas</h6>
                {!!props.details ? props.details.classesTerapeuticas.map(classe => (
                    <p key={classe}>{classe}</p>
                )) : "N/A"}
                <hr />
                <h6>Principio Ativo</h6>
                <p>{principioAtivo ? principioAtivo : "N/A"}</p>
                <hr />
                <h6>Medicamento de Referência</h6>
                <p>{medicamentoReferencia ? medicamentoReferencia : "N/A"}</p>
                <hr />
                <h6>Categoria Regulatória</h6>
                <p>{categoriaRegulatoria ? categoriaRegulatoria : "N/A"}</p>
                <hr />
                <h6>Fabricante</h6>
                <p>{razaoSocial ? razaoSocial : "N/A"}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="d-flex" onClick={() => download()}>
                    Baixar bula em PDF
                    {isLoading &&
                        <div className="d-flex ms-2 align-items-center justify-content-center " aria-current="true">
                            <div className="d-flex justify-content-center align-items-center text-center">
                                <div>
                                    <div className="spinner-border spinner-border-sm text-white" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}