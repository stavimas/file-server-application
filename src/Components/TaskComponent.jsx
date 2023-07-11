import { Button, Table, Popover, Dropdown } from 'antd'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import {TaskPopup} from '../Popup';
import { FileOutlined } from '@ant-design/icons';

function TaskComponent() {

    const [dataSource, setDataSource] = useState([])
    const [columns, setColumns] = useState([])
    const [popupState, setPopupState] = useState({
        visible: false, 
        x: 0, y: 0
    })

    async function fetchTasks() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data =  await response.json();
        const tempColumns = []
        const tempDataSource = []
    
        for (let objKey of Object.keys(data[0])) {
            let tempObj = {
                title: objKey.charAt(0).toUpperCase() + objKey.slice(1),
                dataIndex: objKey,
                key: objKey
            }

            //ссылка на файл
            if (objKey === 'url') {
                tempObj.render = text => <Button icon={<FileOutlined />} href={text} target="_blank"></Button>
            }
            
            tempColumns.push(tempObj)
        }
        data.forEach(el => {
            tempDataSource.push(el);
        });

        // console.log(columns);
        // console.log(dataSource);

        setDataSource(tempDataSource);
        setColumns(tempColumns);
    }

    const data = useQuery("tasks", fetchTasks)

    function onRowRightClick(record, index, event) {
        event.preventDefault();
        event.stopPropagation();

        if (!popupState.visible) {
            document.addEventListener(`click`, function onClickOutside() {
            setPopupState({
                record,
                visible: false,
                x: event.clientX,
                y: event.clientY
            })
            document.removeEventListener(`click`, onClickOutside)
            })
        }

        if (record.id != 1) {
            setPopupState({
                record,
                visible: true,
                x: event.clientX,
                y: event.clientY
            })
        }
        else {
            setPopupState({
                record,
                visible: false,
                x: event.clientX,
                y: event.clientY
            })
        }
        //console.log(popupState)
    }

    return (
        <>
            <Table 
            dataSource={dataSource} columns={columns}
            pagination={{
                pageSizeOptions : ['5', '10', '30', '50', '100'], 
                showSizeChanger : true ,
                defaultPageSize: 5
            }}
            onRow={(record, rowIndex) => {
                return {
                    onContextMenu: onRowRightClick.bind(this, record, rowIndex)
                };
            }}    
             />
            <TaskPopup {...popupState}/>
        </>
    );
}

export default TaskComponent;