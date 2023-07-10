import { Button, Table, Popover, Dropdown, Upload, message, Modal } from 'antd'
import { useState } from 'react';
import { useQuery } from 'react-query';
import { FilePopup } from '../Popup';
import { UploadOutlined } from '@ant-design/icons';

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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

    async function fetchFiles() {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        //const response = await fetch('tempJson.json');
        const data =  await response.json();
        const tempColumns = []
        const tempDataSource = []
    
        //console.log(data);

        for (let objKey of Object.keys(data[0])) {
            let tempObj = {
                title: objKey.charAt(0).toUpperCase() + objKey.slice(1),
                dataIndex: objKey,
                key: objKey,
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

    const data = useQuery('files', fetchFiles, {
        refetchInterval: 5000,
      });
      
    function onRowRightClick(record, index, event) {
        event.preventDefault();
        
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

        //console.log(record);

        //Через react query по fileId ищем файл и загоняем его данные в record

        if (record.id != 1) {
            setPopupState({
                record,
                visible: true,
                img: true,
                x: event.clientX,
                y: event.clientY
            })
        }
        else {
            setPopupState({
                record,
                visible: true,
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
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Загрузить файл</Button>
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
                        onContextMenu: onRowRightClick.bind(this, record, rowIndex)
                    };
                }}    
            />
            <FilePopup {...popupState}/>
        </>
    );
}

export default FileComponent;