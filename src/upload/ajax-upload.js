import React, {Component} from 'react';
import ajax from './ajax';
import uuid from 'uuid';

export default class AjaxUpload extends Component {
    handleFileChange = e => {
        let files = e.target.files;
        if (!files || !files.length) {
            this._files = null;
            return;
        }
        let needPostFiles = Array.prototype.slice.call(files);
        this._files = needPostFiles.map(file => {
            file.uid = uuid.v4();
            return file;
        });
        if (typeof this.props.onFillFiles === 'function') {
            this.props.onFillFiles(this._files);
        }
        let {isAutoUpload} = this.props;
        if (isAutoUpload) {
            this.uploadFiles();
        }
    }

    uploadFiles() {
        if (!this._files) return;
        let files = this._files;
        let {multiple} = this.props;
        if (!multiple) {
            files = files.slice(0, 1);
        }
        files.forEach(file => {
            this.upload(file);
        });
    }

    upload(file) {
        const {
            name: filename,
            headers,
            withCredentials,
            data,
            action,
            onProgress,
            onSuccess,
            onError
        } = this.props;
        ajax({
            headers,
            withCredentials,
            file,
            data,
            filename,
            action,
            onProgress: e => onProgress(e, file),
            onSuccess: res => onSuccess(res, file),
            onError: err => onError(err, file)
        });
    }

    handleClick = () => {
        if (this.input) {
            this.input.click();
        }
    }

    storeFileRef = node => {
        this.input = node;
    }

    clear() {
        this._files = null;
    }

    render() {
        let {multiple, accept} = this.props;
        return (
            <div className="codish-ui-upload__uploader ajax-upload" onClick={this.handleClick}>
                <input className="codish-ui-upload__fileinput" type="file"
                    onChange={this.handleFileChange}
                    ref={this.storeFileRef}
                    multiple={multiple}
                    accept={accept} />
                {this.props.children}
            </div>
        );
    }
}
