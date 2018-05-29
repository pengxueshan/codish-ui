import React, {Component} from 'react';
import uuid from 'uuid';

export default class IframeUpload extends Component {
    constructor(props) {
        super(props);
        this._iframeName = `iframe${uuid.v4()}`;
        this.state = {
            isReady: false
        };
    }

    handleIframeLoaded = () => {
        this.setState({
            isReady: true
        });
    }

    storeFileRef = node => {
        this.input = node;
    }

    storeFormRef = node => {
        this.form = node;
    }

    handleFileChange = e => {
        if (e.target instanceof HTMLInputElement) {
            const file = e.target.files[0];
            this._file = file;
            if (typeof this.props.onFillFiles === 'function') {
                this.props.onFillFiles(this._file);
            }
            let {isAutoUpload} = this.props;
            if (isAutoUpload && this._file) {
                this.uploadFiles();
            }
        }
    }

    uploadFiles() {
        if (!this._file || !this.form || !this.state.isReady) return;
        this.form.submit();
    }

    handleClick = () => {
        if (this.input || this.state.isReady) {
            this.input.click();
        }
    }

    clear() {
        this._files = null;
    }

    render() {
        let {action, multiple, accept} = this.props;
        return (
            <div className="codish-ui-upload__uploader iframe-upload" onClick={this.handleClick}>
                <iframe frameborder="0" name={this._iframeName}
                    onLoad={this.handleIframeLoaded}></iframe>
                <form action={action}
                    target={this._iframeName}
                    method="post"
                    ref={this.storeFormRef}>
                    <input className="codish-ui-upload__fileinput" type="file"
                        onChange={this.handleFileChange}
                        ref={this.storeFileRef}
                        multiple={multiple}
                        accept={accept} />
                </form>
            </div>
        );
    }
}
