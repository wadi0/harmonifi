import React, {useState} from 'react';
import "./home.scss"
import SelectField from "../../component/SelectField/SelectField.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlus, faTableCellsLarge, faVideo} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";
import InputField from "../../component/InputField/InputField.jsx";
import {useFormik} from "formik";

const Home = () => {

    const optionsHomeSelect = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
        {value: 'eglo', label: 'Eaglo'}
    ]

    const [showModule, setShowModule] = useState(false);

    const handleCloseModule = () => setShowModule(false);
    const handleShow = () => setShowModule(true);

    const moduleFormValidate = (values) => {
        console.log(values);
    }

    const submitModuleForm = (values) => {
        let payload = {
            moduleName: values.moduleName
        }
        console.log(payload)
    }

    const moduleForm = useFormik({
        initialValues: {
            moduleName: "",
        },
        validateOnChange: true,
        validateOnBlur: true,
        validate: moduleFormValidate,
        onSubmit: submitModuleForm,
    });

    return (
        <div className="home-container">
            <div className="home-top">
                <div className="home-select-field">
                    <SelectField
                        options={optionsHomeSelect}
                        placeholder="All"
                    />
                </div>
                <Button className="bootsrap-btn" onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                </Button>
                <Button className="bootsrap-btn">
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
                    <label className="module-label">Module Name</label>
                    <InputField
                        id="moduleName"
                        // label='Module Name'
                        // className="mb-10"
                        // inputClassName=""
                        // labelLinkText='auth_page.try_mobile_number'
                        // labelOnChangeCallback={handleEmailOrPhone}
                        placeholder='Module Name'
                        textType="text"
                        inputName="moduleName"
                        asterisk={true}
                        whiteSpace={false}
                        // onBlur={loginForm.handleBlur}
                        // value={loginForm.values.email}
                        // onchangeCallback={loginForm.handleChange}
                        // inputClassName={loginForm.touched.email && loginForm.errors.email ? " is-invalid" : ""}
                        // requiredMessage={loginForm.touched.email && loginForm.errors.email}
                        // requiredMessageLabel={loginForm.touched.email || loginForm.isSubmitting ? loginForm.errors.email : ""}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancelBtn" onClick={handleCloseModule}>
                        Cancel
                    </Button>
                    <Button className="saveBtn" onClick={handleCloseModule}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*    -----upload video modal----*/}

        </div>
    );
};

export default Home;