// InputFileUploadDesign.jsx
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import "./inputFileUploadDesign.scss";

const InputFileUploadDesign = ({name, onChange, error}) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            onChange(file); // ✅ pass to Formik
            setPreview(URL.createObjectURL(file));
        } else {
            onChange(null); // clear in Formik
        }
    };

    return (
        <>
            <div className="file-Upload-Design">
                <div className="file-upload">
                    {!preview ? (
                        <>
                            <FontAwesomeIcon className="video-upload-icon" icon={faUpload}/>
                            <h3>Drag and drop video to upload</h3>
                        </>
                    ) : null}

                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                    {preview && (
                        <ReactPlayer
                            url={preview}
                            controls
                            width="100%"
                            height="100%"
                            style={{borderRadius: '5px', overflow: 'hidden'}}
                        />
                    )}
                </div>
            </div>
            {error && <p className="invalid-feedback d-block">{error}</p>}
        </>
    );
};

export default InputFileUploadDesign;


// import React, {useState} from 'react';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faUpload} from "@fortawesome/free-solid-svg-icons";
// import "./inputFileUploadDesign.scss"
// import ReactPlayer from "react-player";
//
// const InputFileUploadDesign = () => {
//
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [error, setError] = useState('');
//
//     const handleFileChange = (event) => {
//         console.log(event)
//         const file = event.target.files[0];
//         console.log(file.name)
//
//         if (file && file.type.startsWith('video/')) {
//             setSelectedFile(file);
//             setPreview(URL.createObjectURL(file));
//             setError('');
//         } else {
//             setError('Please select a valid video file');
//         }
//     };
//
//     return (
//         <div className="file-Upload-Design">
//             {/*<div className="parent">*/}
//             <div className="file-upload">
//                 {/*<img src={uploadImg} alt="upload"/>*/}
//                 {!preview ? <FontAwesomeIcon className="video-upload-icon" icon={faUpload}/> : null}
//                 {!preview ? <h3>Drag and drop video to upload</h3> : null}
//                 {/*{!preview ? <p>Maximun file size 10mb</p> : null}*/}
//                 <input
//                     type="file"
//                     accept="video/*"
//                     onChange={handleFileChange}
//                 />
//                 {error && <p className="error">{error}</p>}
//                 {preview &&
//                     // <video controls width="100%" className="videoPlayer" src={preview}></video>
//                     <ReactPlayer
//                         url={preview}
//                         controls={true}
//                         width="100%"
//                         height="100%"
//                         style={{borderRadius: '5px', overflow: 'hidden'}}
//                     />
//                 }
//                 {/*{preview && <img src={preview} alt="Thumbnail preview" className="thumbnail-preview" />}*/}
//             </div>
//             {/*</div>*/}
//         </div>
//     );
// };
//
// export default InputFileUploadDesign;


// import React, { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUpload } from "@fortawesome/free-solid-svg-icons";
// import "./inputFileUploadDesign.scss";
//
// const InputFileUploadDesign = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [error, setError] = useState('');
//
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//
//     if (file && file.type.startsWith('video/')) {
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file));
//       setError('');
//     } else {
//       setError('Please select a valid video file');
//     }
//   };
//
//   return (
//     <div className="file-Upload-Design">
//       <div className="parent">
//         <div className="file-upload">
//           {!preview ? <FontAwesomeIcon icon={faUpload} /> : null}
//           {!preview ? <h3>Click box to upload</h3> : null}
//           {!preview ? <p>Maximum file size 10MB</p> : null}
//           <input
//             type="file"
//             accept="video/*"
//             onChange={handleFileChange}
//           />
//           {error && <p className="error">{error}</p>}
//           {preview && (
//             <video controls width="100%" className="videoPlayer" src={preview}></video>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default InputFileUploadDesign;
