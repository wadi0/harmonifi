import React, {useEffect, useRef, useState} from 'react';
import "./home2.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
    faDownload,
    faEllipsisVertical,
    faPen,
    faPlay, faShare,
    faTrash, faXmark
} from "@fortawesome/free-solid-svg-icons";
import {image_url, video_url} from "../../config/config.js";
import AxiosServices from "../../component/network/AxiosServices.js";
import ApiUrlServices from "../../component/network/ApiUrlServices.js";
import {Grid, Navigation, Pagination} from "swiper/modules";
import {Modal} from "react-bootstrap";
import ReactPlayer from "react-player";

const Home2 = () => {

    const [moduleAllCardData, setModuleAllCardData] = useState([])
    const [moduleVideoData, setModuleVideoData] = useState([])
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [checkedIds, setCheckedIds] = useState([]);


    const [windowWidthSwiperCard, setWindowWidthSwiperCard] = useState(window.innerWidth);
    const cardSwiperRef = useRef(null);

    const [videoModalOpen, setVideoModalOpen] = useState(false);

    // -------------------------option icons ------------------------------

    const editDelDownload = (id) => {
        const selectedData = moduleVideoData.find(video => video.id === id);
        console.log("Clicked card ID:", id);
        console.log("Selected card data:", selectedData);
        // Add your logic here to handle the selected data, e.g., opening a menu with options
    };

    // ----------------------------------------------------------------

    // -----------checkboxes --------------------

    const handleCheckboxChange = (id) => {
        console.log(id)
        setCheckedIds((prevCheckedIds) => {
            if (prevCheckedIds.includes(id)) {
                return prevCheckedIds.filter(checkedId => checkedId !== id);
            } else {
                return [...prevCheckedIds, id];
            }
        });
    };

    // ----------------------------------------------------------------


    // -------------video player modal --------------------

    const videoModalIsOpen = (id) => {
        setSelectedVideoId(id);
        setVideoModalOpen(true);
    }

    const videoModalIsClose = () => {
        setVideoModalOpen(false);
        setSelectedVideoId(null);
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

    return (
        <div className="home-container">
            {moduleAllCardData.map((module) => (
                <div className="video-card-container" key={module.id}>
                    <div>
                        <h4 className="video-category-title">{module.name}</h4>
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
                                <SwiperSlide className="single-video-card" key={data.id}>
                                    <div className="card-check-option">
                                        <div className="option-icon">
                                            {/* Option icons and checkboxes */}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="video-thumbnail">
                                            <div className="video-thumbnail-img">
                                                <img
                                                    onClick={() => videoModalIsOpen(data.id)}
                                                    src={`${image_url}${data.thumbnail_path}`}
                                                    alt={data.title}
                                                />
                                                <FontAwesomeIcon className="play-icon" icon={faPlay}/>
                                                <input
                                                    type="checkbox"
                                                    checked={checkedIds.includes(data.id)}
                                                    onChange={() => handleCheckboxChange(data.id)}
                                                />
                                                <div>
                                                    <FontAwesomeIcon
                                                        onClick={() => editDelDownload(data.id)}
                                                        className="three-dot-option"
                                                        icon={faEllipsisVertical}
                                                    />

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
                                                <div className="overlay"></div>
                                            </div>
                                        </div>
                                        <h6 className="nunito-600 mt-2 mb-0 text-capitalize">{data.title}</h6>
                                        <Modal className="video-player-modal"
                                               show={videoModalOpen && selectedVideoId === data.id}
                                               onHide={videoModalIsClose}>
                                            <Modal.Body>
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
                                    </div>
                                </SwiperSlide>
                            ) : null;
                        })}
                        <div className="swiper-left-button">
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </div>
                        <div className="swiper-right-button">
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </div>
                    </Swiper>
                    <p>{`Checked Count: ${checkedIds.filter(id => moduleVideoData.some(video => video.module_id === module.id && video.id === id)).length}`}</p>
                </div>
            ))}
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
