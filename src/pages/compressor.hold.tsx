import { useEffect, useState } from "react";
import { API_COMPRESSOR } from "../service/saleforecase.service";
import { MCoreInterface_Parent } from "../Interface";

function CompressorHold() {
  const [data, setData] = useState<MCoreInterface_Parent[]>([]);
  const [model, setModel] = useState<string>("ALL");
  const [load, setLoad] = useState<boolean>(false);
  const [modelName, setModelName] = useState<string>("");

  useEffect(() => {
    init(model, "Click");
  }, [model]);

  async function init(model: string, status: string) {
    setLoad(true);
    let RESApiTest = await API_COMPRESSOR(model, status);
    setData(RESApiTest);
    setLoad(false);
    console.log(RESApiTest);
  }

  const onClick = (e: any) => {
    setModelName("");
    setModel(e);
  };

  const handleNameChange = (event: any) => {
    setModelName(event.target.value.toUpperCase());
  };

  useEffect(() => {
    if (modelName !== "") {
      setModel("ALL");
      init(model, modelName);
    } else {
      init(model, "Click");
    }
  }, [modelName]);

  return (
    <>
      <div className="mx-auto max-w-screen-2xl bg-white">
        <h1 className="m-2 text-2xl font-bold text-gray-900">
          Compressor / ODM Hold
        </h1>
        <div className="bg-white py-2 px-3">
          <nav className="flex flex-wrap gap-4">
            <div
              onClick={() => onClick("ALL")}
              className={
                model === "ALL"
                  ? "inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
                  : "inline-flex whitespace-nowrap border-b-2 border-transparent  py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
              }
            >
              ALL
            </div>
            <div
              onClick={() => onClick("1YC")}
              className={
                model === "1YC"
                  ? "inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
                  : "inline-flex whitespace-nowrap border-b-2 border-transparent  py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
              }
            >
              1YC
            </div>
            <div
              onClick={() => onClick("2YC")}
              className={
                model === "2YC"
                  ? "inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
                  : "inline-flex whitespace-nowrap border-b-2 border-transparent  py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
              }
            >
              2YC
            </div>
            <div
              onClick={() => onClick("SCR")}
              className={
                model === "SCR"
                  ? "inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
                  : "inline-flex whitespace-nowrap border-b-2 border-transparent  py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
              }
            >
              SCR
            </div>
            <div
              onClick={() => onClick("ODM")}
              className={
                model === "ODM"
                  ? "inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
                  : "inline-flex whitespace-nowrap border-b-2 border-transparent  py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-100 ease-in-out hover:border-b-purple-600 hover:text-purple-600 cursor-pointer"
              }
            >
              ODM
            </div>
          </nav>
        </div>
      </div>
      <div className="w-screen bg-gray-50">
        <div className="mx-auto max-w-screen-2xl px-2 py-3">
          <div className="w-full">
            <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
              <form className="relative flex w-full max-w-2xl items-center">
                <svg
                  className="absolute left-2 block h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    className=""
                  ></line>
                </svg>
                <input
                  type="name"
                  name="search"
                  value={modelName}
                  onChange={handleNameChange}
                  className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                  placeholder="Search by Model"
                />
              </form>

              {/* <button
                type="button"
                className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-6 h-6 pr-1"
                >
                  <path
                    fill="#169154"
                    d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"
                  />
                  <path
                    fill="#18482a"
                    d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"
                  />
                  <path
                    fill="#0c8045"
                    d="M14 15.003H29V24.005000000000003H14z"
                  />
                  <path fill="#17472a" d="M14 24.005H29V33.055H14z" />
                  <g>
                    <path
                      fill="#29c27f"
                      d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"
                    />
                    <path
                      fill="#27663f"
                      d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"
                    />
                    <path
                      fill="#19ac65"
                      d="M29 15.003H44V24.005000000000003H29z"
                    />
                    <path fill="#129652" d="M29 24.005H44V33.055H29z" />
                  </g>
                  <path
                    fill="#0c7238"
                    d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"
                  />
                  <path
                    fill="#fff"
                    d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"
                  />
                </svg>
                Export to Excel
              </button> */}
            </div>
          </div>
          <div className="my-2 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
            <ul className="my-2 space-y-3 overflow-y-auto h-[600px]">
              {load ? (
                <div className="flex flex-col items-center gap-2 justify-center min-h-screen select-none">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                  <div className="mt-3 text-center">
                    <p className="text-lg font-semibold text-gray-700">
                      กำลังโหลดข้อมูล...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {data.length > 0 ? (
                    data.map((oParent, index) => (
                      <li key={index} className="text-left">
                        <label className="relative flex flex-col border border-gray-100 shadow-md">
                          <input className="peer hidden" type="checkbox" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-0 top-3 ml-auto mr-2 h-4 text-gray-700 transition peer-checked:rotate-180 peer-checked:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>

                          {/* ตารางหัวข้อ */}
                          <div className="flex flex-row cursor-pointer select-none items-center justify-items-center text-gray-600 hover:bg-gray-100 peer-checked:bg-sky-500 peer-checked:text-white">
                            <table className="min-w-full border-collapse border-spacing-x-2">
                              <thead className="lg:table-header-group">
                                <tr className="w-full">
                                  {/* model */}
                                  <td className="whitespace-no-wrap py-2 text-sm font-bold  sm:px-2 lg:table-cell w-[20%]">
                                    MODEL: {oParent.model}
                                  </td>
                                  <td className="whitespace-no-wrap py-2 text-left text-sm font-bold  sm:px-2 lg:table-cell lg:text-left w-[20%]">
                                    HOLD ทั้งหมด:{" "}
                                    {Number(oParent.sumhold).toLocaleString()}
                                  </td>
                                  <td className="whitespace-no-wrap py-2 text-sm font-bold  sm:px-2 lg:table-cell w-[20%]">
                                     CANCLE HOLD ทั้งหมด:{" "}
                                    {Number(oParent.sumunhold).toLocaleString()}
                                  </td>
                                  <td className="whitespace-no-wrap py-2 text-sm font-bold  sm:px-2 lg:table-cell w-[20%]">
                                      Hold Remain ทั้งหมด:{" "}
                                    {Number(oParent.stockhold).toLocaleString()}
                                  </td>
                                </tr>
                              </thead>
                            </table>
                          </div>
                          {/* ตารางด้านใน */}
                          <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-96 cursor-pointer">
                            <ul className="space-y-1 h-[300px] font-semibold text-gray-600 mb-5 overflow-x-auto">
                              <table className="w-full border border-spacing-x-2">
                                <thead className="lg:table-header-group ">
                                  <tr className="sticky top-0 border-gray-300 bg-sky-100 ">
                                    <td
                                      rowSpan={2}
                                      className="whitespace-normal text-center py-2 text-sm font-bold border border-gray-300"
                                    >
                                      MODEL
                                    </td>
                                    <td
                                      className="whitespace-normal py-2 text-sm font-bold border border-gray-300  text-center"
                                      colSpan={4}
                                    >
                                      HOLD
                                    </td>
                                    <td
                                      colSpan={4}
                                      className="whitespace-normal py-2 text-sm font-bold w-[40%] text-center border border-gray-300"
                                    >
                                      UNHOLD
                                    </td>
                                    <td
                                      rowSpan={2}
                                      className="whitespace-normal text-center py-2 text-sm font-bold w-[10%] border border-gray-300"
                                    >
                                      STOCK HOLD
                                    </td>
                                  </tr>

                                  <tr className="border sticky top-9">
                                    <th className="text-center p-4 border bg-sky-100 border-gray-300 w-[10%] ">
                                      REFNO
                                    </th>
                                    <th className="text-center p-4 border bg-sky-100 border-gray-300 w-[5%] ">
                                      DATE
                                    </th>
                                    <th className="text-center p-4 border bg-sky-100 border-gray-300 w-[15%] ">
                                      REMARK
                                    </th>
                                    <th className="text-center p-4 border bg-sky-100 border-gray-300 w-[5%] ">
                                      QTY
                                    </th>

                                    <th className="text-center p-4 border bg-sky-100 border-gray-300 w-[10%] ">
                                      REFNO
                                    </th>
                                    <th className="text-center p-4 border bg-sky-100 border-gray-300 w-[5%] ">
                                      DATE
                                    </th>
                                    <th className="text-center p-4 border bg-sky-100 border-gray-300 w-[15%] ">
                                      REMARK
                                    </th>
                                    <th className="text-center p-4 border bg-sky-100 border-gray-300 w-[5%] ">
                                      QTY
                                    </th>
                                  </tr>

                                  {oParent.children.map((oChild, iChild) => (
                                    <tr key={iChild} className="border-t">
                                      {/* model */}
                                      <td className="whitespace-no-wrap py-2 text-sm text-left font-bold text-gray-500 sm:px-2 lg:table-cell border border-gray-300 w-[10%]">
                                        {oChild.model}
                                      </td>

                                      <td className="whitespace-no-wrap py-2 text-sm text-left font-bold text-gray-500 sm:px-2 lg:table-cell border w-[10%]">
                                        {oChild.hold}
                                      </td>

                                      <td className="whitespace-no-wrap py-2 text-sm text-left font-bold text-gray-500 sm:px-2 lg:table-cell border w-[5%]">
                                        {oChild.hdate}
                                      </td>

                                      <td className="whitespace-no-wrap py-2 text-sm text-left font-bold text-gray-500 sm:px-2 lg:table-cell border w-[15%]">
                                        {oChild.remark1}
                                      </td>
                                      {/* h_qty */}
                                      <td className="whitespace-no-wrap py-2 text-right text-sm font-bold text-gray-500 sm:px-2 lg:table-cell border w-[5%]">
                                        {Number(oChild.hqty) <= 0
                                          ? ""
                                          : Number(
                                              oChild.hqty
                                            ).toLocaleString()}
                                      </td>

                                      <td className="whitespace-no-wrap py-2 text-left text-sm font-bold text-gray-500 sm:px-2 lg:table-cell border w-[10%]">
                                        {oChild.unhold}
                                      </td>
                                      <td className="whitespace-no-wrap py-2 text-left text-sm font-bold text-gray-500 sm:px-2 lg:table-cell border w-[5%]">
                                        {oChild.cdate}
                                      </td>

                                      <td className="whitespace-no-wrap hidden py-2 text-sm font-bold text-gray-500 sm:px-2 lg:table-cell  border w-[15%]">
                                        {oChild.remark2}
                                      </td>

                                      <td className="whitespace-no-wrap hidden py-2 text-right text-sm font-bold text-gray-500 sm:px-2 lg:table-cell border w-[5%]">
                                        {Number(oChild.unqty) <= 0
                                          ? ""
                                          : Number(
                                              oChild.unqty
                                            ).toLocaleString()}
                                      </td>

                                      <td className="whitespace-no-wrap hidden py-2 text-sm text-right font-bold text-gray-500 sm:px-2 lg:table-cell border w-[5%]">
                                        {/* {Number(oChild.stockhold).toLocaleString()} */}
                                      </td>
                                    </tr>
                                  ))}

                                  <tr className="border-t">
                                    <td className="whitespace-no-wrap py-2 text-sm text-center font-bold text-gray-500 sm:px-2 lg:table-cell border">
                                      TOTAL
                                    </td>
                                    <td className="whitespace-no-wrap py-2 text-sm font-bold text-gray-500 sm:px-2 lg:table-cell"></td>
                                    <td className="whitespace-no-wrap py-2 text-sm font-bold text-gray-500 sm:px-2 lg:table-cell"></td>
                                    <td className="whitespace-no-wrap py-2 text-sm font-bold text-gray-500 sm:px-2 lg:table-cell"></td>
                                    <td className="whitespace-no-wrap py-2 text-right text-sm font-bold text-gray-500 sm:px-2 lg:table-cell border">
                                      {Number(oParent.sumhold).toLocaleString()}
                                    </td>
                                    <td className="whitespace-no-wrap py-2 text-left text-sm font-bold text-gray-500 sm:px-2 lg:table-cell"></td>
                                    <td className="whitespace-no-wrap py-2 text-left text-sm font-bold text-gray-500 sm:px-2 lg:table-cell"></td>
                                    <td className="whitespace-no-wrap py-2 text-right text-sm font-bold text-gray-500 sm:px-2 lg:text-left"></td>
                                    <td className="whitespace-no-wrap text-right py-2 text-sm font-bold text-gray-500 sm:px-2 lg:table-cell border">
                                      {Number(
                                        oParent.sumunhold
                                      ).toLocaleString()}
                                    </td>
                                    <td className="whitespace-no-wrap py-2 text-sm text-right font-bold text-gray-500 sm:px-2 lg:table-cell border">
                                      {Number(
                                        oParent.stockhold
                                      ).toLocaleString()}
                                    </td>
                                  </tr>
                                </thead>
                              </table>
                            </ul>
                          </div>
                        </label>
                      </li>
                    ))
                  ) : (
                    <div className="flex flex-col items-center gap-2 justify-center min-h-screen select-none">
                      <div className="mt-3 text-center">
                        <svg
                          className="mx-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          width="116"
                          height="121"
                          viewBox="0 0 116 121"
                          fill="none"
                        >
                          <path
                            d="M0.206909 63.57C0.206909 31.7659 25.987 6.12817 57.6487 6.12817C89.2631 6.12817 115.079 31.7541 115.079 63.57C115.079 77.0648 110.43 89.4805 102.627 99.2755C91.8719 112.853 75.4363 121 57.6487 121C39.7426 121 23.4018 112.794 12.6582 99.2755C4.85538 89.4805 0.206909 77.0648 0.206909 63.57Z"
                            fill="#EEF2FF"
                          />
                          <path
                            d="M72.7942 0.600875L72.7942 0.600762L72.7836 0.599331C72.3256 0.537722 71.8622 0.5 71.3948 0.5H22.1643C17.1256 0.5 13.0403 4.56385 13.0403 9.58544V107.286C13.0403 112.308 17.1256 116.372 22.1643 116.372H93.1214C98.1725 116.372 102.245 112.308 102.245 107.286V29.4482C102.245 28.7591 102.17 28.0815 102.019 27.4162L102.019 27.416C101.615 25.6459 100.67 24.0014 99.2941 22.7574C99.2939 22.7572 99.2937 22.757 99.2934 22.7568L77.5462 2.89705C77.5461 2.89692 77.5459 2.89679 77.5458 2.89665C76.2103 1.66765 74.5591 0.876968 72.7942 0.600875Z"
                            fill="white"
                            stroke="#E5E7EB"
                          />
                          <circle
                            cx="60.2069"
                            cy="61"
                            r="21.0256"
                            fill="#EEF2FF"
                          />
                          <path
                            d="M74.6786 46.1412L74.6783 46.1409C66.5737 38.0485 53.4531 38.0481 45.36 46.1412C37.2552 54.2341 37.2551 67.3666 45.3597 75.4596C53.4529 83.5649 66.5739 83.5645 74.6786 75.4599C82.7716 67.3669 82.7716 54.2342 74.6786 46.1412ZM79.4694 41.3508C90.2101 52.0918 90.2101 69.5093 79.4694 80.2502C68.7166 90.9914 51.3104 90.9915 40.5576 80.2504C29.8166 69.5095 29.8166 52.0916 40.5576 41.3506C51.3104 30.6096 68.7166 30.6097 79.4694 41.3508Z"
                            stroke="#E5E7EB"
                          />
                          <path
                            d="M83.2471 89.5237L76.8609 83.1309C78.9391 81.5058 80.8156 79.6106 82.345 77.6546L88.7306 84.0468L83.2471 89.5237Z"
                            stroke="#E5E7EB"
                          />
                          <path
                            d="M104.591 94.4971L104.59 94.4969L92.7346 82.653C92.7342 82.6525 92.7337 82.652 92.7332 82.6515C91.6965 81.6018 90.0076 81.6058 88.9629 82.6505L89.3089 82.9965L88.9629 82.6505L81.8573 89.7561C80.8213 90.7921 80.8248 92.4783 81.8549 93.5229L81.8573 93.5253L93.7157 105.384C96.713 108.381 101.593 108.381 104.591 105.384C107.6 102.375 107.6 97.5062 104.591 94.4971Z"
                            fill="#A5B4FC"
                            stroke="#818CF8"
                          />
                          <path
                            d="M62.5493 65.6714C62.0645 65.6714 61.6626 65.2694 61.6626 64.7729C61.6626 62.7866 58.6595 62.7866 58.6595 64.7729C58.6595 65.2694 58.2576 65.6714 57.761 65.6714C57.2762 65.6714 56.8743 65.2694 56.8743 64.7729C56.8743 60.422 63.4478 60.4338 63.4478 64.7729C63.4478 65.2694 63.0458 65.6714 62.5493 65.6714Z"
                            fill="#4F46E5"
                          />
                          <path
                            d="M70.1752 58.0694H66.4628C65.9662 58.0694 65.5642 57.6675 65.5642 57.1709C65.5642 56.6862 65.9662 56.2842 66.4628 56.2842H70.1752C70.6717 56.2842 71.0737 56.6862 71.0737 57.1709C71.0737 57.6675 70.6717 58.0694 70.1752 58.0694Z"
                            fill="#4F46E5"
                          />
                          <path
                            d="M53.8596 58.0693H50.1472C49.6506 58.0693 49.2487 57.6673 49.2487 57.1708C49.2487 56.686 49.6506 56.2841 50.1472 56.2841H53.8596C54.3443 56.2841 54.7463 56.686 54.7463 57.1708C54.7463 57.6673 54.3443 58.0693 53.8596 58.0693Z"
                            fill="#4F46E5"
                          />
                          <rect
                            x="28.9248"
                            y="16.3846"
                            width="30.7692"
                            height="2.05128"
                            rx="1.02564"
                            fill="#4F46E5"
                          />
                          <rect
                            x="28.9248"
                            y="100.487"
                            width="41.0256"
                            height="4.10256"
                            rx="2.05128"
                            fill="#A5B4FC"
                          />
                          <rect
                            x="28.9248"
                            y="22.5385"
                            width="10.2564"
                            height="2.05128"
                            rx="1.02564"
                            fill="#4F46E5"
                          />
                          <circle
                            cx="42.2582"
                            cy="23.5641"
                            r="1.02564"
                            fill="#4F46E5"
                          />
                          <circle
                            cx="46.3607"
                            cy="23.5641"
                            r="1.02564"
                            fill="#4F46E5"
                          />
                          <circle
                            cx="50.4633"
                            cy="23.5641"
                            r="1.02564"
                            fill="#4F46E5"
                          />
                        </svg>
                        <p className="text-lg font-semibold text-gray-700">
                          ไม่พบข้อมูล
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </ul>
            <h3 className="text-gray-500 my-2">
              ทั้งหมด: {data.length} รายการ
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompressorHold;
