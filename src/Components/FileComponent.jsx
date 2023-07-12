import { Button, Table, Upload, message } from 'antd'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { FilePopup } from './Popup';
import { UploadOutlined } from '@ant-design/icons';
import { api } from '../consts';

const props = {
        action: `${api}/file-server/`,
        method: 'POST',
        headers: {
            authorization: 'authorization-text',
        },
        
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

function FileComponent() {
    const [dataSource, setDataSource] = useState([])
    const [columns, setColumns] = useState([])
    const [popupState, setPopupState] = useState({
        record: {},
        visible: false,
        img: false,
        x: 0,
        y: 0
    })
    const [popupVisibility, setPopupVisibility] = useState(false)

    //reactQuery для получения данных о файлах
    const data = useQuery('files', fetchFiles, {
        refetchInterval: 5000,
      });

    async function fetchFiles() {
        //const response = await fetch(`${api}/file-server/`);
        const response = await fetch('tempFileServ.json');
        const data =  await response.json();
        const tempDataSource = []
    
        //console.log(data);

        const tempColumns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                sorter: (a, b) => {
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                },
            },
            {
                title: "Extension",
                dataIndex: "extension",
                key: "extension"
            },
            {
                title: "Size (bytes)",
                dataIndex: "size",
                key: "size"
            },
            {
                title: "Comment",
                dataIndex: "comment",
                key: "comment"
            },
        ]

        data.forEach(el => {
            let tempObj = {
                "key": el.id,
                "id": el.id,
                "name": el.name,
                "extension": el.extension,
                "size": el.size,
                "comment": el.comment
            }
            tempDataSource.push(tempObj);
        });
    
        // console.log(columns);
        // console.log(dataSource);
    
        setDataSource(tempDataSource);
        setColumns(tempColumns);

        return data;
    }

    function onRowRightClick(record, index, dataQuery, event) {
        event.preventDefault();
        // console.log(dataQuery);
        // console.log(record.key);

        const dataObject = dataQuery.data.find((item) => item.id === record.key)
        //console.log(dataObject)
        
        if (!popupState.visible) {
            document.addEventListener(`click`, function onClickOutside() {
            setPopupState({
                record: dataObject,
                visible: false,
                x: event.clientX,
                y: event.clientY
            })
            setPopupVisibility(false)
            document.removeEventListener(`click`, onClickOutside)
            })
        }

        //console.log(record);

        if (dataObject.extension === ".png" || dataObject.extension === ".jpg" || dataObject.extension === ".jpeg") {
            setPopupState({
                record: dataObject,
                visible: true,
                img: true,
                x: event.clientX,
                y: event.clientY
            })
            setPopupVisibility(true)
        }
        else {
            setPopupState({
                record: dataObject,
                visible: true,
                img: false,
                x: event.clientX,
                y: event.clientY
            })
            setPopupVisibility(true)
        }

        //console.log(popupState)
        event.stopPropagation();
    }

    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined />} style={{marginBottom: '7px'}}>Загрузить файл</Button>
            </Upload>
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
            <FilePopup {...popupState}/>
        </>
    );
}

export default FileComponent;