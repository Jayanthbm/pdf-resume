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

const PdfDocument = ({ data }) => {
  const {
    name,
    role,
    description,
    contactDetails,
    skills,
    work,
    education,
    personalProjects = [],
  } = data;

  const renderSingleColumn = ({
    name,
    role,
    description,
    contactDetails,
    skills,
    work,
    personalProjects,
    education,
  }) => {
    const { mobile, email, links } = contactDetails;

    const sectionTitle = (title) => (
      <>
        <Text style={{ fontSize: 15, padding: 5, fontWeight: "600" }}>
          {title}
        </Text>
        <View
          style={{
            borderBottom: 2,
            borderBottomColor: "#000",
            borderBottomStyle: "solid",
            marginBottom: 8,
          }}
        />
      </>
    );

    return (
      <>
        {/* Header */}
        <Text style={{ fontSize: 24, textAlign: "center", lineHeight: 1.5 }}>
          {name}
        </Text>
        {role && (
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            {role}
          </Text>
        )}
        {description && (
          <Text
            style={{
              fontSize: 11,
              textAlign: "center",
              marginTop: 5,
              marginBottom: 8,
              color: "#333",
              lineHeight: 1.4,
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
          }}
        >
          {mobile && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 6,
              }}
            >
              <Image
                style={{ width: 14, height: 14, marginRight: 5 }}
                src={MobileIcon}
              />
              <Text style={{ fontSize: 12 }}>{mobile}</Text>
            </View>
          )}
          {email && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 6,
              }}
            >
              <Image
                style={{ width: 14, height: 14, marginRight: 5 }}
                src={EmailIcon}
              />
              <Text style={{ fontSize: 12 }}>{email}</Text>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 8,
          }}
        >
          {links?.map((link, index) => (
            <Link
              key={index}
              src={link.link}
              style={{
                flexDirection: "row",
                alignItems: "center",
                fontSize: 11,
                marginRight: 8,
                color: "#000",
                textDecoration: "none",
              }}
            >
              <Image
                style={{ width: 12, height: 12, marginRight: 4 }}
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
                width: "48%",
                marginBottom: 6,
                paddingRight: 6,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 600 }}>{category}</Text>
              <Text style={{ fontSize: 11, lineHeight: 1.4 }}>
                {skillsList.join(", ")}
              </Text>
            </View>
          ))}
        </View>

        {/* Work Experience */}
        {sectionTitle("Work Experience")}
        {work.map((job, index) => (
          <View key={index} style={{ marginBottom: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 700 }}>
                {job.company}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: 700 }}>
                {job.duration}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#333", fontWeight: 700 }}>
                {job.role}
              </Text>
              <Text style={{ fontSize: 12, color: "#333", fontWeight: 700 }}>
                {job.location}
              </Text>
            </View>
            <View style={{ marginLeft: 10, marginTop: 4 }}>
              {job.tasks.map((task, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: 12,
                    marginBottom: 3,
                    lineHeight: 1.4,
                  }}
                >
                  • {task}
                </Text>
              ))}
            </View>
          </View>
        ))}

        {/* Personal Projects */}
        {personalProjects.length > 0 && (
          <>
            {sectionTitle("Personal Projects")}
            {personalProjects.map((project, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 13, fontWeight: 800 }}>
                  {project.title}
                </Text>

                <Text style={{ fontSize: 12, color: "#333" }}>
                  {project.duration}
                </Text>

                <Text style={{ fontSize: 12, marginBottom: 3 }}>
                  {project.description}
                </Text>

                {project.highlights?.map((point, i) => (
                  <Text key={i} style={{ fontSize: 12, marginLeft: 10 }}>
                    • {point}
                  </Text>
                ))}

                <Text style={{ fontSize: 11, marginTop: 3 }}>
                  Tech: {project.techUsed?.join(", ")}
                </Text>

                {project.link && (
                  <Link
                    src={project.link}
                    style={{ fontSize: 11, color: "#000" }}
                  >
                    {project.link}
                  </Link>
                )}
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {sectionTitle("Education")}
        {education.map((edu, index) => (
          <View key={index} style={{ marginBottom: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 13 }}>{edu.school}</Text>
              <Text style={{ fontSize: 13 }}>{edu.duration}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 12, color: "#333" }}>
                {edu.title}
                {edu.major ? ` in ${edu.major}` : ""} ({edu.grade})
              </Text>
              <Text style={{ fontSize: 12, color: "#333" }}>
                {edu.location}
              </Text>
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
          paddingTop: 30,
          paddingBottom: 30,
          paddingHorizontal: 30,
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
        })}
      </Page>
    </Document>
  );
};

export default PdfDocument;
