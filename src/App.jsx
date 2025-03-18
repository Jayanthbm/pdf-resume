import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import "./App.css";
import PdfDocument from "./PdfDocument";
function App() {
  const [template, setTemplate] = useState("single-column");
  const [url, setUrl] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [pastedJson, setPastedJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMesssage, setErrorMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("text");

  const SAMPLE_JSON = {
    name: "John Doe",
    role: "Software Engineer",
    description:
      "Passionate about building scalable and efficient software solutions.",
    contactDetails: {
      mobile: "+91 9876543210",
      email: "johndoe@example.com",
      address: "Bengaluru, India",
      links: [
        {
          link: "https://www.linkedin.com/in/johndoe/",
          icon: "https://jayanthbm.github.io/mydata/icons/linkedin.png",
          title: "LinkedIn",
        },
        {
          link: "https://github.com/johndoe",
          icon: "https://jayanthbm.github.io/mydata/icons/github.png",
          title: "GitHub",
        },
      ],
    },
    skills: {
      "Programming Languages": ["Python", "Java", "JavaScript"],
      Frameworks: ["Spring Boot", "React"],
      Databases: ["MySQL", "MongoDB"],
      Tools: ["Git", "Docker"],
    },
    work: [
      {
        role: "Software Development Engineer",
        company: "Tech Solutions Inc.",
        duration: "2019 - Present",
        location: "Bengaluru, India",
        tasks: [
          "Led 'Migration Service' project, creating AWS resources and facilitating account migration.",
          "Developed RESTful APIs for various microservices using Spring Boot.",
        ],
      },
      {
        role: "Junior Developer",
        company: "InnovateX Technologies",
        duration: "2017 - 2019",
        location: "Mumbai, India",
        tasks: [
          "Contributed to the development of a customer relationship management (CRM) system.",
          "Participated in daily stand-up meetings and code reviews.",
        ],
      },
      {
        role: "Intern",
        company: "TechX Solutions",
        duration: "Summer 2016",
        location: "Bengaluru, India",
        tasks: [
          "Assisted senior developers in building REST APIs for a cloud-based application.",
          "Tested and debugged software modules under the guidance of mentors.",
        ],
      },
    ],
    education: [
      {
        title: "Bachelor of Engineering",
        school: "ABC College of Engineering",
        location: "Bengaluru, India",
        duration: "2015 - 2019",
        grade: "Distinction",
        major: "Computer Science",
      },
      {
        title: "High School Diploma",
        school: "XYZ High School",
        location: "Bengaluru, India",
        duration: "2013 - 2015",
        grade: "Distinction",
        major: "Science",
      },
    ],
  };

  useEffect(() => {
    const storedResumeData = localStorage.getItem("resumeData");
    if (storedResumeData) {
      let parsed = JSON.parse(storedResumeData);
      if (validateJson(parsed)) {
        setResumeData(parsed);
      } else {
        localStorage.removeItem("resumeData");
        clearData();
      }
    }
  }, []);
  const loadResumeData = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);
      setResumeData(null);
      const response = await fetch(url);
      const data = await response.json();
      if (validateJson(data)) {
        setResumeData(data);
        localStorage.setItem("resumeData", JSON.stringify(data));
        setLoading(false);
      } else {
        setErrorMessage("Invalid JSON format");
      }
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const loadPastedJson = () => {
    try {
      setErrorMessage(null);
      const parsedData = JSON.parse(pastedJson);
      if (validateJson(parsedData)) {
        setResumeData(parsedData);
        localStorage.setItem("resumeData", JSON.stringify(parsedData));
        setActiveTab("json");
      } else {
        setPastedJson("");
        setActiveTab("json");
        setErrorMessage("Invalid JSON format");
      }
    } catch (error) {
      setErrorMessage("Invalid JSON format");
    }
  };

  const clearData = () => {
    setResumeData(null);
    setUrl("");
    setPastedJson("");
    setTemplate("single-column");
    setErrorMessage(null);
    setLoading(false);
  };

  const validateJson = (json) => {
    try {
      setErrorMessage(null);
      if (json.name === undefined) {
        setErrorMessage("Keys missing in JSON,name is missing");
        return false;
      } else if (json.role === undefined) {
        setErrorMessage("Keys missing in JSON,role is missing");
        return false;
      } else if (json.contactDetails === undefined) {
        setErrorMessage("Keys missing in JSON,contactDetails is missing");
        return false;
      } else if (json.skills === undefined) {
        setErrorMessage("Keys missing in JSON,skills is missing");
        return false;
      } else if (json.work?.length === 0) {
        setErrorMessage("Keys missing in JSON,work is missing");
        return false;
      } else if (json.education?.length === 0) {
        setErrorMessage("Keys missing in JSON,education is missing");
        return false;
      }
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const loadSampleJson = () => {
    setResumeData(SAMPLE_JSON);
    setUrl("");
    setTemplate("single-column");
    setErrorMessage(null);
    setLoading(false);
  };

  const downloadSampleJson = () => {
    const blob = new Blob([JSON.stringify(SAMPLE_JSON, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample-json.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div className="fixed-top">
        <div className="heading">PDF Resume</div>
        <div className="tab-container">
          <button
            onClick={() => setActiveTab("url")}
            className={`tab-btn ${activeTab === "url" ? "active" : ""}`}
          >
            URL
          </button>
          <button
            onClick={() => setActiveTab("text")}
            className={`tab-btn ${activeTab === "text" ? "active" : ""}`}
          >
            Text
          </button>
        </div>
        {activeTab === "url" && (
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
        )}

        {activeTab === "text" && (
          <div className="input-container">
            <textarea
              rows="6"
              placeholder="Paste JSON data here..."
              value={pastedJson}
              onChange={(e) => setPastedJson(e.target.value)}
              className="json-textarea"
            />
            <button onClick={loadPastedJson} className="load-btn">
              Load JSON
            </button>
            <button onClick={clearData} className="danger-btn">
              Clear
            </button>
          </div>
        )}
        <div className="input-container">
          <button onClick={loadSampleJson} className="load-btn">
            Load Sample
          </button>
          <button onClick={downloadSampleJson} className="danger-btn">
            Download Sample JSON
          </button>
        </div>

        {loading && <div>Loading...</div>}
        {errorMesssage ? (
          <div className="error">{errorMesssage}</div>
        ) : (
          <>
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
        )}
      </div>
    </>
  );
}

export default App;
