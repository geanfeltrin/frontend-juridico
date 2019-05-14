import React, { Component } from "react";
import FileList from "../../components/FileList";

import { uniqueId } from "lodash";
import ImgDropAndCrop from "../../components/ImgDropCrop";
import filesize from "filesize";
import PdfList from "../../components/PdfList";

import { Container } from "./styles";

import api from "../../services/api";

export default class main extends Component {
  state = {
    uploadedFiles: [],
    loading: false,
    data: []
  };

  componentDidMount() {
    const response = api
      .get("files/76")
      .then(response => this.setState({ data: response.data, loading: true }));
  }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });
    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };
  processUpload = uploadedFiles => {
    const data = new FormData();

    data.append("file", uploadedFiles.file, uploadedFiles.name);

    api
      .post("files", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFiles.id, {
            progress
          });
        }
      })
      .then(response => {
        this.updateFile(uploadedFiles.id, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url
        });
        this.setState({ data: [response.data.data], loading: true });
      })
      .catch(response => {
        this.updateFile(uploadedFiles.id, {
          error: true
        });
      });
  };
  render() {
    const { uploadedFiles, loading, data } = this.state;

    return (
      <Container>
        <div className="upload">
          {!!uploadedFiles.length < 1 && (
            <ImgDropAndCrop onUpload={this.handleUpload} />
          )}

          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDeleteFile} />
          )}
        </div>
        <div>
          {loading && (
            <div>
              <PdfList pdfValue={data} />
            </div>
          )}
        </div>
      </Container>
    );
  }
}
