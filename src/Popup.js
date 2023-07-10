import React from "react"
import {Icon} from "antd"
import './index.css'

const FilePopup = ({record, visible, img, x, y}) => visible &&
  <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
    <li>Изменить имя файла</li>
    {img && <li>Повернуть</li>}
    {img && <li>Изменить размер</li>}
  </ul>

const TaskPopup = ({record, visible, x, y}) => visible &&
  <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
    <li>Выполнить задачу заново</li>
  </ul>

export {FilePopup, TaskPopup};

