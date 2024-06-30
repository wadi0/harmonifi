import React, {useState, useEffect} from 'react';
import "./home.scss";
import SelectField from "../../component/SelectField/SelectField.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faList,
    faPlus, faShare,
    faTableCellsLarge,
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

const Home = () => {
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

    const [showModule, setShowModule] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [optionsHomeSelect, setOptionsHomeSelect] = useState([]);
    const [shareHide, setShareHide] = useState(false);
    const [patientAdd, setPatientAdd] = useState([{id: uuid.v4(),}]);

    const addPatientForm = () => {
        setPatientAdd([...patientAdd, {id: uuid.v4(),}]);
    };

    // const removePatientForm = (index) => {
    //     const newPatientForms = patientAdd.filter((_, i) => i !== index);
    //     setPatientAdd(newPatientForms);
    // };

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

    const handleCloseModule = () => setShowModule(false);
    const handleShowModule = () => setShowModule(true);

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
        setShowModule(false);
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

    const handleCloseVideo = () => setShowVideo(false);
    const handleVideoShow = () => setShowVideo(true);

    const closeShareModal = () => setShowShare(false);
    const showShareModal = () => setShowShare(true);

    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedState, setCheckedState] = useState(Array(4).fill(false)); // Assuming 4 checkboxes

    const handleCheckboxChange = (index) => {
        const newCheckedState = [...checkedState];
        newCheckedState[index] = !newCheckedState[index];
        setCheckedState(newCheckedState);

        const newCount = newCheckedState.filter(Boolean).length;
        setCheckedCount(newCount);
        setShareHide(newCount > 0)
    };

    const shareOnHide = () => {
        setCheckedState(Array(4).fill(false)); // Reset all checkboxes
        setCheckedCount(0);
        setShareHide(false);
    };


    return (
        <div className="home-container">
            {shareHide ?

                <div className="share-container">
                    <div className="checked-count"><FontAwesomeIcon className="me-2" icon={faXmark}
                                                                    onClick={shareOnHide}/> {checkedCount} selected
                    </div>
                    <button className="share" onClick={showShareModal}><FontAwesomeIcon className="me-2"
                                                                                        icon={faShare}/> Share
                    </button>
                </div>
                : null
            }
            <div className="home-top">
                <div className="home-select-field">
                    <SelectField
                        options={optionsHomeSelect}
                        placeholder="All"
                    />
                </div>
                <Button className="bootsrap-btn module-btn" onClick={handleShowModule}>
                    <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                </Button>
                <Button className="bootsrap-btn upload-video-btn" onClick={handleVideoShow}>
                    <FontAwesomeIcon icon={faVideo}/><span className="ms-2">Upload Video</span>
                </Button>
                <Button className="bootsrap-btn box-filter">
                    <FontAwesomeIcon icon={faTableCellsLarge}/>
                </Button>
                <Button className="bootsrap-btn box-filter">
                    <FontAwesomeIcon icon={faList}/>
                </Button>
            </div>

            <div className="home-data">
                <div className="video-card">
                    <h5>Harmony Health Intro's</h5>
                    <div className="video-all-card">
                        {[...Array(4)].map((_, index) => (
                            <div className="single-video-card" key={index}>
                                <div className="card-check-option">
                                    <input
                                        type="checkbox"
                                        checked={checkedState[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <FontAwesomeIcon className="option-icon" icon={faEllipsisVertical}/>
                                </div>
                                <ReactPlayer
                                    url={sampleVideo}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        ))}
                        {/*<div className="single-video-card">*/}
                        {/*    <div className="card-check-option">*/}
                        {/*        <input type="checkbox"/>*/}
                        {/*        <FontAwesomeIcon className="option-icon" icon={faEllipsisVertical}/>*/}
                        {/*    </div>*/}
                        {/*    <ReactPlayer*/}
                        {/*        url={sampleVideo}*/}
                        {/*        controls={true}*/}
                        {/*        width="100%"*/}
                        {/*        height="100%"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="single-video-card">*/}
                        {/*    <div className="card-check-option">*/}
                        {/*        <input type="checkbox"/>*/}
                        {/*        <FontAwesomeIcon className="option-icon" icon={faEllipsisVertical}/>*/}
                        {/*    </div>*/}
                        {/*    <ReactPlayer*/}
                        {/*        url={sampleVideo}*/}
                        {/*        controls={true}*/}
                        {/*        width="100%"*/}
                        {/*        height="100%"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="single-video-card">*/}
                        {/*    <div className="card-check-option">*/}
                        {/*        <input type="checkbox"/>*/}
                        {/*        <FontAwesomeIcon className="option-icon" icon={faEllipsisVertical}/>*/}
                        {/*    </div>*/}
                        {/*    <ReactPlayer*/}
                        {/*        url={sampleVideo}*/}
                        {/*        controls={true}*/}
                        {/*        width="100%"*/}
                        {/*        height="100%"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="single-video-card">*/}
                        {/*    <div className="card-check-option">*/}
                        {/*        <input type="checkbox"/>*/}
                        {/*        <FontAwesomeIcon className="option-icon" icon={faEllipsisVertical}/>*/}
                        {/*    </div>*/}
                        {/*    <ReactPlayer*/}
                        {/*        url={sampleVideo}*/}
                        {/*        controls={true}*/}
                        {/*        width="100%"*/}
                        {/*        height="100%"*/}
                        {/*    />*/}
                        {/*</div>*/}
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
                            <Button className="bootsrap-btn" onClick={handleShowModule}>
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
                                {index > 0 && ( <hr /> )}
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

        </div>
    );
};

export default Home;
