import React from "react"
import {Icon} from "antd"
import './index.css'
import FileNameChangeModal from "./Modals/FileNameChangeModal"
import PictureSizeChangeModal from "./Modals/PictureSizeChangeModal"
import PictureAngleChangeModal from "./Modals/PictureAngleChangeModal"
import { useState, useEffect } from "react"


const FilePopup = ({record, visible, img, x, y}) => {
    const [fileNameChangeModalVisible, setFileNameChangeModalVisible] = useState(false)
    const [imageSizeChangeModalVisible, setImageSizeChangeModalVisible] = useState(false)
    const [imageAngleChangeModalVisible, setImageAngleChangeModalVisible] = useState(false)

    return(
        <>
            {visible &&
            <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
                <li onClick={() => setFileNameChangeModalVisible(true)}>Изменить имя файла</li>
                {img && (
                    <li onClick={() => setImageSizeChangeModalVisible(true)}>Изменить размер</li>
                )}
                {img && (
                    <li onClick={() => setImageAngleChangeModalVisible(true)}>Изменить угол поворота</li>
                )}
            </ul>
            }
            {fileNameChangeModalVisible && (
                <FileNameChangeModal
                    show={fileNameChangeModalVisible}
                    onHide={() => setFileNameChangeModalVisible(false)}
                    currFileName={record.id}
                    currFileComm={record.id}
                />
            )}
            {imageSizeChangeModalVisible && (
                <PictureSizeChangeModal 
                    show={imageSizeChangeModalVisible} 
                    onHide={() => setImageSizeChangeModalVisible(false)} 
                    currentImageSize={record.id}
                    />
            )}
            {imageAngleChangeModalVisible && (
                <PictureAngleChangeModal 
                    show={imageAngleChangeModalVisible} 
                    onHide={() => setImageAngleChangeModalVisible(false)} 
                    currentImageAngle={record.id}
                    />
            )}

        </>
    )
}

const TaskPopup = ({record, visible, x, y}) => visible &&
  <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
    <li onClick={reloadTask}>Выполнить задачу заново</li>
  </ul>

function reloadTask() {
    return 0;
}

export {FilePopup, TaskPopup};