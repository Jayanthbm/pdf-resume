import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import './App.css';
import PdfDocument from "./PdfDocument";
function App() {
  const [template, setTemplate] = useState("single-column");
  const [url, setUrl] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMesssage, setErrorMessage] = useState(null);

  useEffect(() => {
    const storedResumeData = localStorage.getItem("resumeData");
    if (storedResumeData) {
      setResumeData(JSON.parse(storedResumeData));
    }
  },[])
  const loadResumeData = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);
      setResumeData(null);
      const response = await fetch(url);
      const data = await response.json();
      setResumeData(data);
      localStorage.setItem("resumeData", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const clearData = () => {
    setResumeData(null);
    setUrl("");
    setTemplate("single-column");
    setErrorMessage(null);
    setLoading(false);
  }
  return (
    <>
      <div className="fixed-top">
        <div className="heading">PDF Resume</div>
        <div className="input-container">
          <input
            type="text"
            value={url}
            placeholder="Enter URL for Resume data"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={loadResumeData} className="load-btn">
            Load
          </button>
          <button onClick={clearData} className="danger-btn">
            Clear
          </button>
        </div>
        {loading && <div>Loading...</div>}
        {errorMesssage && <div className="error">{errorMesssage}</div>}
        {resumeData && (
          <div className="select-container">
            <select
              onChange={(e) => setTemplate(e.target.value)}
              className="my-select"
              value={template}
            >
              <option
                value="single-column"
                selected={template === "single-column"}
              >
                Single Column
              </option>
              <option value="two-column" selected={template === "two-column"}>
                Two Column
              </option>
            </select>
          </div>
        )}
      </div>
      {resumeData && (
        <PDFViewer
          style={{
            width: "90%",
            height: "90vh",
            marginLeft: 30,
            marginRight: 30,
          }}
        >
         <PdfDocument data={resumeData} template={template} />
        </PDFViewer>
      )}

    </>
  );
}

export default App;
