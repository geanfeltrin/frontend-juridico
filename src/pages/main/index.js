import React, { Component } from "react";
import FileList from "../../components/FileList";

import { uniqueId } from "lodash";
import ImgDropAndCrop from "../../components/ImgDropCrop";
import filesize from "filesize";

import responseUpload from "../../linkers/responseUpload";
import { Container } from "./styles";
import PdfList from "../../components/PdfList";

export default class main extends Component {
  state = {
    uploadedFiles: []
  };
  processUpload = uploadedFiles => {
    const data = new FormData();

    data.append("file", uploadedFiles.file, uploadedFiles.name);

    responseUpload(this.state.uploadedFiles);

    // api
    //   .post("files", data, {
    //     onUploadProgress: e => {
    //       const progress = parseInt(Math.round((e.loaded * 100) / e.total));

    //       this.updateFile(uploadedFiles.id, {
    //         progress
    //       });
    //     }
    //   })
    //   .then(response => {
    //     this.updateFile(uploadedFiles.id, {
    //       uploaded: true,
    //       id: response.data.id,
    //       url: response.data.url
    //     });
    //   })
    //   .catch(response => {
    //     this.updateFile(uploadedFiles.id, {
    //       error: true
    //     });
    //   });
  };
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
  render() {
    const { uploadedFiles } = this.state;
    return (
      <Container>
        <div>
          {!!uploadedFiles.length < 1 && (
            <ImgDropAndCrop onUpload={this.handleUpload} />
          )}

          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDeleteFile} />
          )}
        </div>
        {/* <PdfList /> */}
      </Container>
    );
  }
}
