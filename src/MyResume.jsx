import { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaMapMarkerAlt, FaMobile } from "react-icons/fa";
import "./resume.css";
const MyResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const url = "https://jayanthbm.github.io/mydata/jresume.json";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div className="header-section">
        <div className="info-section">
          <div className="name-section">
            <div className="side-bar"></div>
            <div className="name">{resumeData?.header?.name}</div>
          </div>
          <div className="title">{resumeData?.header?.title}</div>
          <div className="description">{resumeData?.header?.description}</div>
        </div>

        <div className="contact-section">
          <div className="contact-info">
            <div className="title-icon-container">
              <div className="title" id="email">
                {resumeData?.header?.email}
              </div>
              <FaEnvelope />
            </div>
            <div className="title-icon-container">
              <div className="title" id="mobile">
                {resumeData?.header?.mobile}
              </div>
              <FaMobile />
            </div>

            <div className="title-icon-container">
              <div className="title" id="location">
                {resumeData?.header?.location}
              </div>
              <FaMapMarkerAlt />
            </div>
            <div className="title-icon-container">
              <div className="title" id="github">
                {resumeData?.header?.github}
              </div>
              <FaGithub />
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="left-content">
          {resumeData?.leftContent?.map((item, index) => (
            <div key={index}>
              <div className="main-title">{item?.title}</div>
              <div className="sub-section" id={index}>
                {item?.data?.map((data, index) => (
                  <div key={index}>
                    <div className="info-block-container">
                      <div className="side-bar"></div>
                      <div className="info-block">
                        <div className="info-title">{data?.title}</div>
                        <div className="info-subtitle">{data?.subtitle}</div>
                      </div>
                    </div>
                    <div className="timeline-container">
                      <div className="date">{data.leftSmallTitle}</div>
                      <div className="location">{data.rightSmallTitle}</div>
                    </div>
                    {item?.type === "work-details" && (
                      <>
                        <div className="sub-title">Achievements/Tasks</div>
                        <div className="description-container">
                          <ul>
                            {data?.tasks.map((task, index) => (
                              <li key={index}>{task}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {item?.type === "education-details" && (
                      <>
                        <div className="sub-title">{data?.major}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="right-content">
          {resumeData?.rightContent?.map((item, index) => (
            <div key={index}>
              <div className="main-title" key={item?.title}>
                {item?.title}
              </div>
              <div
                className={
                  item.type === "projects"
                    ? "sub-section"
                    : "sub-section flex-container"
                }
              >
                {item?.data?.map((data, dataIndex) => (
                  <div key={dataIndex}>
                    {item.type === "tags" && (
                      <div className="tag" key={dataIndex}>
                        {data}
                      </div>
                    )}
                    {item.type === "language" && (
                      <div className="language-container" key={dataIndex}>
                        <div className="info-title">{data?.name}</div>
                        <div className="info-subtitle">{data?.level}</div>
                      </div>
                    )}
                    {item.type === "projects" && (
                      <div key={dataIndex}>
                        <div className="info-block-container">
                          <div className="side-bar"></div>
                          <div className="info-block">
                            <div className="info-title">{data?.title}</div>
                            <div className="info-subtitle">
                              {data?.subtitle}
                            </div>
                          </div>
                        </div>
                        <div className="mb-10"></div>
                        <div className="subtitle">{data?.leftSmallTitle}</div>
                        <div className="subtitle">{data?.link}</div>

                        <div className="flex-container">
                          {data?.technologies.map((tech, index) => (
                            <div className="small-tag" key={index}>
                              {tech}
                            </div>
                          ))}
                        </div>
                        <div className="sub-title">Tasks</div>
                        <div className="description-container">
                          <ul>
                            {data?.tasks.map((task, index) => (
                              <li key={index}>{task}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MyResume;
