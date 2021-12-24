import React, { useState, useLayoutEffect, useEffect } from 'react';
import _ from "lodash";
import {
  Header,
  Container,
  Table,
  Segment,
  Divider,
  Icon,
  Button,
  Message,
  Card,
} from "semantic-ui-react";

import { isMobileOnly } from "react-device-detect";

function ReportsTable(props) {
    const { dark, language } = props;

    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [sorted, setSorted] = useState(null);

  useEffect(() => {
  
    setLoading(true);

    let documentArray = [];

    const storageRef = props.firebase.storageRef().child("reports");
    
    const getStorageItems = async (storageRef) => {
      const list = await storageRef.listAll();
      let promises = [];
      list.items.forEach((itemRef) => {
        promises.push(
          itemRef
            .getMetadata()
            .then((metaData) => {
              documentArray.push(metaData);
            })
            .catch((error) => {
              console.log(error);
              setError(error );
            })
        );
      });
      Promise.all(promises).then(() => {
       setDocuments(documentArray);
       setLoading(false);        
    //    if (sorted === null) {
        setSorted(documentArray);
    //   }
      });
    };
    getStorageItems(storageRef);
}, []);
useEffect(() => {
    console.log(sorted)
}, [sorted]);

  useLayoutEffect(() => {
    return () => {
        setLoading(false);
    }
}, [])

  const onSort = (e, data) => {
    let name = e.currentTarget.dataset.name;

    if (column === name) {
        setDirection(direction === "ascending" ? "descending" : "ascending");
        setSorted(sorted.reverse());

    } else {
        setColumn(name);
        setDirection("ascending");
        setSorted(_.sortBy(documents, [name]));
    }
  };

  const downloadFile = (e, { fileref, filename }) => {
    const storageRef = props.firebase.fileRef(fileref);
    storageRef
      .getDownloadURL()
      .then(function (url) {
        const link = document.createElement("a");
        if (typeof link.download !== "undefined") {
          link.href = url;
          link.target = "_blank";
          link.download = filename;
          link.dispatchEvent(new MouseEvent("click"));
        } else {
          window.location.href = url;
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
      });
  };

const DocumentHeader = (props) => {
    const { dark } = props;
    return (
      <Header as="h2" icon textAlign="center" inverted={dark}>
        <Icon name="file alternate outline" size="massive" inverted={dark} />
        Your Reports
      </Header>
    );
  };
  
  const DocumentTable = (props) => {
    const { sorted, dark, column, onSort, direction, downloadFile } = props;
    return (
      <Table sortable celled unstackable inverted={dark}>
        <Table.Header>
          <Table.Row>
            {!isMobileOnly && (
              <Table.HeaderCell
                sorted={column === "contentType" ? direction : null}
                onClick={onSort}
                data-name={"contentType"}
              >
                <Icon name="file outline" />
                Type
              </Table.HeaderCell>
            )}
            <Table.HeaderCell
              sorted={column === "name" ? direction : null}
              onClick={onSort}
              data-name={"name"}
            >
              <Icon name="tag" />
              File Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "timeCreated" ? direction : null}
              onClick={onSort}
              data-name={"timeCreated"}
              textAlign="center"
            >
              <Icon name="calendar alternate outline" />
              Date
            </Table.HeaderCell>
            <Table.HeaderCell data-name={"download"} textAlign="center">
              <Icon name="download" />
              Download
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sorted.map((document) => {
            return (
              <Table.Row key={document.name}>
                {!isMobileOnly && (
                  <Table.Cell>
                    <Icon
                      name={
                        document.name.split(".").pop() === "pdf"
                          ? "file pdf outline"
                          : "file outline"
                      }
                    />
                    {document.name.split(".").pop()}
                  </Table.Cell>
                )}
                <Table.Cell>
                  {document.name.split(".").slice(0, -1).join(" ")}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {new Date(document.timeCreated).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    positive
                    fileref={document.fullPath}
                    filename={document.name}
                    onClick={downloadFile}
                  >
                    Download
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };
  
  const DocumentCards = (props) => {
    const { sorted, dark, downloadFile } = props;
    return (
      <Card.Group centered>
        {sorted.map((document) => {
          return (
            <Card key={document.name} raised inverted={dark ? "true" : "false"}>
              <div style={{ textAlign: "center" }}>
                <Icon
                  color="black"
                  name={
                    document.name.split(".").pop() === "pdf"
                      ? "file pdf outline"
                      : "file outline"
                  }
                  size="massive"
                  style={{ marginBottom: "0.3em", marginTop: "0.3em" }}
                />
              </div>
  
              <Card.Content>
                <Card.Header>
                  {document.name.split(".").slice(0, -1).join(" ")}
                </Card.Header>
                <Card.Meta>
                  Date Added:{" "}
                  {new Date(document.timeCreated).toLocaleDateString()}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button
                  positive
                  fluid
                  fileref={document.fullPath}
                  filename={document.name}
                  onClick={downloadFile}
                >
                  Download
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  };

    return (
      <Container fluid>
        <Segment fluid="true" basic inverted={dark} style={{ margin: 0 }}>
          <Divider hidden />
          {documents && <DocumentHeader dark={dark} />}
          {error && <Message error content={error.message} />}
          <Divider inverted={dark} />
        </Segment>
        <Segment
          fluid="true"
          basic
          loading={loading}
          inverted={dark}
          style={{ minHeight: "50vh", margin: 0 }}
        >
          {!isMobileOnly && sorted && (
            <DocumentTable
              dark={dark}
              sorted={sorted}
              column={column}
              direction={direction}
              onSort={onSort}
              downloadFile={downloadFile}
            />
          )}
          {isMobileOnly && sorted && (
            <DocumentCards
              dark={dark}
              sorted={sorted}
              downloadFile={downloadFile}
            />
          )}
        </Segment>
        <Divider hidden />
      </Container>
    );

}

export default ReportsTable;
