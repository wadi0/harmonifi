import React, {useEffect, useRef, useState} from 'react';
import "./home2.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faChevronLeft,
    faChevronRight,
    faDownload,
    faEllipsisVertical, faList,
    faPen,
    faPlay, faPlus, faShare, faTableCellsLarge,
    faTrash, faVideo, faXmark
} from "@fortawesome/free-solid-svg-icons";
import {image_url, video_url} from "../../config/config.js";
import AxiosServices from "../../component/network/AxiosServices.js";
import ApiUrlServices from "../../component/network/ApiUrlServices.js";
import {Grid, Navigation, Pagination} from "swiper/modules";
import {Button, Modal} from "react-bootstrap";
import ReactPlayer from "react-player";
import SelectField from "../../component/SelectField/SelectField.jsx";
import Select, {components} from "react-select";
import InputField from "../../component/InputField/InputField.jsx";
import {useFormik} from "formik";
import InputFileUploadDesign from "../../component/inputFileUpload/inputFileUploadDesign.jsx";
import ThumbnailUpload from "../../component/thumbnailUpload/ThumbnailUpload.jsx";
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import 'swiper/css/grid';

const Home2 = ({showModule, handleCloseModule, handleShowModule, showVideo, handleCloseVideo, handleVideoShow}) => {

    const [moduleAllCardData, setModuleAllCardData] = useState([])
    const [moduleVideoData, setModuleVideoData] = useState([])
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [checkedIds, setCheckedIds] = useState([]);
    const [threeDotToggle, setThreeDotToggle] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [videoShareOptions, setVideoShareOptions] = useState(false)
    const [viewAllCard, setViewAllCard] = useState(false);
    const [sortListView, setSortListView] = useState(true);
    const [moduleListLoading, setModuleListLoading] = useState(false);
    const [moduleList, setModuleList] = useState([])
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editDelDownId, setEditDelDownId] = useState(null)


    const [windowWidthSwiperCard, setWindowWidthSwiperCard] = useState(window.innerWidth);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const cardSwiperRef = useRef(null);
    const secondSwiperRef = useRef(null);

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const cardRef = useRef(null);

    // ----------------------------delete modal------------------------------------

    const deleteModalOpen = () => {
        setDeleteModal(true);
        setVideoModalOpen(false);
        console.log("klkkl")
        console.log(editDelDownId)
    }

    const deleteModalClose = () => {
        setDeleteModal(false);
        setEditDelDownId(null)
    }

    const deleteMouleCard = () => {
        AxiosServices.remove(ApiUrlServices.DELETE_MODULE_DATA_CARD(editDelDownId))
            .then((response) => {
                console.log(response)
                console.log("deleted successfully")
                setDeleteModal(false)
                window.location.reload()
            }).catch((error) => {
            console.log(error)
        }).finally(() => {

        })

    }

    // ----------------------------------------------------------------------------

    // -------------------------------sort list view open close ---------------------------------

    const showSortView = () => {
        setSortListView(true)
    }

    const showListView = () => {
        setSortListView(false)
    }

    // ----------------------------------------------------------------

    // ------------------------view all card----------------------------------------

    const viewAllCardShow = () => {
        setViewAllCard(!viewAllCard)
    }

    // ----------------------------------------------------------------

    // ----------------------------share option video modal------------------------------------

    const shareEditDelDownload = (id) => {
        const selectedData = moduleVideoData.find(video => video.id === id);
        if (selectedCardId === id) {
            setVideoShareOptions(!videoShareOptions);
        } else {
            setSelectedCardId(id);
            setVideoShareOptions(true);
        }
        console.log("Clicked card ID:", id);
        console.log("Selected card data:", selectedData);
        // Add your logic here to handle the selected data, e.g., opening a menu with options
    };

    // ----------------------------------------------------------------

    // -------------------------option icons ------------------------------

    const editDelDownload = (id) => {
        const selectedData = moduleVideoData.find(video => video.id === id);
        if (selectedCardId === id) {
            setThreeDotToggle(!threeDotToggle);
        } else {
            setSelectedCardId(id);
            setThreeDotToggle(true);
        }
        setEditDelDownId(id)
        console.log("Clicked card ID:", id);
        console.log("Selected card data:", selectedData);
        // Add your logic here to handle the selected data, e.g., opening a menu with options
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setThreeDotToggle(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // ----------------------------------------------------------------

    // -----------checkboxes --------------------

    const handleCheckboxChange = (id) => {
        setCheckedIds((prevCheckedIds) => {
            if (prevCheckedIds.includes(id)) {
                return prevCheckedIds.filter(checkedId => checkedId !== id);
            } else {
                return [...prevCheckedIds, id];
            }
        });
    };

    const getCheckedCount = () => {
        return checkedIds.filter(id => moduleVideoData.some(video => video.id === id)).length;
    };

    // ----------------------------------------------------------------


    // -------------video player modal --------------------

    const videoModalIsOpen = (id) => {
        setSelectedVideoId(id);
        setVideoModalOpen(true);
        setThreeDotToggle(false)
    }

    const videoModalIsClose = () => {
        setVideoModalOpen(false);
        setSelectedVideoId(null);
        setVideoShareOptions(false);
    }

    // ----------------------------------------------------------------


    // -----swiper normal card --------------------------------

    useEffect(() => {
        const handleResize = () => {
            setWindowWidthSwiperCard(window.innerWidth);
            if (cardSwiperRef.current) {
                cardSwiperRef.current.swiper.update();
            }
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (cardSwiperRef.current && cardSwiperRef.current.swiper) {
            cardSwiperRef.current.swiper.update();
        }
    }, [windowWidthSwiperCard]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (secondSwiperRef.current) {
                secondSwiperRef.current.swiper.update();
            }
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (secondSwiperRef.current && secondSwiperRef.current.swiper) {
            secondSwiperRef.current.swiper.update();
        }
    }, [windowWidth]);

    // -----------------------------------------------------


    // -------------------------all card api ------------------------

    useEffect(() => {
        if (selectedModuleId) {
            AxiosServices.get(ApiUrlServices.MODULE_SELECTED_DATA(selectedModuleId))
                .then((response) => {
                    const module = response.data.data.module;
                    console.log(module);
                    setModuleAllCardData([module]);
                    setModuleVideoData(module.videos);
                }).catch((error) => {
                console.log(error);
            });
        } else {
            let payload = {
                module_limit: 10,
                module_page: 1,
            };
            AxiosServices.get(ApiUrlServices.MODULE_ALL_CARD_DATA, payload)
                .then((response) => {
                    const modules = response.data.data.modules;
                    console.log(modules);
                    setModuleAllCardData(modules);
                    let moduleDetails = modules.map(data => data.videos).flat();
                    console.log(moduleDetails);
                    setModuleVideoData(moduleDetails);
                }).catch((error) => {
                console.log(error);
            });
        }
    }, [selectedModuleId]);

    // --------------------------------------------------

    // ----------------------module list api----------------------------


    useEffect(() => {
        setModuleListLoading(true)
        let payload = {
            page: 1,
            limit: 100,
        }
        AxiosServices.get(ApiUrlServices.MODULE_LIST, payload)
            .then((response) => {
                console.log(response.data.data)
                setModuleList(response.data.data.modules)
                let moduleAllList = response.data.data.modules.map(module => ({
                    value: module.id,
                    label: module.name
                }));
                // console.log(moduleAllList)
                setModuleList(moduleAllList)
            }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setModuleListLoading(false)
        })

    }, []);

    const handleSelectChange = (selectedOption) => {
        setSelectedModuleId(selectedOption ? selectedOption.value : null);
        // console.log(selectedOption);
        console.log("Selected Module ID:", selectedOption ? selectedOption.value : null);
    };


    // --------------------------------------------------

    // --------------------add module------------------------------------

    const moduleFormValidate = (values) => {
        const errors = {};
        if (!values.moduleName) {
            errors.moduleName = "Module name is required";
        }
        return errors;
    };

    const submitModuleForm = (values, {resetForm}) => {
        const payload = {
            name: values.moduleName,
        };
        AxiosServices.post(ApiUrlServices.MODULE_LIST, payload)
            .then((response) => {
                console.log(response);
                resetForm();
                handleCloseModule(true)
            }).catch((error) => {
            console.log(error);
        }).finally(() => {

        })
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

    // ----------------------------------------------------------------

    const CustomDropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                {/* Replace this with your custom icon */}
                <span>🔽</span>
            </components.DropdownIndicator>
        );
    };

    // ----------------------------------------------------------------


    return (
        <div className="home-container">
            <div className="home-top">
                {!viewAllCard ?
                    <div className="d-flex gap-3 home-header-left">
                        <div className="home-select-field">
                            <Select
                                options={!moduleListLoading ? moduleList : []}
                                placeholder={!moduleListLoading ? "All" : "Loading..."}
                                onChange={handleSelectChange}
                                value={moduleList.find(option => option.value === selectedModuleId)}
                                isClearable
                                classNamePrefix="react-select"
                            />


                        </div>
                        <button className="add-module-button nunito-500 module-btn-width module-btn"
                                onClick={handleShowModule}
                        >
                            <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                        </button>
                        <button className="upload-module-button nunito-500 module-btn-width upload-video-btn"
                                onClick={handleVideoShow}
                        >
                            <FontAwesomeIcon icon={faVideo}/><span className="ms-2">Upload Video</span>
                        </button>
                    </div>
                    :
                    <span className="back-btn-allPage" onClick={viewAllCardShow}
                    ><FontAwesomeIcon className="me-2"
                                      icon={faAngleLeft}/> Back</span>
                }
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <button className={`${sortListView ? "btn-active " : "btn-unactive add-module-button"}`}
                            onClick={showSortView}>
                        <FontAwesomeIcon icon={faTableCellsLarge}/>
                    </button>

                    <button className={` ${sortListView ? "btn-unactive add-module-button" : "btn-active"}`}
                            onClick={showListView}>
                        <FontAwesomeIcon icon={faList}/>
                    </button>
                </div>
            </div>


            {/*--normal slider card--------------------------------------------*/}


            {/*
            {!viewAllCard ?
                <>
                    {(selectedModuleId === null ? moduleAllCardData : [{
                        id: selectedModuleId,
                        name: moduleAllCardData.length > 0 ? moduleAllCardData[0].name : '', // Assuming name is in the moduleAllCardData
                        videos: moduleVideoData
                    }]).map((module) => (
                        <div className="video-card-container" key={module.id}>
                            <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                                <h4 className="video-category-title">{selectedModuleId ? module.name : module.name}</h4>
                                <button onClick={viewAllCardShow}
                                        className="view-all-btn add-module-button">View all
                                </button>
                            </div>
                            <Swiper
                                className="video-all-card"
                                key={windowWidthSwiperCard}
                                ref={cardSwiperRef}
                                spaceBetween={10}
                                slidesPerView={4}
                                navigation={{
                                    nextEl: '.swiper-right-button',
                                    prevEl: '.swiper-left-button',
                                }}
                                modules={[Navigation]}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    380: {
                                        slidesPerView: 2,
                                    },
                                    501: {
                                        slidesPerView: 3,
                                    },
                                    751: {
                                        slidesPerView: 4,
                                    },

                                }}
                            >
                                {moduleVideoData.map((data) => {
                                    return data.module_id === module.id ? (
                                        <SwiperSlide className="single-video-card" key={data.id} ref={cardRef}>
                                            <div className="video-thumbnail">
                                                <div className="video-thumbnail-img">
                                                    <img
                                                        onClick={() => videoModalIsOpen(data.id)}
                                                        src={`${image_url}${data.thumbnail_path}`}
                                                        alt={data.title}
                                                    />
                                                    <FontAwesomeIcon onClick={() => videoModalIsOpen(data.id)}
                                                                     className="play-icon" icon={faPlay}/>
                                                    <input
                                                        className={`video-checkbox ${checkedIds.includes(data.id) ? 'video-checkbox-visibility' : ''}`}
                                                        type="checkbox"
                                                        checked={checkedIds.includes(data.id)}
                                                        onChange={() => handleCheckboxChange(data.id)}
                                                    />

                                                    <FontAwesomeIcon
                                                        onClick={() => editDelDownload(data.id)}
                                                        className={`three-dot-option ${selectedCardId === data.id && threeDotToggle ? 'three-dot-visibility' : ''}`}
                                                        icon={faEllipsisVertical}
                                                    />

                                                    {selectedCardId === data.id && threeDotToggle && (
                                                        <FontAwesomeIcon className="message-angel" icon={faPlay}/>
                                                    )}


                                                    {selectedCardId === data.id && threeDotToggle && (

                                                        <div className="edit-del-down-box">
                                                    <span className="edit-del-down" onClick={handleVideoShow}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faPen}
                                                        />
                                                        Edit
                                                    </span>
                                                            <span className="edit-del-down" onClick={deleteModalOpen}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faTrash}
                                                        />
                                                        Delete
                                                    </span>
                                                            <span className="edit-del-down">
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faDownload}
                                                        />
                                                        Download
                                                    </span>
                                                        </div>
                                                    )}
                                                    <div className="overlay"
                                                         onClick={() => videoModalIsOpen(data.id)}></div>
                                                </div>
                                            </div>
                                            <h6 className="nunito-600 mt-2 mb-0 text-capitalize text-truncate">{data.title}</h6>
                                            <Modal className="video-player-modal"
                                                   show={videoModalOpen && selectedVideoId === data.id}
                                                   onHide={videoModalIsClose}>
                                                <Modal.Body>
                                                    <FontAwesomeIcon
                                                        onClick={() => shareEditDelDownload(data.id)}
                                                        className={`share-option ${selectedCardId === data.id && threeDotToggle ? 'three-dot-visibility' : ''}`}
                                                        icon={faEllipsisVertical}
                                                    />

                                                    {selectedCardId === data.id && videoShareOptions && (
                                                        <FontAwesomeIcon className="message-angel-share-modal"
                                                                         icon={faPlay}/>
                                                    )}


                                                    {selectedCardId === data.id && videoShareOptions && (

                                                        <div className="share-edit-del-down-box">
                                                        <span className="share-edit-del-down">
                                                            <FontAwesomeIcon className="me-2" icon={faShare}/> Share
                                                        </span>
                                                            <span className="share-edit-del-down"
                                                                  onClick={handleVideoShow}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faPen}
                                                        />
                                                        Edit
                                                    </span>
                                                            <span className="share-edit-del-down"
                                                                  onClick={deleteModalOpen}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faTrash}
                                                        />
                                                        Delete
                                                    </span>
                                                            <span className="share-edit-del-down">
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faDownload}
                                                        />
                                                        Download
                                                    </span>
                                                        </div>
                                                    )}
                                                    <FontAwesomeIcon className="video-modal-close-btn" icon={faXmark}
                                                                     onClick={videoModalIsClose}/>
                                                    <ReactPlayer
                                                        url={`${video_url}${data.video_file_path}`}
                                                        controls={true}
                                                        playing={videoModalOpen}
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                    <h6 className="video-title-modal">{data.title}</h6>
                                                    <p className="video-player-description">{data.description}</p>
                                                </Modal.Body>
                                            </Modal>

                                        </SwiperSlide>
                                    ) : null;
                                })}
                                <div className="swiper-left-button">
                                    <FontAwesomeIcon className="swiper-left-button-icon" icon={faChevronLeft}/>
                                </div>
                                <div className="swiper-right-button">
                                    <FontAwesomeIcon className="swiper-right-button-icon" icon={faChevronRight}/>
                                </div>
                            </Swiper>
                        </div>
                    ))}
                </>
                : null}
                */}

            {/*--------------------------------------------------------------------*/}
            {/*---------------------------list view card----------------------------------*/}

            {!viewAllCard ?
                <>
                    {(selectedModuleId === null ? moduleAllCardData : [{
                        id: selectedModuleId,
                        name: moduleAllCardData.length > 0 ? moduleAllCardData[0].name : '', // Assuming name is in the moduleAllCardData
                        videos: moduleVideoData
                    }]).map((module) => (
                        <div className="video-card-container" key={module.id}>
                            <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                                <h4 className="video-category-title">{selectedModuleId ? module.name : module.name}</h4>

                                <div className="d-flex justify-content-between align-items-center gap-3">
                                    <button onClick={viewAllCardShow}
                                            className="view-all-btn add-module-button">View all
                                    </button>
                                    <div className="swiper-button-prev">
                                        <FontAwesomeIcon className="" icon={faChevronLeft}/>
                                    </div>
                                    <div className="swiper-button-next ">
                                        <FontAwesomeIcon className="" icon={faChevronRight}/>
                                    </div>
                                </div>
                            </div>
                            <Swiper
                                key={windowWidth}
                                ref={secondSwiperRef}
                                spaceBetween={20}
                                slidesPerView={2}
                                grid={{
                                    rows: 2,
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                                modules={[Pagination, Grid, Navigation]}
                                className="list-video-all-Card"
                                breakpoints={{
                                    300: {
                                        slidesPerView: 1,
                                    },
                                    751: {
                                        slidesPerView: 2,
                                    },
                                    1300: {
                                        slidesPerView: 2,
                                    },
                                }}
                            >
                                {moduleVideoData.map((data) => {
                                    return data.module_id === module.id ? (
                                        <SwiperSlide className="sort-single-video-card" key={data.id} ref={cardRef}>
                                            <div className="video-thumbnail">
                                                <div className="video-thumbnail-img">
                                                    <img
                                                        onClick={() => videoModalIsOpen(data.id)}
                                                        src={`${image_url}${data.thumbnail_path}`}
                                                        alt={data.title}
                                                    />
                                                    <FontAwesomeIcon onClick={() => videoModalIsOpen(data.id)}
                                                                     className="play-icon" icon={faPlay}/>
                                                    <input
                                                        className={`video-checkbox ${checkedIds.includes(data.id) ? 'video-checkbox-visibility' : ''}`}
                                                        type="checkbox"
                                                        checked={checkedIds.includes(data.id)}
                                                        onChange={() => handleCheckboxChange(data.id)}
                                                    />

                                                    <FontAwesomeIcon
                                                        onClick={() => editDelDownload(data.id)}
                                                        className={`three-dot-option ${selectedCardId === data.id && threeDotToggle ? 'three-dot-visibility' : ''}`}
                                                        icon={faEllipsisVertical}
                                                    />

                                                    {selectedCardId === data.id && threeDotToggle && (
                                                        <FontAwesomeIcon className="message-angel" icon={faPlay}/>
                                                    )}


                                                    {selectedCardId === data.id && threeDotToggle && (

                                                        <div className="edit-del-down-box">
                                                    <span className="edit-del-down" onClick={handleVideoShow}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faPen}
                                                        />
                                                        Edit
                                                    </span>
                                                            <span className="edit-del-down" onClick={deleteModalOpen}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faTrash}
                                                        />
                                                        Delete
                                                    </span>
                                                            <span className="edit-del-down">
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faDownload}
                                                        />
                                                        Download
                                                    </span>
                                                        </div>
                                                    )}
                                                    <div className="overlay"
                                                         onClick={() => videoModalIsOpen(data.id)}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <h6 className="nunito-600 mt-2 mb-2 text-capitalize text-truncate">{data.title}</h6>
                                                <p>{data.description}</p>
                                            </div>
                                            <Modal className="video-player-modal"
                                                   show={videoModalOpen && selectedVideoId === data.id}
                                                   onHide={videoModalIsClose}>
                                                <Modal.Body>
                                                    <FontAwesomeIcon
                                                        onClick={() => shareEditDelDownload(data.id)}
                                                        className={`share-option ${selectedCardId === data.id && threeDotToggle ? 'three-dot-visibility' : ''}`}
                                                        icon={faEllipsisVertical}
                                                    />

                                                    {selectedCardId === data.id && videoShareOptions && (
                                                        <FontAwesomeIcon className="message-angel-share-modal"
                                                                         icon={faPlay}/>
                                                    )}


                                                    {selectedCardId === data.id && videoShareOptions && (

                                                        <div className="share-edit-del-down-box">
                                                        <span className="share-edit-del-down">
                                                            <FontAwesomeIcon className="me-2" icon={faShare}/> Share
                                                        </span>
                                                            <span className="share-edit-del-down"
                                                                  onClick={handleVideoShow}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faPen}
                                                        />
                                                        Edit
                                                    </span>
                                                            <span className="share-edit-del-down"
                                                                  onClick={deleteModalOpen}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faTrash}
                                                        />
                                                        Delete
                                                    </span>
                                                            <span className="share-edit-del-down">
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faDownload}
                                                        />
                                                        Download
                                                    </span>
                                                        </div>
                                                    )}
                                                    <FontAwesomeIcon className="video-modal-close-btn" icon={faXmark}
                                                                     onClick={videoModalIsClose}/>
                                                    <ReactPlayer
                                                        url={`${video_url}${data.video_file_path}`}
                                                        controls={true}
                                                        playing={videoModalOpen}
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                    <h6 className="video-title-modal">{data.title}</h6>
                                                    <p className="video-player-description">{data.description}</p>
                                                </Modal.Body>
                                            </Modal>

                                        </SwiperSlide>
                                    ) : null;
                                })}

                            </Swiper>
                        </div>
                    ))}
                </>
                : null}

            {/*------------------------------------------------------------------------*/}


            {/*-------------------------delete modal----------------------*/}
            <Modal className="delete-modal" show={deleteModal} onHide={deleteModalClose}>
                <Modal.Body>
                    <button onClick={deleteModalClose}>Cancel</button>
                    <button onClick={deleteMouleCard}>Delete</button>
                </Modal.Body>
            </Modal>

            {/*--------------------------------------------------------------------*/}
            {/*------------------------add module modal--------------------------*/}

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
                    <button
                        type="button"
                        // btnText="Cancel"
                        className="cancelBtn add-module-button"
                        onClick={handleCloseModule}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        // btnText="Save"
                        className="saveBtn add-module-button"
                        onClick={moduleForm.handleSubmit}
                    >Save
                    </button>
                </Modal.Footer>
            </Modal>

            {/*------------------------------------------------------------------*/}

            {/*-----------------upload modal----------------------*/}

            <Modal className="video-modal-container" show={showVideo} onHide={handleCloseVideo}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="video-modal">
                        <div className="select-add-module">
                            <div className="video-modal-select-field">
                                {/*<SelectField*/}
                                {/*    label="Select module"*/}
                                {/*    labelClass="module-label-class"*/}
                                {/*    // options={selectModuleOptionVideo}*/}
                                {/*    placeholder="All"*/}
                                {/*/>*/}
                                <Select
                                    options={moduleList}
                                    placeholder="All"
                                    onChange={handleSelectChange}
                                    components={{DropdownIndicator: CustomDropdownIndicator}}
                                />
                            </div>
                            <button className="add-module-button upload-video-add-module" onClick={handleShowModule}>
                                <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                            </button>
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
                                <h5 className="title-name nunito-700">Dr. Rohrer</h5>
                                <InputFileUploadDesign/>
                            </div>
                            <div>
                                <h5 className="thumbnail-name nunito-700">Thumbnail</h5>
                                <ThumbnailUpload/>
                            </div>
                        </div>
                        <label className="textarea-label">Description</label>
                        <textarea placeholder="Description"></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        // btnText="Cancel"
                        className="cancelBtn add-module-button"
                        onClick={handleCloseVideo}
                    >Cancel
                    </button>
                    <button
                        type="submit"
                        // btnText="Save"
                        className="saveBtn add-module-button"
                        onClick={handleCloseVideo}
                    >Save
                    </button>
                </Modal.Footer>
            </Modal>

            {/*--------------------------------------------------------*/}

            {checkedIds.length > 0 && (
                <>
                    <p>{`Checked Count: ${getCheckedCount()}`}</p>
                    <div>
                        {checkedIds.map((id) => (
                            <p key={id}>Checked ID: {id}</p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home2;
