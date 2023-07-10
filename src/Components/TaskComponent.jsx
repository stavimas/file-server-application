import { Button, Table, Popover, Dropdown } from 'antd'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import {TaskPopup} from '../Popup';

function TaskComponent() {

    const [dataSource, setDataSource] = useState([])
    const [columns, setColumns] = useState([])
    const [popupState, setPopupState] = useState({
        visible: false, 
        x: 0, y: 0
    })

    const items = [
    {
        key: '1',
        label: (
        <a>
            Изменить имя файла
        </a>
        ),
    },
    {
        key: '2',
        label: (
        <a>
            Повернуть
        </a>
        ),
    },
    {
        key: '3',
        label: (
        <a>
            Изменить размер
        </a>
        ),
    },
    ];

    async function fetchTasks() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data =  await response.json();
        const tempColumns = []
        const tempDataSource = []
    
        for (let objKey of Object.keys(data[0])) {
            let tempItems = items;
            let tempObj = {
                title: objKey.charAt(0).toUpperCase() + objKey.slice(1),
                dataIndex: objKey,
                key: objKey,
                render: (text) => (
                    <>
                        <Dropdown
                        menu={{
                            tempItems,
                        }}
                        placement="bottom"
                        trigger={['contextMenu']}
                        arrow
                        >
                            <p>{String(text)}</p>
                        </Dropdown>
                    </>
                )
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

    function onRowLeftClick(record, index, event) {
        if (!popupState.visible) {
            document.addEventListener(`click`, function onClickOutside() {
            setPopupState({popup: {visible: false}})
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
                img: false,
                x: event.clientX,
                y: event.clientY
            })
        }
        //console.log(popupState)
        event.stopPropagation();
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
                    onClick: onRowLeftClick.bind(this, record, rowIndex)
                };
            }}    
             />
            <TaskPopup {...popupState}/>
        </>
    );
}

export default TaskComponent;