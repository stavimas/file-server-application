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
        //const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        //const response = await fetch('/api/image-processing/');
        const response = await fetch('tempTaskServ.json');
        const data =  await response.json();
        //console.log(response);
        //console.log(data);
        const tempDataSource = [];
        //const tempColumns = [];

        const tempColumns = [
            {
                title: "Id",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status"
            },
            {
                title: "Algorithm",
                dataIndex: "algorithm",
                key: "algorithm"
            },
            {
                title: "Source",
                dataIndex: "source",
                key: "source",
                render: (text) => {
                    if (text !== null) {
                        // fetch(`/api/file-server/${text}/download`).then((response) => {
                        //     <Button icon={<FileOutlined />} href={response} target="_blank">{response}</Button>
                        // })
                        return <Button icon={<FileOutlined />}>{text}</Button>
                    }
                }
                // render: (text) => <Button icon={<FileOutlined />}>{text}</Button>
            },
            {
                title: "Result",
                dataIndex: "result",
                key: "result",
                render: (text) => {
                    if (text !== null) {
                        // fetch(`/api/file-server/${text}/download`).then((response) => {
                        //     <Button icon={<FileOutlined />} href={response} target="_blank">{response}</Button>
                        // })
                        return <Button icon={<FileOutlined />}>{text}</Button>
                    }
                }
            },
        ]
    
        // for (let objKey of Object.keys(data[0])) {
        //     let tempObj = {
        //         title: objKey.charAt(0).toUpperCase() + objKey.slice(1),
        //         dataIndex: objKey,
        //         key: objKey
        //     }
        //     tempColumns.push(tempObj)
        // }
        // data.forEach(el => {
        //     tempDataSource.push(el);
        // });

        data.forEach(el => {
            let tempObj = {
                "id": el.id,
                "status": el.status,
                "algorithm": el.algorithm,
                "source": el.source_id,
                "result": el.result_id
            }
            tempDataSource.push(tempObj);
        });

        // console.log(columns);
        // console.log(dataSource);

        setDataSource(tempDataSource);
        setColumns(tempColumns);

        return data;
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

        if (record.status === "error") {
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