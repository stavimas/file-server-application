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

    async function downLoadFile(fileId) {
        // const result = await fetch(`/api/file-server/${fileId}`);
        // return result;
        return 0;
    }

    return(
        <>
            {visible &&
            <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
                <li onClick={() => downLoadFile(record.id)}>Скачать файл</li>
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
                    fileId={record.id}
                    currFileName={record.name}
                    currFileComm={record.comment}
                />
            )}
            {imageSizeChangeModalVisible && (
                <PictureSizeChangeModal 
                    show={imageSizeChangeModalVisible} 
                    onHide={() => setImageSizeChangeModalVisible(false)} 
                    fileId={record.id}
                    currentImageSize={record.size}
                    />
            )}
            {imageAngleChangeModalVisible && (
                <PictureAngleChangeModal 
                    show={imageAngleChangeModalVisible} 
                    onHide={() => setImageAngleChangeModalVisible(false)} 
                    fileId={record.id}
                    currentImageAngle={record.id}
                    />
            )}

        </>
    )
}

async function reloadTask(taskId) {
    // const response = await fetch(`api/image-processing/${taskId}`);
    // const data = await response.json();
    // const result = await fetch(`/api/image-processing/${taskId}/restart`, 
    // {
    //     method: "POST",
    //     body: JSON.stringify(data)
    // });
    // return result;
    return 0;
}

const TaskPopup = ({record, visible, x, y}) => visible &&
  <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
    <li onClick={reloadTask(record.id)}>Выполнить задачу заново</li>
  </ul>

export {FilePopup, TaskPopup};