import React, {useState, useEffect, useRef} from 'react';
import "./home.scss";
import SelectField from "../../component/SelectField/SelectField.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight, faChevronLeft, faChevronRight,
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
import * as uuid from "uuid";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/grid';
import {Grid, Navigation, Pagination} from "swiper/modules";


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
        {
            title: "dfadf adfa lll",
            id: "5",
            video: "https://media.istockphoto.com/id/1351381072/video/unrecognizable-microbiology-scientist-sampling-with-a-sample-bottle-the-water-from-city-river.mp4?s=mp4-640x640-is&k=20&c=Ra9D4VW_iuGNJj2vLo7VC2xcgLVbdcDh-PYtolB6Wuw=",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWM5Iyp-dDFB2pkAu-VscjVyWwc7i5HA8S6w&s"
        },
        {
            title: "dfa dfa dfa",
            id: "6",
            video: "https://media.istockphoto.com/id/1461319219/video/hand-choosing-a-carpet.mp4?s=mp4-640x640-is&k=20&c=Du6MFpyn-CDxHc1nqm4uZ5HEDurkN4Qv80jT0AFALsU=",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3wN61qXmrdIZmG8gt1FWP_hyBB_wrS1XY8w&s"
        },
    ]

    const [showShare, setShowShare] = useState(false);
    const [optionsHomeSelect, setOptionsHomeSelect] = useState([]);
    const [shareHide, setShareHide] = useState(false);
    const [patientAdd, setPatientAdd] = useState([{id: uuid.v4(),}]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    // const [editDelDown, setEditDelDown] = useState(false);
    const [shareEditDelDown, setShareEditDelDown] = useState(false);
    const [sortListView, setSortListView] = useState(true);
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    const [viewAllCard, setViewAllCard] = useState(false);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);

    const secondSwiperRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const slideNext = () => {
        if (swiperRef.current && !isEnd) {
            swiperRef.current.slideNext();
        }
    };

    const slidePrev = () => {
        if (swiperRef.current && !isBeginning) {
            swiperRef.current.slidePrev();
        }
    };

    const handleSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    useEffect(() => {
        const handleResize = () => {
            if (swiperRef.current) {
                swiperRef.current.update();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    // const getBreakpoints = () => ({
    //     300: {
    //         slidesPerView: 1,
    //     },
    //     1300: {
    //         slidesPerView: 2,
    //     }
    // });


    const viewAllCardShow = () => {
        setViewAllCard(!viewAllCard)
    }

    const showSortView = () => {
        setSortListView(true)
    }

    const showListView = () => {
        setSortListView(false)
    }


    const openModal = (videoUrl) => {
        setCurrentVideoUrl(videoUrl);
        setModalIsOpen(true);
    };

    const closeModal = (videoUrl) => {
        setCurrentVideoUrl("");
        setModalIsOpen(false);
    };

    const editDelDownload = (index) => {
        setActiveCardIndex((prevState) => (prevState === index ? null : index));
    };

    const shareEditDelDownload = () => {
        setShareEditDelDown(!shareEditDelDown);
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
        handleCloseModule(true)
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
                {!viewAllCard ?
                    <div className="d-flex justify-content-between gap-3 home-header-left">
                        <div className="home-select-field">
                            <SelectField
                                options={optionsHomeSelect}
                                placeholder="All"
                            />
                        </div>
                        <button className="add-module-button module-btn-width module-btn" onClick={handleShowModule}>
                            <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                        </button>
                        <button className="upload-module-button module-btn-width upload-video-btn" onClick={handleVideoShow}>
                            <FontAwesomeIcon icon={faVideo}/><span className="ms-2">Upload Video</span>
                        </button>
                    </div>
                    : <span className="back-btn-allPage" onClick={viewAllCardShow}><FontAwesomeIcon className="me-2"
                                                                                                    icon={faAngleLeft}/> Back</span>
                }
                <div className="d-flex justify-content-between gap-3">
                    <button className={`box-filter ${sortListView ? "btn-active" : "btn-unactive add-module-button"}`}
                            onClick={showSortView}>
                        <FontAwesomeIcon icon={faTableCellsLarge}/>
                    </button>
                    <Button className={`box-filter ${sortListView ? "btn-unactive add-module-button" : "btn-active"}`}
                            onClick={showListView}>
                        <FontAwesomeIcon icon={faList}/>
                    </Button>
                </div>
            </div>

            <div className="home-data">
                <div className="video-card">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="m-0">Harmony Health Intro's</h5>
                        {!viewAllCard ?
                            <div className="d-flex justify-content-end gap-3">
                                <button onClick={viewAllCardShow} className="view-all-btn add-module-button">View all
                                </button>
                                {!sortListView ?
                                    <div className="d-flex justify-content-end gap-4">

                                        <div className="swiper-button-prev">
                                            <FontAwesomeIcon icon={faChevronLeft}/>
                                        </div>
                                        <div className="swiper-button-next">
                                            <FontAwesomeIcon icon={faChevronRight}/>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                            : null
                        }
                    </div>
                    {!viewAllCard ?
                        <>
                            {sortListView ?
                                <Swiper
                                    className='video-all-card'
                                    spaceBetween={20}
                                    slidesPerView={4}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                        setIsBeginning(swiper.isBeginning);
                                        setIsEnd(swiper.isEnd);
                                    }}
                                    onSlideChange={handleSlideChange}
                                    navigation={{
                                        nextEl: '.custom-next',
                                        prevEl: '.custom-prev',
                                    }}
                                    breakpoints={{
                                        300: {
                                            slidesPerView: 1,
                                        },
                                        370: {
                                            slidesPerView: 2,
                                        },
                                        650: {
                                            slidesPerView: 3,
                                        },
                                        1200: {
                                            slidesPerView: 3,
                                        },
                                        1300: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {videoThumbnail.map((thumbnail, index) =>
                                        <SwiperSlide className="single-video-card" key={thumbnail.id}>
                                            <div
                                                className={sortListView ? "card-check-option" : "list-card-check-option"}>
                                                {sortListView ?
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedState[index]}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                    : null
                                                }
                                                <div className="option-icon">
                                        <span onClick={() => editDelDownload(index)}>
                                            <FontAwesomeIcon
                                                className="three-dot-option"
                                                icon={faEllipsisVertical}
                                            />
                                        </span>
                                                    {activeCardIndex === index && (
                                                        <div className="share-all-option">
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    className="arrow-background"
                                                                    icon={faPlay}
                                                                />
                                                            </div>
                                                            <div className="share-all-icon-option">
                                                    <span className="edit-del-down" onClick={handleVideoShow}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faPen}
                                                        />
                                                        Edit
                                                    </span>
                                                                <span className="edit-del-down">
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
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={sortListView ? null : "sortview-thumbnail-title"}>
                                                <div
                                                    className={sortListView ? "video-thumbnail" : "sort-video-thumbnail"}>
                                                    <div className=" video-thumbnail-img"
                                                         onClick={() => openModal(thumbnail)}>
                                                        <img src={thumbnail.thumbnail}/>
                                                        <FontAwesomeIcon className="play-icon" icon={faPlay}/>
                                                        <div className="overlay"></div>
                                                    </div>
                                                    {!sortListView ?
                                                        <input
                                                            type="checkbox"
                                                            checked={checkedState[index]}
                                                            onChange={() => handleCheckboxChange(index)}
                                                        />
                                                        : null
                                                    }
                                                </div>
                                                <h6 className="mt-3 mb-0 text-capitalize">{thumbnail.title}</h6>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                    {sortListView ?
                                        <>
                                            <div
                                                className={`custom-prev ${isBeginning ? "slider-btn-disabled" : "slider-btn-active"}`}
                                                onClick={slidePrev}
                                                disabled={isBeginning}
                                            >
                                                <FontAwesomeIcon icon={faAngleLeft}/>
                                            </div>
                                            <div
                                                className={`custom-next ${isEnd ? "slider-btn-disabled" : "slider-btn-active"}`}
                                                onClick={slideNext}
                                                disabled={isEnd}
                                            >
                                                <FontAwesomeIcon icon={faAngleRight}/>
                                            </div>
                                        </>
                                        : null
                                    }
                                </Swiper>
                                :
                                null
                            }
                        </>
                        : null
                    }

                    {!viewAllCard ?
                        <>
                            {sortListView ? null :

                                <Swiper
                                    key={windowWidth}
                                    ref={secondSwiperRef}
                                    spaceBetween={10}
                                    slidesPerView={2}
                                    grid={{
                                        rows: 2,
                                    }}
                                    // pagination={{
                                    //     clickable: true,
                                    // }}
                                    navigation={{
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                    }}
                                    modules={[Pagination, Grid, Navigation ]}
                                    className="list-video-all-Card"
                                    // breakpoints={getBreakpoints()}
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
                                    {videoThumbnail.map((thumbnail, index) =>
                                        <SwiperSlide className="single-video-card" key={thumbnail.id}>
                                            <div
                                                className={sortListView ? "card-check-option" : "list-card-check-option"}>
                                                {sortListView ?
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedState[index]}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                    : null
                                                }
                                                <div className="option-icon">
                                        <span onClick={() => editDelDownload(index)}>
                                            <FontAwesomeIcon
                                                className="three-dot-option"
                                                icon={faEllipsisVertical}
                                            />
                                        </span>
                                                    {activeCardIndex === index && (
                                                        <div className="share-all-option">
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    className="arrow-background"
                                                                    icon={faPlay}
                                                                />
                                                            </div>
                                                            <div className="share-all-icon-option">
                                                    <span className="edit-del-down" onClick={handleVideoShow}>
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faPen}
                                                        />
                                                        Edit
                                                    </span>
                                                                <span className="edit-del-down">
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
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={sortListView ? null : "sortview-thumbnail-title"}>
                                                <div
                                                    className={sortListView ? "video-thumbnail" : "sort-video-thumbnail"}>
                                                    <div className=" video-thumbnail-img"
                                                         onClick={() => openModal(thumbnail)}>
                                                        <img src={thumbnail.thumbnail}/>
                                                        <FontAwesomeIcon className="play-icon" icon={faPlay}/>
                                                        <div className="overlay"></div>
                                                    </div>
                                                    {!sortListView ?
                                                        <input
                                                            type="checkbox"
                                                            checked={checkedState[index]}
                                                            onChange={() => handleCheckboxChange(index)}
                                                        />
                                                        : null
                                                    }
                                                </div>
                                                <h6 className="mt-3 mb-0 text-capitalize">{thumbnail.title}</h6>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            }
                        </>
                        : null
                    }

                    <Modal className="video-player-modal" show={modalIsOpen} onHide={closeModal}>
                        <Modal.Body>
                            <div className="video-player-container">
                                <div className="close-option-icon">
                                    <div>
                                        <span onClick={shareEditDelDownload}>
                                            <FontAwesomeIcon
                                                className="three-dot-option option-close"
                                                icon={faEllipsisVertical}
                                            />
                                        </span>
                                        {shareEditDelDown && (
                                            <div className="share-all-option-player">
                                                <div>
                                                    <FontAwesomeIcon
                                                        className="background-player-option"
                                                        icon={faPlay}
                                                    />
                                                </div>
                                                <div className="player-share-icon-option">
                                                    <span className="share-edit-del-down">
                                                    <FontAwesomeIcon
                                                        className="me-2"
                                                        icon={faShare}
                                                    />
                                                    Share
                                                </span>
                                                    <span className="share-edit-del-down">
                                                    <FontAwesomeIcon
                                                        className="me-2"
                                                        icon={faPen}
                                                    />
                                                    Edit
                                                </span>
                                                    <span className="share-edit-del-down">
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
                                            </div>
                                        )}
                                    </div>
                                    <span className="ms-3" onClick={closeModal}>
                                            <FontAwesomeIcon className="option-close" icon={faXmark}/>
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
                    {/*<div className="swiper-button-prev"></div>*/}
                    {/*<div className="swiper-button-next"></div>*/}

                    {/*------------view all data---------------------------*/}

                    {viewAllCard ?
                        <div className={sortListView ? 'video-all-card' : 'list-video-all-Card'}
                            // className={sortListView ? (!viewAllCard ? 'video-all-card' : 'view-all-video-card') : 'list-video-all-Card'}
                        >
                            {videoThumbnail.map((thumbnail, index) =>
                                <div className="single-video-card" key={thumbnail.id}>
                                    <div className={sortListView ? "card-check-option" : "list-card-check-option"}>
                                        {sortListView ?
                                            <input
                                                type="checkbox"
                                                checked={checkedState[index]}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                            : null
                                        }
                                        <div className="option-icon">
                                        <span onClick={() => editDelDownload(index)}>
                                            <FontAwesomeIcon
                                                className="three-dot-option"
                                                icon={faEllipsisVertical}
                                            />
                                        </span>
                                            {activeCardIndex === index && (
                                                <div className="share-all-option">
                                                    <div>
                                                        <FontAwesomeIcon
                                                            className="arrow-background"
                                                            icon={faPlay}
                                                        />
                                                    </div>
                                                    <div className="share-all-icon-option">
                                                    <span className="edit-del-down">
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faPen}
                                                        />
                                                        Edit
                                                    </span>
                                                        <span className="edit-del-down">
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
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={sortListView ? null : "sortview-thumbnail-title"}>
                                        <div className={sortListView ? "video-thumbnail" : "sort-video-thumbnail"}>
                                            <div className=" video-thumbnail-img" onClick={() => openModal(thumbnail)}>
                                                <img src={thumbnail.thumbnail}/>
                                                <FontAwesomeIcon className="play-icon" icon={faPlay}/>
                                            </div>
                                            {!sortListView ?
                                                <input
                                                    type="checkbox"
                                                    checked={checkedState[index]}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                                : null
                                            }
                                        </div>
                                        <h6 className="mt-3 mb-0 text-capitalize">{thumbnail.title}</h6>
                                    </div>
                                </div>
                            )}
                        </div>
                        : null
                    }
                </div>
                {/*<div className="no-data-box">*/}
                {/*    <FontAwesomeIcon className="empty-box" icon={faBoxOpen} />*/}
                {/*    <span>No Video</span>*/}
                {/*</div>*/}

                {/*<GooglePayComponent/>*/}

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
                    >Save</button>
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
                    <button
                        type="button"
                        // btnText="Cancel"
                        className="cancelBtn add-module-button"
                        onClick={handleCloseVideo}
                    >Cancel</button>
                    <button
                        type="submit"
                        // btnText="Save"
                        className="saveBtn add-module-button"
                        onClick={handleCloseVideo}
                    >Save</button>
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
