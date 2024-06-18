import { useState } from "react"
import Response from "./components/Responses"
import Minutes from "./components/Minutes"
import Sheets from "./components/Sheets"

function App() {
  const [response, setResponse] = useState("")
  const [minutes, setMinutes] = useState("")
  const [stage, setStage] = useState(1)

  return (
    <>
      {/* Stepper */}
      <ul className="px-52 py-10 relative flex flex-row">
        {/* Item */}
        <li className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <span className={`ms-4 size-7 flex justify-center items-center flex-shrink-0 ${stage === 1 ? "bg-blue-400" : "bg-gray-100"} font-medium text-gray-800 rounded-full`}>
              1
            </span>
            <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden" />
          </div>
          <div className="mt-3">
            <span className="block text-sm font-medium text-gray-800">
              Respostas
            </span>
          </div>
        </li>
        {/* End Item */}
        {/* Item */}
        <li className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <div className="me-2 w-full h-px flex-1 bg-gray-200 group-last:hidden" />
            <span className={`size-7 flex justify-center items-center flex-shrink-0 ${stage === 2 ? "bg-blue-400" : "bg-gray-100"} font-medium text-gray-800 rounded-full`}>
              2
            </span>
            <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden" />
          </div>
          <div className="mt-3">
            <span className="block text-center text-sm font-medium text-gray-800">
              Minutos
            </span>
          </div>
        </li>
        {/* End Item */}
        {/* Item */}
        <li className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <div className="me-2 w-full h-px flex-1 bg-gray-200 " />
            <span className={`me-4 size-7 flex justify-center items-center flex-shrink-0 ${stage === 3 ? "bg-blue-400" : "bg-gray-100"} font-medium text-gray-800 rounded-full`}>
              3
            </span>
          </div>
          <div className="mt-3">
            <span className="block text-end text-sm font-medium text-gray-800">
              Planilha
            </span>
          </div>
        </li>
        {/* End Item */}
      </ul>
      {/* End Stepper */}
      {stage === 1 && <Response response={response} setResponse={setResponse} setStage={setStage} />}
      {stage === 2 && <Minutes minutes={minutes} setMinutes={setMinutes} setStage={setStage} />}
      {stage === 3 && <Sheets minutes={minutes} responses={response} />}

    </>
  )
}

export default App
