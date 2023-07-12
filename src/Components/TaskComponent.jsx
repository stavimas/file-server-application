import { Button, Table } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query';
import { TaskPopup } from './Popup';
import { FileOutlined } from '@ant-design/icons';
import { api } from '../consts';

function TaskComponent() {

    const [dataSource, setDataSource] = useState([])
    const [columns, setColumns] = useState([])
    const [popupState, setPopupState] = useState({
        visible: false, 
        x: 0, y: 0
    })

    async function fetchTasks() {
        //const response = await fetch(`${api}/image-processing/`);
        const response = await fetch('tempTaskServ.json');
        //console.log(response);
        const data =  await response.json();
        
        //console.log(data);
        const tempDataSource = [];

        const tempColumns = [
            {
                title: "Id",
                dataIndex: "id",
                key: "id",
                sorter: {
                    compare: (a, b) => a.id - b.id,
                    multiple: 2,
                  },
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
                        return <Button icon={<FileOutlined />} href={`${api}/file-server/${text}/download`} target="_blank"></Button>

                        //return <Button icon={<FileOutlined />}>{text}</Button>
                    }
                }
            },
            {
                title: "Result",
                dataIndex: "result",
                key: "result",
                render: (text) => {
                    if (text !== null) {
                        return <Button icon={<FileOutlined />} href={`${api}/file-server/${text}/download`} target="_blank"></Button>
                        //return <Button icon={<FileOutlined />}>{text}</Button>
                    }
                }
            },
        ]

        data.forEach(el => {
            let tempObj = {
                "key": el.id,
                "id": el.id,
                "status": el.status.toLowerCase(),
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

    function onRowRightClick(record, index, dataQuery, event) {
        event.preventDefault();
        event.stopPropagation();

        const dataObject = dataQuery.data.find((item) => item.id === record.key)
        dataObject.status = dataObject.status.toLowerCase();

        if (!popupState.visible) {
            document.addEventListener(`click`, function onClickOutside() {
            setPopupState({
                record: dataObject,
                visible: false,
                x: event.clientX,
                y: event.clientY
            })
            document.removeEventListener(`click`, onClickOutside)
            })
        }

        if (dataObject.status === "error") {
            setPopupState({
                record: dataObject,
                visible: true,
                x: event.clientX,
                y: event.clientY
            })
        }
        else {
            setPopupState({
                record: dataObject,
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
                    onContextMenu: onRowRightClick.bind(this, record, rowIndex, data)
                };
            }}    
             />
            <TaskPopup {...popupState}/>
        </>
    );
}

export default TaskComponent;