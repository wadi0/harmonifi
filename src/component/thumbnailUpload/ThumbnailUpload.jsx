import React, {useState} from 'react';
import './thumbnailUpload.scss';
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ThumbnailUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        console.log(event)
        const file = event.target.files[0];
        console.log(file.name)

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setError('');
        } else {
            setError('Please select a valid image file');
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Handle the file upload logic here
            console.log('Uploading file:', selectedFile);
            // Clear the selected file and preview
            setSelectedFile(null);
            setPreview(null);
        } else {
            setError('No file selected');
        }
    };

    return (
        <div className="thumbnail-upload">
            <div className="thumbnail-upload-container">
                <div className="thumbnail-upload">
                    {!preview ?
                <FontAwesomeIcon icon={faUpload} /> : null
                    }
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {error && <p className="error">{error}</p>}
                {preview && <img src={preview} alt="Thumbnail preview" className="thumbnail-preview" />}
                {/*<button onClick={handleUpload}>Upload</button>*/}
                </div>
            </div>
        </div>
    );
};

export default ThumbnailUpload;
