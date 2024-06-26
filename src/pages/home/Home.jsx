import React, {useState, useEffect} from 'react';
import "./home.scss";
import SelectField from "../../component/SelectField/SelectField.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faDownload,
    faEllipsisVertical,
    faList, faPen, faPlay,
    faPlus, faShare,
    faTableCellsLarge, faTrash,
    faVideo, faXmark
} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";
import InputField from "../../component/InputField/InputField.jsx";
import {useFormik} from "formik";
import CustomButton from "../../component/button/Button.jsx";
import InputFileUploadDesign from "../../component/inputFileUpload/inputFileUploadDesign.jsx";
import ThumbnailUpload from "../../component/thumbnailUpload/ThumbnailUpload.jsx";
import ReactPlayer from "react-player";
import sampleVideo from "../../component/inputFileUpload/SampleVideo_1280x720_1mb.mp4"
import * as uuid from "uuid";

const Home = ({showModule, handleCloseModule, handleShowModule, showVideo, handleCloseVideo, handleVideoShow}) => {
    const initialOptionsHomeSelect = [
        {value: '', label: 'All'},
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
        {value: 'eglo', label: 'Eaglo'}
    ];

    const selectModuleOptionVideo = [
        {value: '', label: 'All'},
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
        {value: 'eglo', label: 'Eaglo'}
    ];

    const videoThumbnail = [
        {
            title: "dfad fadfa",
            id: "1",
            video: "https://media.istockphoto.com/id/1489761724/ru/%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C%D0%B5%D1%80-%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%B8%D1%82-%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5-%D0%BE%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%D1%8B-%D0%B6%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B9-%D0%BE%D0%B4%D0%B5%D0%B6%D0%B4%D1%8B-%D0%B2-%D0%B7%D0%B0%D0%BC%D0%B5%D0%B4%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9-%D1%81%D1%8A%D0%B5%D0%BC%D0%BA%D0%B5.mp4?s=mp4-640x640-is&k=20&c=vChxzWCCZKLx7BFiBwPgCkVFYNqMX7Tx2RikbLJPTBU=",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLyWNyrFV8HYhjBnaDS7tY8eYOufhzAyWDCA&s"
        },
        {
            title: "dfadf jjjkjk jjkjkj",
            id: "2",
            video: "https://media.istockphoto.com/id/1408287825/ru/%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/%D0%B4%D0%B5%D0%B2%D0%BE%D1%87%D0%BA%D0%B0-%D0%B4%D0%B5%D0%BB%D0%B0%D0%B5%D1%82-%D1%83%D0%BF%D1%80%D0%B0%D0%B6%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2-%D1%85%D1%83%D0%B4%D0%BE%D0%B6%D0%B5%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE%D0%BC-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%B5.mp4?s=mp4-640x640-is&k=20&c=30TPWTNRRyyzOvLUx4dexZqoq9ycdqtumbe5zT3Jik4=",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-16NaWLP8pXrzOu0nbWx4bBwlqBDsLa3IZg&s"
        },
        {
            title: "dfa dfa dfa",
            id: "3",
            video: "https://media.istockphoto.com/id/1847077101/ru/%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/%D0%BD%D0%B5%D1%83%D0%B7%D0%BD%D0%B0%D0%B2%D0%B0%D0%B5%D0%BC%D0%B0%D1%8F-%D0%BC%D0%B0%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B0%D1%8F-%D0%B4%D0%B5%D0%B2%D0%BE%D1%87%D0%BA%D0%B0-%D1%80%D1%83%D1%87%D0%BD%D0%B0%D1%8F-%D1%80%D0%BE%D1%81%D0%BF%D0%B8%D1%81%D1%8C-%D0%B0%D0%BA%D0%B2%D0%B0%D1%80%D0%B5%D0%BB%D1%8C%D1%8E-%D0%BD%D0%B0-%D0%B1%D1%83%D0%BC%D0%B0%D0%B3%D0%B5.mp4?s=mp4-640x640-is&k=20&c=pbIJaP3RxsrXRGjOubnh2KjZxHh6qj_dnHGevoKcU6I=",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLT-_Yiqmv5OO878NhTvQxoiE90DJz5Ble5Q&s"
        },
        {
            title: "dfad fadfa jj",
            id: "4",
            video: "https://media.istockphoto.com/id/873338508/video/open-pantone-sample-colors-catalogue.mp4?s=mp4-640x640-is&k=20&c=zFXxSrARgKSP8C33nOdU6SEQ-R15-tdbvu5ow1g8Trw=",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWVbn1c-EdtuygEXnROMiyfhlfgQO3Gdn3GQ&s"
        },
        // {
        //     title: "dfadf adfa lll",
        //     id: "5",
        //     video: "https://media.istockphoto.com/id/1351381072/video/unrecognizable-microbiology-scientist-sampling-with-a-sample-bottle-the-water-from-city-river.mp4?s=mp4-640x640-is&k=20&c=Ra9D4VW_iuGNJj2vLo7VC2xcgLVbdcDh-PYtolB6Wuw=",
        //     thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWM5Iyp-dDFB2pkAu-VscjVyWwc7i5HA8S6w&s"
        // },
        // {
        //     title: "dfa dfa dfa",
        //     id: "6",
        //     video: "https://media.istockphoto.com/id/1461319219/video/hand-choosing-a-carpet.mp4?s=mp4-640x640-is&k=20&c=Du6MFpyn-CDxHc1nqm4uZ5HEDurkN4Qv80jT0AFALsU=",
        //     thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3wN61qXmrdIZmG8gt1FWP_hyBB_wrS1XY8w&s"
        // },
    ]

    const [showShare, setShowShare] = useState(false);
    const [optionsHomeSelect, setOptionsHomeSelect] = useState([]);
    const [shareHide, setShareHide] = useState(false);
    const [patientAdd, setPatientAdd] = useState([{id: uuid.v4(),}]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    const [editDelDown, setEditDelDown] = useState(false);

    const openModal = (videoUrl) => {
        setCurrentVideoUrl(videoUrl);
        setModalIsOpen(true);
    };

    const closeModal = (videoUrl) => {
        setCurrentVideoUrl("");
        setModalIsOpen(false);
    };

    const editDelDownload = () => {
        setEditDelDown(!editDelDown);
    }

    const addPatientForm = () => {
        setPatientAdd([...patientAdd, {id: uuid.v4(),}]);
    };

    const removePatientForm = (index) => {
        setPatientAdd(patientAdd.filter((_, i) => i !== index));
    };

    // module code----------------
    useEffect(() => {
        const savedOptions = localStorage.getItem('optionsHomeSelect');
        if (savedOptions) {
            setOptionsHomeSelect(JSON.parse(savedOptions));
        } else {
            setOptionsHomeSelect(initialOptionsHomeSelect);
        }
    }, []);

    useEffect(() => {
        if (optionsHomeSelect.length > 0) {
            localStorage.setItem('optionsHomeSelect', JSON.stringify(optionsHomeSelect));
        }
    }, [optionsHomeSelect]);

    const moduleFormValidate = (values) => {
        const errors = {};
        if (!values.moduleName) {
            errors.moduleName = "Module name is required";
        }
        return errors;
    };

    const submitModuleForm = (values, {resetForm}) => {
        const payload = {
            value: values.moduleName.toLowerCase(),
            label: values.moduleName
        };
        setOptionsHomeSelect([...optionsHomeSelect, payload]);
        resetForm();
    };

    const moduleForm = useFormik({
        initialValues: {
            moduleName: "",
        },
        validateOnChange: true,
        validateOnBlur: true,
        validate: moduleFormValidate,
        onSubmit: submitModuleForm,
    });

    // module code end----------------

    // video code -----------------------

    const closeShareModal = () => setShowShare(false);
    const showShareModal = () => setShowShare(true);

    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedState, setCheckedState] = useState(Array(4).fill(false));

    const handleCheckboxChange = (index) => {
        const newCheckedState = [...checkedState];
        newCheckedState[index] = !newCheckedState[index];
        setCheckedState(newCheckedState);

        const newCount = newCheckedState.filter(Boolean).length;
        setCheckedCount(newCount);
        setShareHide(newCount > 0)
    };
    // const handleCheckboxChange = (index) => {
    //     const updatedCheckedState = checkedState.map((item, idx) =>
    //         idx === index ? !item : item
    //     );
    //     setCheckedState(updatedCheckedState);
    // };

    const shareOnHide = () => {
        setCheckedState(Array(4).fill(false));
        setCheckedCount(0);
        setShareHide(false);
    };

    return (
        <div className="home-container">
            {shareHide ?

                <div className="share-container">
                    <div className="checked-count">
                        <FontAwesomeIcon
                            className="me-2"
                            icon={faXmark}
                            onClick={shareOnHide}
                        />
                        {checkedCount} selected
                    </div>
                    <button className="share" onClick={showShareModal}>
                        <FontAwesomeIcon className="me-2" icon={faShare}/> Share
                    </button>
                </div>
                : null
            }
            <div className="home-top">
                <div className="d-flex justify-content-between gap-3 home-header-left">
                    <div className="home-select-field">
                        <SelectField
                            options={optionsHomeSelect}
                            placeholder="All"
                        />
                    </div>
                    <Button className="bootstrap-btn module-btn" onClick={handleShowModule}>
                        <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                    </Button>
                    <Button className="bootstrap-btn upload-video-btn" onClick={handleVideoShow}>
                        <FontAwesomeIcon icon={faVideo}/><span className="ms-2">Upload Video</span>
                    </Button>
                </div>
                <div className="d-flex justify-content-between gap-3">
                    <Button className="bootstrap-btn box-filter">
                        <FontAwesomeIcon icon={faTableCellsLarge}/>
                    </Button>
                    <Button className="bootstrap-btn box-filter">
                        <FontAwesomeIcon icon={faList}/>
                    </Button>
                </div>
            </div>

            <div className="home-data">
                <div className="video-card">
                    <h5>Harmony Health Intro's</h5>
                    <div className="video-all-card">
                        {/*{[...Array(4)].map((_, index) => (*/}
                        {videoThumbnail.map((thumbnail, index) =>
                            <div className="single-video-card" key={thumbnail.id}>
                                <div className="card-check-option">
                                    <input
                                        type="checkbox"
                                        checked={checkedState[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <div className="option-icon">
                                        <span onClick={editDelDownload}><FontAwesomeIcon className="three-dot-option"
                                                                                         icon={faEllipsisVertical}/></span>
                                        {editDelDown && (
                                            <div className="share-all-option">
                                                <div><FontAwesomeIcon className="arrow-background" icon={faPlay}/></div>
                                                <div className="share-all-icon-option">
                                                <span className="edit-del-down"><FontAwesomeIcon className="me-2"
                                                                                                 icon={faPen}/>Edit</span>
                                                    <span className="edit-del-down"><FontAwesomeIcon className="me-2"
                                                                                                     icon={faTrash}/>Delete</span>
                                                    <span className="edit-del-down"><FontAwesomeIcon className="me-2"
                                                                                                     icon={faDownload}/>Download</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="video-thumbnail" onClick={() => openModal(thumbnail)}>
                                        <img src={thumbnail.thumbnail}/>
                                        <FontAwesomeIcon className="play-icon" icon={faPlay}/>
                                    </div>
                                    <h6 className="mt-3 mb-0 text-capitalize">{thumbnail.title}</h6>
                                </div>
                            </div>
                        )}
                        <Modal className="video-player-modal" show={modalIsOpen} onHide={closeModal}>
                            <Modal.Body>
                                <div className="video-player-container">
                                    <div className="close-option-icon">
                                        <span onClick={editDelDownload}>
                                            <FontAwesomeIcon
                                                className="three-dot-option"
                                                icon={faEllipsisVertical}
                                            />
                                        </span>
                                        <span className="ms-3" onClick={closeModal}>
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </span>

                                    </div>
                                    <div className="video-player-title">
                                        <ReactPlayer
                                            url={currentVideoUrl.video}
                                            controls={true}
                                            playing={modalIsOpen}
                                            width="100%"
                                            height="100%"
                                        />
                                        <h6 className="mt-2 ps-2 pe-2">{currentVideoUrl.title}</h6>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                        {/*))}*/}
                    </div>
                </div>
                {/*<div className="no-data-box">*/}
                {/*    <FontAwesomeIcon className="empty-box" icon={faBoxOpen} />*/}
                {/*    <span>No Video</span>*/}
                {/*</div>*/}
            </div>

            {/*---------------module modal---------*/}
            <Modal className="module-modal-container" show={showModule} onHide={handleCloseModule}>
                <Modal.Header closeButton>
                    <Modal.Title>Module</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={moduleForm.handleSubmit}>
                        <label className="module-label">Module Name</label>
                        <InputField
                            id="moduleName"
                            placeholder='Module Name'
                            textType="text"
                            inputName="moduleName"
                            asterisk={true}
                            whiteSpace={false}
                            onBlur={moduleForm.handleBlur}
                            value={moduleForm.values.moduleName}
                            onchangeCallback={moduleForm.handleChange}
                            inputClassName={moduleForm.touched.moduleName && moduleForm.errors.moduleName ? " is-invalid" : ""}
                            requiredMessage={moduleForm.touched.moduleName && moduleForm.errors.moduleName}
                            requiredMessageLabel={moduleForm.touched.moduleName || moduleForm.isSubmitting ? moduleForm.errors.moduleName : ""}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        type="button"
                        btnText="Cancel"
                        className="cancelBtn"
                        onClickCallback={handleCloseModule}
                    />
                    <CustomButton
                        type="submit"
                        btnText="Save"
                        btnClassName="saveBtn"
                        onClickCallback={moduleForm.handleSubmit}
                    />
                </Modal.Footer>
            </Modal>

            {/*    -----upload video modal----*/}

            <Modal className="video-modal-container" show={showVideo} onHide={handleCloseVideo}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="video-modal">
                        <div className="select-add-module">
                            <div className="video-modal-select-field">
                                <SelectField
                                    label="Select module"
                                    labelClass="module-label-class"
                                    options={selectModuleOptionVideo}
                                    placeholder="All"
                                />
                            </div>
                            <Button className="bootstrap-btn" onClick={handleShowModule}>
                                <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                            </Button>
                        </div>
                        {/*<form onSubmit={moduleForm.handleSubmit}>*/}
                        {/*    <label className="module-label">Module Name</label>*/}
                        <InputField
                            labelName="Title"
                            labelClass="title-label-class"
                            inputClassName="video-modal-input-title"
                            id="title"
                            placeholder='Title'
                            textType="text"
                            inputName="title"
                            asterisk={true}
                            whiteSpace={false}
                            // onBlur={moduleForm.handleBlur}
                            // value={moduleForm.values.moduleName}
                            // onchangeCallback={moduleForm.handleChange}
                            // inputClassName={moduleForm.touched.moduleName && moduleForm.errors.moduleName ? " is-invalid" : ""}
                            // requiredMessage={moduleForm.touched.moduleName && moduleForm.errors.moduleName}
                            // requiredMessageLabel={moduleForm.touched.moduleName || moduleForm.isSubmitting ? moduleForm.errors.moduleName : ""}
                        />
                        {/*</form>*/}
                        <div className="file-upload-component">
                            <div>
                                <h5 className="title-name">Dr. Rohrer</h5>
                                <InputFileUploadDesign/>
                            </div>
                            <div>
                                <h5 className="thumbnail-name">Thumbnail</h5>
                                <ThumbnailUpload/>
                            </div>
                        </div>
                        <label className="textarea-label">Description</label>
                        <textarea placeholder="Description"></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        type="button"
                        btnText="Cancel"
                        className="cancelBtn"
                        onClickCallback={handleCloseVideo}
                    />
                    <CustomButton
                        type="submit"
                        btnText="Save"
                        btnClassName="saveBtn"
                        onClickCallback={moduleForm.handleSubmit}
                    />
                </Modal.Footer>
            </Modal>

            <Modal className="share-modal-container" show={showShare} onHide={closeShareModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Share video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={moduleForm.handleSubmit}>
                        {patientAdd.map((patient, index) => (
                            <>
                                {index > 0 && (<hr/>)}
                                <div className="patient-share" key={patient.id} index={index}>
                                    <div>
                                        <label className="module-label">Patient Name</label>
                                        <InputField
                                            id="patientName"
                                            placeholder='Patient Name'
                                            textType="text"
                                            inputName="patientName"
                                            asterisk={true}
                                            whiteSpace={false}
                                            // onBlur={moduleForm.handleBlur}
                                            // value={moduleForm.values.moduleName}
                                            // onchangeCallback={moduleForm.handleChange}
                                            // inputClassName={moduleForm.touched.moduleName && moduleForm.errors.moduleName ? " is-invalid" : ""}
                                            // requiredMessage={moduleForm.touched.moduleName && moduleForm.errors.moduleName}
                                            // requiredMessageLabel={moduleForm.touched.moduleName || moduleForm.isSubmitting ? moduleForm.errors.moduleName : ""}
                                        />
                                    </div>
                                    <div>
                                        <label className="module-label">Mobile Number</label>
                                        <InputField
                                            id="mobileNumber"
                                            placeholder='Mobile Number'
                                            textType="text"
                                            inputName="mobileNumber"
                                            asterisk={true}
                                            whiteSpace={false}
                                            // onBlur={moduleForm.handleBlur}
                                            // value={moduleForm.values.moduleName}
                                            // onchangeCallback={moduleForm.handleChange}
                                            // inputClassName={moduleForm.touched.moduleName && moduleForm.errors.moduleName ? " is-invalid" : ""}
                                            // requiredMessage={moduleForm.touched.moduleName && moduleForm.errors.moduleName}
                                            // requiredMessageLabel={moduleForm.touched.moduleName || moduleForm.isSubmitting ? moduleForm.errors.moduleName : ""}
                                        />
                                    </div>
                                    <div>
                                        <label className="module-label">Email</label>
                                        <InputField
                                            id="email"
                                            placeholder='Email'
                                            textType="text"
                                            inputName="email"
                                            asterisk={true}
                                            whiteSpace={false}
                                            // onBlur={moduleForm.handleBlur}
                                            // value={moduleForm.values.moduleName}
                                            // onchangeCallback={moduleForm.handleChange}
                                            // inputClassName={moduleForm.touched.moduleName && moduleForm.errors.moduleName ? " is-invalid" : ""}
                                            // requiredMessage={moduleForm.touched.moduleName && moduleForm.errors.moduleName}
                                            // requiredMessageLabel={moduleForm.touched.moduleName || moduleForm.isSubmitting ? moduleForm.errors.moduleName : ""}
                                        />
                                    </div>

                                </div>
                                {index > 0 && (

                                    <div className="me-3 mb-3 " style={{color: "red", cursor: "pointer"}}
                                         onClick={() => removePatientForm(index)}>Remove Patient
                                    </div>

                                )}
                            </>
                        ))}
                        <span style={{color: "#40C1AE", cursor: "pointer"}} onClick={addPatientForm}> <FontAwesomeIcon
                            icon={faPlus} className="me-2"/> Add Patient</span>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        type="button"
                        btnText="Cancel"
                        className="cancelBtn"
                        onClickCallback={closeShareModal}
                    />
                    <CustomButton
                        type="submit"
                        btnText="Save"
                        btnClassName="saveBtn"
                        onClickCallback={closeShareModal}
                    />
                </Modal.Footer>
            </Modal>

            {/*<Modal show={modalIsOpen} onHide={closeModal}>*/}
            {/*    /!*<Modal.Header closeButton>*!/*/}
            {/*    /!*    <Modal.Title>Share video</Modal.Title>*!/*/}
            {/*    /!*</Modal.Header>*!/*/}
            {/*    <Modal.Body>*/}
            {/*        <button onClick={closeModal}>Close</button>*/}
            {/*            <>*/}
            {/*        <ReactPlayer*/}
            {/*            url="https://media.istockphoto.com/id/1461319219/video/hand-choosing-a-carpet.mp4?s=mp4-640x640-is&k=20&c=Du6MFpyn-CDxHc1nqm4uZ5HEDurkN4Qv80jT0AFALsU="*/}
            {/*            controls={true}*/}
            {/*            playing={modalIsOpen}*/}
            {/*            width="100%"*/}
            {/*            height="100%"*/}
            {/*        />*/}
            {/*        </>*/}
            {/*    </Modal.Body>*/}
            {/*    /!*<Modal.Footer>*!/*/}
            {/*    /!*</Modal.Footer>*!/*/}
            {/*</Modal>*/}
        </div>
    );
};

export default Home;
