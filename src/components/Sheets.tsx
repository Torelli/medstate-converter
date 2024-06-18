import * as XLSX from "xlsx"

function convertToArray(responses: string, minutes: string) {
  let responseArr = responses
    .trim()
    .split("\n")
    .map((item) => item.split(":")[1].trim().split("        "))
    .join()
    .split(",")
    .filter((item) => item === "1.000" || item === "2.000")
    .map((item) => {
      if (item === "1.000") return "E";
      if (item === "2.000") return "D";
    });

  let minutesArr = minutes
    .trim()
    .split("\n")
    .map((item) => item.split(":")[1].trim().split("        "))
    .join()
    .split(",");

  console.log(minutesArr)


  return { responseArr, minutesArr }
}

function createSingleResponseArray(responseArr: string[], minutesArr: string[]) {
  const singleResponseTable = [];

  for (let i = 0; i < responseArr.length; i++) {
    singleResponseTable.push({
      response: responseArr[i],
      minute: minutesArr[i],
    });
  }

  return singleResponseTable;
}

function createPairResponseArray(responseArr: string[], minutesArr: string[]) {
  const responsePairs = [] as string[];

  for (let i = 0; i < responseArr.length; i++) {
    if (i < responseArr.length - 1)
      responsePairs.push(responseArr[i] + responseArr[i + 1]);
  }

  const pairResponseTable = [];

  for (let i = 0; i < responsePairs.length; i++) {
    pairResponseTable.push({
      pair: responsePairs[i],
      minute: minutesArr[i],
    });
  }

  return pairResponseTable;
}

function createTrioResponseArray(responseArr: string[], minutesArr: string[]) {

  const responseTrios = [];

  for (let i = 0; i < responseArr.length; i++) {
    if (i < responseArr.length - 2)
      responseTrios.push(
        responseArr[i] +
        responseArr[i + 1] +
        responseArr[i + 2],
      );
  }

  let trioResponseTable = [];

  for (let i = 0; i < responseTrios.length; i++) {
    trioResponseTable.push({
      trio: responseTrios[i],
      minute: minutesArr[i],
    });
  }

  return trioResponseTable;
}


function convertToArrayOfObjects(responses: string, minutes: string) {
  const { responseArr, minutesArr } = convertToArray(responses, minutes)
  const singleResponseArray = createSingleResponseArray(responseArr as string[], minutesArr)
  const pairResponseArray = createPairResponseArray(responseArr as string[], minutesArr)
  const trioResponseArray = createTrioResponseArray(responseArr as string[], minutesArr)

  return { singleResponseArray, pairResponseArray, trioResponseArray }
}

function convertToSheetAndDownload(responses: string, minutes: string) {
  const { singleResponseArray, pairResponseArray, trioResponseArray } = convertToArrayOfObjects(responses, minutes)
  const workbook = XLSX.utils.book_new();

  const singleResponses = XLSX.utils.json_to_sheet(singleResponseArray)

  XLSX.utils.sheet_add_aoa(
    singleResponses,
    [["Resposta", "Minuto"]],
    {
      origin: "A1"
    }
  )

  XLSX.utils.book_append_sheet(workbook, singleResponses, 'Respostas singulares')

  const pairResponses = XLSX.utils.json_to_sheet(pairResponseArray)

  XLSX.utils.sheet_add_aoa(
    pairResponses,
    [["Dupla", "Minuto"]],
    {
      origin: "A1"
    }
  )

  XLSX.utils.book_append_sheet(workbook, pairResponses, 'Duplas')

  const trioResponses = XLSX.utils.json_to_sheet(trioResponseArray)
  console.table(trioResponseArray)

  XLSX.utils.sheet_add_aoa(
    trioResponses,
    [["Terceto", "Minuto"]],
    {
      origin: "A1"
    }
  )

  XLSX.utils.book_append_sheet(workbook, trioResponses, 'Tercetos')

  XLSX.writeFile(workbook, "dados_convertidos.xlsx", {
    compression: true
  })
}

export default function Sheets({ responses, minutes }: { responses: string, minutes: string }) {
  return <div className="flex flex-col items-center justify-center gap-6">
    <h1 className="text-4xl font-bold">Tudo pronto!</h1>
    <button
      onClick={() => {
        convertToSheetAndDownload(responses, minutes)
      }}
      type="button"
      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
    >
      Baixar planilha
    </button>

  </div>
}
