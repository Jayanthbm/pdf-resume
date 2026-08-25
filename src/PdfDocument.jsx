import {
  Document,
  Image,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import EmailIcon from "./icons/email.png";
import MobileIcon from "./icons/mobile.png";

const DEFAULT_STYLES = {
  nameSize: 20,
  roleSize: 12,
  sectionHeadingSize: 13,
  subHeadingSize: 11,
  bodyTextSize: 10,
  metaTextSize: 9.5,
  lineHeight: 1.3,
  pagePadding: 24,
};

const PdfDocument = ({ data = {}, customStyles = {} }) => {
  const cfg = { ...DEFAULT_STYLES, ...customStyles };
  const {
    name,
    role,
    description,
    contactDetails = {},
    skills = {},
    work = [],
    education = [],
    personalProjects = [],
    technicalHighlights = [],
  } = data || {};

  const renderSingleColumn = ({
    name,
    role,
    description,
    contactDetails = {},
    skills = {},
    work = [],
    personalProjects = [],
    education = [],
    technicalHighlights = [],
  }) => {
    const { mobile, email, links } = contactDetails;

    const sectionTitle = (title) => (
      <View style={{ marginTop: 6, marginBottom: 4 }}>
        <Text
          style={{
            fontSize: cfg.sectionHeadingSize,
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            borderBottom: 1.5,
            borderBottomColor: "#111",
            borderBottomStyle: "solid",
            marginTop: 2,
            marginBottom: 4,
          }}
        />
      </View>
    );

    return (
      <>
        {/* Header */}
        <Text style={{ fontSize: cfg.nameSize, textAlign: "center", fontWeight: "700", letterSpacing: 0.5 }}>
          {name}
        </Text>
        {role && (
          <Text
            style={{
              fontSize: cfg.roleSize,
              textAlign: "center",
              marginTop: 2,
              marginBottom: 3,
              fontWeight: "600",
              color: "#222",
            }}
          >
            {role}
          </Text>
        )}
        {description && (
          <Text
            style={{
              fontSize: cfg.bodyTextSize,
              textAlign: "center",
              marginBottom: 5,
              color: "#333",
              lineHeight: cfg.lineHeight,
            }}
          >
            {description}
          </Text>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 2,
          }}
        >
          {mobile && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              <Image
                style={{ width: 10, height: 10, marginRight: 4 }}
                src={MobileIcon}
              />
              <Text style={{ fontSize: cfg.metaTextSize, color: "#222" }}>{mobile}</Text>
            </View>
          )}
          {email && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              <Image
                style={{ width: 10, height: 10, marginRight: 4 }}
                src={EmailIcon}
              />
              <Text style={{ fontSize: cfg.metaTextSize, color: "#222" }}>{email}</Text>
            </View>
          )}
          {links?.map((link, index) => (
            <Link
              key={index}
              src={link.link}
              style={{
                flexDirection: "row",
                alignItems: "center",
                fontSize: cfg.metaTextSize,
                marginRight: 8,
                color: "#000",
                textDecoration: "none",
              }}
            >
              <Image
                style={{ width: 10, height: 10, marginRight: 3 }}
                src={link.icon}
              />
              <Text>{link.title || link.link}</Text>
            </Link>
          ))}
        </View>

        {/* Skills */}
        {sectionTitle("Technical Skills")}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Object.entries(skills).map(([category, skillsList], index) => (
            <View
              key={index}
              style={{
                width: "50%",
                marginBottom: 3,
                paddingRight: 6,
              }}
            >
              <Text style={{ fontSize: cfg.bodyTextSize, fontWeight: "700", color: "#111" }}>
                {category}:{" "}
                <Text style={{ fontWeight: "normal", color: "#333" }}>
                  {skillsList.join(", ")}
                </Text>
              </Text>
            </View>
          ))}
        </View>

        {/* Professional Experience */}
        {sectionTitle("Professional Experience")}
        {work.map((job, index) => (
          <React.Fragment key={index}>
            <View
              style={{
                marginBottom: job.marginBottom !== undefined ? job.marginBottom : 6,
                marginTop: job.marginTop !== undefined ? job.marginTop : 0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ flex: 1, paddingRight: 10, fontSize: cfg.subHeadingSize, fontWeight: "700", color: "#000" }}>
                  {job.role} — <Text style={{ fontWeight: "600", color: "#333" }}>{job.company}</Text>
                </Text>
                <Text style={{ fontSize: cfg.metaTextSize, fontWeight: "600", color: "#444", textAlign: "right" }}>
                  {job.duration} | {job.location}
                </Text>
              </View>
              <View style={{ marginLeft: 6, marginTop: 2 }}>
                {job.tasks.map((task, i) => (
                  <Text
                    key={i}
                    style={{
                      fontSize: cfg.bodyTextSize,
                      marginBottom: 1.5,
                      lineHeight: cfg.lineHeight,
                      color: "#222",
                    }}
                  >
                    • {task}
                  </Text>
                ))}
              </View>
            </View>
            {(job.pageBreakAfter || job.pageBreak) && <View break />}
          </React.Fragment>
        ))}

        {/* Personal Projects */}
        {personalProjects.length > 0 && (
          <>
            {sectionTitle("Projects")}
            {personalProjects.map((project, index) => (
              <React.Fragment key={index}>
                <View
                  style={{
                    marginBottom: project.marginBottom !== undefined ? project.marginBottom : 5,
                    marginTop: project.marginTop !== undefined ? project.marginTop : 0,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={{ flex: 1, paddingRight: 10, fontSize: cfg.subHeadingSize, fontWeight: "700", color: "#000" }}>
                      {project.title}
                      {project.techUsed && (
                        <Text style={{ fontSize: cfg.metaTextSize, fontWeight: "normal", color: "#555" }}>
                          {" "}({project.techUsed.join(", ")})
                        </Text>
                      )}
                    </Text>
                    <Text style={{ fontSize: cfg.metaTextSize, color: "#444", textAlign: "right" }}>
                      {project.duration}
                    </Text>
                  </View>

                  <Text style={{ fontSize: cfg.bodyTextSize, color: "#222", marginTop: 1, lineHeight: cfg.lineHeight }}>
                    {project.description}
                  </Text>

                  {project.highlights?.map((point, i) => (
                    <Text key={i} style={{ fontSize: cfg.metaTextSize, color: "#333", marginLeft: 6, marginTop: 1 }}>
                      • {point}
                    </Text>
                  ))}

                  {project.link && (
                    <Link
                      src={project.link}
                      style={{
                        fontSize: cfg.metaTextSize,
                        color: "#0d6efd",
                        textDecoration: "none",
                        marginTop: 1.5,
                        marginLeft: 6,
                      }}
                    >
                      Link: {project.link}
                    </Link>
                  )}
                </View>
                {(project.pageBreakAfter || project.pageBreak) && <View break />}
              </React.Fragment>
            ))}
          </>
        )}

        {/* Additional Technical Highlights */}
        {technicalHighlights && technicalHighlights.length > 0 && (
          <>
            {sectionTitle("Technical Highlights & Key Achievements")}
            <View style={{ marginTop: 2, marginLeft: 6 }}>
              {technicalHighlights.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: cfg.bodyTextSize,
                    marginBottom: 2,
                    lineHeight: cfg.lineHeight,
                    color: "#222",
                  }}
                >
                  • <Text style={{ fontWeight: "700", color: "#000" }}>{item.category}: </Text>
                  {item.description}
                </Text>
              ))}
            </View>
          </>
        )}

        {/* Education */}
        {sectionTitle("Education")}
        {education.map((edu, index) => (
          <View key={index} style={{ marginBottom: 5 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={{ fontSize: cfg.subHeadingSize, fontWeight: "700", color: "#000" }}>
                  {edu.title}{edu.major ? ` in ${edu.major}` : ""}{edu.grade ? ` (${edu.grade})` : ""}
                </Text>
                <Text style={{ fontSize: cfg.bodyTextSize, color: "#333", marginTop: 1 }}>
                  {edu.school}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: cfg.metaTextSize, fontWeight: "600", color: "#333" }}>
                  {edu.duration}
                </Text>
                <Text style={{ fontSize: cfg.metaTextSize, color: "#555", marginTop: 1 }}>
                  {edu.location}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <Document language="en">
      <Page
        size="A4"
        style={{
          paddingTop: cfg.pagePadding,
          paddingBottom: cfg.pagePadding,
          paddingHorizontal: cfg.pagePadding,
        }}
      >
        {renderSingleColumn({
          name,
          role,
          description,
          contactDetails,
          skills,
          work,
          personalProjects,
          education,
          technicalHighlights,
        })}
      </Page>
    </Document>
  );
};

export default PdfDocument;
