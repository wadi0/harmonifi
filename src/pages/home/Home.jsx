import React, {useState, useEffect} from 'react';
import "./home.scss";
import SelectField from "../../component/SelectField/SelectField.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlus, faTableCellsLarge, faVideo} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";
import InputField from "../../component/InputField/InputField.jsx";
import {useFormik} from "formik";
import CustomButton from "../../component/button/Button.jsx";

const Home = () => {
    const initialOptionsHomeSelect = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
        {value: 'eglo', label: 'Eaglo'}
    ];

    const [showModule, setShowModule] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [optionsHomeSelect, setOptionsHomeSelect] = useState([]);

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

    return (
        <div className="home-container">
            <div className="home-top">
                <div className="home-select-field">
                    <SelectField
                        options={optionsHomeSelect}
                        placeholder="All"
                    />
                </div>
                <Button className="bootsrap-btn" onClick={handleShowModule}>
                    <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                </Button>
                <Button className="bootsrap-btn" onClick={handleVideoShow}>
                    <FontAwesomeIcon icon={faVideo}/><span className="ms-2">Upload Video</span>
                </Button>
                <Button className="bootsrap-btn box-filter">
                    <FontAwesomeIcon icon={faTableCellsLarge}/>
                </Button>
                <Button className="bootsrap-btn box-filter">
                    <FontAwesomeIcon icon={faList}/>
                </Button>
            </div>

            {/*---------------module modal---------*/}
            <Modal show={showModule} onHide={handleCloseModule}>
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

            <Modal show={showVideo} onHide={handleCloseVideo}>
                <Modal.Header closeButton>
                    <Modal.Title>Video</Modal.Title>
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

        </div>
    );
};

export default Home;
