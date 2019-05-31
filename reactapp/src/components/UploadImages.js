import React, {Component, createRef} from 'react';
import Dropzone from 'react-dropzone';
import "../styles/image_uploader.css";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
/* Setup for dropzone component. createRef is for creating access/reference to the HTML page's DOM */
const dropzoneRef = createRef();
/* Define a function openDialog, that can open the file picker when you click the button to select files from a folder to upload*/

const openDialog = () => {
    /* Note that the ref is set async so it might be null at some point */
    if (dropzoneRef.current) {
        dropzoneRef.current.open()
    }
};
/** Renders a Component that allows you to upload images.
 * TODO: After upload, show the files being upload before taking people to the next page
 * **/
export default class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    /** Method called when a new file is dropped or selected using the upload section
     files is an array of File objects  = https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file */
    onDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    };

    deleteFromUploadQueue = (file_idx) => {
        let current_files = this.state.files;
        current_files.splice(file_idx,1);
        this.setState({files:current_files})
    };
    render() {
        let uploading_files_html = [];
        let file_count = 0;
        for(let file of this.state.files)
        {
            uploading_files_html.push(<div className="row padded-row" key={file_count}>
                     <div className="col-md-2"/>
                     <div className="col-md-4">{file.name}</div>
                     <div className="col-md-4">{file.path}</div>
                     <div className="col-md-2" className={"window-close-button"}><button onClick={this.deleteFromUploadQueue.bind(this,file_count)}>
                    <span> <FontAwesomeIcon icon={faWindowClose} /> Delete </span>
                </button></div>
            </div>);
            ++file_count;
        }
        return (
            <div className="upload-container">
                <h3 className="custom-header">Contribute to this project by uploading and tagging pictures</h3>
                <Dropzone className="dropzone-container" ref={dropzoneRef} accept="image/png, image/jpg"
                          onDrop={this.onDrop} noClick noKeyboard>
                    {({getRootProps, getInputProps, acceptedFiles}) => {
                        return (
                            <div className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <h3>Drag and Drop files here to upload</h3>
                                    <p className="smallP">You can upload multiple files at once(Only *.jpeg and
                                        *.png images will be
                                        accepted)</p>

                                    <span className="href-link"
                                          onClick={openDialog}><span>Click to select files</span></span>
                                </div>
                            </div>);
                    }}
                </Dropzone>
                {/*This shows the list of files going to be uploaded*/}
                {this.state.files.length > 0?<h3 className="custom-header">Files ready for upload. Hit continue to proceed.</h3>:""}
                {this.state.files.length > 0?<div className="row">
                     <div className="col-md-2"></div>
                     <div className="col-md-4"><b><i>Filename</i></b></div>
                     <div className="col-md-4"><b><i>Filepath</i></b></div>
                     <div className="col-md-2"></div>
                </div>:""}
                {uploading_files_html}
                {/*<button type="submit" className="upload-button" onClick={this.handleSubmit}>Upload Image</button>*/}
                <Link className="fancy-button bg-gradient1"
                      to={{pathname: '/uploadwithtags', state: {files: this.state.files}}}>
                    <span>Upload & Continue</span>
                </Link>
            </div>
        );
    }
}