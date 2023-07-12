import '../index.css'
import { api } from '../consts';
import FileNameChangeModal from "../Modals/FileNameChangeModal"
import PictureSizeChangeModal from "../Modals/PictureSizeChangeModal"
import PictureAngleChangeModal from "../Modals/PictureAngleChangeModal"
import { useState } from "react"


const FilePopup = ({record, img, x, y}) => {
    const [fileNameChangeModalVisible, setFileNameChangeModalVisible] = useState(false)
    const [imageSizeChangeModalVisible, setImageSizeChangeModalVisible] = useState(false)
    const [imageAngleChangeModalVisible, setImageAngleChangeModalVisible] = useState(false)

    //console.log(record);

    async function downLoadFile(fileId) {
        // const result = await fetch(`/${api}/file-server/${fileId}`);
        // return result;
        return 0;
    }

    async function changeImageDirection(fileId, direct) {
        // let data = {
        //     "file_ids": [fileId],
        //     "algorithm": "rotate",
        //     "params": {
        //         "direction": direct
        //     }
        // }

        // fetch(`/${api}/image-processing/`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data)
        // })

        return 0;
    }

    async function changeImageOrientation(fileId, orient) {
        // let data = {
        //     "file_ids": [fileId],
        //     "algorithm": "flip",
        //     "params": {
        //         "orientation": orient
        //     }
        // }

        // fetch(`/${api}/image-processing/`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data)
        // })

        return 0;
    }

    return(
        <>
            <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
                <li onClick={() => downLoadFile(record.id)}>Скачать файл</li>
                <li onClick={() => setFileNameChangeModalVisible(true)}>Изменить имя файла</li>
                {img && (
                    <li onClick={() => setImageSizeChangeModalVisible(true)}>Изменить размер</li>
                )}
                {img && (
                    <li onClick={() => changeImageDirection(record.id, "clockwise")}>Повернуть по часовой стрелке на 90°</li>
                )}
                {img && (
                    <li onClick={() => changeImageDirection(record.id, "counterclockwise")}>Повернуть против часовой стрелки на 90°</li>
                )}
                {img && (
                    <li onClick={() => changeImageOrientation(record.id, "vertical")}>Отразить по вертикали</li>
                )}
                {img && (
                    <li onClick={() => changeImageOrientation(record.id, "horizontal")}>Отразить по горизонтали</li>
                )}
            </ul>
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
                    />
            )}
            {imageAngleChangeModalVisible && (
                <PictureAngleChangeModal 
                    show={imageAngleChangeModalVisible} 
                    onHide={() => setImageAngleChangeModalVisible(false)} 
                    fileId={record.id}
                    />
            )}

        </>
    )
}

async function reloadTask(taskId) {
    // const response = await fetch(`/${api}/image-processing/${taskId}`);
    // const data = await response.json();
    // const result = await fetch(`/${api}/image-processing/${taskId}/restart`, 
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