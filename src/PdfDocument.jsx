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
import LocationIcon from "./icons/location.png";
import MobileIcon from "./icons/mobile.png";
const PdfDocument = ({ data, template }) => {
  const { name, role, description, contactDetails, skills, work, education } =
    data;

  const renderSingleColumn = ({ name, role, description, contactDetails, skills, work, education }) => {
    const { mobile, email, address, links } = contactDetails;
    return (
      <>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            display: "flex",
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
                fontSize: 12,
                color: "#000",
                textDecoration: "none",
                lineHeight: 1.3,
                marginRight: 4,
              }}
              key="mobile"
            >
              <Image
                style={{
                  width: 16,
                  height: 14,
                  marginRight: 5,
                }}
                src={MobileIcon}
              />
              <Text>{mobile}</Text>
            </View>
          )}
          {email && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                fontSize: 12,
                color: "#000",
                textDecoration: "none",
                lineHeight: 1.3,
                marginRight: 4,
              }}
              key="email"
            >
              <Image
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 5,
                }}
                src={EmailIcon}
              />
              <Text>{email}</Text>
            </View>
          )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {links?.map((link, index) => (
            <Link
              style={{
                flexDirection: "row",
                alignItems: "center",
                fontSize: 12,
                color: "#000",
                textDecoration: "none",
                lineHeight: 1.3,
                marginRight: 4,
              }}
              src={link.link}
              key={index}
            >
              <Image
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 5,
                }}
                src={link.icon}
              />
              <Text>{link.link}</Text>
            </Link>
          ))}
        </View>
        <Text
          style={{
            fontSize: 16,
            padding: 5,
          }}
        >
          Technical Skills
        </Text>
        <View
          style={{
            borderBottom: 2,
            borderBottomColor: "#000",
            borderBottomStyle: "solid",
            marginBottom: 10,
          }}
        />
        <View>
          {Object.entries(skills).map(([category, skillsList], index) => (
            <View
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 3,
                }}
              >
                {category} :
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 1.3,
                  paddingLeft: 10,
                }}
              >
                {skillsList?.join(", ")}
              </Text>
              <View style={{ marginBottom: 5 }} />
            </View>
          ))}
        </View>
        <Text
          style={{
            fontSize: 16,
            padding: 5,
          }}
        >
          Work Experience
        </Text>
        <View
          style={{
            borderBottom: 2,
            borderBottomColor: "#000",
            borderBottomStyle: "solid",
            marginBottom: 10,
          }}
        />
        <View>
          {work.map((workData, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 3,
                  }}
                >
                  {workData.company}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 3,
                  }}
                >
                  {workData.duration}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#333333",
                    fontSize: 14,
                    fontStyle: "italic",
                    lineHeight: 1.2,
                    paddingLeft: 5,
                    marginBottom: 5,
                  }}
                >
                  {workData.role}
                </Text>
                <Text
                  style={{
                    color: "#333333",
                    fontSize: 14,
                    fontStyle: "italic",
                    lineHeight: 1.2,
                    paddingLeft: 5,
                    marginBottom: 5,
                  }}
                >
                  {workData.location}
                </Text>
              </View>
              <View>
                <View style={{ marginLeft: 10 }}>
                  {workData.tasks.map((task, i) => (
                    <Text
                      key={i}
                      style={{
                        fontSize: 14,
                        lineHeight: 1.3,
                        paddingLeft: 10,
                      }}
                    >
                      • {task}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
        <Text
          style={{
            fontSize: 16,
            padding: 5,
          }}
        >
          Education
        </Text>
        <View
          style={{
            borderBottom: 2,
            borderBottomColor: "#000",
            borderBottomStyle: "solid",
            marginBottom: 10,
          }}
        />
        <View>
          {education.map((educationData, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 3,
                  }}
                >
                  {educationData.school}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 3,
                  }}
                >
                  {educationData.duration}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#333333",
                    fontSize: 14,
                    fontStyle: "italic",
                    lineHeight: 1.2,
                    paddingLeft: 5,
                    marginBottom: 5,
                  }}
                >
                  {educationData.title}{" "}
                  {educationData?.major ? `in ${educationData?.major}` : ""}(
                  {educationData?.grade})
                </Text>
                <Text
                  style={{
                    color: "#333333",
                    fontSize: 14,
                    fontStyle: "italic",
                    lineHeight: 1.2,
                    paddingLeft: 5,
                    marginBottom: 5,
                  }}
                >
                  {educationData.location}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </>
    );
  }

  const renderTwoColumn = ({ name, role, description, contactDetails, skills, work, education }) => {
    const { mobile, email, address, links } = contactDetails;
    const splitText = name.split(" ");
    return (
      <>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "60%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                lineHeight: 1.5,
                textTransform: "uppercase",
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 1.25,
                color: "#1e90ff",
                marginBottom: 5,
              }}
            >
              {role}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: 12,
                  color: "#000",
                  textDecoration: "none",
                  lineHeight: 1.3,
                  marginRight: 4,
                }}
                key="mobile"
              >
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    marginRight: 5,
                  }}
                  src={MobileIcon}
                />
                <Text>{mobile}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: 12,
                  color: "#000",
                  textDecoration: "none",
                  lineHeight: 1.3,
                  marginRight: 4,
                }}
                key="email"
              >
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    marginRight: 5,
                  }}
                  src={EmailIcon}
                />
                <Text>{email}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 5 }}></View>
            <Link
              style={{
                flexDirection: "row",
                alignItems: "center",
                fontSize: 12,
                color: "#000",
                textDecoration: "none",
                lineHeight: 1.3,
                marginRight: 4,
              }}
              src={links[0].link}
            >
              <Image
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 5,
                }}
                src={links[0].icon}
              />
              <Text>{links[0].link}</Text>
            </Link>
            <View style={{ marginBottom: 5 }}></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                fontSize: 12,
                color: "#000",
                textDecoration: "none",
                lineHeight: 1.3,
                marginRight: 4,
              }}
              key="address"
            >
              <Image
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 5,
                }}
                src={LocationIcon}
              />
              <Text>{address}</Text>
            </View>
          </View>
          <View
            style={{
              width: "23%",
            }}
          >
            <View
              style={{
                backgroundColor: "#1e90ff",
                borderColor: "#1e90ff",
                border: 1,
                borderRadius: "50%",
                padding: 25,
                width: 90,
                height: 90,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {splitText[0][0] + splitText[1][0]}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <View
            style={{
              width: "48%",
              borderRight: 1,
              borderColor: "#ccc",
              borderRightStyle: "solid",
              paddingRight: 20,
            }}
          >
            <Text>Hello</Text>
          </View>
          <View
            style={{
              width: "48%",
              paddingLeft: 20,
            }}
          >
            <Text>World</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <Document language="en">
      <Page
        size="A4"
        orientation="portrait"
        style={{
          paddingTop: 30,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}
      >
        {template === "single-column" ? (
          <>
            {renderSingleColumn({ name, role, description, contactDetails, skills, work, education })}
          </>
        ) : (
          <>
            {renderTwoColumn({ name, role, description, contactDetails, skills, work, education })}
          </>
        )}
      </Page>
    </Document>
  );
};

export default PdfDocument;
