import React, {useEffect, useRef, useState} from 'react';
import "./home2.scss"
import "./home.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faChevronLeft,
    faChevronRight,
    faDownload,
    faEllipsisVertical, faList,
    faPen,
    faPlay, faPlus, faShare, faSpinner, faTableCellsLarge,
    faTrash, faVideo, faXmark, faClose
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
import {Dialog} from "@headlessui/react";
import Loader from "../../component/loader/Loader.jsx";
import {toast} from "react-toastify";

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
    const [isLoading, setIsLoading] = useState(false);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [modalSelectedModuleId, setModalSelectedModuleId] = useState(null);

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
        setIsLoading(true)
        AxiosServices.remove(ApiUrlServices.DELETE_MODULE_DATA_CARD(editDelDownId))
            .then((response) => {
                console.log(response)
                console.log("deleted successfully")
                setDeleteModal(false)
                window.location.reload()
            }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
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

    // const viewAllCardShow = () => {
    //     setViewAllCard(!viewAllCard)
    // }

    const viewAllCardShow = (moduleId) => {
        setSelectedModuleId(moduleId);
        setViewAllCard(true);
    };

    const closeAllCardShow = () => {
        setViewAllCard(false);
        setSelectedModuleId(null);
    }


    useEffect(() => {
        if (selectedModuleId === null) {
            // Perform actions needed when selectedModuleId is null
            console.log("selectedModuleId is null");
            // Example: Fetch all data again or reset the component state
        }
    }, [selectedModuleId]);

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
        setEditDelDownId(id);
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
        setIsLoading(true)
        if (selectedModuleId) {
            setIsLoading(true);
            AxiosServices.get(ApiUrlServices.MODULE_SELECTED_DATA(selectedModuleId))
                .then((response) => {
                    const module = response.data.data.module;
                    console.log(module);
                    setModuleAllCardData([module]);
                    setModuleVideoData(module.videos);
                }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            })
        } else {
            setIsLoading(true)
            let payload = {
                module_limit: 10,
                module_page: 1,
            };
            AxiosServices.get(ApiUrlServices.MODULE_ALL_CARD_DATA, payload)
                .then((response) => {
                    const modules = response.data.data.modules;
                    setModuleAllCardData(modules);
                    let moduleDetails = modules.map(data => data.videos).flat();
                    setModuleVideoData(moduleDetails);
                }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            })
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

    }, [isLoading]);

    const handleSelectChange = (selectedOption) => {
        setSelectedModuleId(selectedOption ? selectedOption.value : null);
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
        setIsLoading(true)
        const payload = {
            name: values.moduleName,
        };
        AxiosServices.post(ApiUrlServices.MODULE_LIST, payload)
            .then((response) => {
                console.log(response);
                resetForm();
                handleCloseModule(true)
                toast.success("Add module successfully")
            }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false)
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

    // ----------------------------------------

    // const handleModalSelectChange = (selectedOption) => {
    //       setModalSelectedModuleId(selectedOption ? selectedOption.value : null);
    //   };
    const handleModalSelectChange = (selectedOption) => {
        setModalSelectedModuleId(selectedOption?.value || null);
        uploadVideoForm.setFieldValue('module_id', selectedOption?.value || null);
    };

    const uploadVideoFormValidate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = "Title is required";
        }
        if (!values.module_id) {
            errors.module_id = "Module is required";
        }
        if (!values.video_file) {
            errors.video_file = "Video file is required";
        }
        if (!values.thumbnail) {
            errors.thumbnail = "Thumbnail is required";
        }
        return errors;
    };


    const submitUploadVideoForm = (values, {resetForm}) => {
        setModalSelectedModuleId(null);
        uploadVideoForm.resetForm();
        handleCloseVideo();
        toast.warning("I don't have api so data not added!")
    };

    const handleCloseUploadVideoModal = () => {
        setModalSelectedModuleId(null);
        uploadVideoForm.resetForm();
        handleCloseVideo();
    };


    const uploadVideoForm = useFormik({
        initialValues: {
            title: "",
            module_id: null,
            video_file: null,
            thumbnail: null,
            description: ""
        },
        validateOnChange: true,
        validateOnBlur: true,
        validate: uploadVideoFormValidate,
        onSubmit: submitUploadVideoForm,
    });


    // ----------------------------------------------------------------

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.three-dot-option') && !e.target.closest('.edit-del-down-box')) {
                setThreeDotToggle(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const hasVideos = (moduleId) => {
        return moduleVideoData.some(video => video.module_id === moduleId);
    };

    // Helper function to get videos for a specific module
    const getModuleVideos = (moduleId) => {
        return moduleVideoData.filter(video => video.module_id === moduleId);
    };
    // ----------------------------------------------------------------

    const [swiperStates, setSwiperStates] = useState({});

    const handleSlideChange = (swiper, moduleId) => {
        setSwiperStates(prev => ({
            ...prev,
            [moduleId]: {
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
            }
        }));
    };


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
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        border: state.isFocused ? '1px solid var(--primary-color)' : '1px solid #ccc',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            borderColor: 'none',
                                        },
                                    }),
                                }}
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
                    <span className="back-btn-allPage" onClick={closeAllCardShow}
                    ><FontAwesomeIcon className="me-2"
                                      icon={faAngleLeft}/> Back</span>
                }
            </div>

            {isLoading ? (
                <Loader/>
            ) : (
                <>
                    {!viewAllCard ? (
                        <>
                            {sortListView ? (
                                <>
                                    {(selectedModuleId === null ? moduleAllCardData : [{
                                        id: selectedModuleId,
                                        name: moduleAllCardData.length > 0 ? moduleAllCardData[0].name : '',
                                        videos: moduleVideoData
                                    }]).map((module) => (
                                        <div className="video-card-container" key={module.id}>
                                            <div
                                                className="d-flex align-items-center justify-content-between mb-3 mt-3">
                                                <h4 className="video-category-title">{selectedModuleId ? module.name : module.name}</h4>
                                                {!viewAllCard && hasVideos(module.id) && (
                                                    <button
                                                        onClick={() => viewAllCardShow(module.id)}
                                                        className="view-all-btn add-module-button"
                                                    >
                                                        View all
                                                    </button>
                                                )}
                                            </div>

                                            {/* Check if this module has videos */}
                                            {!hasVideos(module.id) ? (
                                                <div className="no-data-container text-center py-4">
                                                    <h5>No videos found</h5>
                                                    <p>This module doesn't have any videos yet.</p>
                                                </div>
                                            ) : (
                                                <Swiper
                                                    onSwiper={(swiper) => handleSlideChange(swiper, module.id)}
                                                    onSlideChange={(swiper) => handleSlideChange(swiper, module.id)}
                                                    className="video-all-card"
                                                    key={windowWidthSwiperCard}
                                                    ref={cardSwiperRef}
                                                    spaceBetween={20}
                                                    slidesPerView={4}
                                                    navigation={{
                                                        nextEl: `.swiper-right-button-${module.id}`,
                                                        prevEl: `.swiper-left-button-${module.id}`,
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
                                                            <SwiperSlide className="single-video-card" key={data.id}
                                                                         ref={cardRef}>
                                                                <div className="video-thumbnail">
                                                                    <div className="video-thumbnail-img"
                                                                         onMouseEnter={() => setHoveredCardId(data.id)}
                                                                         onMouseLeave={() => setHoveredCardId(null)}>
                                                                        <img
                                                                            onClick={() => videoModalIsOpen(data.id)}
                                                                            src={`${image_url}${data.thumbnail_path}`}
                                                                            alt={data.title}
                                                                        />
                                                                        <FontAwesomeIcon
                                                                            onClick={() => videoModalIsOpen(data.id)}
                                                                            className="play-icon" icon={faPlay}/>

                                                                        {hoveredCardId === data.id && !(selectedCardId === data.id && threeDotToggle) && (
                                                                            <FontAwesomeIcon
                                                                                onClick={() => editDelDownload(data.id)}
                                                                                className="three-dot-option"
                                                                                icon={faEllipsisVertical}
                                                                            />
                                                                        )}

                                                                        {selectedCardId === data.id && threeDotToggle && (
                                                                            <div className="edit-del-down-box">
                                                                                        <span className="edit-del-down"
                                                                                              onClick={handleVideoShow}>
                                                                                            <FontAwesomeIcon
                                                                                                icon={faPen}
                                                                                                color='lightseagreen'/>
                                                                                        </span>
                                                                                <span className="edit-del-down"
                                                                                      onClick={deleteModalOpen}>
                                                                                            <FontAwesomeIcon
                                                                                                icon={faTrash}
                                                                                                color='darkorange'/>
                                                                                        </span>
                                                                                <span className="edit-del-down">
                                                                                            <FontAwesomeIcon
                                                                                                icon={faDownload}
                                                                                                color='blue'/>
                                                                                        </span>
                                                                                <span className="edit-del-down"
                                                                                      onClick={() => editDelDownload(data.id)}>
                                                                                            <FontAwesomeIcon
                                                                                                icon={faClose}
                                                                                                color='red'/>
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
                                                                            <FontAwesomeIcon
                                                                                className="message-angel-share-modal"
                                                                                icon={faPlay}/>
                                                                        )}

                                                                        {selectedCardId === data.id && videoShareOptions && (
                                                                            <div className="share-edit-del-down-box">
                                                                                        <span
                                                                                            className="share-edit-del-down">
                                                                                            <FontAwesomeIcon
                                                                                                className="me-2"
                                                                                                icon={faShare}/> Share
                                                                                        </span>
                                                                                <span className="share-edit-del-down"
                                                                                      onClick={handleVideoShow}>
                                                                                            <FontAwesomeIcon
                                                                                                className="me-2"
                                                                                                icon={faPen}/>
                                                                                            Edit
                                                                                        </span>
                                                                                <span className="share-edit-del-down"
                                                                                      onClick={deleteModalOpen}>
                                                                                            <FontAwesomeIcon
                                                                                                className="me-2"
                                                                                                icon={faTrash}/>
                                                                                            Delete
                                                                                        </span>
                                                                                <span className="share-edit-del-down">
                                                                                            <FontAwesomeIcon
                                                                                                className="me-2"
                                                                                                icon={faDownload}/>
                                                                                            Download
                                                                                        </span>
                                                                            </div>
                                                                        )}
                                                                        <FontAwesomeIcon
                                                                            className="video-modal-close-btn"
                                                                            icon={faXmark}
                                                                            onClick={videoModalIsClose}/>
                                                                        <ReactPlayer
                                                                            url={`${video_url}${data.video_file_path}`}
                                                                            controls={true}
                                                                            playing={videoModalOpen}
                                                                            width="100%"
                                                                            height="250px"
                                                                        />
                                                                        <h6 className="video-title-modal">{data.title}</h6>
                                                                        <p className="video-player-description">{data.description}</p>
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </SwiperSlide>
                                                        ) : null;
                                                    })}
                                                </Swiper>
                                            )}

                                            {hasVideos(module.id) ?
                                                <div
                                                    className={`swiper-left-button swiper-left-button-${module.id} ${
                                                        swiperStates[module.id]?.isBeginning ? 'swiper-button-disabled' : ''
                                                    }`}
                                                >
                                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                                </div>
                                                : null}

                                            {hasVideos(module.id) ?
                                                <div
                                                    className={`swiper-right-button swiper-right-button-${module.id} ${
                                                        swiperStates[module.id]?.isEnd ? 'swiper-button-disabled' : ''
                                                    }`}
                                                >
                                                    <FontAwesomeIcon icon={faChevronRight}/>
                                                </div>
                                                : null}
                                        </div>
                                    ))}
                                </>
                            ) : null}
                        </>
                    ) : null}

                    {/*--------------------------------------------------------------------*/}
                    {/*---------------------------list view card----------------------------------*/}

                    {!viewAllCard ?
                        <>
                            {!sortListView ?
                                <>
                                    {(selectedModuleId === null ? moduleAllCardData : [{
                                        id: selectedModuleId,
                                        name: moduleAllCardData.length > 0 ? moduleAllCardData[0].name : '', // Assuming name is in the moduleAllCardData
                                        videos: moduleVideoData
                                    }]).map((module) => (
                                        <div className="video-card-container" key={module.id}>
                                            <div
                                                className="d-flex align-items-center justify-content-between mb-3 mt-3">
                                                <h4 className="video-category-title">{selectedModuleId ? module.name : module.name}</h4>
                                                <div
                                                    className="d-flex justify-content-between align-items-center gap-3">
                                                    {!viewAllCard && (
                                                        <button
                                                            onClick={() => viewAllCardShow(module.id)}
                                                            className="view-all-btn add-module-button"
                                                        >
                                                            View all
                                                        </button>
                                                    )}
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
                                                        <SwiperSlide className="sort-single-video-card" key={data.id}
                                                                     ref={cardRef}>
                                                            <div className="video-thumbnail">
                                                                <div className="video-thumbnail-img">
                                                                    <div className="overly-control">
                                                                        <img
                                                                            onClick={() => videoModalIsOpen(data.id)}
                                                                            src={`${image_url}${data.thumbnail_path}`}
                                                                            alt={data.title}
                                                                        />
                                                                        <div className="overlay"
                                                                             onClick={() => videoModalIsOpen(data.id)}>
                                                                        </div>
                                                                        <FontAwesomeIcon
                                                                            onClick={() => videoModalIsOpen(data.id)}
                                                                            className="play-icon" icon={faPlay}/>
                                                                        {/*<input*/}
                                                                        {/*    className={`video-checkbox ${checkedIds.includes(data.id) ? 'video-checkbox-visibility' : ''}`}*/}
                                                                        {/*    type="checkbox"*/}
                                                                        {/*    checked={checkedIds.includes(data.id)}*/}
                                                                        {/*    onChange={() => handleCheckboxChange(data.id)}*/}
                                                                        {/*/>*/}
                                                                    </div>


                                                                    <FontAwesomeIcon
                                                                        onClick={() => editDelDownload(data.id)}
                                                                        className={`three-dot-option ${selectedCardId === data.id && threeDotToggle ? 'three-dot-visibility' : ''}`}
                                                                        icon={faEllipsisVertical}
                                                                    />

                                                                    {selectedCardId === data.id && threeDotToggle && (
                                                                        <FontAwesomeIcon className="message-angel"
                                                                                         icon={faPlay}/>
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
                                                                            <span className="edit-del-down"
                                                                                  onClick={deleteModalOpen}>
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
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h6 className="nunito-600 mt-2 mb-2 text-capitalize text-truncate">{data.title}</h6>
                                                                <p className="mb-0 text-truncate">{data.description}</p>
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
                                                                        <FontAwesomeIcon
                                                                            className="message-angel-share-modal"
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
                                                                    <FontAwesomeIcon className="video-modal-close-btn"
                                                                                     icon={faXmark}
                                                                                     onClick={videoModalIsClose}/>
                                                                    <ReactPlayer
                                                                        url={`${video_url}${data.video_file_path}`}
                                                                        controls={true}
                                                                        playing={videoModalOpen}
                                                                        width="100%"
                                                                        height="250px"
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
                                : null}</>
                        : null}

                    {/*------------------------------------------------------------------------*/}


                    {/*-----------------view all card-------------------------------------*/}

                    {viewAllCard ?

                        <>
                            {(selectedModuleId === null ? moduleAllCardData : [{
                                id: selectedModuleId,
                                name: moduleAllCardData.length > 0 ? moduleAllCardData[0].name : '', // Assuming name is in the moduleAllCardData
                                videos: moduleVideoData
                            }]).map((module) => (
                                <div className="video-card-container" key={module.id}>
                                    <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                                        <h4 className="video-category-title">{selectedModuleId ? module.name : module.name}</h4>
                                        {!viewAllCard && (
                                            <button
                                                onClick={() => viewAllCardShow(module.id)}
                                                className="view-all-btn add-module-button"
                                            >
                                                View all
                                            </button>
                                        )}
                                    </div>
                                    <div className={sortListView ? "video-all-card" : "list-video-all-Card"}>
                                        {moduleVideoData.map((data) => {
                                            return data.module_id === module.id ? (
                                                <div
                                                    className={sortListView ? "single-video-card" : "sort-single-video-card"}
                                                    key={data.id} ref={cardRef}>
                                                    <div className="video-thumbnail">
                                                        <div className="video-thumbnail-img">
                                                            <div className="overly-control">
                                                                <img
                                                                    onClick={() => videoModalIsOpen(data.id)}
                                                                    src={`${image_url}${data.thumbnail_path}`}
                                                                    alt={data.title}
                                                                />
                                                                <div className="overlay"
                                                                     onClick={() => videoModalIsOpen(data.id)}>
                                                                </div>
                                                                <FontAwesomeIcon
                                                                    onClick={() => videoModalIsOpen(data.id)}
                                                                    className="play-icon" icon={faPlay}/>
                                                                {/*<input*/}
                                                                {/*    className={`video-checkbox ${checkedIds.includes(data.id) ? 'video-checkbox-visibility' : ''}`}*/}
                                                                {/*    type="checkbox"*/}
                                                                {/*    checked={checkedIds.includes(data.id)}*/}
                                                                {/*    onChange={() => handleCheckboxChange(data.id)}*/}
                                                                {/*/>*/}
                                                            </div>
                                                            <FontAwesomeIcon
                                                                onClick={() => editDelDownload(data.id)}
                                                                className={`three-dot-option ${selectedCardId === data.id && threeDotToggle ? 'three-dot-visibility' : ''}`}
                                                                icon={faEllipsisVertical}
                                                            />

                                                            {/*{selectedCardId === data.id && threeDotToggle && (*/}
                                                            {/*    <FontAwesomeIcon className="message-angel"*/}
                                                            {/*                     icon={faPlay}/>*/}
                                                            {/*)}*/}


                                                            {selectedCardId === data.id && threeDotToggle && (

                                                                <div className="edit-del-down-box">
                                                                            <span className="edit-del-down"
                                                                                  onClick={handleVideoShow}>
                                                                                <FontAwesomeIcon icon={faPen}
                                                                                                 color='lightseagreen'/>
                                                                                {/*Edit*/}
                                                                            </span>
                                                                    <span className="edit-del-down"
                                                                          onClick={deleteModalOpen}>
                                                                                <FontAwesomeIcon icon={faTrash}
                                                                                                 color='darkorange'/>
                                                                        {/*Delete*/}
                                                                            </span>
                                                                    <span className="edit-del-down">
                                                                                <FontAwesomeIcon icon={faDownload}
                                                                                                 color='blue'/>
                                                                        {/*Download*/}
                                                                            </span>
                                                                    <span className="edit-del-down"
                                                                          onClick={() => editDelDownload(data.id)}>
                                                                                <FontAwesomeIcon icon={faClose}
                                                                                                 color='red'/>
                                                                        {/*Close*/}
                                                                            </span>
                                                                </div>
                                                                // <div className="edit-del-down-box">
                                                                //     <span className="edit-del-down" onClick={handleVideoShow}>
                                                                //         <FontAwesomeIcon
                                                                //             className="me-2"
                                                                //             icon={faPen}
                                                                //         />
                                                                //         Edit
                                                                //     </span>
                                                                //     <span className="edit-del-down"
                                                                //           onClick={deleteModalOpen}>
                                                                //         <FontAwesomeIcon
                                                                //             className="me-2"
                                                                //             icon={faTrash}
                                                                //         />
                                                                //         Delete
                                                                //     </span>
                                                                //     <span className="edit-del-down">
                                                                //         <FontAwesomeIcon
                                                                //             className="me-2"
                                                                //             icon={faDownload}
                                                                //         />
                                                                //         Download
                                                                //     </span>
                                                                // </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h6 className="nunito-600 mt-2 mb-0 text-capitalize text-truncate">{data.title}</h6>
                                                        <p className="text-truncate mt-2 mb-0">{data.description}</p>
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
                                                            <FontAwesomeIcon className="video-modal-close-btn"
                                                                             icon={faXmark}
                                                                             onClick={videoModalIsClose}/>
                                                            <ReactPlayer
                                                                url={`${video_url}${data.video_file_path}`}
                                                                controls={true}
                                                                playing={videoModalOpen}
                                                                width="100%"
                                                                height="250px"
                                                            />
                                                            <h6 className="video-title-modal">{data.title}</h6>
                                                            <p className="video-player-description">{data.description}</p>
                                                        </Modal.Body>
                                                    </Modal>

                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            ))}
                        </>
                        : null}

                    {/*--------------------------------------------------------------------*/}
                </>
            )}


            {/*-------------------------delete modal----------------------*/}
            <Modal className="delete-modal" show={deleteModal} onHide={deleteModalClose}>
                <Modal.Body>
                    <button onClick={deleteModalClose}>Cancel</button>
                    <button onClick={deleteMouleCard} disabled={isLoading}>
                        Delete {isLoading ? <FontAwesomeIcon className="ms-1" icon={faSpinner} spin/> : null}
                    </button>
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
                        className={`saveBtn add-module-button ${isLoading ? "disabled-button" : null}`}
                        onClick={moduleForm.handleSubmit}
                        disabled={isLoading}
                    >
                        Save {isLoading ? <FontAwesomeIcon className="ms-1" icon={faSpinner} spin/> : null}
                    </button>
                </Modal.Footer>
            </Modal>

            {/*------------------------------------------------------------------*/}

            {/*-----------------upload modal----------------------*/}

            <Dialog open={showVideo} onClose={() => {
                handleCloseVideo();
                setModalSelectedModuleId(null);
            }} className="video-upload-modal-overlay">
                <div className="video-upload-modal-wrapper">
                    <Dialog.Panel className="video-upload-modal-container">
                        <Dialog.Title className="video-modal-title">Upload video</Dialog.Title>
                        <div className="video-modal">
                            <div className="select-add-module">
                                <div className="video-modal-select-field">
                                    <label className="video-module-label mb-1" htmlFor="module_id">Module Name</label>
                                    <Select
                                        inputId="module_id"
                                        name="module_id"
                                        className="modal-module-select"
                                        options={!moduleListLoading ? moduleList : []}
                                        placeholder={!moduleListLoading ? "All" : "Loading..."}
                                        onChange={handleModalSelectChange}
                                        value={moduleList.find(option => option.value === modalSelectedModuleId)}
                                        classNamePrefix="react-select"
                                        onBlur={() => uploadVideoForm.setFieldTouched("module_id", true)}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                height: '46px',
                                                fontWeight: '500',
                                                paddingLeft: '15px',
                                                borderRadius: '6px',
                                                border: state.isFocused ? '1px solid var(--primary-color)' : '1px solid #ccc',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    borderColor: 'none',
                                                },
                                            }),
                                        }}
                                    />
                                    {uploadVideoForm.touched.module_id && uploadVideoForm.errors.module_id && (
                                        <div className="invalid-feedback d-block">
                                            {uploadVideoForm.errors.module_id}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='mt-3 mb-2'>
                                <InputField
                                    labelName="Title"
                                    labelClass="title-label-class"
                                    inputClass="video-modal-input-title mt-1"
                                    id="title"
                                    placeholder='Title'
                                    textType="text"
                                    inputName="title"
                                    asterisk={false}
                                    whiteSpace={false}
                                    onBlur={uploadVideoForm.handleBlur}
                                    value={uploadVideoForm.values.title}
                                    onchangeCallback={uploadVideoForm.handleChange}
                                    inputClassName={uploadVideoForm.touched.title && uploadVideoForm.errors.title ? " is-invalid" : ""}
                                    requiredMessage={uploadVideoForm.touched.title && uploadVideoForm.errors.title}
                                    requiredMessageLabel={uploadVideoForm.touched.title || uploadVideoForm.isSubmitting ? uploadVideoForm.errors.title : ""}
                                />
                            </div>
                            <div className="file-upload-component mt-3">
                                <div>
                                    <h5 className="title-name nunito-700">Dr. Rohrer</h5>
                                    <InputFileUploadDesign
                                        name="video_file"
                                        onChange={(file) => uploadVideoForm.setFieldValue('video_file', file)}
                                        error={uploadVideoForm.touched.video_file && uploadVideoForm.errors.video_file}
                                    />
                                </div>
                                <div className="">
                                    <h5 className="thumbnail-name nunito-700">Thumbnail</h5>
                                    <ThumbnailUpload
                                        name="thumbnail"
                                        onChange={(file) => uploadVideoForm.setFieldValue('thumbnail', file)}
                                        error={uploadVideoForm.touched.thumbnail && uploadVideoForm.errors.thumbnail}
                                    />
                                </div>
                            </div>
                            <label className="textarea-label nunito-700 mt-3">Description</label>
                            {/*<textarea className="custom-textarea nunito-500" placeholder="Description"*/}
                            {/*          rows={4}></textarea>*/}
                            <textarea
                                className={`custom-textarea nunito-500 ${uploadVideoForm.touched.description && uploadVideoForm.errors.description ? 'is-invalid' : ''}`}
                                placeholder="Description"
                                rows={4}
                                name="description"
                                onChange={uploadVideoForm.handleChange}
                                onBlur={uploadVideoForm.handleBlur}
                                value={uploadVideoForm.values.description}
                            />
                        </div>

                        <div className="video-modal-footer">
                            <button
                                type="button"
                                className="cancelBtn add-modal-button add-module-button"
                                onClick={handleCloseUploadVideoModal}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="saveBtn add-modal-button add-module-button"
                                onClick={uploadVideoForm.handleSubmit}
                            >
                                Save
                            </button>

                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
            {/*--------------------------------------------------------*/}

            {/*{checkedIds.length > 0 && (*/}
            {/*    <>*/}
            {/*        <p>{`Checked Count: ${getCheckedCount()}`}</p>*/}
            {/*        <div>*/}
            {/*            {checkedIds.map((id) => (*/}
            {/*                <p key={id}>Checked ID: {id}</p>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*)}*/}
        </div>
    );
};

export default Home2;
