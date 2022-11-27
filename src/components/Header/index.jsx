/* eslint-disable react/react-in-jsx-scope */
import { Search } from "react-bootstrap-icons"
import { useState } from "react"
import PropTypes from "prop-types"
import "../../styles/components/Main/main.sass"
import logo_medware from "../../assets/images/logo-medware.png"

export default function Header({ onSubmitMedicine }) {
    const [medicineName, setMedicineName] = useState(" ")

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            onSubmitMedicine(medicineName)
            setMedicineName("")
        }
    }

    return (
        <header>
            <div className="sideBar d-flex align-items-center justify-content-between px-5">
                <div className="logoContainer">
                    <img className="img-fluid" src={logo_medware} />
                </div>
                <div>
                    <div className="input-group flex-nowrap w-40">
                        <span className="input-group-text" id="addon-wrapping"><Search /></span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Medicamento"
                            aria-label="Medicine"
                            aria-describedby="addon-wrapping"
                            value={medicineName}
                            onKeyDown={(event) => handleSubmit(event)}
                            onChange={(event) => setMedicineName(event.target.value)}
                        />
                    </div>
                </div>
                <div className="headerTitle text-end">
                    <div className="d-inline p-2 text-white rounded-3">
                        Bulário
                    </div>
                </div>
            </div>
            <div className="headerSubtitle d-flex px-5 justify-content-center align-items-center text-white">
                Medicamentos
            </div>
        </header>
    )
}