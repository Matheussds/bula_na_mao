/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"
import { api } from "./services/api/anvisa"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./styles/app.sass"


function App() {
  const [medicines, setMedicines] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleMedicines = (medicineName) => {
    if (medicineName) {
      setIsLoading(true)
      setMedicines([])
      api.get("/pesquisar", { params: { nome: medicineName } })
        .then(({ data }) => {
          data.content.length == 0 && (
            toast.error(`O medicamento pesquisado não foi encontrado!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          )
          setMedicines(data.content)
          setIsLoading(false)
        })
        .catch((error) => {
          toast.error(`Erro na pesquisa: ${error.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false)
        })
    }
  }

  return (
    <div id="bulario">
      <Header onSubmitMedicine={handleMedicines} />
      <Main medicines={medicines} isLoading={isLoading} />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  )
}



export default App

