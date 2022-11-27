/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"
import "../../styles/components/Header/header.sass"
import { api } from "../../services/api/anvisa"
import ModalDetails from "./Modal"
import { toast } from "react-toastify"


export default function Main({ medicines, isLoading }) {
    const [modalShow, setModalShow] = useState(false);
    const [medicineDetails, setMedicineDetails] = useState({}) //Obect or Array
    const [linkPDFBula, setLinkPDFBula] = useState() //String ?
    const [isLoadingModal, setIsLoadingModal] = useState(false)


    const handleModalDetails = (numProcesso, idBula) => {

        if (numProcesso) {
            setIsLoadingModal(true)
            setLinkPDFBula(idBula)

            api.get(`/medicamento/${numProcesso}`)
                .then(({ data }) => {
                    setMedicineDetails(data)
                    setModalShow(true)
                    setIsLoadingModal(false)
                })
                .catch((error) => {
                    toast.error(`Erro no modal: ${error.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setIsLoadingModal(false)
                })
        }
    }

    return (
        <main className="d-flex justify-content-center w-100 position-relative">
            {isLoadingModal &&
                <div className="d-flex w-100 h-100 align-items-center justify-content-center position-absolute loadingContainer" aria-current="true">
                    <div className="d-flex w-100 justify-content-center align-items-center text-center">
                        <div>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="list-group w-50 m-4">
                {isLoading &&
                    <div className="d-flex list-group-item list-group-item-action h-100 align-items-center justify-content-center " aria-current="true">
                        <div className="d-flex w-100 justify-content-center align-items-center text-center">
                            <div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {!!medicines && medicines.map((medicine) => (
                    <div
                        className="list-group-item list-group-item-action itemList"
                        aria-current="true" key={medicine.idProduto}
                        onClick={() => handleModalDetails(medicine.numProcesso, medicine.idBulaPacienteProtegido)}
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{medicine.nomeProduto}</h5>
                        </div>
                        <p className="mb-1">{medicine.razaoSocial}</p>
                    </div>
                ))}
                {(!medicines[0] && !isLoading) &&
                    <div className="d-flex list-group-item list-group-item-action h-100 align-items-center justify-content-center " aria-current="true">
                        <div className="d-flex w-100 justify-content-center align-items-center text-center">
                            Nenhum medicamento pesquisado. Por favor pesquise por um medicamento na barra de pesquisa
                        </div>
                    </div>
                }
            </div>

            {modalShow &&
                <ModalDetails
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    details={medicineDetails}
                    pdf={linkPDFBula}
                />
            }
        </main>
    )
}
