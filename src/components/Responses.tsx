import { Dispatch } from "react";

export default function Response({ setResponse, response, setStage }: { setResponse: Dispatch<string>, response: string, setStage: Dispatch<number> }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4">
      <label
        htmlFor="textarea-label"
        className="font-medium mb-2"
      >
        Respostas individuais
      </label>
      <textarea
        id="responses"
        className="py-3 px-4 block w-2/3 bg-gray-100 border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        rows={8}
        placeholder='Cole a lista de respostas individuais a partir do "0:" aqui'
        defaultValue={""}
        onChange={(e) => setResponse(e.target.value)}
      />
      <button
        onClick={() => {
          if (response !== "") setStage(2)
        }}
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Próximo
      </button>
    </div>



  )
}
