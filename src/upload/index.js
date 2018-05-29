import React, {Component} from 'react';
import AjaxUpload from './ajax-upload';
import IframeUpload from './iframe-upload';
import classNames from 'classnames';

import './upload.css';

export default class Upload extends Component {
    state = {
        isSupportNewAPI: this.isSupportH5()
    };

    isSupportH5() {
        return !!window.FormData;
    }

    storeRef = node => {
        this.uploadRef = node;
    }

    renderUploader() {
        if (this.state.isSupportNewAPI) {
            return <AjaxUpload {...this.props} ref={this.storeRef} />;
        } else {
            return <IframeUpload {...this.props} ref={this.storeRef} />;
        }
    }

    upload() {
        if (this.uploadRef) {
            this.uploadRef.uploadFiles();
        }
    }

    render() {
        let cls = classNames('codish-ui-upload', this.props.className);
        return (
            <div className={cls}>
                {this.renderUploader()}
            </div>
        );
    }
}
