import { Modal, Image, Typography, Space } from 'antd'
import { api } from '../consts';
import { useState, useEffect } from 'react';

function ImageModal({show, onHide, imageArr}) {
    const [modalTitle, setModalTitle] = useState("Информация об изображении")
    //console.log(imageArr);

    useEffect(() => {
        if (imageArr.length === 2) { setModalTitle("Сравнение изображений")};
    }, [])
    
    return(
        <>
        <Modal
          title={modalTitle}
          open={show}
          onCancel={onHide}
          onOk={onHide}
          width={550}
        >
            <Space direction='vertical' style={{ display: 'flex' }}>
                <Space>
                    {imageArr.map(el =>
                            <Image src={`${api}/file-server/${el.id}/download`}/>
                    )}
                </Space>
                <Space style={{ display: 'flex', justifyContent: "space-evenly" }}>
                    {   imageArr.map(el => 
                        <Space direction='vertical'>
                            {/* {console.log(el)} */}
                            <Space>
                                <Typography.Text>Название изображения:</Typography.Text>
                                <Typography.Text>{el.name}</Typography.Text>
                            </Space>
                            <Space>
                                <Typography.Text>Размер изображения:</Typography.Text>
                                <Typography.Text>{el.size}</Typography.Text>
                            </Space>
                        </Space>
                    )}
                </Space>
            </Space>
        </Modal>
      </>
    )
}

export default ImageModal;