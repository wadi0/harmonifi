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
import Select from "react-select";

const Home2 = () => {

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


    const [windowWidthSwiperCard, setWindowWidthSwiperCard] = useState(window.innerWidth);
    const cardSwiperRef = useRef(null);

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const cardRef = useRef(null);

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

    // -----------------------------------------------------



    // -------------------------all card api ------------------------


    useEffect(() => {
        let payload = {
            module_limit: 10,
            module_page: 1,
        }

        AxiosServices.get(ApiUrlServices.MODULE_ALL_CARD_DATA, payload)
            .then((response) => {
                console.log(response.data.data)
                setModuleAllCardData(response.data.data.modules)
                let moduleDetails = response.data.data.modules.map(data => data.videos).flat()
                console.log(moduleDetails)
                setModuleVideoData(moduleDetails)
            }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }, []);

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
        console.log(selectedOption)
        setSelectedModuleId(selectedOption.value);
        console.log("Selected Module ID:", selectedOption.value);
    };


    // --------------------------------------------------

    return (
        <div className="home-container">
            <div className="home-top">
                {!viewAllCard ?
                    <div className="d-flex gap-3 home-header-left">
                        <div className="home-select-field nunito-500">
                            <SelectField
                                options={!moduleListLoading ? moduleList : "Loading..."}
                                placeholder={!moduleListLoading ? "All" : "Loading..."}
                                onChange={(selectedOption)=>handleSelectChange(selectedOption)}
                            />
                        </div>
                        <button className="add-module-button nunito-500 module-btn-width module-btn"
                            // onClick={handleShowModule}
                        >
                            <FontAwesomeIcon icon={faPlus}/><span className="ms-2">Add Module</span>
                        </button>
                        <button className="upload-module-button nunito-500 module-btn-width upload-video-btn"
                            // onClick={handleVideoShow}
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
                    <button className={ `${sortListView ? "btn-active " : "btn-unactive add-module-button"}`} onClick={showSortView}>
                        <FontAwesomeIcon icon={faTableCellsLarge}/>
                    </button>

                    <button className={` ${sortListView ? "btn-unactive add-module-button" : "btn-active"}`} onClick={showListView}>
                        <FontAwesomeIcon icon={faList}/>
                    </button>
                </div>
            </div>
            {moduleAllCardData.map((module) => (
                <div className="video-card-container" key={module.id}>
                    <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                        <h4 className="video-category-title">{module.name}</h4>
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
                                                <FontAwesomeIcon className="message-angel-share-modal" icon={faPlay}/>
                                            )}


                                            {selectedCardId === data.id && videoShareOptions && (

                                                <div className="share-edit-del-down-box">
                                                        <span className="share-edit-del-down">
                                                            <FontAwesomeIcon className="me-2" icon={faShare}/> Share
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


{/*<Modal show={videoModalOpen && selectedVideoId === data.id}*/
}
{/*                                   onHide={videoModalIsClose}>*/
}
{/*                                <Modal.Header closeButton>*/
}
{/*                                    <Modal.Title>{data.title}</Modal.Title>*/
}
{/*                                </Modal.Header>*/
}
{/*                                <Modal.Body>*/
}
{/*                                    <ReactPlayer*/
}
{/*                                        url={`${video_url}${data.video_file_path}`}*/
}
{/*                                        controls={true}*/
}
{/*                                        playing={videoModalOpen}*/
}
{/*                                        width="100%"*/
}
{/*                                        height="100%"*/
}
{/*                                    />*/
}
{/*                                </Modal.Body>*/
}
{/*                                <Modal.Footer>*/
}
{/*                                    <button onClick={videoModalIsClose}>*/
}
{/*                                        Close*/
}
{/*                                    </button>*/
}
{/*                                </Modal.Footer>*/
}
{/*                            </Modal>*/
}
